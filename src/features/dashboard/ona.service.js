import angular from 'angular';

class ona {
  constructor($http) {
    this.$http = $http;
  }

  // HTTP call to get all data
  getFacilitySurveyMetaData() {
    let url = 'https://www.southsudanhealth.info/api/guest/ona/';
    let getParams = {
      method: 'GET',
      url: url,
      cache: true,
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

export default angular.module('services.ona', [])
  .service('ona', ona)
  .name;