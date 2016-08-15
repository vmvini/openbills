//downloads each link provided in datasource.txt and sends the files to /var/dados/

/*
read datasource
foreach row
	if(!isLink)
		create folder with row content as name in /var/dados
		add folderPath to stack
	else
		download from link and extract file to stack.pop() 

*/

(function(){

	var fs = require('fs');
	var http = require('http');
	var unzipLib = require('unzip');

	var stack = [];

	var lineReader = require('readline').createInterface({
	  input: fs.createReadStream('./datasource.txt')
	});

	lineReader.on('line', function (line) {
	  var row = line.trim();
	  if(isURL(row)){
		stack.slice(-1).pop().enqueueDownload(row); 	
	  }
	  else if( !isEmpty(row) ){
	  	stack.push( new DownloadManager( createFolderSync('./'+row) ) );
	  	
	  	/*createFolder('/var/data/' + row, function(path, err){
	  		if(err){
	  			console.log("erro ao criar " + path );
	  			return;
	  		}
	  		stack.push( new DownloadManager(path) );
	  	});*/
	  }
	});

	lineReader.on('close', function(){
		var busy = false;
		var queue = [];
		stack.forEach(function(d){

			queue.push( new TaskSchedule(d) );
			
			if(busy === false){
				busy = true;
				queue.shift().execute();
			}

			function TaskSchedule(d){
				this.execute = function(){
					d.startDownload(function(){
						busy = false; //complete callback
						if(queue.length > 0){
							busy = true;
							queue.shift().execute();
						}
						
					});
				};
			}

		});
	});


	function isEmpty(str){
		return (str.length === 0 || !str.trim());
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


	function DownloadManager(path){

		var queue = [];

		this.startDownload = function(complete){
			console.log("iniciando download de " + path);
			if(queue.length > 0){
				queue.shift().download(complete);
			}
		};

		this.enqueueDownload = function(link){
			console.log("enfileirando " + link);
			queue.push( new Downloader( link ) );
		};

		function Downloader(link){

			this.download = function(complete){
				
				var dest = path +"/"+ getFileName(link);
				console.log(dest);
				download(link, dest, function(err){
					console.log("baixando " + link);
					
					if(err){
						console.log("erro ao baixar o arquivo " + url);
						console.log(err);
					}

					//download finished 
					//call next 
					if(queue.length > 0){
						queue.shift().download();
					}
					else{
						//all links downloaded
						console.log("finalizado primeiro lote de downloads");
						if(complete){
							complete();
						}
						console.log("terminado");
					}

					//unzip downloaded file
					unzip(dest, path+"/", function(err){
						if(err){
							console.log("erro ao extrair " + dest);
							console.log(err);
						}
					});
					

				});	
			};

		}

		function getFileName(url){
			return url.substring(url.lastIndexOf('/')+1);
		}

		function download(url, dest, callback) {
		    var file = fs.createWriteStream(dest);
		    var request = http.get(url, function (response) {
		        response.pipe(file);
		        file.on('finish', function () {
		            file.close(callback); 
		        });
		        file.on('error', function (err) {
		            fs.unlink(dest);
		            if (callback)
		                callback(err.message);
		        });
		    });
		}

	}

	function createFolder(path, mask, cb) {
	    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
	        cb = mask;
	        mask = 0777;
	    }
	    fs.mkdir(path, mask, function(err) {
	        if (err) {
	            if (err.code == 'EEXIST') cb(path, null); // ignore the error if the folder already exists
	            else cb(path, err); // something else went wrong
	        } else cb(path, null); // successfully created folder
	    });
	}

	function createFolderSync(path){
		if (!fs.existsSync(path)){
	        fs.mkdirSync(path);
	    }
	    return path;
	}


	function unzip(file, dest, callback){
		fs.createReadStream(file).pipe(
			
			unzipLib.Extract({ path: dest })
					.on('close', function(){
						callback(null);
					})
					.on('error', function(err){
						callback(err);
					})

		);
					
	}


	


})();