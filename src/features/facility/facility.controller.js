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

        // getting all cases right
        self.facStaff.forEach(role => {
          role.nrLocalName = role.nrLocalName.replace(/\b[a-z]/g, function (f) { return f.toUpperCase(); });
          role.rcName = role.rcName.replace(/\b[a-z]/g, function (f) { return f.toUpperCase(); });
          role.rtName = role.rtName.replace(/\b[a-z]/g, function (f) { return f.toUpperCase(); });
        });

        // Counting roles at each facility
        self.roleCount = d3.nest()
          .key(function (d) { return d.rtName; })
          .rollup(function (v) { return v.length; })
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

        /*------------------
        Pillar Rating System
        -------------------*/

        // Rating data
        self.pieData = [
          { label: "pillar 1", value: 20 },
          { label: "pillar 2", value: 20 },
          { label: "pillar 3", value: 20 },
          { label: "pillar 4", value: 20 },
          { label: "pillar 5", value: 20 },
          { label: "pillar 6", value: 20 }
        ];

        // set dimensions of chart. Width, height, radius
        let w = 200;
        let h = 200;
        let r = 100;

        const color = d3.scale.ordinal()
          .domain([ "pillar 1", "pillar 2", "pillar 3", "pillar 4", "pillar 5", "pillar 6" ])
          .range([ "#FF9F1C", "#A8DADC", "#E76F51", "#35A7FF", "#A5FFD6", "#E71D36" ]);

        const vis = d3.select("pie")
          .append("svg:svg")
          .data([ self.pieData ])
          .attr("width", w)
          .attr("height", h)
          .append("svg:g")
          .attr("transform", "translate(" + r + ", " + r + ")");

        const arc = d3.svg.arc()
          .outerRadius(r);

        const pie = d3.layout.pie()
          .value(function (d) { return d.value; });

        const arcs = vis.selectAll("g.slice")
          .data(pie)
          .enter()
          .append("svg:g")
          .attr("class", "slice");

        arcs.append("svg:path")
          .attr("fill", function (d, i) { return color(i); })
          .attr("d", arc);

        arcs.append("svg:text")
          .attr("transform", function (d) {
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function (d, i) { return self.pieData[ i ].label; });


        // show/hide DIV onclick
        self.isVisible = false;
        self.ShowHide = function () {
          // If DIV is visible it will be hidden, and vice versa
          self.isVisible = self.isVisible ? false : true;
        };

      });
  }
}

FacilityController.$inject = [ 'facilityService' ];