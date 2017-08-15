(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .factory('AutenticacaoService', AutenticacaoService);

    AutenticacaoService.$inject = ['Restangular', '$localStorage', 'jwtHelper'];

    function AutenticacaoService(Restangular, $localStorage, jwtHelper) {
        //base
        var auth = Restangular.all('auth');

        //service
        var service = {
            login: login,
            me: me,
            isLogged: isLogged,
            getTenantFromToken: getTenantFromToken,
            changeTenant: changeTenant,
            clearStorage: clearStorage,
            getCurrentUser: getCurrentUser,
            getCurrentTenant: getCurrentTenant,
            saveToken: saveToken,
            saveCurrentTenant: saveCurrentTenant,
            saveCurrentUser: saveCurrentUser
        };

        return service;

        function login(user) {
    		return auth.post(user);
        }

        function me() {
    		return auth.one('me').get();
        }

        function isLogged() {
            return ($localStorage.token == undefined) ? false : true;
        }
        
        function getTenantFromToken() { 
            return ($localStorage.token != undefined) ? jwtHelper.decodeToken($localStorage.token).tenant : '';
        }

        function getCurrentUser() { 
            return ($localStorage.currentUser != undefined) ? $localStorage.currentUser : null;
        }
        
        function getCurrentTenant() { 
            return ($localStorage.currentTenant != undefined) ? $localStorage.currentTenant : null;
        }

        function changeTenant(idClinica) {
            return auth.one('tenant').one('update', idClinica).get();
        }

        function saveToken(value) {
            if(value){
                $localStorage.token = value;
            }
        }

        function saveCurrentUser(value) {
            if(value){
                $localStorage.currentUser = value;
            }
        }

        function saveCurrentTenant(value) {
            if(value){
                $localStorage.currentTenant = value;
            }
        }

        function clearStorage() {
            $localStorage.$reset();
        }
    }

})();