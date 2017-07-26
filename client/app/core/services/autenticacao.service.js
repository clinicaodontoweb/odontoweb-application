(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .factory('AutenticacaoService', AutenticacaoService);

    AutenticacaoService.$inject = ['Restangular', '$window', 'jwtHelper'];

    function AutenticacaoService(Restangular, $window, jwtHelper) {
        //base
        var auth = Restangular.all('auth');

        //service
        var service = {
            login: login,
            me: me,
            isLogged: isLogged,
            getUserNameFromToken: getUserNameFromToken,
            getTenantFromToken: getTenantFromToken,
            changeTenant: changeTenant,
            updateToken: updateToken,
            deleteToken: deleteToken,
            saveToken: saveToken
        };

        return service;

        function login(user) {
    		return auth.post(user);
        }

        function me() {
    		return auth.one('me').get();
        }

        function isLogged() {
            return ($window.sessionStorage.token == undefined) ? false : true;
        }
        
        function getUserNameFromToken() { 
            return ($window.sessionStorage.token != undefined) ? jwtHelper.decodeToken($window.sessionStorage.token).sub : ''; 
        }
        
        function getTenantFromToken() { 
            return ($window.sessionStorage.token != undefined) ? jwtHelper.decodeToken($window.sessionStorage.token).tenant : '';
        }

        function changeTenant(idClinica) {
            return auth.one('tenant').one('update', idClinica).get();
        }

        function updateToken(token) {
            if(token){
                $window.sessionStorage.token = token;
            }
        }

        function deleteToken() {
            delete $window.sessionStorage.token;
        }

        function saveToken(token) {
            if(token){
                $window.sessionStorage.token = token;
            }
        }
    }

})();