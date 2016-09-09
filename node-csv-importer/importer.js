//node-csv-importer

module.exports = function(importMapping){

	waitForPg( function(client){

		startImporting(importMapping, client);

	} );

};

function startImporting(importMapping, client){
	
	var fs = require('fs');
	var pg = require('pg');
	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();
	start(client);

	function start(client){

		/*if(err){
			console.log("erro ao conectar pg-alpine-eleicoes 5432");
			console.log("connection error", err);
			return;
		}
		if(!client){
			console.log("no client given");
			return;
		}*/

		importAllCSVs();

		function importAllCSVs(){
			
			var max = 3;
			var importCount = 0;

			venqueuer.createQueue("importer", function(){
				console.log("terminou de importar dados no postgres");

				console.log("enviar politicos para mongodb");
				require('./mongo-importer/politicosFromPG')(client);
			});

			var folders = getTopSubFolders('./downloads');
			var files;
			var file;
			var folder;
			var validator;

			for (folder in folders){
				importCount = 0;
				validator = createValidator(importMapping, folders[folder].path + "/" );
				
				files = getAllFilesUnderFolder(folders[folder].path);

				for(file in files){
					if( validator( files[file] ) && ++importCount < max ){
						queueUpImportTask( files[file], folders[folder].folderName);
					}
				}
			}


			venqueuer.trigger('importer');


			function createValidator(importMapping, folder){
				//console.log("importMapping", importMapping);
				//console.log("foldername: '"+folder+"'");
				var allowedFiles = importMapping[folder];
				var i;
				var isValid;

				if(importMapping){
					if( allowedFiles !== undefined){
						
						return function(f){
							//console.log("VERIFICANDO SE ARQUIVO É VALIDO!");
							isValid = false;
							//se o arquivo nao possuir um dos nomes listados, entao nao é válido
							for( i in allowedFiles ){
								//se f é um arquivo q possui nome allowedFiles[i], então é válido
								if(f.indexOf( allowedFiles[i] ) !== -1){
									isValid = true;
								}
							}

							return isValid;

						};

					}
				}
				
				return isValidFile;
				

				function isValidFile(f){
				
					if( f.indexOf(".pdf") !== -1 )
						return false;
					if( f.indexOf("leio") !== -1 )
						return false;
					if( f.indexOf("leia") !== -1 )
						return false;
					if( f.indexOf("layout") !== -1 )
						return false;
					if( f.indexOf(".zip") !== -1 )
						return false;

					return true;
				}

			}

			

			function queueUpImportTask(file, folder){
				
				venqueuer.enqueue("importer", importCSVFile, {

					filePath: file, 
					tableName: folder, 
					pgClient: client,
					callback: function(e){
						if(e){
							console.log("OCORREU ERRO AO IMPORTAR ", file);
							return;
						}
						console.log("terminou de importar arquivo: " +  file );
					}

				});
			}



		}

	}


	function importCSVFile(filePath, tableName, pgClient, callback){
		

		var copyFrom = require('pg-copy-streams').from;

		var stream = pgClient.query(copyFrom('COPY '+tableName+' FROM STDIN ' + "WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'" )  );
		var fileStream = fs.createReadStream(filePath);
		//fileStream.on('error', error);
		fileStream.pipe(stream).on('end', callback).on('error', error);

		function error(e){
			callback(e);
		}


	}


	function getAllFilesUnderFolder(dir, filelist) {
		
		var fs = fs || require('fs'),
		files = fs.readdirSync(dir);
		filelist = filelist || [];
		files.forEach(function(file) {
			if (fs.statSync(dir + '/' + file).isDirectory()) {
				filelist = getAllFilesUnderFolder(dir + "/" + file + '/', filelist);
			}
			else {
				filelist.push(dir+"/"+file);
			}
		});
		return filelist;
	}

	function getTopSubFolders(dir){
	
		var folderList = [];
		var folders = fs.readdirSync(dir);
		var f;
		for(f in folders){

			if( fs.statSync(dir + "/" + folders[f]).isDirectory() ){
				folderList.push({ 
					path: dir + "/" + folders[f], 
					folderName: folders[f]
				});
			}
		}
		return folderList;
	}

	


}


function waitForPg(connected){

	//pg-alpine-eleicoes 5432

	var pg = require('pg');
	var Client = pg.Client;

	//var client = new Client({user: 'postgres', database: 'eleicoes'});
	var client = new Client('postgres://postgres:12345@pg-alpine-eleicoes:5432/eleicoes');
	

	client.connect(function(err, clientCon, done) {

		if(err){
			console.log("tentar conectar ao pg novamente em 3 segundos");
			
			setTimeout(function(){
			  	
				waitForPg(connected);

			}, 10000);
		}
		else if(!clientCon){
			console.log("tentar conectar ao pg novamente em 3 segundos");
			setTimeout(function(){
			  	
				waitForPg(connected);

			}, 10000);
		}
		else{
			console.log("sucesso ao conectar ao pg");
			connected(clientCon);
		}

	});
}