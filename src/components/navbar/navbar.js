class NavBarController {

  /*@ngInject*/
  constructor() {

    this.brand = 'South Sudan Health Info';

    this.items = [{
      href: '/home',
      label: 'Home',
      isActive: true
    }, 
    {
      href: '/dashboard',
      label: 'Dashboard',
      isActive: true
    },
    {
      href: '/data',
      label: 'Data',
      isActive: true
    },
    {
      href: '/about',
      label: 'About',
      isActive: true
    }, 
    {
      href: '/contact',
      label: 'Contact',
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
