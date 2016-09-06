
var neo4j = require('node-neo4j');

	try{
		//host neo4j
		var db = new neo4j('http://neo4j:neo4j@neo4j:7474');
			
	}
	catch(e){
		console.log("ERRO AO CONECTAR AO NEO4J ");
		console.log(e);
	}

module.exports.savePolitico = function(politico, callback){

	db.insertNode(
			politico,
			 'Politico', 
			function(err, result){
				if(err){
					callback(err);
				}
				else{
					callback();
				}
			}

		);

};


module.exports.saveDoador = function(doador, callback){

	db.insertNode(
			{
				cpf:doador.cpf,
				nome:doador.nome

			},
			 'Doador', 
			function(err, result){
				if(err){
					callback(err);
				}
				else{
					callback();
				}
			}

		);

};

module.exports.saveRelation = function(doador, politico, callback){

	var cypher = "MATCH (p: Politico {cpf_candidato: '"+politico.cpf_candidato+"'}), (d:Doador {cpf: '"+doador.cpf+"'}) CREATE (d)-[:FINANCIOU]->(p)";


	db.cypherQuery( cypher , 
	function(err){
		if(err){
			callback(err);
		}
		else{
			callback();
		}
	});

};

