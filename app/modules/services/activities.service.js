(function() {
  'use strict';
  angular
  .module('newPCSApp.services')
  .service('ActivitiesService', ActivitiesService);

  ActivitiesService.$inject = ['$http'];

  /* @ngInject */
  function ActivitiesService($http) {

    return {
      get: get
    };

    function get() {
      return $http.get('data/activities.json')
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
