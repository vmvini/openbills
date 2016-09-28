(function(){

	angular.module('sisamclient', ['ngRoute', 'ui.multiselect', 'angucomplete-alt'])
		.config(['$routeProvider', config]);


	function config($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl:'angular_app/views/index.html',
				controller:'indexCtrl',
				controllerAs:'vm'
			})
			.when('/doadores/:cpf', {
				templateUrl:'angular_app/views/doadores.html',
				controller:'doadoresCtrl', 
				controllerAs:'vm'
			})
			.otherwise({redirectTo:'/'});
	}

})();