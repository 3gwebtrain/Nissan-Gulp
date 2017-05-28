(function() {

  'use strict';
  angular
    .module('newPCSApp.auth')
    .run(runBlock);

  runBlock.$inject = ['$rootScope', '$location', 'AuthService'];

  function runBlock($rootScope, $location, AuthService) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (!next.authenticate) {
        return;
      }

      // authenticate / authoriez role
      if (typeof next.authenticate === 'string') {

        if(AuthService.hasRole(next.authenticate)) { return; }

        event.preventDefault();
        $location.path('/login');
        return;
      }

      if(AuthService.isLoggedIn()) {
        return;
      }

      event.preventDefault();
      $location.path('/login');
    });
  }
})();
