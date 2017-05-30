app.controller('AuthenticationController', ['$scope', '$window', '$location', 'AuthenticationService', 'AuthorizationService', '$rootScope', function($scope, $window, $location, AuthenticationService, AuthorizationService, $rootScope){
	
	$scope.title	= "Acesso ao Sistema";
	$scope.subTitle	= "Preencha os dados de seu login para acessar o sistema.";

	$scope.user = {};
	$scope.erro = false;
	
	$scope.login = function() {
		if ($scope.user.email !== undefined && $scope.user.senha !== undefined) {
			AuthenticationService.login($scope.user, function(data) {
				$window.sessionStorage.token = data.token;
				$rootScope.$broadcast('loginEvent');
				$location.path("/");
			},function(status, data) {
				$scope.erro = true;
			});
		}
    }

    $scope.logout = function() {
        if (AuthorizationService.isLogged()) {
            delete $window.sessionStorage.token;
            $scope.user = {};
            $location.path("/login");
        }
    }

}]);