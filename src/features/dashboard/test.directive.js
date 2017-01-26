import DashboardController from './dash.controller';

function hChart() {
  return {
    restrict: 'E',
    template: '<hchart></hchart>',
    scope: {
      options: '='
    },
    link: function (scope, element) {
      Highcharts.chart(element[ 0 ], scope.options);
    },
    controller: DashboardController,
    controllerAs: dash
  };
}

export default angular.module('directives.hChart', [])
  .directive('hChart', hChart)
  .name;