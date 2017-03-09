import angular from 'angular';
import uirouter from 'angular-ui-router';

import './home.css';

import routing from './home.routes';
import HomeController from './home.controller';
import home from './home.service';

export default angular.module('app.home', [ uirouter, home ])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;