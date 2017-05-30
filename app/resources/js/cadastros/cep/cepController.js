app.controller('ListarCepController', ['$scope', 'Restangular', function($scope, Restangular){

	var cep_api 	= Restangular.all('cep');
	
	$scope.title	= "Gerenciador de CEP";
	$scope.ceps 	= [];

	cep_api.getList().then(function(res) {
	  $scope.ceps = res;
	});
	
}]);

app.controller('CadastrarCepController', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location){

	var cep_api 	= Restangular.all('cep');
	
	$scope.save = function(isValid){
		if(isValid){
			cep_api.post($scope.cep).then(function(msg){
				$location.path("/cadastros/cep");
			});
		}
	};
	
}]);

app.controller('EditarCepController', ['$scope', 'Restangular', '$location', '$routeParams', function($scope, Restangular, $location, $routeParams){

	Restangular.one("cep", $routeParams.id).get().then(function(res){
		$scope.cep = res;
	});

	$scope.editar = function(isValid){
		if(isValid){
			$scope.cep.put().then(function(res){
				$location.path("/cadastros/cep");
			});
		}
	};

}]);