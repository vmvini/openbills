(function(){




	


	var mongoose = require('mongoose');
	require('./mongoConnection');
	var Politico = mongoose.model('Politico');
	var Doador = mongoose.model('Doador');


	var MongoClient = require('mongodb').MongoClient;
	var assert = require('assert');
	var ObjectId = require('mongodb').ObjectID;
	var url = 'mongodb://mongo/test';


	console.log("tentar conexao com NEO4J");
	var sendToNeo = require('./sendDataToNeo');

	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();

	venqueuer.createQueue("saveRelation", function(){

		console.log("terminou de criar relacionamentos");

	});


	venqueuer.createQueue("saveDoadores", function(){


		console.log("terminou de salvar doadores");

		console.log("agora, criar relacionamentos");
		venqueuer.trigger("saveRelation");

	});

	venqueuer.createQueue("savePolitico", function(){

		console.log("terminou de salvar politico");

		getDoadores();

	});


	setTimeout(function(){

		getPoliticos();
		//getDoadores();



	}, 10000);

	
	function saveRelation(doador, politico, callback){

		sendToNeo.saveRelation(doador, politico, callback);

	}



	/*function getDoadores(){

		console.log("pegando doadores");
		var cursor = Doador.find({ }).cursor();
		cursor.on('data', function(doc) {
		  	//callback(doc);
		  	console.log("enfileirando operação de salvar doador");

		  	

		});
		cursor.on('close', function() {
		  	console.log("acabou de receber todos os doadores");

		  	venqueuer.trigger("saveDoadores");

		});

	}*/



	function getPoliticos(callback){

		console.log("pegando politicos");
		var cursor = Politico.find({ }).cursor();
		cursor.on('data', function(doc) {
		  	//callback(doc);
			venqueuer.enqueue("savePolitico", sendToNeo.savePolitico,{

		  		politico: doc, 
		  		callback: function(err){
		  			if(err){
		  				console.log("erro ao salvar politico");
		  				console.log(err);
		  			
		  			}
		  			else{
		  				console.log("sucesso ao salvar politico");
		  			}

		  		}

		  	} );


		});
		cursor.on('close', function() {
		  	console.log("acabou de receber todos os politicos");

		  	venqueuer.trigger("savePolitico");

		});

	}
	

	function getDoadores(){

		

		var findDoadores = function(db, callback) {

			var items = 0;
			var stop = false;

			db.collection('doadores').find().count(function(err, count){

				var cursor =db.collection('doadores').find( );
				console.log("PEGOU CURSAR DA BUSCA POR DOADORES");
				cursor.each(function(err, doc) {

					assert.equal(err, null);
					if (doc != null) {
						console.log("doador encontrado");
						if(stop === false){
							enqueueSaveDoador(doc, items);
						}
						
					} else {
						callback();
					}

					if(++items === count){
						venqueuer.trigger("saveDoadores");
					}

					if(items === 500){
						stop = true;
						venqueuer.trigger("saveDoadores");
					}

				});

			});





		};


		MongoClient.connect(url, function(err, db) {
		 	
		 	if(err){
		 		console.log("ERRO AO CONECTAR COM MONGOCLIENT", err);

		 	}
		 	else{
		 		findDoadores(db, function() {
				      db.close();
				  });
		 	}

		  
		});

	}


	function enqueueSaveDoador(doc, count){

		venqueuer.enqueue("saveDoadores", sendToNeo.saveDoador,{

		  		doador: doc, 
		  		callback: function(err){
		  			if(err){
		  				console.log("erro ao salvar doador");
		  				console.log(err);
		  			
		  			}
		  			else{
		  				console.log("sucesso ao salvar doador " + count);

		  				if(doc.dps === null){
		  					console.log("doc q nao possui agregado");
		  					console.log(doc);

		  				}
		  				else{

		  					doc.dps.forEach(function(politico){

		  					venqueuer.enqueue("saveRelation", saveRelation, {

			  						doador:doc, 
			  						politico:politico,
			  						callback:function(err){
			  							if(err){
			  								console.log("erro ao criar relacionamento");
			  								console.log(err);

			  							}
			  							else{
			  								console.log("sucesso ao criar relacionamento");
			  							}
			  						}


			  					} );

			  				});

		  				}
		  				
		  				

		  			}

		  		}

		  	} );

	}

	



})();