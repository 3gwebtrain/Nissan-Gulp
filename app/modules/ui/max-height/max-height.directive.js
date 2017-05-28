(function() {
	'use strict';
	
	/* @ngInject */

	function linkFunc(scope, el/*, attr, ctrl */) {

		$(window)
		.on('resize', onResize)
		.trigger('resize');

		function onResize() {
			var height = $(window).height() - scope.offset;
			el.height(height);
		}
	}

	function directive() {
		var directive = {
			restrict: 'A',
			scope: {
				offset: '='
			},
			link: linkFunc
		};

	}
	angular.module("newPCSApp", []).directive('nsMaxHeight', directive);
})();
