export default class HomeController {
  constructor(home) {

    this.indicators = [
      { name: "Abiemnon", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Abyei", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Akobo", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Akoka", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Anzara", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Aweil Centre", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Aweil East", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Aweil North", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Aweil South", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Aweil West", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Awerial", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Ayod", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Bagari", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Bor", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Budi", service: 10, outcomes: 30, funding: "$ XXXX" },
      { name: "Cueibet", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Duk", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Ezo", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Fangak", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Gogrial East", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Gogrial West", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Guit", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Ibba", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Ikotos", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Juba", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Jur River", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Kajo Keji", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Kapoeta East", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Kapoeta North", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Kapoeta South", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Koch", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Kodok", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Lainya", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Leer", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Longuchuk", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Lopa/Lafon", service: 30, outcomes: 30, funding: "$ XXXX" },
      { name: "Maban", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Magwi", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Maiwut", service: 10, outcomes: 30, funding: "$ XXXX" },
      { name: "Malakal", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Manyo", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Maridi", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Mayendit", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Mayom", service: 10, outcomes: 30, funding: "$ XXXX" },
      { name: "Melut", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Morobo", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Mundri East", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Mundri West", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Mvolo", service: 10, outcomes: 10, funding: "$ XXXX" },
      { name: "Nagero", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Nasir", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Nyirol", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Panrieng", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Panyijar", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Panyikang", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Pibor", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Pigi", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Pochalla", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Raga", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Renk", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Rubkona", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Rumbek Centre", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Rumbek East", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Rumbek North", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Tambura", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Terekeka", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Tonj East", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Tonj North", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Tonj South", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Torit", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Twic", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Twic East", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Ulang", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Uror", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Wulu", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Yambio", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Yei", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Yirol East", service: 30, outcomes: 10, funding: "$ XXXX" },
      { name: "Yirol West", service: 30, outcomes: 10, funding: "$ XXXX" },
    ];

    this.searchIndicators = '';
    const self = this;

    console.log(self.indicators);


    //Inject the cartoMap Service
    home.getIndicatorData();
    self.indicators = this.indicators;
  }
}

HomeController.$inject = [ 'home' ];