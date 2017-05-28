(function(){
	
	'use strict';
	
	  angular
	    .module('newPCSApp.ui')
	    .directive('configSearchCriteria', configSearchCriteria);
	
	  // usage is <ns-global-nav></ns-global-nav>
	  function configSearchCriteria() {
	    var directive = {
	        restrict: 'EA',
	        templateUrl: 'src/components/ui/config-search/config-srch-criteria.directive.html',
	        scope: {
	          listVal: '=',
	          screenId: '=',
	          homeEnabled : '=',
	          saveCriteriaEnabled : "="
	        },
	        link: link,
	        controller: configSearchCriteriaController,
	        controllerAs: 'vm',
	        bindToController: true
	    };
	
	    return directive;
	
	    function link(scope, element, attrs, modelCtrl) {
	      //console.log(attrs.configSearchCriteria);
	      //scope.inputValue=attrs.configSearchCriteria;
	      //console.log(attrs);
	      //console.log(scope.vm.searchCriteriaVals);
	      //console.log(scope.vm.listVal);
	       /*scope.$watch('vm.listVal', function (value) {
	         console.log(value);
	       })*/
	    }
	  }
	
	  configSearchCriteria.$inject = ['$rootScope','$translate','atomicNotifyService'];
	
	  function configSearchCriteriaController($rootScope,$translate,atomicNotifyService) {
	    /* jshint validthis: true */
	
	   // console.log(scope.inputValue);
	  var vm = this;
	  //console.log(vm.screenId);
	  //console.log(vm);
	  //console.log(vm.saveCriteriaEnabled);
	    vm.updateSrchCriteria=updateSrchCriteria;
	    vm.backToHome = backToHome;
	    vm.saveAutoSearch=saveAutoSearch;
	    vm.hideDetail= hideDetail;
	
	    $translate.use(localStorage.getItem("selectedLanguage"));
	
	    activate();
	
	    function activate(){
	      var searchCrit= "autoSearchEnabled"+vm.screenId;
	      vm.saveSrch={};
	      vm.autoSearch=JSON.parse(localStorage.getItem(searchCrit));
	      //console.log(vm.autoSearch);
	    }
	
	
	    /**
	     * Auto Search - Radio button changes
	     */
	    vm.setSelection =function(q, c) {
	        angular.forEach(q, function (c) {
	            c.active = false;
	        });
	
	       c.active = true;
	    };
	  /**
	    * Save - Search Criteria - During Update
	   */
	  function updateSrchCriteria(){
	      var searchCrit= "searchCriteria"+vm.screenId;
	      localStorage.setItem(searchCrit, JSON.stringify(vm.listVal));
	      atomicNotifyService.success("Successfully Saved!!.", 4000);
	  }
	
	  /**
	    * Page Navigation to Home
	   */
	  function backToHome(){
	    vm.homeEnabled=true;
	    vm.savecriteriaEnabled=false;
	  }
	
	  /**
	    * Auto Search - Save
	   */
	    function saveAutoSearch(){
	      //console.log(vm.autoSearch);
	      var autoSrch= "autoSearchEnabled"+vm.screenId;
	      localStorage.setItem(autoSrch, JSON.stringify(vm.autoSearch));
	
	    }
	
	    function hideDetail(){
	
	      vm.active =false;
	      vm.saveCriteriaEnabled=false;
	
	    }
	
	
	
	  }
	
})();