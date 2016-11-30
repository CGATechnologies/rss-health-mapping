// import 'ng-table';

// export default class TableController {
//   constructor(NgTableParams) {

//     var facilities = [
//       { id: 1, name: 'fac 1', state: 'Lol', county: 'test county', status: 'open'},
//       { id: 2, name: 'fac 2', state: 'Gok', county: 'test county', status: 'closed'},
//       { id: 3, name: 'fac 3', state: 'Jubek', county: 'test county', status: 'open'},
//       { id: 4, name: 'fac 4', state: 'Lainya', county: 'test county', status: 'open'}
//     ]; 


//     // mainTable.getMainTableData()
//     //   // Process data in the 'then' callback below
//     //   .then()

//     // Put update function here
//     this.tableParams = new NgTableParams({}, {
//       dataset: facilities
//     });
//   }
// }

// TableController.$inject = ['NgTableParams'];

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

