(function(){

	angular
		.module('sisamclient')
		.service('PoliticoService', politicoService);

	politicoService.$inject = ['$http'];
	function politicoService($http){

		var getPoliticos = function(){
			return $http.get('/api/politicos');
		};

		var getValorBens = function(cpf){

			return $http.post('/api/valorBens', {cpf:cpf});
		};

		var getDoadoresGraph = function(cpfCandidato){
			return $http.post('/api/doadores', {cpf:cpfCandidato});
		}

		return {
			getPoliticos: getPoliticos,
			getValorBens: getValorBens,
			getDoadoresGraph: getDoadoresGraph

		};

	}

})();