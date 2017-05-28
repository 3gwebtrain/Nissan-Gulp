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
	            //scope: {btnVal:'='},
	            controller: menuController,
	            controllerAs: 'vm',
	            bindToController: true,
	            templateUrl:'src/components/ui/menu-list/menu-list.directive.html',
	            link: function(scope, elem, attrs) {
	                elem.bind('click', function(event) {
	                    scope.$apply(function() {
	                        scope.mnuClick(event.target.id);
	//                        console.log(event.target.id);
	                    });
	                });
	            }
	        }
	    }
	     menuController.$inject = ['$scope','$rootScope','$translate','$http','$location','blockUI'];
	    function menuController($scope,$rootScope,$translate,$http,$location,blockUI){
	        var vm = this;
	       // console.log(vm);       
	        vm.getMenu = getMenu;
	        getMenu();
	        var temp=1;
	
	        vm.showButn1=true;
	        vm.showButn2=false;
	        vm.showButn3=false;
	       //console.log(vm.butevn);
	
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
	        
	        $scope.mnuClick = function(elementId){
	           // console.log(elementId);
	            $rootScope.$broadcast('mnuClick',{elementId: elementId,menuId:vm.menu});
	        }
	    }
	
})();