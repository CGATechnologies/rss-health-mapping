import angular from 'angular';
import uirouter from 'angular-ui-router';

import './table.css';

import routing from './table.routes';
import MyTableController from './table.controller';
import hrisTable from './hrisTable.service';
// Import other dashboard services here

export default angular.module('app.table', [uirouter, hrisTable])
  .config(routing)
  .controller('MyTableController', MyTableController)
  .name;