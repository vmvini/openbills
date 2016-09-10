var router = require('express').Router();
var controller = require('rest-to-soap-mapper');
var wsdl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/VariaveisWebService?wsdl';

router.get('/vardetails', controller( wsdl, "getListaVariaveisDesc" ) );

module.exports = router;
