(function() {
    'use strict';
	
	angular
		.module('odontoweb.core')
		.config(config);

	config.$inject = ['$routeProvider', '$httpProvider', 'RestangularProvider', 'calendarConfig'];

	function config($routeProvider, $httpProvider, RestangularProvider, calendarConfig) {

		//calendar config
		calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
		calendarConfig.dateFormatter = 'moment';
		calendarConfig.showTimesOnWeekView = true;
		calendarConfig.i18nStrings.weekNumber = 'Semana {week}';

		//base url api
		RestangularProvider.setBaseUrl('/api/v1');

		//token interceptor
		$httpProvider.interceptors.push('TokenInterceptor');

		//routes
	 	$routeProvider
			.when('/', {
				redirectTo: '/agenda'
			})
			.otherwise({
				templateUrl: '404.html'
			});
		
	}

})();