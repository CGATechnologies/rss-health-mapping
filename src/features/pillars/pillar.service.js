import angular from 'angular';

class pillarService {
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  // HTTP call to get facility data
  getPillarData($stateParams) {

  }
}

export default angular.module('services.pillar', [])
  .service('pillarService', pillarService)
  .name;