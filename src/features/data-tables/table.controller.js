import angular from 'angular';

export default class hrisTableController {

  constructor(hrisTable) {

    const self = this;
    hrisTable.getAllHrisData()
      // Process data in the 'then' callback below
      .then(function (dataResponse) {
        self.items = dataResponse;
        self.facilities = self.items.data;
        self.sortType = '';
        self.sortReverse = false;
        self.searchHris = '';
      });
  }
}

hrisTableController.$inject = ['hrisTable'];

