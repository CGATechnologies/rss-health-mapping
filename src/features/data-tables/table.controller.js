import angular from 'angular';

export default class hrisTableController {

  constructor(hrisTable) {

    const self = this;
    hrisTable.getAllHrisData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.items = dataResponse;
        self.facilities = self.items.data;
        self.sortType = 'fName';
        self.sortReverse = false;
        self.searchTable = '';
      });
  }
}

hrisTableController.$inject = ['hrisTable'];

