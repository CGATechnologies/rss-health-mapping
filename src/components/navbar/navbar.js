class NavBarController {

  /*@ngInject*/
  constructor() {

    this.brand = 'South Sudan Health Info';

    this.items = [ {
      href: '/map',
      label: 'Map',
      isActive: true
    },
    {
      href: '/dashboard',
      label: 'Dashboard',
      isActive: true
    },
    {
      href: '/health-pillars',
      label: 'Health Pillars',
      isActive: true
    },
    {
      href: '/tables',
      label: 'Tables',
      isActive: true
    },
    {
      href: '/about',
      label: 'About',
      isActive: true
    }];

  }

  onItemClicked(clickedItem) {
    this.items = this.items.map((item) => {
      item.isActive = item.label === clickedItem.label;
      return item;
    });
  }
}

const Navbar = {
  template: require('./navbar.html'),
  controller: NavBarController
};

export default Navbar;
