var router = require('express').Router();
var controller = require('rest-to-soap-mapper');
var wsdl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/VariaveisWebService?wsdl';

router.get('/variaveis', controller(wsdl, "getListaVariaveis" ) );

module.exports = router;
