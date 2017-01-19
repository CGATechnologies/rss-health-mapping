routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('table', {
      url: '/data',
      template: require('./hriss.table.html'),
      controller: 'MyTableController',
      controllerAs: 'table'
    });
}