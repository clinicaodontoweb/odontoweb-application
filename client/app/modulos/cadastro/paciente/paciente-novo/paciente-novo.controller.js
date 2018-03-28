(function() {
    'use strict';

    angular
        .module('odontoweb.cadastro')
        .controller('PacienteNovoController', PacienteNovoController);

    PacienteNovoController.$inject = ['CrudService', 'pacienteNovoData', 'PacienteService', 'entidades', '$scope', '$location'];

    function PacienteNovoController(CrudService, pacienteNovoData, PacienteService, entidades, $scope, $location) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.request = {};
        vm.adicionarTelefone = adicionarTelefone;
        vm.removerTelefone = removerTelefone;
        vm.adicionarRedeSocial = adicionarRedeSocial;
        vm.removerRedeSocial = removerRedeSocial;
        vm.redesSociais = pacienteNovoData.redesSociais;
        vm.indicacoes = pacienteNovoData.indicacoes;

        activate();
        
        function activate() {
            vm.request = CrudService.buildRequest();
            vm.request.redesSociaisPaciente = [];
        }

        function cadastrar(isValid) {
            if(isValid) {
                PacienteService.salvar(vm.request)
                    .then(function(dados) {
                        toastr.success(vm.request.nome, 'Paciente cadastrado com sucesso!');
                        $location.path("/cadastro/paciente");
                    },function(error) {
                        toastr.error(error.data.mensagem, 'Erro ao cadastrar!');
                    });
            }
        }

        function adicionarTelefone() {
            vm.request.contato.telefones.push(vm.telefone);
            vm.telefone = {};
        }

        function removerTelefone(index) {
            vm.request.contato.telefones.splice(index, 1);
        }

        function adicionarRedeSocial() {
            vm.request.redesSociaisPaciente.push(vm.redeSocialPacienteRequest);
            vm.redeSocialPacienteRequest = {};
        }

        function removerRedeSocial(index) {
            vm.request.redesSociaisPaciente.splice(index, 1);
        }
    }
})();