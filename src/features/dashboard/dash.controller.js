export default class DashboardController {
  constructor(dataSources) {

    this.chartConfig = {
      options: {
        chart: {
          type: 'area'
        }
      },

      title: {
        text: 'Network Usage - Last 60 Minutes'
      },
      yAxis: {
        title: {
          text: 'Throughput MBit/s'
        },
      },
      xAxis: {
        title: {
          text: 'Minutes'
        },
        categories: [ '-55', '-50', '-45', '-40', '-35', '-30',
          '-25', '-20', '-15', '-10', '-05', '0' ]
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      series: [
        {
          name: 'Facility Types',
          data: [ 19.3, 56.3, 23.1, 38.5, 32.9, 27.0, 30.6, 42.3, 17.4, 12.0, 9.1, 34.0 ]
        }
      ]
    };

    const self = this;
    dataSources.getAllHrisData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.items = dataResponse;
        self.data = self.items.data;
        self.staffCount = self.data.map((fac) => parseInt(fac.StaffCount))
          .reduce((a, b) => a + b);
        self.facilityCount = self.items.data.length;
        self.data.forEach(function (o) {
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
        self.facType = self.data.map(o => o.fTypeCode);

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

DashboardController.$inject = [ 'dataSources', 'facTypeData' ];