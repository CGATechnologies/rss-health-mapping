routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('table', {
      url: '/data',
      template: require('./hris.table.html'),
      controller: 'MyTableController',
      controllerAs: 'hrisTable'
    });
}