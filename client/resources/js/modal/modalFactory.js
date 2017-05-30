app.factory('alert', ['$uibModal', function($uibModal) {

    function show(event) {
      return $uibModal.open({
        templateUrl: 'partials/modal/modalContent.html',
        controller: function() {
          var vm = this;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };

  }]);