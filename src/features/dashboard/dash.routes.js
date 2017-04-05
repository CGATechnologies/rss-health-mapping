routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: require('./dash.html'),
    controller: 'DashboardController',
    controllerAs: 'dashboard'
  }).state('hris', {
    url: '/dashboard/hris',
    template: require('./dash.hris.html'),
    controller: 'DashboardController',
    controllerAs: 'dashboard'
  }).state('pmis', {
    url: '/dashboard/pmis',
    template: require('./dash.pmis.html'),
    controller: 'DashboardController',
    controllerAs: 'dashboard'
  }).state('hmis', {
    url: '/dashboard/hmis',
    template: require('./dash.hmis.html'),
    controller: 'DashboardController',
    controllerAs: 'dashboard'
  }).state('surveys', {
    url: '/dashboard/surveys',
    template: require('./dash.surveys.html'),
    controller: 'DashboardController',
    controllerAs: 'dashboard'
  });
}