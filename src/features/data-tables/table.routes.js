routes.$inject = [ '$stateProvider' ];

export default function routes($stateProvider) {
  $stateProvider
    .state('table', {
      url: '/tables',
      template: require('./hris.table.html'),
      controller: 'HrisTableController',
      controllerAs: 'hrisTable'
    });
}