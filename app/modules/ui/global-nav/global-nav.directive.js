(function(){
	
	'use strict';
	
	  angular
	    .module('newPCSApp.ui')
	    .directive('nsGlobalNav', nsGlobalNav);
	
	  // usage is <ns-global-nav></ns-global-nav>
	  function nsGlobalNav() {
	    var directive = {
	        restrict: 'EA',
	        templateUrl: 'src/components/ui/global-nav/global-nav.directive.html',
	        scope: {
	          toggle: '='
	        },
	        link: link,
	        controller: nsGlobalNavController,
	        controllerAs: 'vm',
	        bindToController: true
	    };
	
	    return directive;
	
	    function link(scope) {
	      scope.$watch('vm.toggle', function (value) {
	
	    	 // alert(value);
	
	        if (value) {
	          $('body').addClass('noscroll');
	        }
	        else {
	          $('body').removeClass('noscroll');
	        }
	      });
	    }
	  }
	
	  nsGlobalNavController.$inject = ['$rootScope', 'GlobalNavService', '$translate'];
	
	  function nsGlobalNavController($rootScope, GlobalNavService, $translate) {
	    /* jshint validthis: true */
	    var vm = this;
	    vm.plantCodes =[{name:"NMT-PV-6",value:"6"},{name:"NMT-PT-7",value:"7"}];
	    vm.title = $rootScope.title;
	    vm.off = off;
	    vm.menu = GlobalNavService.menu;
	    vm.changeMenuUpDwnIcon = changeMenuUpDwnIcon;
		
		vm.savePlantCode=savePlantCode;
		vm.plantSelection=plantSelection;
	
	    $translate.use(localStorage.getItem("selectedLanguage"));
	
	    activate();
	
	    function activate() {
	      $rootScope.$on('$routeChangeStart', off);
	      
	      if((localStorage.getItem("PltCode")) && (localStorage.getItem("PltCode") !="")) {
	  		vm.menuDsply=true;
	  		vm.plntCdDsply=false;
	  	  }
	  	  else{
	  		vm.menuDsply=false;
	  		vm.plntCdDsply=true;
	  		}
	    }
	
	    function changeMenuUpDwnIcon(val) {
	        //alert(val);
	    	var content = document.getElementById('menu-up-dwn-icon'+val).innerHTML;
	    	//alert(content);
	    	//console.log(content.charCodeAt(content.length-1));
	    	var charCode = content.charCodeAt(content.length-1);
	    	if(charCode == "9660"){
	    		//console.log(content);
	    		document.getElementById('menu-up-dwn-icon'+val).innerHTML = "&#9650;";
	    	}else{
	    		document.getElementById('menu-up-dwn-icon'+val).innerHTML = "&#9660;";
	    	}
	
	      }
	
	
	    function off() {
	      //alert(222);
	      vm.toggle = false;
	    }
		
		function savePlantCode(){
			//console.log(vm.plantCode);
			localStorage.setItem("PltCode", vm.plantCode.value);
			vm.plntCdDsply=false;
			vm.menuDsply=true;
			GlobalNavService.setPlantCode(vm.plantCode);
		}
		
		function plantSelection(){
			vm.menuDsply=false;
			vm.plntCdDsply=true;
		}
		
	  }
	
	
})();