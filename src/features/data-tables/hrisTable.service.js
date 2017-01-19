import angular from 'angular';

class hrisTable {
  constructor($http) {
    this.$http = $http;
  }

  // HTTP call to get facility data
  getAllHrisData() {
    // let url = 'https://jsonplaceholder.typicode.com/posts';
    let url = 'https://hrisrss.org/api/Sxiopdefuolad89S/facility';
    let getParams = {
      method: 'GET',
      url: url,
      transformRequest: angular.identity,
      progress: function (e) {
        console.log(e);
        if (e.lengthComputable) {
          this.progressBar = (e.loaded / e.total) * 100;
          this.progressCounter = this.progressBar;
          console.log(this.progressBar);
          console.log(this.progressCounter);
        }
      },
      headers: { 'Content-Type': undefined }
    };

    return this.$http(getParams)
      .success(function (data, status, headers, config) {
        return data;
      })
      .error(function () {
        alert(error);
        return null;
      });
  }
}

export default angular.module('services.hrisTable', [])
  .service('hrisTable', hrisTable)
  .name;