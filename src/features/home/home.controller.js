export default class HomeController {
  constructor(cartoMap) {

    //Inject the cartoMap Service
    cartoMap.loadMap();
  }
}

HomeController.$inject = [ 'cartoMap' ];