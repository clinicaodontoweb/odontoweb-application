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
			tipoConsulta: "tipoConsulta",
			paciente: "paciente",
			convenio: "convenio",
			status: "status",
			redeSocial: "redesocial",
			indicacao: "indicacao"
	    }
    }

})();