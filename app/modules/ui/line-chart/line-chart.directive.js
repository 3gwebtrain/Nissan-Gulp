(function() {
	  'use strict';
	  
	  angular
	    .module('newPCSApp.ui')
	    .directive('nsLineChart', nsLineChart);
	
	  /* @ngInject */
	  function nsLineChart() {
	    var directive = {
	      restrict: 'EA',
	      template: '<div class="ns-line-chart" ui-chart="vm.chartData" chart-options="vm.options"></div>',
	      scope: {
	        chartData: '='
	      },
	      link: linkFunc,
	      controller: nsLineChartController,
	      controllerAs: 'vm',
	      bindToController: true
	    };
	
	    return directive;
	
	    function linkFunc(/* scope, el, attr, ctrl */) {
	
	    }
	  }
	
	  nsLineChartController.$inject = [];
	
	  /* @ngInject */
	  function nsLineChartController() {
	    /* jshint validthis: true */
	    var vm = this;
	
	    vm.options = {
	      height: 100,
	      seriesColors: ['#f4cb0d', '#255db2'],
	      seriesDefaults: {
	        showMarker:false,
	        shadow: false
	      },
	      axes: {
	        xaxis: {
	          borderColor: '#aeaeae',
	          renderer: $.jqplot.CategoryAxisRenderer
	        },
	        yaxis: {
	          autoscale:true,
	          borderColor: '#aeaeae',
	          ticks: [0, 1000, 2000],
	          tickOptions: {
	            formatString:'%d',
	            formatter: $.jqplot.euroFormatter
	          }
	        }
	      },
	      grid: {
	        background: 'transparent',
	        // gridLineColor: 'transparent',
	        borderColor: 'transparent',
	        shadow: false
	      }
	    };
	
	    activate();
	
	    function activate() {
	
	    }
	  }
})();
