module.exports = function(client){

	var fs = require('fs'); 
	var copyTo = require('pg-copy-streams').to;

	generatePoliticosJson(client);

	function generatePoliticosJson(client){

		var wstream = fs.createWriteStream('./cache/extracao/politicos.json', {flags:'w'});

		var stream = client.query(copyTo('COPY (SELECT * FROM politicosJson) TO STDOUT'));
	  	stream.pipe(wstream);
	  	stream.on('end', function(){
	  		console.log("terminou de recuperar politicos, salvo em /cache/extracao/politicos.json");
	  		generateDoadoresJson(client);
	  	});
	  	stream.on('error', function(e){
	  		console.log("erro", e);
	  	});

	}

	function generateDoadoresJson(client){
		var wstream = fs.createWriteStream('./cache/extracao/doadoresTemp.json', {flags:'w'});
		var stream = client.query(copyTo('COPY ( SELECT * FROM doadoresJson ) TO STDOUT'));
	  	stream.pipe(wstream);
	  	stream.on('end', function(){
	  		console.log("terminou de recuperar doadores, salvo em /cache/extracao/doadoresTemp.json");
	  		removeNewLineFromJson('./cache/extracao/doadoresTemp.json', './cache/extracao/doadores.json');
	  	});
	  	stream.on('error', function(e){
	  		console.log("erro", e);
	  	});
	}

	function removeNewLineFromJson(input, output){
		var child_process = require('child_process');
		var exec = child_process.exec;
		//sed 's/\\n/ /g'  doadoresTemp.json > doadores.json
		exec("sed 's/\\\\n/ /g'  "+input+" > " + output, function(err, stdout, stderr){

			if(err){
				//callback(err);
				console.log("erro ao remover new line");
				return;
			}
			if(stderr){
				//callback(stderr);
				console.log("erro ao remover new line");
				return;
			}
			
			console.log("sucesso ao remover new line");
			

		});
	}



}