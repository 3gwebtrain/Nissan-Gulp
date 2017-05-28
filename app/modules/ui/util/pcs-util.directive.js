(function(){
	'use strict';	
	
		var cleanInputValue = "";
	    angular
	        .module('newPCSApp.ui')
	        .directive('noSpecialChar',function(){
	        	
	        	return {
	                require: 'ngModel',
	                restrict: 'A',
	                link: function (scope, element, attrs, modelCtrl) {
	                	/*console.log(attrs.noSpecialChar);*/
	                    modelCtrl.$parsers.push(function (inputValue) {
	                        if (inputValue == null)
	                            return ''
	                        cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
	                        cleanInputValue = cleanInputValue.replace('_', '');
	                        if (cleanInputValue != inputValue) {
	                            modelCtrl.$setViewValue(cleanInputValue);
	                            modelCtrl.$render();
	                        }
	                        return cleanInputValue;
	                    });
	                }
	            }
	      });
	
	    /*
	     * Directive to covert the entered values in text box to Upper case
	     * This can be used in text box as directive
	     */
	     angular
	     .module('newPCSApp.ui')
	     .directive('changeToUppercase',function(){
	
	     	return {
	             require: 'ngModel',
	             restrict: 'A',
	             link: function (scope, element, attrs, modelCtrl) {
	             	/*console.log(attrs.noSpecialChar);*/
	                 modelCtrl.$parsers.push(function (inputValue) {
	                     if (inputValue == null)
	                         return ''
	                     cleanInputValue = inputValue.toUpperCase();
	                     if (cleanInputValue != inputValue) {
	                         modelCtrl.$setViewValue(cleanInputValue);
	                         modelCtrl.$render();
	                     }
	                     return cleanInputValue;
	                 });
	             }
	         }
	    });
	
	     /*
	      *
	      *
	      */
	
	     angular
	     .module('newPCSApp.ui')
	     .directive('fileModel', ['$parse', function ($parse) {
	         return {
	            restrict: 'A',
	            link: function(scope, element, attrs) {
	               var model = $parse(attrs.fileModel);
	               var modelSetter = model.assign;
	
	               element.bind('change', function(){
	                  scope.$apply(function(){
	
	                	 console.log("hiiii22");
	                	 console.log(element.length);
	                	 console.log(element[0].files.length);
	                	 //element[0].files.length
	                	 modelSetter(scope, element[0].files[0]);
	
	                     console.log("hiiii2");
	
	                  });
	               });
	            }
	         };
	      }]);
	
	     /*
	      *
	      *
	      */
	
	     angular
	     .module('newPCSApp.ui')
	     .directive('uploadfile',function(){
	    	    return {
	    	      restrict: 'A',
	    	      link: function(scope, element) {
	    	        element.bind('click', function(e) {
	    	        	if(confirm("It overwrites an existing data to excel data in case match key.")){
	    	        		angular.element(e.target).siblings('#upload').trigger('click');
	    	        		modelSetter(scope, element[0].files[0]);
	    	            }
	    	        });
	    	      }
	    	    };
	    	});
	
	     /*
	      *
	      *
	      */
	
	     // angular
	     // .module('newPCSApp.ui')
	     // .directive('datepicker', function(){
	    	    // return {
	    	        // require: 'ngModel',
	    	        // restrict: 'A',
	    	        // scope: { format: "=" },
	    	        // link: function(scope, element, attrs, ngModel){
	    	            // if(typeof(scope.format) == "undefined"){ scope.format = "yyyymmdd" }
	    	            // console.log(scope);
	    	            // $(element).fdatepicker({format: scope.format}).on('changeDate', function(ev){
	    	                // scope.$apply(function(){
	    	                    // ngModel.$setViewValue(ev.date);
	    	                // });
	    	            // })
	    	        // }
	    	    // }
	    	// });
	     /*
	      *
	      *
	      */
	
	     /** This is added to restrict numbers and alphabets */
	     angular.module("newPCSApp.ui")
	     .directive('allowPattern', function() {
	         return {
	             restrict: "A",
	             compile: function(tElement, tAttrs) {
	                 return function(scope, element, attrs) {
	                	 // I handle key events
	                	 element.bind("keypress", function(event) {
	                		 var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
	                		 var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.
	
	                		 // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
	                		 if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
	                			 event.preventDefault();
	                			 return false;
	                		 }
	
	                     });
	                 };
	             }
	         };
	     });
	
	      /*
	          * Directive to restrict to type the values in text box
	          * Only specificvalues will be allowed to enter
	          *
	          */
	
	         angular
	         .module('newPCSApp.ui')
	         .directive('keyRestriction',function(){
	
	            return {
	                 require: 'ngModel',
	                 restrict: 'A',
	                 link: function (scope, element, attrs, modelCtrl) {
	                    var inVal=attrs.keyRestriction;
	                    /*console.log(inVal);*/
	                     modelCtrl.$parsers.push(function (inputValue) {
	                         if (inputValue == null)
	                             return ''
	                         if(inVal==='numericOnly'){
	                            cleanInputValue = inputValue.replace(/[^0-9]/g, '');
	                         }
	                         else if(inVal==='alphabetsOnly'){
	                            cleanInputValue = inputValue.replace(/[^\A-Z]/gi, '');
	                         }
	                         else if(inVal==='alphaNumericsOnly'){
	                            cleanInputValue = inputValue.replace(/[^0-9a-zA-Z]/g, '');
	                         }
	                         else if(inVal==='alphaNumSpaceOnly'){
	                            cleanInputValue = inputValue.replace(/[^0-9a-zA-Z\s]/g, '');
	                         }
	                         else if(inVal==='alphaNumSpaceHyphenOnly'){
	                            cleanInputValue = inputValue.replace(/[^0-9a-zA-Z\s\-]/g, '');
	                         }
	                         else if(inVal==='numbersDotOnly'){
	                            cleanInputValue = inputValue.replace(/[^0-9\.]/g, '');
	                         }
	                         else if(inVal==='numbersHyphenOnly'){
	                            cleanInputValue = inputValue.replace(/[^0-9\-]/g, '');
	                         }
	                         else if(inVal==='astreikOnly'){
	                            cleanInputValue = inputValue.replace(/[^\*]/g, '');
	                         }
	                         else if(inVal==='yesOnly'){
	                            cleanInputValue = inputValue.replace(/[^\yY]/g, '');
	                         }
	                         else if(inVal==='ON'){
	                            cleanInputValue = inputValue.replace(/[^\oOnN]/g, '');
	                         }
	                         else if(inVal==='YNSpaceOnly'){
	                            cleanInputValue = inputValue.replace(/[^\yYnN\s]/g, '');
	                         }
	                         else if(inVal==='NGOKOnly'){
	                            cleanInputValue = inputValue.replace(/[^nNoOgGkK]/g, '');
	                         }
	                         else if(inVal==='MNKSpaceOnly'){
	                            cleanInputValue = inputValue.replace(/[^nNkmMK\s]/g, '');
	                         }
	                         else if(inVal==='AUKSpaceOnly'){
	                            cleanInputValue = inputValue.replace(/[^aAuUkK\s]/g, '');
	                         }
	                         else if(inVal==='someCharSpaceOnly'){
	                             cleanInputValue = inputValue.replace(/[^0-9a-zA-Z\#%&'()-=*+\/,.<>:;? s]/g, '');
	                          }
	                         if (cleanInputValue != inputValue) {
	                             modelCtrl.$setViewValue(cleanInputValue);
	                             modelCtrl.$render();
	                         }
	                         return cleanInputValue;
	                     });
	                 }
	             }
	});
	    /**
	     * Directive to Auto Focus for the respective field in the screen 
	     */
	         angular
			   .module('newPCSApp.ui')
				.directive('autoFocus', ['$timeout', function($timeout) {
			  return {
				restrict: 'A',
				link : function($scope, $element) {
				  $timeout(function() {
					$element[0].focus();
				  });
				}
			  }
			}]);
	
	
	})();
