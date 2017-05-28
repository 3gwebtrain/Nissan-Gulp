(function(){
	
	'use strict';
	
	
	      angular
	          .module('newPCSApp.ui')
	          .directive('menuList', menuList)
	          .controller('menuController',menuController);
	
	      menuList.$inject = ['$translate','$compile','$templateRequest'];
	      function menuList($compile,$templateRequest){
	          return {
	              restrict : 'E',
	              replace: true,
	                   scope: {},
	                    controller: menuController,
	                    controllerAs: 'vm',
	                    title: 'Lang',
	                    bindToController: true,
	              templateUrl:'src/components/ui/menu/menu_list.html',
	              link : function( scope, element, attributes ){
	                  console.log('dsfs');
	              }
	          }
	      }
	       menuController.$inject = ['$scope','$rootScope','$translate','$http','$location','blockUI'];
	      function menuController($scope,$rootScope,$translate,$http,$location,blockUI){
	          var vm = this;
	          console.log(vm);
	          vm.butnGrp =butnGrp;
	          vm.getMenu = getMenu;
	          getMenu();
	          var temp=1;
	
	          vm.showButn1=true;
	          vm.showButn2=false;
	          vm.showButn3=false;
	
	
	          function butnGrp() {
	              temp++;
	              if(temp >3){
	                  temp=0;
	              }
	              else if(temp===1){
	                  vm.showButn1=true;
	                  vm.showButn2=false;
	                  vm.showButn3=false;
	                  vm.buttName="";
	              }
	              else if(temp ===2){
	                  vm.showButn1=false;
	                  vm.showButn2=true;
	                  vm.showButn3=false;
	                  vm.buttName="C";
	
	              }else if(temp ===3){
	                  vm.showButn1=false;
	                  vm.showButn2=false;
	                  vm.showButn3=true;
	                  vm.buttName="S";
	                  temp=0;
	              }
	          }
	          function getMenu(){
	
	              return $http.get('src/data/global_menu.json')
	                      .then(function (response){
	                  vm.loc = $location.path();
	                  vm.locId = vm.loc.split('/')[1].split('_')[0];
	                  vm.menu = response.data[vm.locId];
	                  blockUI.stop();
	              });
	
	          }
	          $scope.menuNumber=1;
	          $scope.showMenuGroup = function (menuNumber){
	              return true;
	          }
	      }
	
	
	
	
	})();
