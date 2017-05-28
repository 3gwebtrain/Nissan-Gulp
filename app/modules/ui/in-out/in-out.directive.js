(function(){
	
	'use strict';
	
	  angular
	    .module('newPCSApp.ui')
	    .directive('inOut', inOut);
	
	  //plantCode.$inject = [$translate];
	
	  function inOut() {
	    var directive = {
	        restrict: 'E',
	        templateUrl: 'src/components/ui/in-out/in-out.directive.html',
	        scope: {},
	        link: link,
	        controller: inOutController,
	        controllerAs: 'vm',
	        title: 'Lang',
	        bindToController: true
	    };
	
	    return directive;
	      function link() {}
	  }
	  function inOutController(){
	    /* jshint validthis: true */
	    var vm =this;
	    vm.selectInOut = selectInOut;
	   // console.log(vm.plantCd);
	    function selectInOut(selectedInOut){
	        console.log(selectedInOut);
	        vm.inOut = selectedInOut;
	        console.log(vm.inOut);
	    }
	  }
	
})();