const DrawerInitiator = {
  init({ button, drawer, content, menuItem }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    for (let i = 0; i < menuItem.length; i++) {
      menuItem[i].addEventListener('click', (event) => {
        this._closeDrawer(event, drawer);
      })
    }
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;