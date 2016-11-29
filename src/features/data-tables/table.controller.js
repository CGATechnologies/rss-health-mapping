export default class TableController {
  constructor(mainTable) {
    mainTable.getMainTableData()
      // Process data in the 'then' callback below
      .then()

    // Put update function here
  }
}

TableController.$inject = ['mainTable'];