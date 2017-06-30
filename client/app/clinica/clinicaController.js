app.controller('ClinicaController', ['$scope', 'Restangular', 'AuthorizationService', '$rootScope', '$location', '$window', function($scope, Restangular, AuthorizationService, $rootScope, $location, $window){

	function init(){
		if(AuthorizationService.isLogged()){
			Restangular.one('auth/me').get().then(function(usuario) {
				$scope.me = usuario;
				var tenant = AuthorizationService.getTenant();
				for(var i in usuario.clinicas){
					if(usuario.clinicas[i].cnpj == tenant){
						$scope.clinicaSelected = usuario.clinicas[i]; 
					}
				}
			});
		}
	}

	init();

	$rootScope.$on('loginEvent', function(){console.log("event"); init()});

	$scope.changeTenant = function(){
		Restangular.one('change/tenant/' + $scope.clinicaSelected.id).get().then(function(data) {
			$window.sessionStorage.token = data.token;
			$rootScope.$broadcast('loginEvent');
			$location.path("/");
		});
	}
	
}]);