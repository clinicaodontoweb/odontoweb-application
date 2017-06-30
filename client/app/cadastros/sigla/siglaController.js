app.controller('ListarSiglaController', ['$scope', 'Restangular', function($scope, Restangular){

	var sigla_api 	= Restangular.all('sigla');
	
	$scope.title	= "Gerenciador de UF";
	$scope.siglas 	= [];

	sigla_api.getList().then(function(res) {
	  $scope.siglas = res;
	});
	
}]);

app.controller('CadastrarSiglaController', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location){

	var sigla_api 	= Restangular.all('sigla');
	
	$scope.save = function(isValid){
		if(isValid){
			sigla_api.post($scope.sigla).then(function(msg){
				$location.path("/cadastros/sigla");
			});
		}
	};
	
}]);

app.controller('EditarSiglaController', ['$scope', 'Restangular', '$location', '$routeParams', function($scope, Restangular, $location, $routeParams){

	Restangular.one("sigla", $routeParams.id).get().then(function(res){
		$scope.sigla = res;
	});

	$scope.editar = function(isValid){
		if(isValid){
			$scope.sigla.put().then(function(res){
				$location.path("/cadastros/sigla");
			});
		}
	};

}]);