export default class DashboardController {
  constructor(dataSources) {

    const self = this;
    dataSources.getAllData()
      // Process data in the 'then' callback below
      .then(function(dataResponse) {
        self.items = dataResponse;
        self.data = self.items.data;
        console.log(self.data);
      })
  }
}

DashboardController.$inject = ['dataSources'];