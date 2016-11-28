import angular from 'angular';
import uirouter from 'angular-ui-router';

import './facility.css';

import routing from './facility.routes';
import FacilityController from './facility.controller';
import facilityService from './facility.service';

export default angular.module('app.facility', [uirouter, facilityService])
  .config(routing)
  .controller('FacilityController', FacilityController)
  .name;