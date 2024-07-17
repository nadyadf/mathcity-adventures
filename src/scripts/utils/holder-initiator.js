const HolderInitiator = {
  init(button, drawer) {
    button.addEventListener('mousedown', (e) => {
      this._showDrawer(e, drawer);
    });

    button.addEventListener('mouseup', (e) => {
      this._closeDrawer(e, drawer);
    });

    button.addEventListener('mouseover', (e) => {
      this._showDrawer(e, drawer);
    });

    button.addEventListener('mouseout', (e) => {
      this._closeDrawer(e, drawer);
    });
  },

  _showDrawer(e, drawer) {
    e.preventDefault();

    drawer.style.display = 'block';
  },

  _closeDrawer(e, drawer) {
    e.preventDefault();

    drawer.style.display = 'none';
  }
}

export default HolderInitiator;