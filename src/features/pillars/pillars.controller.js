import angular from 'angular';

export default class PillarController {
  constructor(pillarService) {

    const self = this;

    pillarService.getPillarData();

  }
}

PillarController.$inject = [ 'pillarService' ];