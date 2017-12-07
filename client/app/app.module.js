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
        'ngStorage',
        'ngMaterial',
        'ui.utils.masks',
        'idf.br-filters',

        /* modulos */
        'odontoweb.agenda',
        'odontoweb.cadastro',
        'odontoweb.core',
        'odontoweb.login'
    ]);
})();