import STATES from './test';
console.table(STATES);

export default class DashboardController {
  constructor(dataSources, options) {
    const self = this;

    self.states = STATES;
    console.log(self.states);

    dataSources.getAllHrisData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.response = dataResponse;
        self.items = self.response.data;
        self.staffCount = self.items.map((fac) => parseInt(fac.StaffCount))
          .reduce((a, b) => a + b);
        self.facilityCount = self.items.length;
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
        // count of facilities by type
        self.facTypeCount = self.facType.reduce((r, a) => {
          r[ a ] = (r[ a ] || 0) + 1;
          return r;
        }, {});
        self.facTypeChartData = d3.entries(self.facTypeCount);
        console.log(self.facTypeChartData);

        self.options = {
          chart: {
            type: 'discreteBarChart',
            height: 250,
            margin: {
              top: 10,
              right: 30,
              bottom: 120,
              left: 50
            },
            color: [ '#FF6021', '#FFA021', '#1F6AA4', '#17AF6E' ],
            x: function (d) { return d.key; },
            y: function (d) { return d.value; },
            showValues: true,
            valueFormat: function (d) {
              return d3.format(',')(d);
            },
            transitionDuration: 100,
            xAxis: {
              axisLabel: 'X Axis',
              rotateLabels: -45
            },
            yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: 30
            }
          }
        };

        self.data = [ {
          key: "Cumulative Return",
          values: self.facTypeChartData
        }];
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