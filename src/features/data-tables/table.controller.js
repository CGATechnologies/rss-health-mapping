import angular from 'angular';
import 'ng-table';

// const templateUrl = require('./my-table.component.html');

export default class MyTableController {

  constructor(NgTableParams, hrissTable) {


    this.facilities = [
      { name: "Moroni", status: 'open', state: 'Lol', 'county': 'county1' },
      { name: "Tiancum", status: 'closed', state: 'Gok', 'county': 'county2' },
      { name: "Jacob", status: 'open', state: 'Jubek', 'county': 'county3' },
    ];

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

