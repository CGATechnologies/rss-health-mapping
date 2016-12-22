import 'ng-table';

// const templateUrl = require('./my-table.component.html');

export default class MyTableController {
  constructor(NgTableParams) {
    this.facilities = [
      { name: "Moroni", status: 'open', state: 'Lol', 'county': 'county1' },
      { name: "Tiancum", status: 'closed', state: 'Gok', 'county': 'county2' },
      { name: "Jacob", status: 'open', state: 'Jubek', 'county': 'county3' },
    ];
  }

  table() {
    this.tableParams = new NgTableParams({}, {
        dataset: this.facilities
    });
    console.log(this.tableParams)
  };
}

MyTableController.$inject = ['NgTableParams'];

