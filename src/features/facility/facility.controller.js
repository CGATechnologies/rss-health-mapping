export default class FacilityController {
  constructor(facilityService) {
    facilityService.getFacilityData()
      // Process data in the 'then' callback below
      .then()
  }
}

FacilityController.$inject = ['facilityService'];