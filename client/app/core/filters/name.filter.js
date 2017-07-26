(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .filter('showFirstLetters', filter);

    function filter() {
        return showFirstLetters;

        function showFirstLetters(name) {
            if(name === "")
                return name;

        	var res = "";
        	var nameArray = name.split(" ");
        	nameArray.forEach(function(nome){
    			res += nome.charAt(0);
        	});
            return res.toUpperCase();
        }
    }

})();