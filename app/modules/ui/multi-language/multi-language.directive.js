(function(){

	'use strict';


	angular
	.module('newPCSApp.ui')
	.directive('nsLang', nsLang);

  // usage is <ns-lang></ns-lang>

  nsLang.$inject = ['$translate'];

  function nsLang() {
  	var directive = {
  		restrict: 'EA',
  		templateUrl: 'src/components/ui/multi-language/multi-language.directive.html',
  		scope: {},
  		link: link,
  		controller: nsLangController,
  		controllerAs: 'vm',
  		title: 'Lang',
  		bindToController: true
  	};

  	return directive;

  	function link() {}
  }

  nsLangController.$inject = ['$rootScope','$translate'];

  function nsLangController($rootScope,$translate) {
  	/* jshint validthis: true */
  	var vm = this;
  	vm.openSettings=openSettings;
  	vm.hideSettings=hideSettings;
  	vm.saveSettings=saveSettings;
  	vm.changeLanguage = changeLanguage;
    // var cookieData = {};
	// var modalCode;
	function changeLanguage(singleSelect){
		console.log(singleSelect);
		vm.singleSelect=singleSelect;
		$translate.use(vm.singleSelect);
		localStorage.setItem('selectedLanguage',vm.singleSelect);		

	}
	vm.language=localStorage.getItem("selectedLanguage");
	$translate.use(vm.language);
	vm.showSettings= false;

	    /**
		 * Method to show/hide settings screen
		 */
		 function openSettings() {
		 	vm.showSettings = !vm.showSettings;
		 }

	    /**
		 * Method to hide settings screen
		 */
		 function hideSettings() {
		 	vm.showSettings = false;
		 }

	    /**
		 * Method to hide settings screen
		 */
		 function saveSettings() {
		 	console.log("homelangpre---"+UserService.language);

		 	localStorage.setItem("selectedLanguage", vm.language);

		 	alert("Data saved successfully!!");
		 	vm.showSettings = false;

		 }

		 function showMessage(message, type) {
	    	//alert($( "#errorArea" ).has( "div" ).length);
	    	if($( "#errorArea" ).has( "div" ).length > 0){
	    		return;
	    	}

	    	var alertMarkup = $('<div data-alert class="alert-box alert round" style="padding-bottom: .7rem;z-index:1006"><span></span><a href="#" class="close" style="top:40%">&times;</a></div>');
	    	alertMarkup.addClass(type);
	    	alertMarkup.children("span").text(message);
	    	$("#errorArea").prepend(alertMarkup).foundation(
	    		"alert",
	    		undefined
	    		);

	    }

	}



})();