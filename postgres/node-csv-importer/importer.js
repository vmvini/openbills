//node-csv-importer
var fs = require('fs');
var pg = require('pg');
var Client = pg.Client;
var copyFrom = require('pg-copy-streams').from;

var client = new Client({user: 'postgres', database: 'eleicoes'});

client.connect(function(err, client, done) {
  
  if(err){
  	console.log("connection error", err);
  	return;
  }
  if(!client){
  	console.log("no client given");
  	return;
  }

  importFiles('/var/dados/candidatos/', 'consulta_cand', client, copyFrom, done, function(){

  	importFiles('/var/dados/bens_candidatos/', 'BEM_CANDIDATO', client, copyFrom, done)

  });

  //var stream = client.query(copyFrom('COPY my_table FROM STDIN'));
  //var fileStream = fs.createReadStream('some_file.tsv')
  //fileStream.on('error', done);
  //fileStream.pipe(stream).on('finish', done).on('error', done);


});


function importFiles(dir, tableName, client, copyFrom, done,  next){
	var files = walkSync(dir);
	
	var remaining = files.length;

	var busy = false;
	var queue = [];

	function CopyRequest(f){
		this.exec = function(){
			
			var stream = client.query(copyFrom('COPY '+tableName+' FROM STDIN ' + "WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'" )  );
			
			var fileStream = fs.createReadStream(f);
			fileStream.on('error', error);
			fileStream.pipe(stream).on('finish', complete).on('error', error);
			busy = true;
			
			function error(e){
				console.log("error on importing file " + f + " to table " + tableName);
				console.log(e.where);
				busy = false;
				remaining--;
				queue.pop().exec();
			}

			function complete(){
				console.log("success on importing file " + f + " to table " + tableName);
				remaining--;
				busy = false;
				if(queue.length === 0){
					console.log("fila tem 0 arquivos!");
					
					if(remaining === 0){
						console.log("importando proximo lote de arquivos");
						if(next){
							next();
						}
					}
					
				}
				else{
					queue.pop().exec();
				}
			}
		};
	}

	files.forEach(function(f){
		
		if(!validate(f)){
			remaining--;
			return;
		}
		
		var copyReq = new CopyRequest(f);
		if(!busy){
			copyReq.exec();
		}
		else{
			queue.push(copyReq);
		}

	});


	function validate(f){
		if( f.indexOf(".pdf") !== -1 )
			return false;
		if( f.indexOf("leio") !== -1 )
			return false;
		if( f.indexOf("leia") !== -1 )
			return false;
		if( f.indexOf("layout") !== -1 )
			return false;
		if( f.indexOf(".zip") !== -1 )
			return false;
		
		return true;
	}

}


/*var list = walkSync('/home/vmvini/Dropbox/ADS/SEXTO_PERIODO/POS/projetos/projeto1/dados/');
list.forEach(function(l){
	console.log(l);
});*/


function walkSync(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
		filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(dir+file);
    }
  });
  return filelist;
};

/*

#IMPORTÃÇÃO DE CONSULTA_CAND

\COPY consulta_cand FROM '/var/dados/candidatos/2002/consulta_cand_2002_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY consulta_cand FROM '/var/dados/candidatos/2004/consulta_cand_2004_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY consulta_cand FROM '/var/dados/candidatos/2006/consulta_cand_2006_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY consulta_cand FROM '/var/dados/candidatos/2008/consulta_cand_2008_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY consulta_cand FROM '/var/dados/candidatos/2010/consulta_cand_2010_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY consulta_cand FROM '/var/dados/candidatos/2012/consulta_cand_2012_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'


#IMPORTAÇÃO DE BEM_CANDIDATO
\COPY BEM_CANDIDATO FROM '/var/dados/bens_candidatos/2006/bem_candidato_2006_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY BEM_CANDIDATO FROM '/var/dados/bens_candidatos/2008/bem_candidato_2008_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY BEM_CANDIDATO FROM '/var/dados/bens_candidatos/2010/bem_candidato_2010_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY BEM_CANDIDATO FROM '/var/dados/bens_candidatos/2012/bem_candidato_2012_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'
\COPY BEM_CANDIDATO FROM '/var/dados/bens_candidatos/2014/bem_candidato_2014_AC.txt' WITH DELIMITER ';' CSV HEADER ENCODING 'ISO 8859-1'



*/