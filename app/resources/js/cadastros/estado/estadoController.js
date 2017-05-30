app.controller('ListarEstadoController', ['$scope', 'Restangular', function($scope, Restangular){

	var estado_api 	= Restangular.all('estado');
	
	$scope.title	= "Gerenciador de Estados";
	$scope.estados 	= [];

	estado_api.getList().then(function(res) {
		$scope.estados = res;
	});
	
}]);

app.controller('CadastrarEstadoController', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location){

	var estado_api 	= Restangular.all('estado');
	var sigla_api 	= Restangular.all('sigla');

	$scope.siglas 	= [];

	sigla_api.getList().then(function(res) {
		$scope.siglas = res;
	});
	
	$scope.save = function(isValid){
		if(isValid){
			estado_api.post($scope.estado).then(function(msg){
				$location.path("/cadastros/estado");
			});
		}
	};
	
}]);

app.controller('EditarEstadoController', ['$scope', 'Restangular', '$location', '$routeParams', function($scope, Restangular, $location, $routeParams){

	var sigla_api 	= Restangular.all('sigla');

	$scope.siglas 	= [];

	sigla_api.getList().then(function(res) {
		$scope.siglas = res;
	});

	Restangular.one("estado", $routeParams.id).get().then(function(res){
		$scope.estado = res;
	});

	$scope.editar = function(isValid){
		if(isValid){
			$scope.estado.put().then(function(res){
				$location.path("/cadastros/estado");
			});
		}
	};

}]);