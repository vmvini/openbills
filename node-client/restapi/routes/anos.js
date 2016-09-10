var router = require('express').Router();
var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/MesAnoWebService?wsdl";
var controller = require('rest-to-soap-mapper');

router.get('/anos', controller(wsdl, 'getAnos' ) );

module.exports = router;

