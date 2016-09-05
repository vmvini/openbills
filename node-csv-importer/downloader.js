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
var mkdirp = require('mkdirp');
var vEnqueuer = require('venqueuer');
var venqueuer = new vEnqueuer();
var fs = require('fs');
var http = require('http');
var extract = require('extract-zip');

var unzipCache = {};

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

			handleDataSourceObject(fo, o);

			if(len === 0 && --foLen === 0){
				console.log("INICIANDO DOWNLOADS");
				venqueuer.trigger("download");
			}

			console.log("len: " + len + " foLen: " + foLen);

		});
	});

	

};


function handleDataSourceObject(object, parent){

	if(object.cache !== undefined){
		inCaseOfCache(object, parent);
	}
	else{
		dontHaveCache(object);
	}

}

function inCaseOfCache(object, parent){
	enqueueUnzip(object, parent);
}

function dontHaveCache(object){
	console.log("NAO POSSUI CACHE PARA " + object.fileName);
	enqueueDownload(object);
}


function enqueueUnzip(object, parent){

	console.log("enfileirando " + object.fileName);
	venqueuer.enqueue("unzip", unzip, {
		object:object,
		parent:parent,
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

//NOME ERRADO, AGORA DEVERIA SER moveFilesFromTo
function copyFilesFromTo(src, target, files, callback){

	venqueuer.createQueue("copyFiles", function(){
		callback();
	});

	var list = getAllFilesUnderFolder(src);
	var i;
	var filesToCopy = [];
	var fileName;
	var newTarget;
	var targetFolder;
	var count = 0;
	var listSize = list.length;

	list.forEach(function(listi){

		if( isInFiles( listi ) ){
			
			targetFolder = (target + "/" + listi.replace("./downloads/", "")).replace(/\.[^/.]+$/, "");

			createPath(targetFolder, function(){

				fileName = listi.replace(/^.*[\\\/]/, '');
				newTarget = target + "/" + listi.replace("./downloads/", "");
				

				venqueuer.enqueue("copyFiles", moveFileToFolder, {

					src: listi,
					target:newTarget,
					callback:function(err){
						if(err){
							console.log("erro ao copiar " + listi + " para " + target);
							console.log(err);
							return;
						}
						console.log("sucesso ao copiar " + listi + " para " + target);
					}

				});

				if(++count === listSize){
					triggerCopyQueue();
				}

			});
			
			
		}
		else{
			--listSize;
		}

	});


	function triggerCopyQueue(){
		venqueuer.trigger("copyFiles");
	}	

	function createPath(path, callback){
		mkdirp(path, function (err) {
		    if(err){
		    	console.log("erro ao criar path");
		    	console.log(err);
		    }
		    else{
		    	callback();
		    }
		});
	}

	function isInFiles(file){
		var i;
		var found = false;
		for(i in files){
			if( file.indexOf( files[i] ) !== -1  ){
				found = true;
			}
		}

		console.log("file: " + file + " ESTA " + found);
		return found;
	}

	function moveFileToFolder(src, target, callback){

		console.log("movendo " + src + " para " + target ); 

		move(src, target, callback );

		function move (oldPath, newPath, callback) {
		    fs.rename(oldPath, newPath, function (err) {
		        if (err) {
		            if (err.code === 'EXDEV') {
		                copy();
		            } else {
		                callback(err);
		            }
		            return;
		        }
		        callback();
		    });

		    function copy () {
		        var readStream = fs.createReadStream(oldPath);
		        var writeStream = fs.createWriteStream(newPath);

		        readStream.on('error', callback);
		        writeStream.on('error', callback);
		        readStream.on('close', function () {

			        fs.unlink(oldPath, callback);
			    });

		    readStream.pipe(writeStream);

		    }
		}
	}


	function copyFileToFolder(src, target, callback){

		console.log("copiando " + src + " para " + target ); 

		copyFile(src, target, callback );

		function copyFile(source, target, cb) {
			var cbCalled = false;

			var rd = fs.createReadStream(source);
			rd.on("error", function(err) {
				done(err);
			});
			var wr = fs.createWriteStream(target);
			wr.on("error", function(err) {
				done(err);
			});
			wr.on("close", function(ex) {
				done();
			});
			rd.pipe(wr);

			function done(err) {
				if (!cbCalled) {
					cb(err);
					cbCalled = true;
				}
			}
		}

	}

}



function unzip2(object, parent, file, dest, callback){

	extract(file, {dir: dest}, function (err) {
	 	if(err){
	 		callback(err);
	 		return;
	 	}
	 	unzipCache[object.downloadPath] = {originalFolder: object.unzipPath};
	 	callback();
	});

}


function unzip(object, parent, file, dest, callback){

	if(unzipCache[object.downloadPath] === undefined){
		console.log("DEZIPANDO: " +  file);
		console.log("PARA: " + dest);
		var child_process = require('child_process');
		var exec = child_process.exec;
				//unzip file.zip -d destination_folder
		exec("unrar x "+ file +" "+dest+"/", function(err, stdout, stderr){

			if(err){
				//callback(err);
				console.log("erro com unrar, tentar com node");
				unzip2(object, parent, file, dest, callback );
				return;
			}
			if(stderr){
				//callback(stderr);
				console.log("erro com unrar, tentar com node");
				unzip2(object, parent, file, dest, callback );
				return;
			}
			
			unzipCache[object.downloadPath] = {originalFolder: object.unzipPath};
			callback();
			

		});
	}

	else{
		console.log("ja existe cache de extracao para " + file);
		copyFilesFromTo(unzipCache[object.downloadPath].originalFolder, object.unzipPath, parent.allowedFiles, callback);

	}

	

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



