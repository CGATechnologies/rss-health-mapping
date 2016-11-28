import angular from 'angular';

class dataSources {
  constructor($http) {
    this.$http = $http;
  }
  
  // HTTP call to get facility data
  getSourceMetaData() {
    let url = '';
    return this.$http.get(url);
  }
}

export default angular.module('services.dataSources', [])
  .service('dataSources', dataSources)
  .name;