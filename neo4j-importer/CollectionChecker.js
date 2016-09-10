var vEnqueuer = require('venqueuer');
var venqueuer = new vEnqueuer();

var ReadDataFromMongo = require('./ReadDataFromMongo');

var Neo = null;


var politicosInsertStatus = false;


venqueuer.createQueue("neoInsertRelations", function(){

	console.log("terminou de inserir relacionamentos entre politicos e doadores no neo4j");

});

venqueuer.createQueue("neoInsertPoliticos", function(){

	politicosInsertStatus = true;
	console.log("terminou de inserir politicos no neo4j");

});


venqueuer.createQueue("neoInsertDoadores", function(){

	console.log("terminou de inserir doadores no neo4j");

	verifyGrupalInsertStatus(function(){
		venqueuer.trigger("neoInsertRelations");
	});



	function verifyGrupalInsertStatus(callback){

		if(politicosInsertStatus){

			callback();

		}
		else{
			console.log("ainda não está pronto para inserir relacionamentos");
			setTimeout(function(){

				verifyGrupalInsertStatus(callback);

			}, 10000);
		}

	}

});


venqueuer.createQueue("readPoliticos", function(){

	console.log("terminou de ler politicos do mongodb");

	
	verifyNeoConnection(function(){
		console.log("DISPARANDO FILA PARA INSERCAO DE POLITICOS");
		venqueuer.trigger("neoInsertPoliticos");
	});

});

venqueuer.createQueue("readDoadores", function(){

	console.log("terminou de ler doadores do mongodb");
	

	verifyNeoConnection(function(){
		console.log("DISPARANDO FILA PARA INSERCAO DE DOADORES");
		venqueuer.trigger("neoInsertDoadores");
	});


});

function verifyNeoConnection(callback){

	if(Neo !== null){
		callback();
	}
	else{
		console.log("neo4j ainda nao está conectado!, tentar conectar em 10 s");
		setTimeout(function(){

			verifyNeoConnection(callback);

		}, 10000);
	}

}


venqueuer.createQueue("checkpoliticos", function(){

	console.log("politicos ja existem no mongodb");

	venqueuer.trigger("readPoliticos");

});

venqueuer.createQueue("checkdoadores", function(){

	console.log("doadores ja existem no mongodb");

	venqueuer.trigger("readDoadores");

});



(function(){
	var fs = require('fs');
	var mongoose = require('mongoose');
	
	if(!hasNeoBackup()){
		require('./mongoConnection')(afterConnect);
	}
	else{
		console.log("já possui backup do banco neo4j");
	}
	
	function hasNeoBackup(){
		return fs.existsSync('./cache/neo4j/graph.db');
	}


	function afterConnect(){

		var CollectionStatus = mongoose.model("CollectionStatus");

		require('./SendDataToNeo')(function(neo){

			Neo = neo;
			dependsOnNeo();

		});

		function dependsOnNeo(){

			//enfileirando operações de checagem de coleções
			venqueuer.enqueue("checkpoliticos", checkCollection, {

				collection: 'politicos',
				callback: function(){
					console.log("politicos ja existem no mongo");
				}

			});

			venqueuer.enqueue("checkdoadores", checkCollection, {

				collection: 'doadores',
				callback: function(){
					console.log("doadores ja existem no mongo");
				}

			});


			//enfileirar operações de leitura e inserção de documentos do mongodb
			

			enqueueReadAndInsertPolitico();
			enqueueReadAndInsertDoador();

			venqueuer.trigger("checkpoliticos");
			venqueuer.trigger("checkdoadores");

		}

		function checkCollection(collection, callback){

			CollectionStatus.findOne({

				'collectionName':collection

			}, function(err, doc){

				if(err){
					console.log("erro ao procurar status de " + collection);
					console.log(err);
					console.log("tentar novamente em 10s");

					setTimeout(function(){

						checkCollection(collection, callback);
						
					}, 10000);

					
				}
				else if(!doc){
					console.log(collection + " ainda nao existe no mongo");
					console.log("tentar novamente em 10s");
					
					setTimeout(function(){

						checkCollection(collection, callback);
						
					}, 10000);

				}
				else{
					callback();
				}

			});

		}

	}

})();


function enqueueRelationsInsert(doador){

	if(doador === null){
		console.log("doador nulo");

	}
	else{

		if(!doador.dps){
			console.log(doador.cpf + "nao possui politicos financiados");
			return;
		}

		doador.dps.forEach(function(politico){

			venqueuer.enqueue("neoInsertRelations", Neo.saveRelation, {

				source:{
					obj: doador,
					label:'Doador',
					fields:['cpf']
				},

				target:{
					obj:politico,
					label:'Politico',
					fields:['cpf_candidato']
				},
				relationLabel:'FINANCIOU',
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


function enqueueReadAndInsertDoador(){

	venqueuer.enqueue("readDoadores", ReadDataFromMongo.read, {

		collection:"doadores", 
		callback: function(err){

			if(err){
				console.log("erro ao ler doadores do mongodb");
				console.log(err);
			}
			else{
				console.log("leitura de doadores finalizada com sucesso");
			}

		},
		eachResultCallback: function(err, doc){


			if(err){
				console.log("erro ao obter um doador");
				console.log(err);
			}
			else{
				venqueuer.enqueue("neoInsertDoadores", Neo.insert, {

					obj:{
						cpf:doc.cpf,
						nome:doc.nome

					},
					label:'Doador',
					callback: function(err){
						if(err){
							console.log("erro ao inserir doador");
							console.log(err);
						}
						else{
							console.log("sucesso ao inserir doador");
							enqueueRelationsInsert(doc);
						}
					}

				});
			}

		}

	});

}

function enqueueReadAndInsertPolitico(){
	venqueuer.enqueue("readPoliticos", ReadDataFromMongo.read, {

		collection:"politicos", 
		callback: function(err){

			if(err){
				console.log("erro ao ler politicos do mongodb");
				console.log(err);
			}
			else{
				console.log("leitura de politicos finalizada com sucesso");
			}

		},
		eachResultCallback: function(err, doc){

			if(err){
				console.log("erro ao obter um politico");
				console.log(err);
			}
			else{
				venqueuer.enqueue("neoInsertPoliticos", Neo.insert, {
					obj:doc,
					label:'Politico',
					callback: function(err){
						if(err){
							console.log("erro ao inserir politico");
							console.log(err);
						}
						else{
							console.log("sucesso ao inserir politico");
						}
					}

				});
			}
		
		}

	});
}