import angular from 'angular';

class dataSources {
  constructor($http) {
    this.$http = $http;
  }
  
  // HTTP call to get all data
  getAllData() {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    return this.$http.get(url)
      .success(function (data, status, headers, config) {
        return data;
      })
      .error(function () {
        alert(error);
        return null;
      });
  }
}

export default angular.module('services.dataSources', [])
  .service('dataSources', dataSources)
  .name;