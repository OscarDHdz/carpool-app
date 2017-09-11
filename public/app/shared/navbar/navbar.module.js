(function () {
  'use_strict';

  angular.module('app.navbar', [])
  .directive("appNavbar", function() {
    return {
        templateUrl: 'app/shared/navbar/navbar.html'
    };
});

})();
