routes.$inject = [ '$stateProvider' ];

export default function routes($stateProvider) {
  $stateProvider
    .state('pillars', {
      url: '/health-pillars',
      template: require('./pillars.html'),
      controller: 'PillarController',
      controllerAs: 'pillar'
    });
}