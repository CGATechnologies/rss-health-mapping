export default class HomeController {
  constructor(cartoMap) {

    //Inject the cartoMap Service
    cartoMap.loadMap()
    this.name = 'World';
  }

  changeName() {
    this.name = 'angular-tips';
  }
}

HomeController.$inject = ['cartoMap'];