(function() {
	'use strict';
	angular
	.module('newPCSApp.ui')
	.directive('nsAffix', nsAffix);
	
	nsAffix.$inject = ['$timeout'];
	
	/* @ngInject */
	function nsAffix($timeout) {
		
		var directive = {
			restrict: 'A',
			scope: {
	        // Top margin
	        affixTop: '='
	    },
	    link: linkFunc
	};
	
	return directive;
	
	function linkFunc(scope, el) {
		var elTop = el.offset().top,
		colGroup = $('<colgroup/>');
		
		if(el[0].tagName === 'THEAD') {
			initTable();
		}
		
		$(window).on('scroll.affix', onScroll)
		.trigger('scroll.affix');
		
		function onScroll() {
			var scrollTop = $(window).scrollTop() + scope.affixTop;
			
			if(scrollTop > elTop) {
				el.addClass('ns-affix');
				el.removeClass('ns-affix-top');
				return;
			}
			
			el.removeClass('ns-affix');
			el.addClass('ns-affix-top');
		}
		
		function initTable() {
			el.before(colGroup);
			
			$(window).on('resize.affix', onResize);
			
			$timeout(function () {
				$(window).trigger('resize.affix');
			});
		}
		
		function onResize() {
	        // reset th size
	        colGroup.empty();
	        el.removeClass('ns-affix');
	        el.removeClass('ns-affix-top');
	        
	        el.find('th').width('auto');
	        
	        el.find('th').each(function () {
	        	colGroup.append($('<col/>').width($(this).outerWidth()));
	        	$(this).width($(this).width());
	        });
	        
	        $(window).trigger('scroll.affix');
	    }
	}
}
})();
