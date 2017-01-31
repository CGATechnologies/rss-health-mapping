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

        // Staff count by gender
        self.maleStaffCount = 0;
        self.femaleStaffCount = 0;
        self.facStaff.forEach(fac => {
          if (fac.sGender === "Male") {
            self.maleStaffCount++;
          } else if (fac.sGender === "Female") {
            self.femaleStaffCount++;
          }
        });

        // Counting roles at each facility
        self.roleCount = d3.nest()
          .key(function (d) { return d.nrLocalName; })
          .rollup(function (v) { return v.length })
          .entries(self.facStaff);

        // Sorting roles alphabetically
        self.roleCount.sort(function (a, b) {
          var nameA = a.key.toUpperCase(); // ignore upper and lowercase
          var nameB = b.key.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        });

        // show/hide onclick
        self.isVisible = false;
        self.ShowHide = function () {
          // If DIV is visible it will be hidden, and vice versa
          self.isVisible = self.isVisible ? false : true;
        };

      });
  }
}

FacilityController.$inject = [ 'facilityService' ];