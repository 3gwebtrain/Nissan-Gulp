(function() {
	'use strict';

	angular
	.module('newPCSApp.ui')
	.directive('nsToggleView', directive);
	
	/* @ngInject */
	function directive() {
		var directive = {
			restrict: 'EA',
			templateUrl: 'components/ui/toggle-view/toggle-view.directive.html',
			scope: {
				model: '='
			},
			link: linkFunc,
			controller: nsToggleViewController,
			controllerAs: 'vm',
			bindToController: true
		};
		
		return directive;
		
		function linkFunc() {}
	}
	
	nsToggleViewController.$inject = [];
	
	/* @ngInject */
	function nsToggleViewController() {}
})();
