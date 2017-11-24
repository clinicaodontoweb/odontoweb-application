(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .filter('captalize', filter);

    function filter() {
        return captalize;

        function captalize(input) {
            return (!!input) ? input.split(' ').map(function(wrd){return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase();}).join(' ') : '';
        }
    }

})();