routes.$inject = [ '$stateProvider' ];

export default function routes($stateProvider) {
  $stateProvider
    .state('map', {
      url: '/',
      template: require('./map.html'),
      controller: 'MapController',
      controllerAs: 'map'
    });
}