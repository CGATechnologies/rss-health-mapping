export default class MapController {
  constructor(cartoMap) {

    const self = this;
    //Inject the cartoMap Service
    cartoMap.loadMap();
  }
}

MapController.$inject = [ 'cartoMap' ];