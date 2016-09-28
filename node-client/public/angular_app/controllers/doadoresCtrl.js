(function(){

	angular
		.module('sisamclient')
		.controller('doadoresCtrl', doadoresCtrl);


	doadoresCtrl.$inject = ['PoliticoService', '$scope', '$routeParams'];
	function doadoresCtrl(PoliticoService, $scope, $routeParams){

		var vm = this;

		vm.cpfCandidato = $routeParams.cpf;
		
		vm.getGraph = function(){
			
			
			PoliticoService.getDoadoresGraph(vm.cpfCandidato)
							.success(function(data){

								console.log("sucesso");
								console.log(data);

							})
							.error(function(data){

								console.log("erro");
								console.log(data);

							});


		};

		

		vm.title = "Doadores";

	}






})();

