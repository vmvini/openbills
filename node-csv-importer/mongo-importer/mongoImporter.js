require("./mongo-connection/mongoconn");

var mongoose = require('mongoose');

var Politico = mongoose.model('Politico');

var fs = require('fs');

var createPolitico = function(row){

	var politico = new Politico({

		cpf: row.cpf_candidato,
		nome: row.nome_candidato,
		nascimento: row.data_nascimento, 
		titulo_eleitor: row.num_titulo_eleitoral_candidato,
		sexo: row.descricao_sexo,
		grau_instrucao: row.descricao_grau_instrucao,
		estado_civil: row.descricao_estado_civil,
		nacionalidade: row.descricao_nacionalidade,
		estado_nascimento: row.sigla_uf_nascimento,
		cidade_nascimento: row.nome_municipio_nascimento
		

	});

	return politico;

};

module.exports.createPolitico = createPolitico;

module.exports.saveMany = function(array){

	Politico.insertMany(array, function(err, results){

		if(err){
			console.log("erro ao enviar lote de politicos para mongo");
			console.log(err);

		}
		else{
			console.log("sucesso ao salvar " + results.length + " documentos");
		}


	});

};


module.exports.csvImport = function(filePath){

	var csv = require('csv');
	var async = require('async');
	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect('mongodb://mongo:27017/eleicoes', function(err, db) {
		if (err) throw err;

		var collection = db.collection('politicos');
		var queue = async.queue(collection.insert.bind(collection), 10);

		csv()
		.from.path(filePath, { columns: true })
		.transform(function (data, index, cb) {
			queue.push(data, function (err, res) {
				if (err) return cb(err);
				cb(null, res[0]);
			});
		})
		.on('error', function (err) {
			console.log('ERROR: ' + err.message);
		})
		.on('end', function () {
			console.log("TERMINOU DE ENVIAR PRO MONGO");
			queue.drain = function() {
				collection.count(function(err, count) {
					console.log('Number of documents:', count);
					db.close();
				});
			};
		});
	});



};

/*
module.exports.csvImport = function(filePath){

	var csv = require('csv-stream');
	

	var fileStream = fs.createReadStream(filePath);

	fileStream.pipe(csv.createStream({
		columns: ['cpf', 'nome', 'nascimento', 'titulo_eleitor', 'sexo', 'grau_instrucao', 'estado_civil', 'nacionalidade', 'estado_nascimento', 'cidade_nascimento']
	}))
	.pipe(Politico.writeStream());

};*/


/*
module.exports.csvImport = function(filePath){

	var LineInputStream = require("line-input-stream"),
    fs = require("fs"),
    async = require("async");

	//var Entry = mongoose.model( "Schema", entrySchema );
	//Politico

	var stream = LineInputStream(fs.createReadStream(filePath,{ flags: "r" }));

	stream.setDelimiter(",");

	//mongoose.connection.on("open",function(err,conn) { 

	    // lower level method, needs connection
	    var bulk = Politico.collection.initializeOrderedBulkOp();
	    var counter = 0;

	    stream.on("error",function(err) {
	    	console.log("erro na leitura do arquivo politicos.csv");
	        console.log(err); // or otherwise deal with it
	    });

	    stream.on("line",function(line) {

	        async.series(
	            [
	                function(callback) {
	                    var row = line.split(",");     // split the lines on delimiter
	                    var obj = new Politico({
	                    	cpf: row[0],
							nome: row[1],
							nascimento: row[2], 
							titulo_eleitor: row[3],
							sexo: row[4],
							grau_instrucao: row[5],
							estado_civil: row[6],
							nacionalidade: row[7],
							estado_nascimento: row[8],
							cidade_nascimento: row[9]

	                    });             
	                    // other manipulation

	                    bulk.insert(obj);  // Bulk is okay if you don't need schema
	                                       // defaults. Or can just set them.

	                    counter++;

	                    if ( counter % 1000 == 0 ) {
	                        bulk.execute(function(err,result) {
	                            if (err){
	                            	console.log("ocorreu erro em bulk.execute");
	                            	console.log(err);
	                            }   // or do something
	                            // possibly do something with result
	                            bulk = Politico.collection.initializeOrderedBulkOp();
	                            callback();
	                        });
	                    } else {
	                        callback();
	                    }
	               }
	           ],
	           function (err) {
	               // each iteration is done
	               if(err){
	               		console.log("erro no fim da iteração");
	               		console.log(err);
	               }
	           }
	       );

	    });

	    stream.on("end",function() {
	    	console.log("terminou de enviar dados pro mongo");
	        if ( counter % 1000 != 0 )
	            bulk.execute(function(err,result) {
	                if (err) {
	                	console.log("ocorreu erro em bulk.execute");
	                    console.log(err);
	                }  // or something
	                // maybe look at result
	            });
	    });

	//});


};
*/


module.exports.savePolitico = function(row, callback){

	var politico = createPolitico(row);

	politico.save(function(err, result){

		if(err){
			callback(err);
			return;
		}
		if(!result){
			callback({error:"politico nao foi salvo!"});
			return;
		}

		callback(null, result);



	});

};

/*
SELECT CPF_CANDIDATO, NOME_CANDIDATO, DATA_NASCIMENTO, " 
						+ "NUM_TITULO_ELEITORAL_CANDIDATO,  DESCRICAO_SEXO, DESCRICAO_GRAU_INSTRUCAO, "
						+ "DESCRICAO_ESTADO_CIVIL, DESCRICAO_NACIONALIDADE, SIGLA_UF_NASCIMENTO, NOME_MUNICIPIO_NASCIMENTO  "
						+ " FROM CONSULTA_CAND";


nome: String,
		nascimento: Date,
		titulo_eleitor: String,
		sexo: String,
		grau_instrucao:String,
		estado_civil:String,
		nacionalidade:String,
		estado_nascimento:String,
		cidade_nascimento:String,
		cpf:String
*/