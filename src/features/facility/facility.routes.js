routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('facility', {
      url: '/facility/:facilityId',
      template: require('./facility.html'),
      controller: 'FacilityController',
      controllerAs: 'facility'
    });
}