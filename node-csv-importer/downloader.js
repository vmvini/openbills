(function(){


	var fs = require('fs');
	var http = require('http');
	var unzipLib = require('unzip');
	
	var folderName;

	var vEnqueuer = require('venqueuer');

	var venqueuer = new vEnqueuer();

	var lineReader = require('readline').createInterface({
		input: fs.createReadStream('./datasource.txt')
	});

	venqueuer.createQueue("unzip", function(){
		console.log("extração dos arquivos zipados acabou!");

		console.log("enviar para postgres");
		require('./importer')();

	});

	venqueuer.createQueue("download", function(){
		
		console.log("Download dos arquivos acabou!");

		venqueuer.trigger("unzip");

	});	



	lineReader.on('line', function (line) {
		var row = line.trim();
		var finalDest = folderName + "/";
		var filePath = folderName + "/" + getFileName(row);
		if(isURL(row)){
			

			venqueuer.enqueue("download", download, {

				url:row, 
				dest:filePath,
				callback:function(success, err){
					if(success){
						success();

						venqueuer.enqueue("unzip", unzip, {
							file: filePath,
							dest: finalDest,
							callback:function(fn, err){
								if(fn){
									fn();
								}
								if(err){
									console.log("erro ao extrair " + filePath);
									console.log(err);
								}
							}

						});
					}
					if(err){
						console.log("erro ao baixar arquivo");
						console.log(err);
					}
				}

			});

			
		}
		else if( !isEmpty(row) ){
			folderName = createFolderSync('./downloads/'+row);
		}
	});


	lineReader.on('close', function(){
		venqueuer.trigger("download");
	});

	function getFileName(url){
		return url.substring(url.lastIndexOf('/')+1);
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

	function isEmpty(str){
		return (str.length === 0 || !str.trim());
	}

	function createFolderSync(path){
		if (!fs.existsSync(path)){
			fs.mkdirSync(path);
		}
		return path;
	}

	function isURL(str) {
	  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	  return pattern.test(str);
	}

	function unzip(file, dest, callback){
		console.log("extraindo " + file);
		fs.createReadStream(file).pipe(
			
			unzipLib.Extract({ path: dest })
			.on('close', function(){
				callback(function(){
					console.log("arumento funcionando");
				}, null);
			})
			.on('error', function(err){
				callback(null, err);
			})

			);
		
	}



})();