(function() {
  'use strict';
  angular
  .module('newPCSApp.services')
  .service('AuthService', AuthService);

  AuthService.$inject = ['UserService'];

  /* @ngInject */
  function AuthService(UserService) {
    var currentUser = {};

    this.mockupLogin = mockupLogin;

    this.getCurrentUser = getCurrentUser;
    this.isLoggedIn = isLoggedIn;
    this.hasRole = hasRole;

    // User login for mockup
    function mockupLogin(id) {
      currentUser = UserService.getMockupUser(id);
    }

    function getCurrentUser() {
      return currentUser;
    }

    function isLoggedIn() {
      return !!currentUser.id;
    }

    function hasRole(role) {
      return currentUser.role === role;
    }
  }

})();
