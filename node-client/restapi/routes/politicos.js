var router = require('express').Router();
var controller = require('rest-to-soap-mapper');
var wsdl = 'http://openbills-soap:8080/openbills/OpenBillsService?wsdl';

var mongoose = require('mongoose');
require('../mongo/dbcon');
var Politico = mongoose.model('Politico');

router.post('/valorBens', validateParams, controller( wsdl, "getBensDeclaradosAosAnos", setArgs  ) );


router.get('/politicos', function(req, res){

	Politico.find({nome_candidato: {'$regex':req.query.nome} }, function(err, docs){

		if(err){
			res.status(404);
			res.json({"message":"erro na recuperação dos dados"});
			return;
		}
		else{
			res.status(200);
			res.json(docs);
		}

	});

});

module.exports = router;


function setArgs(req){
	return {
		cpf: req.body.cpf
	};
}

function validateParams(req, res, next){
	if(!req.body.cpf){
		res.status(404);
		res.json({"message":"cpf do politico nao informado"});
		return;
	}
	next();
}

