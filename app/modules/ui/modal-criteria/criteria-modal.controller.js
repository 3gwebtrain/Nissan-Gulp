(function() {
	'use strict';
	
	
	criteriaModalController.$inject = ['$scope', '$modalInstance'];
	
	/* @ngInject */
	function criteriaModalController($scope, $modalInstance) {
		/* jshint validthis: true */
		var vm = this;
		
		vm.cancel = cancel;
		vm.save=save;
		activate();
		
		function activate() {
			console.log($scope.inputVal);
		}
		
		function cancel() {
			$modalInstance.dismiss('cancel');
		}
		
		function save(){
			$scope.selectedItem=vm.searchCrtName;
			$modalInstance.close($scope.selectedItem);
		}
	}
})();
