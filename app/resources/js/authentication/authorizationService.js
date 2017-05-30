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