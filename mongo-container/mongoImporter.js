//mongoimport --collection collection --file collection.json

module.exports = function(filePath, collection, callback){

	console.log("EXECUTANDO IMPORTAÇÃO  PARA MONGO");

	var child_process = require('child_process');
	var exec = child_process.exec;
		

	exec("mongoimport --collection "+ collection +" --file "+filePath, function(err, stdout, stderr){

		if(err){
			//callback(err);
			console.log("erro");
			console.log(err);
			return;
		}
		if(stderr){
			//callback(stderr);
			console.log("stderr");
			console.log(stderr);
			callback();
			return;
		}
		else{
			callback();
		}
		
		

	});


};