(function() {
    'use strict';

    angular
        .module('odontoweb.core')
        .factory('CrudService', crudservice);

    function crudservice() {
        var service = {
            buildRequest: buildRequest
        };

        return service;

        function buildRequest() {
    		return {
                endereco: {
                    endereco: "",
                    pontoReferencia: "",
                    numero: "",
                    complemento: "",
                    cep: {
                        cep: ""
                    },
                    cidade: {
                        nome: "",
                        estado: {
                            nome: "",
                            sigla: {
                                sigla: ""
                            }
                        }
                    },
                    bairro: {
                        nome: ""
                    }
                },
                contato: {
                    email:"",
                    telefones: []
                }
            }
        }
        
    }
})();