var app	= angular.module("OdontowebApp", ['ngRoute', 'ngResource', 'angular-jwt', 'restangular', 'mwl.calendar']);
function openSideMenu() {
    document.getElementById("side-menu").style.width = "250px";
}

function closeSideMenu() {
    document.getElementById("side-menu").style.width = "0";
}
app.factory('JWTInterceptor', ['$q', '$window', function ($q, $window) {
	 return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Auth-Token'] = $window.sessionStorage.token;
            }
            return config;
        },
     
        response: function (response) {
            return response || $q.when(response);
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        responseError: function(rejection) {
            return $q.reject(rejection);
        }
    };
}]);
app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider)
{
	$routeProvider
		.when('/', {templateUrl: 'partials/agenda/index.html', controller: 'AgendaController'})
		.when('/pacientes', {templateUrl: 'partials/pacientes/index.html', controller: 'PacientesController'})
		.when('/cadastros', {templateUrl: 'partials/cadastros/index.html', controller: 'CadastrosController'})
		.when('/configuracoes', {templateUrl: 'partials/configuracoes/index.html', controller: 'ConfiguracoesController'})
		.when('/login', {templateUrl: 'partials/authentication/login.html', controller: 'AuthenticationController'})
		.when('/cadastros/bairro', {templateUrl: 'partials/cadastros/bairro/list.html', controller: 'ListarBairroController'})
		.when('/cadastros/bairro/novo', {templateUrl: 'partials/cadastros/bairro/new.html', controller: 'CadastrarBairroController'})
		.when('/cadastros/bairro/editar/:id', {templateUrl: 'partials/cadastros/bairro/edit.html', controller: 'EditarBairroController'})
		.when('/cadastros/cep', {templateUrl: 'partials/cadastros/cep/list.html', controller: 'ListarCepController'})
		.when('/cadastros/cep/novo', {templateUrl: 'partials/cadastros/cep/new.html', controller: 'CadastrarCepController'})
		.when('/cadastros/cep/editar/:id', {templateUrl: 'partials/cadastros/cep/edit.html', controller: 'EditarCepController'})
		.when('/cadastros/sigla', {templateUrl: 'partials/cadastros/sigla/list.html', controller: 'ListarSiglaController'})
		.when('/cadastros/sigla/novo', {templateUrl: 'partials/cadastros/sigla/new.html', controller: 'CadastrarSiglaController'})
		.when('/cadastros/sigla/editar/:id', {templateUrl: 'partials/cadastros/sigla/edit.html', controller: 'EditarSiglaController'})
		.when('/cadastros/estado', {templateUrl: 'partials/cadastros/estado/list.html', controller: 'ListarEstadoController'})
		.when('/cadastros/estado/novo', {templateUrl: 'partials/cadastros/estado/new.html', controller: 'CadastrarEstadoController'})
		.when('/cadastros/estado/editar/:id', {templateUrl: 'partials/cadastros/estado/edit.html', controller: 'EditarEstadoController'})
		.when('/cadastros/cidade', {templateUrl: 'partials/cadastros/cidade/list.html', controller: 'ListarCidadeController'})
		.when('/cadastros/cidade/novo', {templateUrl: 'partials/cadastros/cidade/new.html', controller: 'CadastrarCidadeController'})
		.when('/cadastros/cidade/editar/:id', {templateUrl: 'partials/cadastros/cidade/edit.html', controller: 'EditarCidadeController'})
		.when('/cadastros/consulta/tipo', {templateUrl: 'partials/cadastros/consulta/tipo/list.html', controller: 'ListarConsultaTipoController'})
		.when('/cadastros/consulta/tipo/novo', {templateUrl: 'partials/cadastros/consulta/tipo/new.html', controller: 'CadastrarConsultaTipoController'})
		.when('/cadastros/consulta/tipo/editar/:id', {templateUrl: 'partials/cadastros/consulta/tipo/edit.html', controller: 'EditarConsultaTipoController'})
		.otherwise({templateUrl: 'partials/no_page.html'});

	$httpProvider.interceptors.push('JWTInterceptor');
	
}]);
app.run(['$rootScope', '$location', 'AuthorizationService', function($rootScope, $location, AuthorizationService) {
    
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if(!nextRoute.$$route.hasOwnProperty('requireLogin') && !AuthorizationService.isLogged()) {
            $location.path("/login");
        }
    });

    $rootScope.userName = function(){ 
    	return AuthorizationService.getUserName();
    };

    $rootScope.isLogged = function(){ 
    	return AuthorizationService.isLogged();
    };

    $rootScope.showElement = function () {
        return AuthorizationService.isLogged();
    };

    $rootScope.go = function (path) {
        $location.path(path);
    };

}]);

app.controller('AgendaController', ['$scope', function($scope){
	
  moment.locale('pt-br');
  $scope.calendarView = 'month';
	$scope.viewDate = new Date();
	$scope.events = [
      {
        title: 'André',
        startsAt: moment().startOf('day').add(13, 'hours').toDate(),
        endsAt: moment().startOf('day').add(13, 'hours').add(30, 'minutes').toDate(),
      }, {
        title: 'Fernando',
        startsAt: moment().startOf('week').add(7, 'hours').toDate(),
        endsAt: moment().startOf('week').add(7, 'hours').add(30, 'minutes').toDate(),
      }, {
        title: 'Paulo',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(7, 'hours').add(30, 'minutes').toDate(),
      }
    ];
	
}]);
app.factory('AlertService', [ '$rootScope', function($rootScope) {
	
	var alertService = {};
	$rootScope.alerts = [];

	alertService.add = function(type, msg) {
		$rootScope.alerts = [];
		$rootScope.alerts.push({
			'type' : type,
			'msg' : msg
		});
	};
	
	alertService.clear = function() {
		$rootScope.alerts = [];
	};
	
	return alertService;
	
} ]);
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
app.factory('AuthenticationService', ['$resource', function($resource) {
	return $resource('/login', {}, {
        login: { 
        	method: 'POST' 
        }
    })
}]);
app.factory('AuthorizationService', ['$window', 'jwtHelper', function($window, jwtHelper) {
    var auth = {
        isLogged: function(){
        	if($window.sessionStorage.token == undefined){
        		return false;
        	}else{
        		return true;
        	}
        },
        getUserName: function(){ 
        	return ($window.sessionStorage.token != undefined) ? jwtHelper.decodeToken($window.sessionStorage.token).sub : ''; 
        },
        getTenant: function(){ 
            return ($window.sessionStorage.token != undefined) ? jwtHelper.decodeToken($window.sessionStorage.token).tenant : ''; 
        }
    }
 
    return auth;
}]);
app.controller('CadastrosController', ['$scope', function($scope){
	
	$scope.title	= "Gerenciador de Cadastros";
	$scope.subTitle	= "Selecione um tipo de cadastro";

}]);
app.controller('ClinicaController', ['$scope', 'Restangular', 'AuthorizationService', '$rootScope', '$location', '$window', function($scope, Restangular, AuthorizationService, $rootScope, $location, $window){

	function init(){
		if(AuthorizationService.isLogged()){
			Restangular.one('me').get().then(function(usuario) {
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
app.controller('ConfiguracoesController', ['$scope', function($scope){

	$scope.title	= "Página em contrução";

}]);
app.directive('breadcrumb', ['$location', '$window', function ($location, $window) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/breadcrumb.html',
    link: function(scope, element, attrs) {
		scope.paths = _.filter($location.path().split('/'), function(path){ return path != ''; });

		scope.back = function () {
	    	$window.history.back();
		};
    }
  };
}]);
app.directive('menuAtivo', ['$location', function (location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, controller) {
      var path = attrs.href;
      path = path.substring(1);
      scope.location = location;
      scope.$watch('location.path()', function (newPath) {
        if (path.split("/")[1] === newPath.split("/")[1]) {
          $(element).parent().addClass('menu-ativo');
        } else {
          $(element).parent().removeClass('menu-ativo');
        }
      });
    }
  };
}]);
app.controller('PacientesController', ['$scope', function($scope){

	$scope.title	= "Página em contrução";

}]);
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