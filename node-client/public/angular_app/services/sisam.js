(function(){

	angular
		.module('sisamclient')
		.service('sisamservice', sisamservice);

	sisamservice.$inject = ['$http'];
	function sisamservice($http){

		var getAnos = function(){
			return $http.get('/api/anos');
		};

		var getMeses = function(){
			return $http.get('/api/meses');
		};

		var getCidades = function(data){	
			return $http.post('/api/cidades', data);
		};

		var getEstados = function(){
			return $http.get('/api/estados');
		};

		var getVardetails = function(){
			return $http.get('/api/vardetails');
		};

		var getVariaveis = function(){
			return $http.get('/api/variaveis');
		};
		
		var getTabulado = function(data){		
			return $http.post('/api/tabulado', data);
		};	

		return {
			getAnos: getAnos,
			getMeses:getMeses,
			getEstados: getEstados,
			getTabulado: getTabulado,
			getVariaveis: getVariaveis,
			getVardetails: getVardetails,
			getCidades: getCidades

		};

	}

})();