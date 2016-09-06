(function(){

	var fs = require('fs');
	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();


	var fileManager = new FileManager();

	fileManager.addListener('./cache/extracao/politicos.json', function(){
		console.log("politicos.json esta pronto");
		
		//enviar para o mongo
		require('./mongoImporter')('./cache/extracao/politicos.json', 'politicos', function(){
			console.log("terminou de importar politicos para o mongodb");
		});
	});

	fileManager.addListener('./cache/extracao/doadores.json', function(){
		console.log("doadores.json esta pronto");
		require('./mongoImporter')('./cache/extracao/doadores.json', 'doadores', function(){
			console.log("terminou de importar politicos para o mongodb");
		});
	});

	fileManager.waitFiles();


	function FileManager(){

		var fileIsUp = (function(filePath){

			this[filePath] = true;
		}).bind(this);

		venqueuer.createQueue("check", function(){

			console.log("todos os arquivos estão prontos");

		});

		this.addListener = function(filePath, callback){

			this[filePath] = false;
			enqueue(filePath, callback);

		};

		this.waitFiles = function(){
			venqueuer.trigger("check");
		};

		function enqueue(filePath, callback){
			venqueuer.enqueue("check", checkFile, {
				file: filePath, 
				callback:function(){
					fileIsUp(filePath);
					console.log(filePath + " está pronto");
					callback();
				}
			});
		}

	}

	function checkFile(file, callback){

		if( !fs.existsSync(file) ){

			console.log("arquivo " + file + " nao existe, esperar 3 segundos");
			setTimeout(function(){
			  	
				checkFile(file, callback);

			}, 3000);
		}
		else{
			callback();
		}

	}

	/*
		enfileirar operação de checar se arquivo existe para todos os arquivos registrados
	
	*/

})();