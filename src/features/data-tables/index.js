import angular from 'angular';
import uirouter from 'angular-ui-router';

import './table.css';

import routing from './table.routes';
import TableController from './table.controller';
import mainTable from './mainTable.service';
// Import other dashboard services here

export default angular.module('app.table', [uirouter, mainTable])
  .config(routing)
  .controller('TableController', TableController)
  .name;