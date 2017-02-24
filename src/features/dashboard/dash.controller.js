import facilityTypeCount from './chart-facility-type-count';

export default class DashboardController {
  constructor(dataSources, options) {

    const self = this;


    dataSources.getAllHrisData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.response = dataResponse;
        self.items = self.response.data;
        self.staffCount = self.items.map((fac) => parseInt(fac.StaffCount))
          .reduce((a, b) => a + b);
        self.facilityCount = self.items.length;

        // convert fTypeCode to name from code
        self.items.forEach(function (o) {
          if (o.fTypeCode === "11") {
            o.fTypeCode = "Teaching Hospital";
          } else if (o.fTypeCode === "12") {
            o.fTypeCode = "State Hospital";
          } else if (o.fTypeCode === "13") {
            o.fTypeCode = "County Hospital";
          } else if (o.fTypeCode === "14") {
            o.fTypeCode = "PHCC";
          } else if (o.fTypeCode === "15") {
            o.fTypeCode = "PHCU";
          } else if (o.fTypeCode === "16") {
            o.fTypeCode = "Private Clinic";
          } else if (o.fTypeCode === "17") {
            o.fTypeCode = "Specialised Hospital/Clinic";
          } else if (o.fTypeCode === "21") {
            o.fTypeCode = "Health Training Institution";
          } else if (o.fTypeCode === "31") {
            o.fTypeCode = "Ministry Building";
          } else if (o.fTypeCode === "91") {
            o.fTypeCode = "Ministry of Health";
          } else if (o.fTypeCode === "92") {
            o.fTypeCode = "State Ministry of Health";
          } else if (o.fTypeCode === "93") {
            o.fTypeCode = "County Health Department";
          } else if (o.fTypeCode === "94") {
            o.fTypeCode = "Payam Health Department";
          } else if (o.fTypeCode === "96") {
            o.fTypeCode = "Other";
          }
        });

        self.facType = self.items.map(o => o.fTypeCode);

        // parse strings to ints for staff and role counts
        self.items.forEach(function (o) {
          o.StaffCount = +o.StaffCount;
          o.RoleCount = +o.RoleCount;
        });

        self.hrisFacFilter = self.items.filter(function (d) {
          return d.StaffCount > 0;
        });
        self.hrisFacProportion = (self.hrisFacFilter.length / self.items.length);
        console.log('yo', self.hrisFacProportion);



        // staff average by facility type
        self.staffAvgByFacilityType = d3.nest()
          .key(function (d) { return d.fTypeCode; })
          .sortKeys(d3.ascending)
          .rollup(function (v) {
            return (d3.mean(v, function (d)
            { return d.StaffCount; }));
          })
          .map(self.hrisFacFilter);

        // staff count by facility type
        self.staffCountByFacilityType = d3.nest()
          .key(function (d) { return d.fTypeCode; })
          .sortKeys(d3.ascending)
          .rollup(function (v) {
            return (d3.sum(v, function (d)
            { return d.StaffCount; }));
          })
          .map(self.hrisFacFilter);

        console.log(self.staffCountByFacilityType);

        // count of facilities by type
        self.facTypeCount = self.facType.reduce((r, a) => {
          r[ a ] = (r[ a ] || 0) + 1;
          return r;
        }, {});
        self.facTypeChartData = d3.entries(self.facTypeCount);

        // Chart: Count of Facilities by Type
        self.chartFacTypeCountOptions = facilityTypeCount.facilityTypeCount.options;
        self.chartFacTypeCountData = [ {
          key: "Cumulative Return",
          values: self.facTypeChartData
        }];
        console.log(self.facTypeChartData);
      });

    dataSources.getHrisRecentTimestamp()
      .then(function (hrisStamp) {
        self.hrisUpdate = Date.parse(hrisStamp.data);
        let updateDate = new Date(hrisStamp.data);
        let now = new Date();
        let oneDay = 1000 * 60 * 60 * 24;
        self.hrisDaysSinceUpdate = Math.ceil((now.getTime() - updateDate.getTime()) / oneDay);
      });
  }
}

DashboardController.$inject = [ 'dataSources' ];