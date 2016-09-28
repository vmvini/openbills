var router = require('express').Router();
var neo4j = require('node-neo4j');
var db = new neo4j('http://neo4j:neo4j@neo4j:7474');

router.post('/doadores', function(req, res){

		/*
			MATCH p1 = (a:Doador)-[r]->(b:Politico), p2 = (a)-[r2]->(c:Politico) WHERE c.cpf_candidato <> b.cpf_candidato AND b.cpf_candidato = '+ req.body.cpf +'   RETURN p1, p2  LIMIT 40;
		*/

		 var statementsOne = {
            statements: [{
                statement:'MATCH path = (c:Politico)<-[r3]-(a:Doador)-[r]->(b:Politico) WHERE c.cpf_candidato <> b.cpf_candidato AND b.cpf_candidato = "'+ req.body.cpf +'"   RETURN path;',
                resultDataContents:["graph"]
            }]
        };

		db.beginTransaction(statementsOne, function (err, result) {
                    if(err)
						res.send(err.message);
					else
						res.json(result);
                });

	});

module.exports = router;


