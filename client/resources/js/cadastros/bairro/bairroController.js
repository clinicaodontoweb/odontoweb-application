app.controller('ListarBairroController', ['$scope', 'Restangular', function($scope, Restangular){

	var bairro_api 	= Restangular.all('bairro');
	
	$scope.title	= "Gerenciador de Bairros";
	$scope.bairros 	= [];

	bairro_api.getList().then(function(bairros) {
	  $scope.bairros = bairros;
	});
	
}]);

app.controller('CadastrarBairroController', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location){

	var bairro_api 	= Restangular.all('bairro');
	
	$scope.save = function(isValid){
		if(isValid){
			bairro_api.post($scope.bairro).then(function(msg){
				$location.path("/cadastros/bairro");
			});
		}
	};
	
}]);

app.controller('EditarBairroController', ['$scope', 'Restangular', '$location', '$routeParams', function($scope, Restangular, $location, $routeParams){

	Restangular.one("bairro", $routeParams.id).get().then(function(res){
		$scope.bairro = res;
	});

	$scope.editar = function(isValid){
		if(isValid){
			$scope.bairro.put().then(function(res){
				$location.path("/cadastros/bairro");
			});
		}
	};

}]);