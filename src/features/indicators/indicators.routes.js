routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider.state('indicators', {
    url: '/indicators',
    template: require('./indicators.html'),
    controller: 'IndicatorsController',
    controllerAs: 'ind'
  }).state('readiness', {
    url: '/indicators/service-readiness',
    template: require('./indicators.readiness.html'),
    controller: 'IndicatorsController',
    controllerAs: 'ind'
  }).state('availability', {
    url: '/indicators/service-availability',
    template: require('./indicators.availability.html'),
    controller: 'IndicatorsController',
    controllerAs: 'ind'
  });
}