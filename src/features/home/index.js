import angular from 'angular';
import uirouter from 'angular-ui-router';

import './home.css';

import routing from './home.routes';
import HomeController from './home.controller';
import cartoMap from './cartoMap.service';

export default angular.module('app.home', [uirouter, cartoMap])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;