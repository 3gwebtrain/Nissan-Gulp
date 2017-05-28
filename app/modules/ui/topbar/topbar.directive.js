(function() {
	'use strict';	
	
	
	  angular
	    .module('newPCSApp.ui')
	    .directive('nsTopbar', nsTopbar);
	
	  // usage is <ns-topbar> </ns-topbar>
	
	 nsTopbar.$inject = [];
	
	  function nsTopbar() {
	    var directive = {
	      restrict: 'EA',
	      templateUrl: 'src/components/ui/topbar/topbar.directive.html',
	      scope: {},
	      link: link,
	      controller: nsTopbarController,
	      controllerAs: 'vm',
	      title: 'Login',
	      bindToController: true
	    };
	
	    return directive;
	
	    function link() {}
	  }
	
	  nsTopbarController.$inject = ['$rootScope'];
	
	  function nsTopbarController($rootScope) {
	    /* jshint validthis: true */
	    var vm = this;
	    vm.title = '';
	    vm.nav = false;
	    vm.toggleNav = toggleNav;
	    vm.hideMenu = hideMenu;
	
	    init();
	
	    function init() {
	      $rootScope.$watch('title', function (value) {
	        vm.title = value;
	      });
	
	      $rootScope.$on('$routeChangeSuccess', function () {
	        vm.nav = false;
	      });
	    }
	
	
	
	    function hideMenu() {
	    	alert(222);
	      vm.nav = true;
	    }
	
	    function toggleNav() {
	    	//alert(222);
	      vm.nav = !vm.nav;
	    }
	  }
	
	

})();