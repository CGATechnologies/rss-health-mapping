import angular from 'angular';

export default class HrisTableController {
  constructor(hrisTable) {

    const self = this;
    self.dataLoaded = false;
    hrisTable.getAllHrisData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.items = dataResponse;
        self.facilities = self.items.data;
        self.sortType = 'staff';
        self.sortReverse = false;
        self.searchHris = '';
        self.dataLoaded = true;
      });
  }
}

HrisTableController.$inject = [ 'hrisTable' ];

