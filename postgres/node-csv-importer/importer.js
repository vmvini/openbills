//node-csv-importer
(function(){


	var fs = require('fs');
	var pg = require('pg');
	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();
	var Client = pg.Client;


	var client = new Client({user: 'postgres', database: 'eleicoes'});

	client.connect(function(err, client, done) {
		
		if(err){
			console.log("connection error", err);
			return;
		}
		if(!client){
			console.log("no client given");
			return;
		}

		function import(){

			venqueuer.createQueue("importer", function(){
				console.log("terminou de importar dados no postgres");
			});

			var folders = getTopSubFolders('./downloader');
			var files;
			var file;
			var folder;

			for (folder in folders){

				files = getAllFilesUnderFolder(folder.path);
				
				for(file in files){
					if(isValidFile(file)){
						queueUpImportTask(file, folder.folderName);
					}
				}
			}


			venqueuer.trigger('importer');

			
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

			function queueUpImportTask(file, folder){
				venqueuer.enqueue("importer", importCSVFile, {

					filePath: file, 
					tableName: folder, 
					pgClient: client,
					callback: function(e){
						if(e){
							console.log("OCORREU ERRO AO IMPORTAR");
							console.log(e.where);
						}
						console.log("terminou de importar arquivo: " +  path );
					}

				});
			}



		}

	});


	function importCSVFile(filePath, tableName, pgClient, callback){

		var files = walkSync(dir);
		var copyFrom = require('pg-copy-streams').from;

		var stream = pgClient.query(copyFrom('COPY '+tableName+' FROM STDIN ' + "WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'" )  );
		var fileStream = fs.createReadStream(filePath);
		fileStream.on('error', error);
		fileStream.pipe(stream).on('finish', complete).on('error', error);
		
		function error(e){
			callback(e);
		}

		function complete(){
			callback();
		}

	}


	function getAllFilesUnderFolder(dir, filelist) {
		var fs = fs || require('fs'),
		files = fs.readdirSync(dir);
		filelist = filelist || [];
		files.forEach(function(file) {
			if (fs.statSync(dir + '/' + file).isDirectory()) {
				filelist = getAllFilesUnderFolder(dir + file + '/', filelist);
			}
			else {
				filelist.push(dir+file);
			}
		});
		return filelist;
	};

	function getTopSubFolders(dir){
		var folderList = [];
		var folders = fs.readdirSync(dir);
		var f;
		for(f in folders){
			if( fs.statSync(dir + "/" + f).isDirectory() ){
				folderList.push({ 
					path: dir + "/" + f, 
					folderName: f; 
				});
			}
		}
		return folderList;
	}


})();
