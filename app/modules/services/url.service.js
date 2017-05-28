(function(){
	
  'use strict';
  angular
    .module('newPCSApp.services')
    .service('UrlService', UrlService);

  //UrlService.$inject = ['$http'];

  /* @ngInject */
  function UrlService(PcsPageService) {
	var baseServiceUrl = "http://172.18.119.6:8891";
	
	
	/*** Pagination - Results per page  ***/
	var rPP = 50;
	
	/*** Pagination - Results per page Options ***/
	var rPPOptions = [50,100,200,300,500];
	
	/*** Language - To get the language currently selected***/
	var language = "";
	
	/** Validating Plant Code from Local Param ViewG */
	var validatePlantCodeData = "";
	
    return {
		getUrl:function(){
			return baseServiceUrl;
		},
		
		getRpp: function(){
			return rPP;
		},
		
		getRppOptions: function(){
			return rPPOptions;
		},
		
		getLanguage: function(){
			language=localStorage.getItem("selectedLanguage");	
			if(language == null){
				language = "En";
			}
			return language;
		},
		/** Function to load plant Code from Local Param ViewG*/
		getPlantCodeData : function(paramId,programId,length) {
			var validatePlantCodeUrl = baseServiceUrl + "/commonservice/localParamViewG?paramId="+paramId+"&programId="+programId+"&length="+length;
			
			PcsPageService.executeServiceGet('',validatePlantCodeUrl).then(function(response){
				validatePlantCodeData = response.data.plantCodes;
				return validatePlantCodeData;
			}).catch(function(error){
				//vm.errorPage=true;
				//vm.showGrid=false;
			}).finally(function(){
				blockUI.stop();
			});
		},
		/** Function to check whether the plant code is valid or not */
		isValidPlantCode : function(plantCode) {
			var plantCodeArr = [];
			plantCodeArr = validatePlantCodeData.split(',');
			if(plantCodeArr.indexOf(plantCode) == -1){
				return false;
			}
			return true;
		},
		/** Function to get the grid index based on the pagination current page */
		getPaginationIndex : function(selectedRowIndex,obj,currentPage) {
			var rPP = obj.pageModel.rPP;
			
			/** Get the current page, rows per page from grid and selected row index from confirm method and calculate the index */
			var indexPos = (currentPage - 1) * rPP + selectedRowIndex;
			
			return indexPos;
		},
		checkOperationsConfirmed:function(dataJSONObj){
			if (dataJSONObj !== null && dataJSONObj !== undefined && dataJSONObj !== "") {
				for (var i = 0; i < dataJSONObj.length; i++) {
					var tempData = dataJSONObj[i];
					if (tempData.markInfo !== null && tempData.markInfo !== undefined && tempData.markInfo !== "") {
						if (tempData.markInfo === "M" || tempData.markInfo === "C" || tempData.markInfo === "I"
							|| tempData.markInfo === "D" || tempData.markInfo === "m" || tempData.markInfo === "c" 
							|| tempData.markInfo === "i" || tempData.markInfo === "d") {
							return false;
						}
					}
				}
				return true;
			}
		}
		
    };
  }

  })();