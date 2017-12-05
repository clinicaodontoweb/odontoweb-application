(function() {
    'use strict';
	
	angular
		.module('odontoweb.core')
		.constant('entidades', Entidades());

    function Entidades() {
    	return {
	        profissional: "profissional",
			evento: "evento",
			usuario: "usuario",
			dentista: "dentista",
			clinica: "clinica",
			recepcinista: "recepcionista",
			agenda: "agenda",
			tiposConsulta: "tipoConsulta",
			paciente: "paciente"
	    }
    }

})();