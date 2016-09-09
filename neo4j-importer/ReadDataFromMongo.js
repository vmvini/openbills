function getMongodbConnection(success){

	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://mongo/test';

	MongoClient.connect(url, function(err, db) {
		 	
		 	if(err){
		 		console.log("ERRO AO CONECTAR COM MONGOCLIENT");
		 		console.log("tentar novamente em 10 seg");
		 		setTimeout(function(){

		 			getMongodbConnection(success);

		 		}, 10000);


		 	}
		 	else{
				success(db);
		 	}

		  
	});

} 


module.exports.read = function(collection, callback, eachResultCallback){

	var items = 0;

	getMongodbConnection(function(db){

		db.collection(collection).find().count(function(err, count){

			var cursor = db.collection(collection).find();

			if(count === 0){
				callback();
				return;
			}
			
			cursor.each(function(err, doc){

				if(err){
					eachResultCallback(err, null);
				}
				else if(!doc){
					eachResultCallback({err:"doc nao encontrado"}, null);
				}
				else{
					eachResultCallback(null, doc);

					if(++items === count){
						callback();
					}
				}

			});

		});

	});

};


