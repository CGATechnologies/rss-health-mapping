import angular from 'angular';

class facilityService {
  constructor($http) {
    this.$http = $http;
  }
  
  // HTTP call to get facility data
  getFacilityData() {
    let url = '';
    return this.$http.get(url);
  }
}

export default angular.module('services.facility', [])
  .service('facilityService', facilityService)
  .name;