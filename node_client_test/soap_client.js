var soap = require('soap');
var http = require('http');
soap.WSDL.prototype.ignoredNamespaces = [];

  var url = 'http://0.0.0.0:99/openbills/OpenBillsService?wsdl';
  var args = {cpf: '13981854420'};
  soap.createClient(url, function(err, client) {
      client.getBensDeclaradosAosAnos(args, function(err, result) {
          if(err){
          	console.log("aconteceu erro", err);

          }
          else{
          	console.log(result);
          }
      });
  });