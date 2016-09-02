require("./mongo-connection/mongoconn");

var mongoose = require('mongoose');

var Politico = mongoose.model('Politico');

module.exports.savePolitico = function(row, callback){

	var politico = new Politico({

		nome: row.nome_candidato,
		nascimento: row.data_nascimento, 
		titulo_eleitor: row.num_titulo_eleitoral_candidato,
		sexo: row.descricao_sexo,
		grau_instrucao: row.descricao_grau_instrucao,
		estado_civil: row.descricao_estado_civil,
		nacionalidade: row.descricao_nacionalidade,
		estado_nascimento: row.sigla_uf_nascimento,
		cidade_nascimento: row.nome_municipio_nascimento,
		cpf: row.cpf_candidato

	});

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