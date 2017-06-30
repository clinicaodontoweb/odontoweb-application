app.controller('ListarCidadeController', ['$scope', 'Restangular', function($scope, Restangular){

	var cidade_api 	= Restangular.all('cidade');
	
	$scope.title	= "Gerenciador de cidades";
	$scope.cidades 	= [];

	cidade_api.getList().then(function(res) {
		$scope.cidades = res;
	});
	
}]);

app.controller('CadastrarCidadeController', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location){

	var cidade_api 	= Restangular.all('cidade');
	var estado_api 	= Restangular.all('estado');
	
	$scope.estados 	= [];

	estado_api.getList().then(function(res) {
		$scope.estados = res;
	});

	$scope.save = function(isValid){
		if(isValid){
			cidade_api.post($scope.cidade).then(function(msg){
				$location.path("/cadastros/cidade");
			});
		}
	};
	
}]);

app.controller('EditarCidadeController', ['$scope', 'Restangular', '$location', '$routeParams', function($scope, Restangular, $location, $routeParams){

	var estado_api 	= Restangular.all('estado');
	
	$scope.estados 	= [];

	estado_api.getList().then(function(res) {
		$scope.estados = res;
	});

	Restangular.one("cidade", $routeParams.id).get().then(function(res){
		$scope.cidade = res;
	});

	$scope.editar = function(isValid){
		if(isValid){
			$scope.cidade.put().then(function(res){
				$location.path("/cadastros/cidade");
			});
		}
	};

}]);