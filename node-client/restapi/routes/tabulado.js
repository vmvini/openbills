var router = require('express').Router();
var controller = require('rest-to-soap-mapper');
var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/TabulacaoWebService?wsdl";

router.post('/tabulado', validate,  controller(wsdl, "getDadosTabulados", setArgs ) );

function validate(req, res, next){

	if( !req.body.tabulado ){
		res.status(404);
		res.json({message:"dados tabulares nao encontrados na requisicao"});
		return;
	}
	next();

}

function setArgs(req){
	var args = req.body.tabulado;
	return args;
}


module.exports = router;
