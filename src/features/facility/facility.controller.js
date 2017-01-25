import angular from 'angular';

export default class FacilityController {
  constructor(facilityService) {

    const self = this;
    facilityService.getOneFacility()
      // Process data in the 'then' callback below
      .then(function (facilityResponse) {
        self.facility = facilityResponse.data.Facility;
        self.facStaff = facilityResponse.data.Staff;
        self.staffCount = self.facStaff.length;
        self.maleStaffCount = 0;
        self.femaleStaffCount = 0;
        self.facStaff.forEach(fac => {
          if (fac.sGender === "Male") {
            self.maleStaffCount++;
          } else if (fac.sGender === "Female") {
            self.femaleStaffCount++;
          }
        });

        // console.log(self.femaleStaffCount);
        console.log(self.maleStaffCount);

      });
  }
}

FacilityController.$inject = [ 'facilityService' ];