(function(){
	
	'use strict';
	
	  angular
	    .module('newPCSApp.ui')
	    .directive('plantCode', plantCode);
	
	 // plantCode.$inject = ['$translate'];
	
	  function plantCode() {
	    var directive = {
	        restrict: 'E',
	        templateUrl: 'src/components/ui/plantCodeDropDown/plantCodeDropDown.html',
	        scope: {
	            mandate:'@mandate',
	            isDisabled:'=isDisabled',
				plantcd:'='
	        },
	        link: function(scope,element,attrs,modelCtrl){
	            var inVal=attrs.mandate;
	            var inVal1 = attrs.isDisabled;
	            if(inVal=="true")
	                element.find('select').addClass("mand-filter-crit");
	            if(inVal1 == "true")
	            	element.find('select').attr("disabled",true);
	             },
	        controller: plantCodeController,
	        controllerAs: 'plant',
	        title: 'Lang',
	        bindToController: true
	    };
	
	    return directive;
	      function link() {}
	  }
	    //plantCodeController.$inject = ['$translate','N2DE1Controller'];
	  plantCodeController.$inject = ['$scope','GlobalNavService'];
	function plantCodeController($scope,GlobalNavService){
	    /* jshint validthis: true */
	    var plant =this;
	    plant.plantCodes =[{name:"6",value:"6"},{name:"7",value:"7"}];
	    /*angular.forEach(vm.plantCodes, function(key, values){
	        angular.forEach(key, function(k, val){
	            console.log(k+" "+val);
	        })
	    })*/
	    plant.selectPlantCd = selectPlantCd;
	    plant.plantCd = plant.plantCodes[0];
	    
	    function selectPlantCd(selectedPlantCd){
	        plant.plantCd = selectedPlantCd;
	        $scope.$emit('plantCode', plant.plantCd);
	    }
	    var globalValue = GlobalNavService.getPlantCode();
	    if(globalValue.value == ""){
	    	plant.plantCd = plant.plantCd;
	    }
	    else{
	    	plant.plantCd = globalValue;
	    }
	    $scope.$emit('plantCode', plant.plantCd);
	}
	
	
	
	
	})();