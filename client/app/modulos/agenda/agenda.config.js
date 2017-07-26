(function() {
    'use strict';
	
	angular
		.module('odontoweb.agenda')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {

		//routes
	 	$routeProvider
			.when('/agenda', {
                templateUrl: 'partials/agenda/agenda.view.html', 
                controller: 'AgendaController', 
                controllerAs: 'vm'
            });
			
	}

})();