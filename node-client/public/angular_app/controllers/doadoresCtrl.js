(function(){

	angular
		.module('sisamclient')
		.controller('doadoresCtrl', doadoresCtrl);


	doadoresCtrl.$inject = ['PoliticoService', '$scope', '$routeParams', 'graphService'];
	function doadoresCtrl(PoliticoService, $scope, $routeParams, graphService){

		var vm = this;

		vm.cpfCandidato = $routeParams.cpf;


		
		vm.getGraph = function(){
			
			PoliticoService
			.getDoadoresGraph(vm.cpfCandidato)
			.success(function(data){

				console.log("sucesso");
				
				graphService.drawGraph(data);

			})
			.error(function(data){

				console.log("erro");
				console.log(data);

			});


		};

		vm.getGraph();

		

		vm.title = "Doadores";

	}






})();

