export default class HomeController {
  constructor(cartoMap) {

    const self = this;
    self.dataLoaded = false;
    //Inject the cartoMap Service
    cartoMap.loadMap()
      .then(function () {
        self.dataLoaded = true;
      })
  }
}

HomeController.$inject = [ 'cartoMap' ];