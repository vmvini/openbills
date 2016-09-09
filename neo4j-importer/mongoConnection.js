var mongoose = require('mongoose');
var mongoURI = "mongodb://mongo/test";
var MongoDB = mongoose.connect(mongoURI, {server:{auto_reconnect:true}}).connection;

var lastReconnectAttempt; 

module.exports = function(callback){

	MongoDB.on('error', function(err) { 
		console.log("erro ao conectar");
		console.log(err.message); 

	});

	MongoDB.on('disconnected', function(e){
		console.log('mongodb desconectou!');

		console.log('MongoDB disconnected!');
	    var now = new Date().getTime();
	    // check if the last reconnection attempt was too early
	    if (lastReconnectAttempt && now-lastReconnectAttempt<5000) {
	        // if it does, delay the next attempt
	        var delay = 5000-(now-lastReconnectAttempt);
	        console.log('reconnecting to MongoDB in ' + delay + "mills");
	        setTimeout(function() {
	            console.log('reconnecting to MongoDB');
	            lastReconnectAttempt=new Date().getTime();
	            mongoose.connect(mongoURI, {server:{auto_reconnect:true}});
	        },delay);
	    }
	    else {
	        console.log('reconnecting to MongoDB');
	        lastReconnectAttempt=now;
	        mongoose.connect(mongoURI, {server:{auto_reconnect:true}});
	    }

	});

	MongoDB.on('connected', function(){
		console.log('mongodb conectou!');

		require('./CollectionStatus');
		callback();


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



};

