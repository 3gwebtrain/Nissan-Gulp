

 /*angular
    .module('newPCSApp.ui')
    .directive('keyRestriction',function(){
    	
    	return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, modelCtrl) {
            	var inVal=attrs.keyRestriction;
            	console.log(inVal);
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == null)
                        return ''
                    if(inVal==='numericOnly'){
                    	cleanInputValue = inputValue.replace(/[^0-9]/g, '');
                    } 
                    else if(){
                    	
                    }   
                    cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
                });
            }
        }
  });
*/
