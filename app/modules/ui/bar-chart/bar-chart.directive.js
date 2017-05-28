(function() {
  'use strict';

  angular
    .module('newPCSApp.ui')
    .directive('nsBarChart', nsBarChart);

  /* @ngInject */
  function nsBarChart() {
    var directive = {
      restrict: 'EA',
      template: '<div class="ns-bar-chart" ui-chart="vm.chartData" chart-options="vm.options"></div>',
      scope: {
        chartData: '='
      },
      link: linkFunc,
      controller: nsBarChartController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc(/* scope, el, attr, ctrl */) {

    }
  }

  nsBarChartController.$inject = [];

  /* @ngInject */
  function nsBarChartController() {
    /* jshint validthis: true */
    var vm = this;

    vm.options = {
      height: 140,
      seriesColors: ['#8fafdf', '#b5cae9', '#8fafdf', '#b5cae9', '#8fafdf'],
      seriesDefaults: {
        renderer:$.jqplot.BarRenderer,
        shadow: false,
        pointLabels: {
          show: true,
          location: 'e',
          edgeTolerance: -15,
        },
        rendererOptions: {
          barDirection: 'horizontal',
          barWidth: 18,
          varyBarColor : true
        }
      },
      axes: {
        xaxis: {
          autoscale:true,
          borderColor: '#aeaeae'
        },
        yaxis: {
          autoscale:true,
          borderColor: '#aeaeae',
          renderer: $.jqplot.CategoryAxisRenderer
        }
      },
      grid: {
        background: 'transparent',
        gridLineColor: 'transparent',
        borderColor: 'transparent',
        shadow: false
      }
    };

    activate();

    function activate() {

    }
  }
})();
