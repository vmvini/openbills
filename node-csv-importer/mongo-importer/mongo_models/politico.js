(function(){

	var mongoose = require('mongoose');

	//Político
	var politicoSchema = new mongoose.Schema({

		nome: String,
		nascimento: String,
		titulo_eleitor: String,
		sexo: String,
		grau_instrucao:String,
		estado_civil:String,
		nacionalidade:String,
		estado_nascimento:String,
		cidade_nascimento:String,
		cpf:String

	});


	mongoose.model('Politico', politicoSchema);



	//Doador
	var doadorSchema = new mongoose.Schema({

		nome:String,
		cpf:String,
		financiados:[politicoSchema]

	});

	mongoose.model('Doador', doadorSchema);



})();

