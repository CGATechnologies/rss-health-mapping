import angular from 'angular';
import uirouter from 'angular-ui-router';

import './pillars.css';

import routing from './pillars.routes';
import PillarController from './pillars.controller';
import pillarService from './pillar.service';

export default angular.module('app.pillars', [ uirouter, pillarService ])
  .config(routing)
  .controller('PillarController', PillarController)
  .name;