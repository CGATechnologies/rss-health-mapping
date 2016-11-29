export default class DashboardController {
  constructor(dataSources) {
    dataSources.getSourceMetaData()
      // Process data in the 'then' callback below
      .then()
  }
}

DashboardController.$inject = ['dataSources'];