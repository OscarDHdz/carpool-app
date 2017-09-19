(function () {
  'use_strict';

  angular.module('app.carpool')
    .controller('confirmModalController', ['$uibModalInstance', 'item', confirmModalController]);

  function confirmModalController($uibModalInstance, item ) {
    var vm = this;

    vm.item;

    function init() {
      console.log('confirmModalController loaded');
      vm.item = item;
    }


    vm.RemoveItem = function functionName() {
      $uibModalInstance.close(true);
    }

    vm.CloseModal = function () {
      $uibModalInstance.dismiss();
    }


    init();



  }
})();
