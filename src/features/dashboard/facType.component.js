import angular from 'angular';

class facTypeComponent {
  constructor($http) {
    this.$http = $http;
  }

  //sample highcharts chart


}

export default angular.module('components.facTypeComponent', [])
  .component('facTypeComponent', facTypeComponent)
  .name;

