(function() {
  'use strict';
  angular
    .module('newPCSApp.services')
    .service('StatsService', Service);

  Service.$inject = ['$http'];

  /* @ngInject */
  function Service($http) {

    return {
      get: get
    };

    function get(role) {
      // change role to parameter for production
      return $http.get('data/stats-' + role + '.json')
        .then(getComplete)
        .catch(getFailed);
    }

    function getComplete(response) {
      return response.data;
    }

    function getFailed(error) {
      console.error(error);
    }
  }
})();
