export default class MapController {
  constructor(cartoMap) {

    const self = this;
    //Inject the cartoMap Service
    cartoMap.loadMap();
    // cartoMap.createLayer();
    // cartoMap.createSelector();
  }
}

MapController.$inject = [ 'cartoMap' ];