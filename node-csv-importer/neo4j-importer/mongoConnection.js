(function(){

	var mongoose = require('mongoose');
	var mongoURI = "mongodb://mongo/test";
	var MongoDB = mongoose.connect(mongoURI).connection;

	MongoDB.on('error', function(err) { 
		console.log("erro ao conectar");
		console.log(err.message); 
	});

	MongoDB.on('disconnected', function(e){
		console.log('mongodb desconectou!');
		console.log("desconectado ", e);
	});

	MongoDB.on('connected', function(){
		console.log('mongodb conectou!');
	});

	MongoDB.once('open', function() {
	  console.log("mongodb connection open");
	});

	var dbShutdown = function(msg, callback){
		MongoDB.close(function(){
			console.log("Mongoose desconectado: " + msg);
			callback();
		});
	}

	//escutando sinal emitido por nodemon quando app é fechado 
	process.once('SIGUSR2', function(){
		dbShutdown('nodemon restart', function(){
			process.kill(process.pid, 'SIGUSR2');
		});
	});

	//escutando sinal emitido pela aplicação quando app é fechado
	process.on('SIGINT', function(){
		dbShutdown('app termination', function(){
			process.exit(0);
		});
	});


	//escutando sinal emitido pelo heroku quando app é fechado
	process.on('SIGTERM', function(){
		dbShutdown('Heroku app shutdown', function(){
			process.exit(0);
		});
	});


	//importar modelos de dados
	require('../mongo-importer/mongo_models/politico');

})();



