(function(){

	angular
		.module('sisamclient')
		.controller('indexCtrl', indexCtrl);


	indexCtrl.$inject = ['PoliticoService', 'barchartService', '$scope'];
	function indexCtrl(PoliticoService, barchartService, $scope){

		var vm = this;

		vm.cpf = "";

		
		vm.politicoSelecionado = function(d){
			console.log("selecionou um politico", d);

			vm.cpf = d.originalObject.cpf_candidato;
			
			PoliticoService.getValorBens(d.originalObject.cpf_candidato)
							.success(function(data){
								console.log("desenhar no svg");
								//var resultArr = data.result.return
								var resultArr = data.return;
								console.log(resultArr);

								barchartService.drawChart(resultArr);
		

							})
							.error(function(data){
								console.log("erro");
								console.log(data);
							});

		};

		/*function load(){



			sisamservice.getTabulado({tabulado: vm.tabulado})
			.success(function(data){
				console.log("sucesso");
				chartservice.drawChart(data.result.getDadosTabuladosReturn, vm.tabulado.vars[0], vm.tabulado.vars[1]);
			})	
			.error(function(data){
				console.log("erro");
				console.log(data);
			});

		}*/


		/*$scope.$on('$viewContentLoaded', function() {
		    load();
		});*/

		vm.title = "OpenBills";

	}






})();

