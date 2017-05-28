(function(){
	
	'use strict';

	angular
	.module('newPCSApp.services')
	.service('CrudService', CrudService);

	/* @ngInject */
	function CrudService() {

		return {
			addLine: addLine,
			copyLine: copyLine,
			modifyRow: modifyRow,
			deleteRow: deleteRow,	 
			handleCellOnCondition:handleCellOnCondition,
			handleMarkInfoOnCondition:handleMarkInfoOnCondition,
			cancelGrid:cancelGrid,
			editableCheck:editableCheck,
			editableCheckForModify:editableCheckForModify,
			collectMarkRecords:collectMarkRecords,
			copypasteRow:copypasteRow,
			pasteRow:pasteRow,
			dateCellDisplayFormatEdit:dateCellDisplayFormatEdit,
			updateDateTimeCell:updateDateTimeCell,
			isValidDate:isValidDate
		};
	}
	var selectedItem=[];
	var cRow=[];
	var indVal = null;
	var copyItem =[];
	var copyRow=[];
	
    /**
    * Adding a new row in grid
    */
    function addLine(obj, colModel, $translate){
    	var grid = obj.grid;
    	selectedRowIndex(grid);
    	if(selectedItem!=undefined && selectedItem.length != 0){
    		colModel[1].editable = true;
    		angular.forEach(selectedItem,function(sel,index){				
    			grid.addRow({ rowIndx: sel+1+index,newRow:{'markInfo':'I'},refresh:true })
    			grid.updateRow({ rowIndx: sel+index,newRow:{'ck':''}})
    			grid.addClass({ rowIndx: sel+1+index, cls: 'pq-row-edit' });
    		});
    		colModel[1].editable = false;
    		selectedItem=[];
    		grid.setSelection(null);					
    	}else{
    		$translate('load.ALL.Err004_ButtonValidation').then(function (text) {
    			return alert(text);
    		});
    	}
    }
    /**
    * Modifying row in a grid
    */
    function modifyRow(obj, colModel, $translate){
    	var grid = obj.grid;
    	selectedRowIndex(grid);
    	if(selectedItem!=undefined && selectedItem.length != 0){
    		colModel[1].editable = true;
    		angular.forEach(selectedItem,function(sel,index){
    			grid.updateRow({ rowIndx: sel,newRow:{'markInfo':'M','ck':''},refresh:true })
    			grid.addClass({ rowIndx: sel, cls: 'pq-row-edit' });					
    		});
    		colModel[1].editable = false;
    		selectedItem=[];
    		grid.setSelection(null);			
    	}else{
    		$translate('load.ALL.Err003_ButtonValidation').then(function (text) {
    			return alert(text);
    		});
    	}
    } 
    /**
    * Copying a row in a grid
    */
    function copyLine(obj, colModel, $translate){
    	var newColModel = [];
    	var newColModelSub = [];
    	var newColModelSub1 = [];

    	var grid = obj.grid;
    	selectedRowIndex(grid);
    	if(selectedItem!=undefined && selectedItem.length != 0){
    		colModel[1].editable = true;
    		angular.forEach(selectedItem,function(sel,index){
    			cRow[index].ck="";
    			var cpyRow=cRow[index];
    			cpyRow.pq_rowcls = "";					
    			var cpdRow=angular.copy(cpyRow);                 
    			cpdRow.markInfo="C";
    			cpdRow.slNo="    ";				
    			grid.addRow({ rowData:cpdRow,rowIndx: sel+1+index,refresh:true });
    			grid.addClass({ rowIndx: sel+1+index, cls: 'pq-row-edit' });	
    		});
    		colModel[1].editable = false;
    		selectedItem=[];
    		grid.setSelection(null);              

    	}else{
    		$translate('load.ALL.Err002_ButtonValidation').then(function (text) {
    			return alert(text);
    		});
    	}
    }
    
		/**
		* Copying a row in a grid for paste
		*/
		var cpypasteRow={};
		function copypasteRow(obj, colModel, $translate){
			var grid = obj.grid; 			
			copyRowIndex(grid); 
			selectedRowIndex(grid);	
			console.log(copyItem);
			if((copyItem!=undefined) && (copyItem!="") && (copyItem.length == 1) && (selectedItem!=undefined) && (selectedItem.length != 0)){
				var copiedRow=copyRow;	
				cpypasteRow=angular.copy(copiedRow);  
				grid.updateRow({ rowIndx: copyItem,newRow:{'ck':''}});
				selectedItem=[];
				grid.setSelection(null);           
			}else if(copyItem.length ==0){
				$translate('load.ALL.Err002_ButtonValidation').then(function (text) {
					return alert(text);
				});
			}else{
				$translate('load.ALL.Err006_ButtonValidation').then(function (text) {
					return alert(text);
				});
			}
		}
		/**
		* Paste a row in a grid for Aline
		*/
		function pasteRow(obj, colModel, $translate){
			var grid = obj.grid;
			var pasteRow =[];
			selectedRowIndex(grid);
			if(selectedItem!=undefined && selectedItem.length != 0){
				colModel[1].editable = true;
				angular.forEach(selectedItem,function(sel,index){
					cRow[index].ck="";			
					if(cRow[index].markInfo === 'I' && cpypasteRow[0]!=undefined){	
						pasteRow=angular.copy(cpypasteRow[0]); 
						pasteRow.markInfo="I";
						pasteRow.slNo=" ";	
						pasteRow.ck="";
						grid.addRow({ rowData:pasteRow,rowIndx: sel,refresh:true });
						grid.deleteRow({ rowIndx: sel+1,refresh:true })	
						grid.addClass({ rowIndx: sel, cls: 'pq-row-edit' });
					}			
				});
				colModel[1].editable = false;
				selectedItem=[];
				pasteRow=[];
				grid.setSelection(null);               
			} else {
				$translate('load.ALL.Err007_ButtonValidation').then(function (text) {
					return alert(text);
				});
			}
		}
		
      /**
       * Delete a row from a grid
       */
       function deleteRow(obj,colModel, $translate){
       	var grid = obj.grid;
       	selectedRowIndex(grid);
       	if(selectedItem!=undefined && selectedItem.length != 0){
       		colModel[1].editable = true;
       		angular.forEach(selectedItem,function(sel,index){
       			grid.updateRow({ rowIndx: sel,newRow:{'markInfo':'D','ck':''},refresh:true });
       			grid.addClass({ rowIndx: sel, cls: 'pq-row-delete' });
       		});
       		colModel[1].editable = false;
       		selectedItem=[];
       		grid.setSelection(null);  
       	}else{
       		$translate('load.ALL.Err005_ButtonValidation').then(function (text) {
       			return alert(text);
       		});
       	}
       }
	/**
    * Get all row selections
    */	
    function selectedRowIndex(grid){
    	var selectionArray =grid.selection({ type: 'row', method: 'getSelection' });
    	var item=0;                         
    	angular.forEach(selectionArray,function(selectedRow){
    		indVal = parseInt(selectedRow.rowIndx);
    		selectedItem[item] = parseInt(indVal);			
    		cRow[item] =grid.getRowData({rowIndx: indVal,refresh:true });	
    		item++;
    	});       
    }
	 /**
    * Get single row selections for copy
    */	
    function copyRowIndex(grid){
    	copyItem = [];
    	var selectioncopyArray =grid.selection({ type: 'row', method: 'getSelection' });
    	var item=0;                         
    	angular.forEach(selectioncopyArray,function(selectedcopyRow){
    		indVal = parseInt(selectedcopyRow.rowIndx);
    		copyItem[item] = parseInt(indVal);			
    		copyRow[item] =grid.getRowData({rowIndx: indVal,refresh:true });	
    		item++;
    	});   
    }
	 /**
	 *
	 */
	 function collectMarkRecords(operation,obj){
	 	var gridData = obj.grid.pdata;
	 	var markList = [];
	 	var counter = 1;
	 	
	 	for (var index = 0; index < gridData.length; index++) {
	 		var tempData = gridData[index];
	 		var markInfo = tempData.markInfo;
	 		
	 		if (operation == 'CONFIRM'){
	 			if(markInfo == "I" || markInfo == "M" || markInfo == "C" || markInfo == "D"){
	 				markList[counter]= index;
	 				counter = counter + 1;
	 			}
	 		}else if(operation == 'COMMIT'){
	 			if (markInfo == "i" || markInfo == "m" || markInfo == "c" || markInfo == "d"){
	 				markList[counter]= index;
	 				counter = counter + 1;
	 			}
	 		}                                      
	 	}
	 	return markList;
	 }
	 
	/**
	* Apply blue color background for non editable column while Modify
	*/
	function handleCellOnCondition(ui){
		if(ui.rowData != undefined){
			if(ui.rowData.markInfo==='M' ){					
				return {style:"background-color:#E3F1FE;"};
			}else{

			}
		}
	}
	
	/**
	* Apply blue color background for non editable column while Modify , add and copy
	*/
	function handleMarkInfoOnCondition(ui){
		if(ui.rowData != undefined){
			if(ui.rowData.markInfo==='M' || ui.rowData.markInfo==='C' || ui.rowData.markInfo==='I'){					
				return {style:"background-color:#E3F1FE;"};
			}else{

			}
		}
	}
	
	/**
	* Refresh GridView and Data
	*/
	function cancelGrid(obj){
		var grid = obj.grid;	
		grid.refreshDataAndView();
	}
	/**
	* MarkInfo  M, C, I based row edit
	*/
	function editableCheck(ui){
		if(ui.rowData != undefined){
			if(ui.rowData.markInfo==='M'|| ui.rowData.markInfo==='C' || ui.rowData.markInfo==='I'){			
				return true;			
			}
		}
	}
	/**
	* MarkInfo  M non editable column control
	*/
	function editableCheckForModify(ui){
		if(ui!= undefined&&ui.rowData!= undefined){
			if(ui.rowData.markInfo==='M'){
				return false;
			}else if ( ui.rowData.markInfo==='C' || ui.rowData.markInfo==='I'){
				return true;
			}
		}
	} 	
	/**
     * Date format YY-MM-DD and leap year validation
     */            
     function dateCellDisplayFormatEdit(ui,obj){     
     	if(ui.cellData !=null){           
     		var tempStr=ui.cellData;
     		if(tempStr>0){
     			var celldatavalue = ui.cellData;        
     			var tempStr = '';
     			var d = new Date();
     			var currYear = d.getFullYear(); 
     			if((celldatavalue !="")&&(celldatavalue !=undefined)){
     				tempStr=celldatavalue;
     				var YY=tempStr.substr(0,2);
     				var MM=tempStr.substr(2,2);
     				var DD=tempStr.substr(4,2); 
    				 //console.log(YY,MM,DD);
    				 if(!isValidDate(YY,MM,DD)){
    				 	obj.grid.addClass({ rowIndx: ui.rowIndx, dataIndx: ui.dataIndx, cls: 'errorCell' });
    				 	tempStr=YY+"-"+MM+"-"+DD;
    				 }
    				 else{
    				 	obj.grid.removeClass({ rowIndx: ui.rowIndx, dataIndx: ui.dataIndx, cls: 'errorCell' });
    				 	tempStr=YY+"-"+MM+"-"+DD;
    				 }
    				 return tempStr;      
    				}             
    			}
    		}
    	}
    	/** Leap Year validation */
    	function isValidDate(yy,mm,dd) {
    		var newdate = new Date();
    		var yyyy = 2000 + Number(yy);
    		var mm = Number(mm) - 1;
    		var dd = Number(dd);
    		newdate.setFullYear(yyyy);
    		newdate.setMonth(mm);
    		newdate.setDate(dd);
    		return dd == newdate.getDate() && mm == newdate.getMonth() && yyyy == newdate.getFullYear();
    	}
    	
     /*
 	 * Add - and : for updateYYMMDDHH column
 	 */
 	 function updateDateTimeCell(ui,obj){
 	 	if(ui.rowData != undefined){
 	 		if(ui.rowData.markInfo==='M' || ui.rowData.markInfo==='I' || ui.rowData.markInfo==='C'){
 	 			obj.grid.addClass({ rowIndx: ui.rowIndx, dataIndx: 'updateYYMMDDHH',cls: 'mandField',refresh:true });
 	 		}
 	 	}
 	 	if(ui.cellData !=null){           
 	 		var tempStr=ui.cellData;
 	 		if(tempStr>0){
 	 			var retDateTime = '';
 	 			if((tempStr !="")&&(tempStr !=undefined)){
 	 				var YY=tempStr.substr(0,4);
 	 				var MM=tempStr.substr(4,2);
 	 				var DD=tempStr.substr(6,2); 
 	 				var HH=tempStr.substr(8,2);
 	 				var Mm=tempStr.substr(10,2);
 	 				var SS=tempStr.substr(12,2);
 	 				if(tempStr.length != 12){
 	 					retDateTime = YY+"-"+MM+"-"+DD+" "+HH+":"+Mm+":"+SS;
 	 				}else{
 	 					retDateTime = YY+"-"+MM+"-"+DD+" "+HH+":"+Mm;
 	 				}
 	 				return retDateTime;      
 	 			}             
 	 		}
 	 	}
 	 }

 	})();