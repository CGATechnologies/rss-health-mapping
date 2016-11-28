// import angular and ui-router
import angular from 'angular';
import uirouter from 'angular-ui-router';

// import CSS and bootstrap
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.css';

// import NavBar
import Components from './components';


// import config file and modules here
import routing from './app.config';
import home from './features/home';
import facility from './features/facility';

// let app = () => {
//   return {
//     template: require('./app.html'),
//     controller: 'AppCtrl',
//     controllerAs: 'app'
//   }
// };

// class AppCtrl {
//   constructor() {
//     this.url = 'https://github.com/preboot/angular-webpack';
//   }
// }

// const MODULE_NAME = 'app';

angular.module('app', [uirouter, home, facility, Components])
  // .directive('app', app)
  // .controller('AppCtrl', AppCtrl)
  .config(routing);

// export default MODULE_NAME;