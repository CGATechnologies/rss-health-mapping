import angular from 'angular';
import uirouter from 'angular-ui-router';

import './about.css';

import routing from './about.routes';
import AboutController from './about.controller';
import about from './about.service';

export default angular.module('app.home', [ uirouter, about ])
  .config(routing)
  .controller('AboutController', AboutController)
  .name;