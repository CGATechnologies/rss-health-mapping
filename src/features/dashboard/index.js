import angular from 'angular';
import uirouter from 'angular-ui-router';

import './dash.css';

import routing from './dash.routes';
import DashboardController from './dash.controller';
import dataSources from './dataSources.service';
import facTypeData from './facType.service';
import facTypeComponent from './facType.component';
// import hChart from './test.directive';
// Import other dashboard services here

export default angular.module('app.dash', [ uirouter, dataSources, facTypeData ])
  .config(routing)
  .controller('DashboardController', DashboardController)
  .name;