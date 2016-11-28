routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      template: require('./dash.html'),
      controller: 'DashboardController',
      controllerAs: 'dashboard'
    });
}