(function(){

	require('./neo4j-importer/ReadDataFromMongo');

	/*
	var fs = require('fs');

	var dataSourceObjectCollection = new DSObjectCollection();

	var lineReader = require('readline').createInterface({
		input: fs.createReadStream('./datasource.txt')
	});

	lineReader.on('line', function (line) {
		var row = line.trim();
		if(isURL(row)){
			//é url do recurso
			dataSourceObjectCollection.addLink(row);

		}
		else if( !isEmpty(row) && hasChar("(", row) ){
			//é conjunto de arquivos válidos
			dataSourceObjectCollection.setAllowedFiles(row);
		}
		else if( !isEmpty(row) ){
			//row é o nome de tabela
			
			//adicionardataSourceObjectCollection novo DataSourceObject 
			dataSourceObjectCollection.new(row);

		}
	});

	lineReader.on('close', function(){

			require('./downloader')( dataSourceObjectCollection.getList() );

	});


	function DataSourceObject(tableName){

		this.tableName = tableName;
		
		this.allowedFiles;
		
		this.fileObjects = [];
	}

	function FileObject(){
		this.link;
		this.cache;
		this.downloadPath;
		this.unzipPath;
		this.fileName;

	}

	function DSObjectCollection(){
		var list = [];
		var corrent;
		var correntFileObject;

		this.new = function(tableName){
			corrent = new DataSourceObject(tableName);
			list.push(corrent);
		};

		this.addLink = function(link){

			correntFileObject = new FileObject();
			correntFileObject.link = link;
 			correntFileObject.fileName = getFileName(link);
 			correntFileObject.downloadPath = "./cache/" + correntFileObject.fileName;
 			correntFileObject.unzipPath = "./downloads/" + corrent.tableName + "/";

 			if( fs.existsSync( correntFileObject.downloadPath ) ){
				correntFileObject.cache = correntFileObject.downloadPath;
			}
			else{
				correntFileObject.cache = undefined;
			}

			corrent.fileObjects.push(correntFileObject);

		};

		this.setAllowedFiles = function(row){
			corrent.allowedFiles = getAllowedFilesArray(row);
		};

		this.getList = function(){
			return list;
		};

		function getAllowedFilesArray(row){

			var filesStr = removeChar("(",  removeChar( ")", row ) );
			var filesArr = filesStr.split(";");
			return filesArr;

		}

	}

	function getFileName(url){
		return url.substring(url.lastIndexOf('/')+1);
	}

	function removeChar(char, str){
		return str.replace(char, '');
	}

	function isURL(str) {
	  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	  return pattern.test(str);
	}

	function isEmpty(str){
		return (str.length === 0 || !str.trim());
	}

	function hasChar(char, str){
		if( str.indexOf(char) === -1 ){
			return false;
		}
		return true;
					
	}


*/
})();
