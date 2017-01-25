import angular from 'angular';
import uirouter from 'angular-ui-router';

import './table.css';

import routing from './table.routes';
import HrisTableController from './table.controller';
import hrisTable from './hrisTable.service';
// Import other dashboard services here

export default angular.module('app.table', [ uirouter, hrisTable ])
  .config(routing)
  .controller('HrisTableController', HrisTableController)
  .name;