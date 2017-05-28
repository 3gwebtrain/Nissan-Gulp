(function(){
  'use strict';	
  angular
  .module('newPCSApp.services')
  .service('GlobalNavService', GlobalNavService);

  GlobalNavService.$inject = ['$http'];

  /* @ngInject */
  function GlobalNavService($http) {

    var self = this;
    activate();

    return {
      menu: self.menu,
      setPlantCode:setPlantCode,
      getPlantCode:getPlantCode
    };

    function activate() {

      return $http.get('src/data/global-nav.json')
      .then(getMenuComplete)
      .catch(getMenuFailed);

      function getMenuComplete(response) {
        self.menu = response.data;
      }
      function getMenuFailed(error) {
        console.error('XHR Failed for getMenu.' + error.data);
      }
    }
  }
  var pCode = "";
  function setPlantCode(plantCd){
   pCode = plantCd.value;
 }
 function getPlantCode(){
   return {value:pCode};  
 }
})();
