(function() {
    'use strict';
	
	var core = angular.module('odontoweb.core')
		
	core.config(calendarConfig);
	core.config(restConfig);
	core.config(httpConfig);
	core.config(storageConfig);	
	core.config(routerConfig);	
	core.config(toastrConfig);	

	calendarConfig.$inject = ['calendarConfig'];

	function calendarConfig(calendarConfig) {
		calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
		calendarConfig.dateFormatter = 'moment';
		calendarConfig.showTimesOnWeekView = true;
		calendarConfig.i18nStrings.weekNumber = 'Semana {week}';
	}

	restConfig.$inject = ['RestangularProvider'];

	function restConfig(RestangularProvider) {
		//base url api
		RestangularProvider.setBaseUrl('/api/v1');
	}

	httpConfig.$inject = ['$httpProvider'];

	function httpConfig($httpProvider) {
		//token interceptor
		$httpProvider.interceptors.push('TokenInterceptor');
	}

	storageConfig.$inject = ['$localStorageProvider'];

	function storageConfig($localStorageProvider) {
		//storage prefix
		$localStorageProvider.setKeyPrefix('ow-');
	}

	routerConfig.$inject = ['$routeProvider'];

	function routerConfig($routeProvider) {
		//routes
	 	$routeProvider
			.when('/', {
				redirectTo: '/agenda'
			})
			.when('/negado', {
				templateUrl: 'acesso_negado.html'
			})
			.otherwise({
				templateUrl: '404.html'
			});
	}

	function toastrConfig() {
		//toastr
		toastr.options.positionClass = 'toast-top-right';
		toastr.options.progressBar = true;
		toastr.options.hideMethod = 'slideUp';
		toastr.options.closeMethod = 'slideUp';
	}

})();