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
        self.hrissStamp = Date.parse(hrissStamp.data);
        console.log(self.hrissStamp);
      });
  }
}

DashboardController.$inject = ['dataSources'];