(function(){
	
	'use strict';
	
	  angular
	    .module('newPCSApp.ui')
	    .directive('nsCollapse', nsCollapse);
	
	  /* @ngInject */
	  function nsCollapse() {
	    var directive = {
	        restrict: 'A',
	        link: linkFunc
	    };
	
	    return directive;
	
	    function linkFunc(scope, el, attr) {
	      el.on('click.nsCollapse', onClick);
	
	      function onClick() {
	
	        if($(attr.nsCollapse).hasClass('in')) {
	          el.removeClass('in');
	          $(attr.nsCollapse)
	            .stop()
	            .slideUp()
	            .removeClass('in');
	        }
	        else {
	          el.addClass('in');
	          $(attr.nsCollapse)
	            .stop()
	            .slideDown()
	            .addClass('in');
	        }
	
	
	      }
	    }
	  }
	
	
	
})();
