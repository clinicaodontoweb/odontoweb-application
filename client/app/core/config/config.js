(function() {
    'use strict';
	
	var core = angular.module('odontoweb.core')
		
	core.config(calendarConfig);
	core.config(restConfig);
	core.config(httpConfig);
	core.config(storageConfig);	
	core.config(routerConfig);	
	core.config(toastrConfig);
	//core.config(materialConfig);

	calendarConfig.$inject = ['calendarConfig'];

	function calendarConfig(calendarConfig) {
		calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
		calendarConfig.allDateFormats.moment.title.week = 'Semana {week} de {year}'
		calendarConfig.dateFormatter = 'moment';
		calendarConfig.showTimesOnWeekView = true;
		calendarConfig.i18nStrings.weekNumber = 'Semana {week}';
		calendarConfig.templates.calendarDayView = 'partials/core/calendar/calendarDayView.html';
		calendarConfig.templates.calendarWeekView = 'partials/core/calendar/calendarWeekView.html';
		calendarConfig.templates.calendarHourList = 'partials/core/calendar/calendarHourList.html';
	}

	restConfig.$inject = ['RestangularProvider'];

	function restConfig(RestangularProvider) {
		//base url api
		RestangularProvider.setBaseUrl('/api/v1');
		RestangularProvider.setRequestInterceptor(function(elem, operation) {
			if (operation === "remove") {
			   return undefined;
			} 
			return elem;
		});
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
		toastr.options.positionClass = 'toast-bottom-right';
		toastr.options.progressBar = true;
		toastr.options.hideMethod = 'slideUp';
		toastr.options.closeMethod = 'slideUp';
		toastr.options.closeButton = true;
		toastr.options.closeMethod = 'fadeOut';
		toastr.options.closeDuration = 300;
		toastr.options.closeEasing = 'swing';
		toastr.options.preventDuplicates = true;
	}

	materialConfig.$inject = ['$mdThemingProvider'];

	function materialConfig($mdThemingProvider) {

		$mdThemingProvider.definePallete('odontowebTheme', {
			'50': '42f492'
		});
		$mdThemingProvider.theme('default').primaryPalette('odontowebTheme');
	}

})();