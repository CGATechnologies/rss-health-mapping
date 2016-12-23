export default class DashboardController {
  constructor(dataSources) {

    const self = this;
    dataSources.getAllData()
      // Process data in the 'then' callback below
      .then(function(dataResponse) {
        self.items = dataResponse;
        self.data = self.items.data;
        // edit data with array methods here
        // save each as self. whatever
        // call in dashboard route with dashboard.whatever
      })
  }
}

DashboardController.$inject = ['dataSources'];