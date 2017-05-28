(function(){
	
'use strict';       
       
        angular
          .module('newPCSApp.services')
          .service('sharedService',sharedService);
    sharedService.$inject = ['$http','$location'];

   function sharedService($http,$location){
       var sharedItems="";
       var menuItems = {};
       var partNumber={};
       
       return{
           getSharedItems:function(){
                return sharedItems;
           },
           
           setSharedItems:function(value){
                sharedItems=value;
               console.log(sharedItems);
               
           },
           
            getMenuItems:function(){
                return menuItems;
           },
           
           setMenuItems:function(screenId){
            $http.get('src/data/global_menu.json')
                .then(function (response){
                    menuItems = response.data[screenId];
                console.log(menuItems);
                });
            },
           
           setTransferItem:function(pnumb){
              
               partNumber=pnumb;
              
               
           },
           
           getTransferItem:function(){
               
                return partNumber;
               
           }
           
        
    }
   }

})();