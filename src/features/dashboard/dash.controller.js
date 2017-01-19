export default class DashboardController {
  constructor(dataSources) {

    const self = this;
    dataSources.getAllHrissData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.items = dataResponse;
        self.data = self.items.data;
        self.staffCount = self.data.map((fac) => parseInt(fac.StaffCount))
          .reduce((a, b) => a + b);
        self.facilityCount = self.items.data.length;
        console.log(self.staffCount);
      });

    dataSources.getHrissRecentTimestamp()
      .then(function (hrissStamp) {
        self.hrissUpdate = Date.parse(hrissStamp.data);
        let updateDate = new Date(hrissStamp.data);
        let now = new Date();
        let oneDay = 1000 * 60 * 60 * 24;
        self.hrissDaysSinceUpdate = Math.ceil((now.getTime() - updateDate.getTime()) / oneDay);
        console.log('blarg', self.hrissDaysSinceUpdate);
      });
  }
}

DashboardController.$inject = ['dataSources'];