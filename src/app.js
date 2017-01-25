// import angular and ui-router
import angular from 'angular';
import uirouter from 'angular-ui-router';

// import highcharts and highcharts-ng
import highcharts from 'highcharts';
import 'highcharts-ng';

// import CSS, FA, and bootstrap
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

// import NavBar and other components
import Components from './components';

// import config file and modules here
import routing from './app.config';
import home from './features/home';
import facility from './features/facility';
import dashboard from './features/dashboard';
import table from './features/data-tables';

angular.module('app', [ uirouter, home, facility, dashboard, table, Components, "highcharts-ng" ])
  // .directive('app', app)
  // .controller('AppCtrl', AppCtrl)
  .config(routing);

// export default MODULE_NAME;