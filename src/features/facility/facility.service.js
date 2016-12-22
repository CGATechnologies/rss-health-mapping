import angular from 'angular';

class facilityService {
  constructor($http) {
    this.$http = $http;
  }
  
  // HTTP call to get facility data
  getAllFacilities() {
    let url = 'https://hrisrss.org/api/Sxiopdefuolad89S/facility/';
    return this.$http.get(url);
    
  }
}

export default angular.module('services.facility', [])
  .service('facilityService', facilityService)
  .name;