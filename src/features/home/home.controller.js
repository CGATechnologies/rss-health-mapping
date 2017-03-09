export default class HomeController {
  constructor(cartoMap) {

    const self = this;
    //Inject the cartoMap Service
    cartoMap.getIndicatorData();
  }
}

HomeController.$inject = [ 'home' ];