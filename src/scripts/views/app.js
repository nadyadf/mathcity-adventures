import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";
import AuthService from "../utils/auth-service";
import DrawerInitiator from "../utils/drawer-initiator";

class App {
  constructor({ button, drawer, content, body, header }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._body = body;
    this._header = header;
    this._authService = new AuthService;

    this._initialAppShell();
  };

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button[0],
      drawer: this._drawer[0],
      content: this._content,
    });

    DrawerInitiator.init({
      button: this._button[1],
      drawer: this._drawer[1],
      content: this._content,
    });

    this._button[2].addEventListener('click', (event) => {
      event.preventDefault();

      this._authService.logout();
      window.location.href = '#/login';
    })
  };

  _hideHeader() {
    this._header.classList.add('hidden');
  }

  _showHeader() {
    this._header.classList.remove('hidden');
  }

  async renderPage() {
    let page;
    if (this._authService.isLoggedIn()) {
      const url = UrlParser.parseActiveUrlWithCombiner();
      page = routes[url];
    } else {
      window.location.href = '#/login';
      page = routes['/login'];
      this._hideHeader();
    }

    this._content.innerHTML = await page.render();
    await page.afterRender();
    
  };
};

export default App;