routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('table', {
      url: '/data',
      template: require('./table.html'),
      controller: 'TableController',
      controllerAs: 'table'
    });
}