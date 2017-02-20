import angular from 'angular';
import uirouter from 'angular-ui-router';

import './dash.css';

import routing from './dash.routes';
import DashboardController from './dash.controller';
import dataSources from './dataSources.service';
// Import other dashboard services here

export default angular.module('app.dash', [ uirouter, dataSources ])
  .config(routing)
  .controller('DashboardController', DashboardController)
  // .service('dataSources', [ dataSources ])
  .name;