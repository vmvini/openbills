/*

function DataSourceObject(tableName){

		this.tableName = tableName;
		
		this.allowedFiles;
		
		this.fileObjects = [];
	}

	function FileObject(){
		this.link;
		this.cache;
		this.downloadPath;
		this.unzipPath;
		this.fileName;

	}
*/

var vEnqueuer = require('venqueuer');
var venqueuer = new vEnqueuer();
var fs = require('fs');
var http = require('http');
var extract = require('extract-zip');



function ImporterMapping(){

	this.put = function(key, value){

		this[key] = value;

	};

}

function createImporterMapping(dataSourceObjectList, callback){

	var importerMapping = new ImporterMapping();

	var len = dataSourceObjectList.length;

	dataSourceObjectList.forEach(function(o){

		importerMapping.put(o.fileObjects[0].unzipPath, o.allowedFiles);

		if(--len === 0){
			callback(importerMapping);
		}

	});

}


module.exports = function( dsObjectList ){

	
	venqueuer.createQueue("unzip", function(){
		console.log("extração dos arquivos zipados acabou!");
		//construir importerMapping
		createImporterMapping(dsObjectList, function(importerMapping){

			require('./importer')(importerMapping);

		});
	});

	venqueuer.createQueue("download", function(){
		console.log("Download dos arquivos acabou!");
		venqueuer.trigger("unzip");
	});	

	var len = dsObjectList.length;


	dsObjectList.forEach(function(o){

		--len;
		var foLen = o.fileObjects.length;

		o.fileObjects.forEach(function(fo){

			handleDataSourceObject(fo);

			if(len === 0 && --foLen === 0){
				console.log("INICIANDO DOWNLOADS");
				venqueuer.trigger("download");
			}

			console.log("len: " + len + " foLen: " + foLen);

		});
	});

	

};


function handleDataSourceObject(object){

	if(object.cache !== undefined){
		inCaseOfCache(object);
	}
	else{
		dontHaveCache(object);
	}

}

function inCaseOfCache(object){
	enqueueUnzip(object);
}

function dontHaveCache(object){
	console.log("NAO POSSUI CACHE PARA " + object.fileName);
	enqueueDownload(object);
}

function enqueueUnzip(object){
	console.log("enfileirando " + object.fileName);
	venqueuer.enqueue("unzip", unzip, {
		file: object.downloadPath,
		dest: object.unzipPath,
		callback:function(err){
			if(err){
				console.log("erro ao extrair " + object.fileName);
				console.log(err);
				return;
			}
			console.log("sucesso ao extrair " + object.fileName);
		}

	});
}


function unzip2(file, dest, callback){

	extract(file, {dir: dest}, function (err) {
	 	if(err){
	 		callback(err);
	 		return;
	 	}
	 	callback();
	});

}


function unzip(file, dest, callback){

	console.log("DEZIPANDO: " +  file);
	console.log("PARA: " + dest);
	var child_process = require('child_process');
	var exec = child_process.exec;
			//unzip file.zip -d destination_folder
	exec("unrar x "+ file +" "+dest+"/", function(err, stdout, stderr){

		if(err){
			//callback(err);
			console.log("erro com unrar, tentar com node");
			unzip2(file, dest, callback );
			return;
		}
		if(stderr){
			//callback(stderr);
			console.log("erro com unrar, tentar com node");
			unzip2(file, dest, callback );
			return;
		}
		
		callback();
		

	});

}


function enqueueDownload(object){

	console.log("enfileirando download " + object.fileName);
	venqueuer.enqueue("download", download, {

		url:object.link, 
		dest:object.downloadPath,
		callback:function(success, err){
			if(success){
				success();
				enqueueUnzip(object);
			}
			if(err){
				console.log("erro ao baixar arquivo");
				console.log(err);
			}
		}

	});

}


function download(url, dest, callback) {
	var file = fs.createWriteStream(dest);
	var request = http.get(url, function (response) {
		response.pipe(file);
		file.on('finish', function () {

			var fn = function(){
				callback(function(){
					console.log("download de " + url +  "acabou");
					console.log("salvo em: " + dest);
				});
			};
			file.close(fn); 

		});
		file.on('error', function (err) {
			fs.unlink(dest);
			if (callback)
				callback(null, err.message);
		});
	});
}



