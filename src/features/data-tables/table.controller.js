import angular from 'angular';
import 'ng-table';

// const templateUrl = require('./my-table.component.html');

export default class MyTableController {

  constructor(NgTableParams, hrissTable) {

    const self = this;
    hrissTable.getAllHrissData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.items = dataResponse;
        self.facilities = self.items.data;
        self.tableParams = new NgTableParams({}, {
          dataset: self.facilities
        });
      });
  }
}

MyTableController.$inject = ['NgTableParams', 'hrissTable'];

