app.controller('ListarConsultaTipoController', ['$scope', 'Restangular', function($scope, Restangular){

	var tipo_api 	= Restangular.all('consulta/tipo');
	
	$scope.title	= "Gerenciador de tipos de consulta";
	$scope.tipos 	= [];

	tipo_api.getList().then(function(res) {
		$scope.tipos = res;
	});
	
}]);

app.controller('CadastrarConsultaTipoController', ['$scope', 'Restangular', '$location', function($scope, Restangular, $location){

	var tipo_api 	= Restangular.all('consulta/tipo');

	$scope.save = function(isValid){
		if(isValid){
			tipo_api.post($scope.tipo).then(function(msg){
				$location.path("/cadastros/consulta/tipo");
			});
		}
	};
	
}]);

app.controller('EditarConsultaTipoController', ['$scope', 'Restangular', '$location', '$routeParams', function($scope, Restangular, $location, $routeParams){

	Restangular.one("consulta/tipo", $routeParams.id).get().then(function(res){
		$scope.tipo = res;
	});

	$scope.editar = function(isValid){
		if(isValid){
			$scope.tipo.put().then(function(res){
				$location.path("/cadastros/consulta/tipo");
			});
		}
	};

}]);