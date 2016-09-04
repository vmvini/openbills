process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

console.log("Entre com as colunas: ");
registInput(function(text){
	
	splitStrings(text, function(arr){
		
		console.log("Entre com os valores:");

		registInput(function(valoresText){

			splitStrings(valoresText, function(valuesArr){
				var count = 0;
				
				arr.forEach(function(coluna){
					console.log(coluna + ": " + valuesArr[count++]);

					if(count - 1 === arr.length - 1){
						if(valuesArr.length < arr.length){
							console.log("alguns valores estão faltando!");
						}
						else if(valuesArr.length > arr.length){
							console.log("algumas colunas estão faltando!");
						}

						printSQL(arr);
					}
				});


			});

		});

	});

});

function done(){
	console.log("fechou");
	process.exit();
}

function splitStrings(text, callback){

	callback( text.split(';') );

}

function printSQL(arr){
	console.log("\n");
	console.log("create table if not exists tabela(");

	arr.forEach(function(a){

		console.log("\t"+a+" varchar(200),");


	});


}


function registInput(callback){

	process.stdin.once('data', function (text) {
	    
	    callback(text);

	    if (text === 'quit\n') {
	      done();
	    }
	});

}