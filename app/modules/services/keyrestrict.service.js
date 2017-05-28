(function(){
  'use strict';	
  angular
  .module('newPCSApp.services')
  .service('keyRestrictService', keyRestrictService);

  //keyRestrictService.$inject = ['$http'];

  /* @ngInject */
  function keyRestrictService() {

    return {
      keyRestrict: keyRestrict
    };
  }
  
    /************************
    *key Restriction for all the cell
    *************************/
    function keyRestrict(ui, init){
      if(init){
        var $inp = ui.$cell.find("input");
        $inp.on('keypress',function(event){
          var regex = new RegExp(init);
          var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
          if (!regex.test(key)) {
            if(event.which != 8 || event.keyCode != 8){
              event.preventDefault();
              return false;
            }
          }

        });
      }
    }
  })();
