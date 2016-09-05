module.exports = function(client){

	var mongoImporter = require('./mongoImporter');	

	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();
	var JSONStream = require('JSONStream')

	var QueryStream = require('pg-query-stream')

	var fs = require('fs'); 
	var copyTo = require('pg-copy-streams').to;

	venqueuer.createQueue("mongoimport", function(){
		console.log("terminou de importar pro mongo");
	});


	var sqlQuery = "SELECT CPF_CANDIDATO, NOME_CANDIDATO, DATA_NASCIMENTO, " 
	+ "NUM_TITULO_ELEITORAL_CANDIDATO,  DESCRICAO_SEXO, DESCRICAO_GRAU_INSTRUCAO, "
	+ "DESCRICAO_ESTADO_CIVIL, DESCRICAO_NACIONALIDADE, SIGLA_UF_NASCIMENTO, NOME_MUNICIPIO_NASCIMENTO  "
	+ " FROM CONSULTA_CAND";

	generateCSVPoliticos(client);

	//require('./doadoresFromPG')(client);


	function generateCSVPoliticos(client){
		//Copy (Select * From foo) To '/tmp/test.csv' With CSV DELIMITER ',';
		var wstream = fs.createWriteStream('./cache/extracao/politicos.json', {flags:'w'});

		var stream = client.query(copyTo('COPY ( select row_to_json(politico) from ( SELECT CPF_CANDIDATO cpf, NOME_CANDIDATO nome, DATA_NASCIMENTO nascimento, NUM_TITULO_ELEITORAL_CANDIDATO  titulo_eleitor, DESCRICAO_SEXO sexo, DESCRICAO_GRAU_INSTRUCAO grau_instrucao, DESCRICAO_ESTADO_CIVIL estado_civil, DESCRICAO_NACIONALIDADE nacionalidade,  SIGLA_UF_NASCIMENTO estado_nascimento,  NOME_MUNICIPIO_NASCIMENTO cidade_nascimento from CONSULTA_CAND) politico ) TO STDOUT'));
	  	stream.pipe(wstream);
	  	stream.on('end', function(){
	  		console.log("terminou de recuperar politicos, salvo em /cache/extracao/politicos.csv");
	  		console.log("enviar para mongo");
	  		//mongoImporter.csvImport('./cache/extracao/politicos.csv');
	  	});
	  	stream.on('error', function(e){
	  		console.log("erro", e);
	  	});

	}

/*
	function queryStream(client){
		var query = new QueryStream("select CPF_CANDIDATO cpf, NOME_CANDIDATO nome, DATA_NASCIMENTO nascimento, NUM_TITULO_ELEITORAL_CANDIDATO  titulo_eleitor, DESCRICAO_SEXO sexo, DESCRICAO_GRAU_INSTRUCAO grau_instrucao, DESCRICAO_ESTADO_CIVIL estado_civil, DESCRICAO_NACIONALIDADE nacionalidade,  SIGLA_UF_NASCIMENTO estado_nascimento,  NOME_MUNICIPIO_NASCIMENTO cidade_nascimento from CONSULTA_CAND");
		var stream = client.query(query)
	  	//release the client when the stream is finished
	  	stream.on('end', function(){
	  		console.log("ACABOU DE RECUPERAR POLITICOS");
	  	})
	  	stream.pipe(JSONStream.stringify()).pipe(process.stdout)
	}
*/

/*
	function start(client, sqlQuery){

		

		var query = client.query(sqlQuery);



		query.on('row', function(row) {
	      //console.log('user "%s" is %d years old', row.name, row.user_age);

	      console.log("enfileirar", row);

	      //enfileirar operacao de enviar pro mongo
	      venqueuer.enqueue("mongoimport", mongoImporter.savePolitico, {
	      		row:row,
	      		callback:function(err, result){
	      			if(err){
	      				console.log("erro ao inserir no mongo db");
	      				console.log(err);
	      			}
	      			else{
	      				console.log("sucesso ao inserir ", row.cpf_candidato);
	      			}
	      			
	      		}
	      });

	    });

	    query.on('end', function(result) {
	      //console.log(result.rowCount + ' rows were received');
	      //venqueuer.trigger("mongoimport");
	      console.log("terminou de ler");
	    })



	}

*/

	/*
		
		NOME_CANDIDATO
		DATA_NASCIMENTO
		NUM_TITULO_ELEITORAL_CANDIDATO
		DESCRICAO_SEXO
		DESCRICAO_GRAU_INSTRUCAO
		DESCRICAO_ESTADO_CIVIL
		DESCRICAO_NACIONALIDADE
		SIGLA_UF_NASCIMENTO
		NOME_MUNICIPIO_NASCIMENTO
		CPF_CANDIDATO

		*/

		/*PROCURAR NA TABELA: CONSULTA_CAND*/



}