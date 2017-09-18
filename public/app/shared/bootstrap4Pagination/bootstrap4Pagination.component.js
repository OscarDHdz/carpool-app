(function () {
  'use_strict';

  var bootstrapPaginationController = function () {

    var vm = this;
    vm.pagination;


    vm.getPages = function(  ) {
      if ( vm.pagination )  {
        return new Array( Math.round( vm.pagination.items.length / vm.pagination.pageItems + .5 ) );
      }
      else return [];
    }
    vm.getActivePageClass = function ( index, currentPage ) {
      if ( index + 1 === currentPage)   return 'active';
      return '';
    }


    function init( ) {

      console.log('bootstrapPaginationController loaded');


    }

    init();

  }

  angular.module('app')
  .component('paginationComponent', {
    templateUrl: 'app/shared/bootstrap4Pagination/bootstrap4Pagination.html',
    bindings: {
      pagination: '='
    },
    controller: bootstrapPaginationController,
    controllerAs: 'vm'


  });




})();
