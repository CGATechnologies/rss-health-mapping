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
        // console.log(self.facilities);

        self.cleanFac = self.facilities;
        for (let i = 0; i < self.facilities.length; i++) {
          delete self.cleanFac[ i ].CID;
          delete self.cleanFac[ i ].PID;
          delete self.cleanFac[ i ].RoleCount;
          delete self.cleanFac[ i ].TS;
          delete self.cleanFac[ i ].fMDA;
          delete self.cleanFac[ i ].fPayam;
          delete self.cleanFac[ i ].UID;
          delete self.cleanFac[ i ].fAddress;
          delete self.cleanFac[ i ].$$hashKey;
        }
        console.log(self.cleanFac);

        self.sortType = '';
        self.sortReverse = false;
        self.searchHris = '';
        self.dataLoaded = true;
      });
  }
}

HrisTableController.$inject = [ 'hrisTable' ];

