module.exports = function(callback){

	getConnection(function(db){

		callback( new Neo(db) );

	});

};

function Neo(db){
	this.saveRelation = function(source, target, relationLabel, callback ){

		var cypher = "MATCH (a: " + source.label + " { "+  cypherParameter(source.obj, source.fields) +" }), ";
		cypher += " (b: " + target.label + " { "+  cypherParameter(target.obj, target.fields) +" }) ";
		cypher += " CREATE (a)-[:"+relationLabel+"]->(b) ";


		function cypherParameter(obj, fields){
			var str = "";
			var pCount = 0;
			var i, assignment;
			
			for(i in fields){
				assignment = fields[i] + ": '" + obj[ fields[i] ] + "'";

				addAssignment(assignment);
			}

			return str;

			function addAssignment(assignment){
				if(pCount > 0){
					str += ", " + assignment;
				}
				else{
					str += assignment;
				}

				pCount++;
			}

		}

		db.cypherQuery( cypher , callback);

	};


	this.insert = function(obj, label, callback){

		db.insertNode(obj, label, callback );

	};
}

function getConnection(callback){

	var neo4j = require('node-neo4j');
	var db;

	
	db = new neo4j('http://neo4j:neo4j@neo4j:7474');

	db.insertNode({test:'connection'}, 'Connection', function(err){

		if(err){
			console.log(err);
			console.log("ERRO AO CONECTAR AO NEO4J, tentar novamente em 10s");

			setTimeout(function(){

				getConnection(callback);

			}, 10000);
		}
		else{
			console.log("CONSEGUIU CONECTAR AO NEO4J");
			callback(db);
		}

	});

		

}
