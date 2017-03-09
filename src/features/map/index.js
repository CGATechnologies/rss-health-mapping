import angular from 'angular';
import uirouter from 'angular-ui-router';

import './map.css';

import routing from './map.routes';
import MapController from './map.controller';
import cartoMap from './cartoMap.service';

export default angular.module('app.map', [ uirouter, cartoMap ])
  .config(routing)
  .controller('MapController', MapController)
  .name;