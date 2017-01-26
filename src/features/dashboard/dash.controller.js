export default class DashboardController {
  constructor(dataSources, facTypeData) {

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
        }
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
          name: 'Inbound',
          data: [ 29.9, 71.5, 25.4, 43.2, 37.0, 33.0, 35.6, 48.5, 21.4, 19.1, 16.6, 54.4 ]
        },
        {
          name: 'Outbound',
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
        console.log(self.staffCount);
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