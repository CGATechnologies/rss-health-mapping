export default class DashboardController {
  constructor(dataSources) {

    const self = this;
    dataSources.getAllData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.items = dataResponse;
        self.data = self.items.data;
        console.log(self.items);
        // edit data with array methods here
        // save each as self. whatever
        // call in dashboard route with dashboard.whatever
        self.facilityCount = self.items.data.length;
      });

    dataSources.getHrissRecentTimestamp()
      .then(function (hrissStamp) {
        self.hrissUpdate = Date.parse(hrissStamp.data);
        let updateDate = new Date(hrissStamp.data);
        let now = new Date();
        let oneDay = 1000 * 60 * 60 * 24
        self.hrissDaysSinceUpdate = Math.ceil((now.getTime() - updateDate.getTime()) / oneDay);
        console.log('blarg', self.hrissDaysSinceUpdate)
      });
  }
}

DashboardController.$inject = ['dataSources'];