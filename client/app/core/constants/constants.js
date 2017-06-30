(function() {
    'use strict';
	
	angular
		.module('OdontowebApp')
		.constant('entidades', Entidades());

    function Entidades() {
    	return {
	        profissional: "profissional",
        	evento: "evento"
	    }
    }

})();