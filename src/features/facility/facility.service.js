import angular from 'angular';

class facilityService {
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  // HTTP call to get facility data
  getOneFacility($stateParams) {
    let facilityId = this.$stateParams.facilityId;
    let url = `https://hrisrss.org/api/Sxiopdefuolad89S/facility/${facilityId}`;
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

export default angular.module('services.facility', [])
  .service('facilityService', facilityService)
  .name;