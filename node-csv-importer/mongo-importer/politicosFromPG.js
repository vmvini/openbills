var fs = require('fs');

function JsonFile(jsonFile, query){

	this.jsonFile = jsonFile;
	this.query = query;

}

function jsonFileExists(file, exist, nexist){

	if( fs.existsSync(file) ){
		exist(file);
	}
	else{
		nexist(file);
	}

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



module.exports = function(client){

	 
	var copyTo = require('pg-copy-streams').to;
	var vEnqueuer = require('venqueuer');
	var venqueuer = new vEnqueuer();
	var doadoresJson = "./cache/extracao/doadores.json";

	venqueuer.createQueue("jsonquery", function(){

		console.log("criacao de jsons acabou");

		removeNewLineFromJson("./cache/extracao/doadoresTemp.json", doadoresJson);

	});

	var jsonFiles = [];
	jsonFiles.push( new JsonFile("./cache/extracao/politicos.json", "COPY (SELECT * FROM politicosJson) TO STDOUT") );
	jsonFiles.push(new JsonFile("./cache/extracao/doadoresTemp.json", "COPY ( SELECT * FROM doadoresJson ) TO STDOUT"));

	

	jsonFiles.forEach(function(f, i){

		jsonFileExists(f.jsonFile, exists, nexists );


		if(i === jsonFiles.length - 1){
			venqueuer.trigger("jsonquery");
		}


		function exists(file){
			console.log(file + "ja existe, utilizar cache");
		}

		function nexists(file){
			console.log(file + "nao existe, gerar json");

			venqueuer.enqueue("jsonquery", getJsonFromPgQuery, {
				file: file, 
				query: f.query,
				callback: function(e){
					if(e){
						console.log("erro ao criar " + file);
						console.log(e);
					}
					else{
						console.log("sucesso ao criar " + file);
					}
				}
			});

		}

	});


	
	function getJsonFromPgQuery(file, query, callback){
		var wstream = fs.createWriteStream(file, {flags:'w'});

		var stream = client.query(copyTo(query));
	  	stream.pipe(wstream);
	  	stream.on('end', function(){
	  		callback();
	  	});
	  	stream.on('error', function(e){
	  		callback(e);
	  	});
	}

}