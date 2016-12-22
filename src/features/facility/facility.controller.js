export default class FacilityController {
  constructor(facilityService) {
    facilityService.getAllFacilities()
      // Process data in the 'then' callback below
      .then()
  }
}

FacilityController.$inject = ['facilityService'];