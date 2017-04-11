export default class IndicatorsController {
  constructor(availability) {
    const self = this;

    availability.basicAmenitiesMap();
  }
}

IndicatorsController.$inject = ['availability', 'readiness'];