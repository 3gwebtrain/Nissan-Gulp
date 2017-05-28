/**
 * Service for all server side call - Search, Add, update and Delete
 */


 (function(){
   
  'use strict';

  angular
  .module('newPCSApp.services')
  .service('PcsPageService', PcsPageService);

  PcsPageService.$inject = ['$http','blockUI','$translate','atomicNotifyService'];

  function PcsPageService($http,blockUI,$translate,atomicNotifyService){
   
    var pcsPageService ={
      atomicNotifyTime:500,
      myHeaderCellTemplate1:'<div class="customHeader"> <div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex" title="TOOLTIP"> <span class="ui-grid-header-cell-label" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" translate>',
      myHeaderCellTemplate2:'</span><span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="{{getSortDirectionAriaLabel()}}"> <i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\':!col.sort.direction}" title="{{isSortPriorityVisible() ? i18n.headerCell.priority + \' \' + ( col.sort.priority + 1 )  : null}}" aria-hidden="true"> </i> <sub  ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number"> {{col.sort.priority + 1}} </sub> </span>  </div>  <div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true"> <i class="ui-grid-icon-angle-down"  aria-hidden="true"> &nbsp; </i> </div> </div>',
      uploadFileToUrl:function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        return $http({
          method: 'POST',
          url:uploadUrl,
          data:fd,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).
        success(function(data, status, headers, config){
          console.log("Service Call Ends :"+new Date());
          return data;
        });
      },
      executeService:function(param, srchUr){

        return $http({
          method: 'POST',
          url:srchUr,
          data:param,
          headers: {'Content-Type': 'application/json'}
        }).
        success(function(data, status, headers, config){
          console.log("Service Call Ends :"+new Date());
          return data;
        }).catch(function(data, status, headers, config){
         return data;
       });
      },
      executeServiceGet:function(param, srchUr){

        return $http({
          method: 'GET',
          url:srchUr,
          data:param,
          headers: {'Content-Type': 'application/json'}
        }).
        success(function(data, status, headers, config){
          console.log("Service Call Ends :"+new Date());
          return data;
        });
      },

      executeServiceExcelDwnld:function(param, srchUr, type, screenId){
       var EXCEL_TYPE 	= "XLS";
       var CSV_TYPE 	= "CSV";
       var EXTENSION 	= '';
       
       return $http({
        method: 'GET',
        url:srchUr,
        data:param,
        responseType: 'arraybuffer'
      }).
       success(function(data, status, headers, response){
        console.log("Service Call Ends :"+new Date());
        
        var contentType = headers('Content-Type');
        var blob = new Blob([data], {type: contentType});
        var objectUrl = URL.createObjectURL(blob);
        if (EXCEL_TYPE === type) {
         EXTENSION = ".xls";
       } else {
         EXTENSION = ".csv";
       }
       saveAs(blob, screenId + EXTENSION);
       return data;
     });
     },



     startBlockUI :function () {
      $translate('loadingmessage').then(function (text) {
        blockUI.start(text);
        return true;
      });
    },
    configureTour : function(){
      $(document).foundation(
      {
        joyride: {

                         expose                   : true,     // turn on or off the expose feature
                         template : { // HTML segments for tip layout
                          link          : '<a href="receive_sts_summ" class="joyride-close-tip">&times;</a>',
                          timer         : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
                          tip           : '<div class="joyride-tip-guide" id="aaa"><span class="joyride-nub"></span></div>',
                          wrapper       : '<div class="joyride-content-wrapper"></div>',
                          button        : '<a href="receive_sts_summ" class="small button joyride-next-tip"></a>',
                          prev_button   : '<a href="receive_sts_summ" class="small button joyride-prev-tip"></a>',
                          modal         : '<div class="joyride-modal-bg"></div>',
                          expose        : '<div class="joyride-expose-wrapper"></div>',
                          expose_cover  : '<div class="joyride-expose-cover"></div>'
                        },

                      }
                    }
                    );
      return true;
    },
      isValidHourMinute : function(hhmmString){                             // Validate the Hours Minute. Formatted Hours and Minute as "39:59"
      var returnVal = false;
        //console.log(hhmmString);console.log(hhmmString.length);
        if(hhmmString == "" || hhmmString == undefined || hhmmString.length != 5){
          returnVal = true;
          return returnVal;
        }
        var hour  =  hhmmString.substring(0,2);
        var minute  =  hhmmString.substring(3,5);
        var colon  =  hhmmString.substring(2,3);
        if( isNaN(hour)
          || isNaN(minute)
          || colon != ":" ){
          returnVal = true;
      }
        //console.log(returnVal);console.log(hour); console.log(minute);
        if(returnVal == false){
          if(hour < 0 || minute < 0 || hour > 40 || minute > 59){
            returnVal = true;
          }
        }

        if(returnVal == false){
          if(hour == 40 && minute > 0){
            returnVal = true;
          }
        }

        return returnVal;
      },
      isValidShift : function(data){
        var returnVal = false;
        //console.log(data);console.log("    "); console.log(!(data == "1" || data == "2"));
        if(isNaN(data) || data.length > 1 || !(data == "0" || data == "1" || data == "2")){
          returnVal = true;
        }
        return returnVal;
      },
      isValidDateFormat : function(dateString){                           // Validate the date format
        var returnVal = false;
        if(dateString == "" || dateString == undefined || dateString.length != 8){
          returnVal = true;
          return returnVal;
        }
        var year  =  dateString.substring(0,2);
        var month = dateString.substring(3,5);
        var day = dateString.substring(6,8);
        var firstHyphen = dateString.substring(2,3);
        var secondHyphen = dateString.substring(5,6);

        if( isNaN(year)
          || isNaN(month)
          || isNaN(day)
          || firstHyphen != "-"
          || secondHyphen != "-" ){
          returnVal = true;
      }
      return returnVal;
    },
      isValidString : function(str){             //method to do special character check
        return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
      },
      isValidMMDDFreeLeapYrCheck : function(mmddString){        // Validate the month and day. Example format "MMDD"

      if(mmddString < 4){
        return false;
      }
      var monthStr  =  mmddString.substring(0,2);
      var dayStr  =    mmddString.substring(2,4);
      var month = parseInt(monthStr, 10);
      var day = parseInt(dayStr, 10);

          // Check the ranges of month
          if (month == 0 || month > 12)
            return false;

          var monthLength = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

          // Check the range of the day
          return day > 0 && day <= monthLength[month - 1];
        },
      checkSfAndLstDayOfMnFreeLeapYrCk : function(mmddShift){                // method to validte shift with last day of month

       var resultVal = true;
       var month  =    mmddShift.substring(0,2);
       var day    =    mmddShift.substring(2,4);
       var shift  =    mmddShift.substring(4);

       month = parseInt(month, 10);
       var monthLength = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
       var lastDay  = monthLength[month - 1];
       if(day == lastDay){
         if(shift > 2){
           resultVal = false;
         }
       }
       return resultVal;
     },
      isValidDate : function(dateString){        // Validates that the input string is a valid date formatted as "mm-dd-yyyy"
        // Parse the date parts to integers
        var parts = dateString.split("-");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

          // Check the ranges of month and year
          if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

          var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

          // Adjust for leap years
          if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

          // Check the range of the day
          return day > 0 && day <= monthLength[month - 1];
      },/**
         * This method will check the uploaded file is of XLS type or XLSX type
         * @returns true or false
         */
         checkFileExtension: function() {
          var fileElement = document.getElementById("upload");
          var fileExtension = "";
          if (fileElement.value.lastIndexOf(".") > 0) {
            fileExtension = fileElement.value.substring(fileElement.value.lastIndexOf(".") + 1, fileElement.value.length);
          }
          if (fileExtension == "xls" || fileExtension == "xlsx") {
            return true;
          } else {
            alert("You must select an Excel file for upload");
            return false;
          }
        }, 
        isValidUser : function() {
         $http({
           method: 'POST',
           url: "http://172.18.119.6:8891/commonservice/loggedInUser",
           data: JSON.stringify({loggedInUser : 'User Id'}),
           headers: {'Content-Type': 'application/json'}
         }).success(function (response) {
          console.log("Response : ", response);
          return response;
        }).error(function(response){
          console.log("Error  : " ,response);
        });
      }, getStatusMessage : function(result) {
       if (result !== undefined && result !== null && result !== "") {
        var status = result.data.status;
        if (status === "success") {
         $translate('load.ALL.Err009_ButtonValidation').then(function (text) {
          atomicNotifyService.success(text, 5000);
        });
       } else if (status === "Record already exist") {
         $translate('load.ALL.Err010_ButtonValidation').then(function (text) {
          atomicNotifyService.error(text, 5000);
        });
       } else if (status === "failure") {
					//$translate('load.ALL.Err010_ButtonValidation').then(function (text) {
						atomicNotifyService.error("Internal server occurred", 5000);
			        //});
            }
          }
        }
      };
      return pcsPageService;

    }
    
  })();
