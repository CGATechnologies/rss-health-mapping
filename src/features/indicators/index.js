import angular from 'angular';
import uirouter from 'angular-ui-router';

import './indicators.css';

import routing from './indicators.routes';
import IndicatorsController from './indicators.controller';
import availability from './serviceAvailability.service';
import readiness from './serviceReadiness.service';

export default angular
  .module('app.indicators', [uirouter, readiness, availability])
  .config(routing)
  .controller('IndicatorsController', IndicatorsController)
  .name;