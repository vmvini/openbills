(function(){

	var mongoImporter = require('./mongoImporter');	

	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();

	var pg = require('pg');
	var Client = pg.Client;
	var client = new Client('postgres://postgres:12345@pg-alpine-eleicoes:5432/eleicoes');
	
	venqueuer.createQueue("mongoimport", function(){
		console.log("terminou de importar pro mongo");
	});

	client.connect(function(err, client, done) {

		if(err){
			console.log("erro ao conectar pg-alpine-eleicoes 5432");
			console.log("connection error", err);
			return;
		}
		if(!client){
			console.log("no client given");
			return;
		}

		var sqlQuery = "SELECT CPF_CANDIDATO, NOME_CANDIDATO, DATA_NASCIMENTO, " 
						+ "NUM_TITULO_ELEITORAL_CANDIDATO,  DESCRICAO_SEXO, DESCRICAO_GRAU_INSTRUCAO, "
						+ "DESCRICAO_ESTADO_CIVIL, DESCRICAO_NACIONALIDADE, SIGLA_UF_NASCIMENTO, NOME_MUNICIPIO_NASCIMENTO  "
						+ " FROM CONSULTA_CAND";

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
	      venqueuer.trigger("mongoimport");
	    })



	});



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




	})();