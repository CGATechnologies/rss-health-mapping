import angular from 'angular';
import uirouter from 'angular-ui-router';

import './table.css';

import routing from './table.routes';
import MyTableController from './table.controller';
// import mainTable from './mainTable.service';
// Import other dashboard services here

export default angular.module('app.table', [uirouter])
  .config(routing)
  .controller('MyTableController', MyTableController)
  .name;