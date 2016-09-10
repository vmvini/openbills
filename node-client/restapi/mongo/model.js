(function(){

	var mongoose = require('mongoose');

	//Político
	var politicoSchema = new mongoose.Schema({

		cpf_candidato: String,
		nome_candidato: String,
		data_nascimento: String,
		descricao_sexo: String,
		descricao_grau_instrucao: String, 
		descricao_estado_civil: String, 
		descricao_nacionalidade: String, 
		sigla_uf_nascimento: String, 
		nome_municipio_nascimento:String


	});


	mongoose.model('Politico', politicoSchema);



	//Doador
	var doadorSchema = new mongoose.Schema({


		cpf:String,
		nome:String,
		dps:[{

			cpf_candidato: String,
			nome_candidato: String,
			data_nascimento: String,
			descricao_sexo: String,
			descricao_grau_instrucao: String, 
			descricao_estado_civil: String, 
			descricao_nacionalidade: String, 
			sigla_uf_nascimento: String, 
			nome_municipio_nascimento:String

		}]

	});

	mongoose.model('Doador', doadorSchema);



})();


/*
, , , , , , , ,   FROM (select * from ( select *, row_number() over (partition by cpf_candidato order by nome_candidato) as row_number from CONSULTA_CAND ) as rows where row_number = 1) dp;


doador:
doador.cpf, doador.nome,
*/