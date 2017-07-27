//var app	= angular.module("OdontowebApp", ['ngRoute', 'ngResource', 'angular-jwt', 'restangular', 'mwl.calendar', 'ui.bootstrap.modal', 'ui.bootstrap.tpls']);

(function() {
    'use strict';

    angular.module('odontoweb', [
        /* angular */
        'ngRoute',
        'restangular',
        'mwl.calendar',
        'angular-jwt',
        'ui.bootstrap.modal',
        'ui.bootstrap.tpls',

        /* modulos */
        'odontoweb.agenda',
        'odontoweb.cadastro',
        'odontoweb.core',
        'odontoweb.login'
    ]);
})();