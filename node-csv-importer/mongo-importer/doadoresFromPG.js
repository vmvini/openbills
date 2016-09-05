module.exports = function(client){

	var mongoImporter = require('./mongoImporter');	

	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();
	var JSONStream = require('JSONStream')

	var QueryStream = require('pg-query-stream')

	var fs = require('fs'); 
	var copyTo = require('pg-copy-streams').to;




	venqueuer.createQueue("montarDoador", function(){

	});

	venqueuer.createQueue("getFinanciados", function(){
		console.log("executar montagem dos doadores com seus devidos financiados");
		venqueuer.trigger("montarDoador");
	});

	var uniaoReceitaDespesas = "( (SELECT t.CD_CPF_CNPJ_FORNECEDOR cpf, t.NM_FORNECEDOR nome FROM DESPESA_CAND_2010 t WHERE t.CD_CPF_CNPJ_FORNECEDOR != t.CPF) UNION (SELECT t.CD_CPF_CNPJ_DOADOR cpf, t.NM_DOADOR nome FROM RECEITA_CAND_2010 t WHERE t.CD_CPF_CNPJ_DOADOR != t.CD_NUM_CPF) )";

	var todos_doadores = "SELECT distinct cpf, nome FROM "+uniaoReceitaDespesas+" as doadores";

	

	//00006588000190
	//;SELECT cc.CPF_CANDIDATO cpf, cc.NOME_CANDIDATO nome FROM CONSULTA_CAND cc, ( (SELECT t.CD_CPF_CNPJ_FORNECEDOR cpf, t.NM_FORNECEDOR nome FROM DESPESA_CAND_2010 t WHERE t.CD_CPF_CNPJ_FORNECEDOR != t.CPF) UNION (SELECT t.CD_CPF_CNPJ_DOADOR cpf, t.NM_DOADOR nome FROM RECEITA_CAND_2010 t WHERE t.CD_CPF_CNPJ_DOADOR != t.CD_NUM_CPF) ) un WHERE un.cpf = '00006588000190' AND  

	getDoadores(todos_doadores);

	function getDoadores(sqlQuery){
		
		var query = client.query(sqlQuery);
		
		query.on('row', function(row) {
	      
	      	venqueuer.enqueue("getFinanciados", getFinanciados, {

	      		cpfDoador: row.cpf,
	      		nomeDoador: row.nome,
	      		callback: function(){
	      			console.log("fim de um getFinanciados");
	      		}

	      	});
	      	

	    });

	    query.on('end', function(result) {
	    	console.log("buscar os financiados de cada doador encontrado");
	      	venqueuer.trigger("getFinanciados");
	    });

	}


	function getFinanciados(cpfDoador, nomeDoador, callback){
		var subquery = client.query( financiadosSql(cpfDoador) );
		//subquery.on('row', function(row) {
		//});

		subquery.on('end', function(result) {
			console.log("terminou de pegar financiados de " + cpfDoador);
			
			
			venqueuer.enqueue("montarDoador", montarDoador, {

				cpfDoador: cpfDoador,
				nomeDoador: nomeDoador,
				politicos: result,
				callback: function(){
					console.log("terminou execucao de um montarDoador");
				}

			});

			callback();
		});

	}

	function financiadosSql(cpfDoador){
		return "SELECT cc.CPF_CANDIDATO cpf, cc.NOME_CANDIDATO nome FROM CONSULTA_CAND cc, ( (SELECT t.CPF candCPF, t.CD_CPF_CNPJ_FORNECEDOR cpf, t.NM_FORNECEDOR nome FROM DESPESA_CAND_2010 t WHERE t.CD_CPF_CNPJ_FORNECEDOR != t.CPF) UNION (SELECT t.CD_NUM_CPF candCPF, t.CD_CPF_CNPJ_DOADOR cpf, t.NM_DOADOR nome FROM RECEITA_CAND_2010 t WHERE t.CD_CPF_CNPJ_DOADOR != t.CD_NUM_CPF) ) un WHERE un.cpf = '"+cpfDoador+"' AND  un.candCPF = CC.CPF_CANDIDATO"
	}

	function montarDoador(cpfDoador, nomeDoador, politicos, callback){

		console.log("cpfDoador: " + cpfDoador);
		console.log("nomeDoador: " + nomeDoador);
		console.log("politicos: ", politicos);

		callback();

	}



};