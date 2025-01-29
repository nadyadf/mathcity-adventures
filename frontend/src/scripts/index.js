import 'regenerator-runtime';
import '../styles/variables.css';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/app';

const app = new App({
  button: [
    document.querySelector('#btn-profile'), 
    document.querySelector('#humberger-button'),
    document.querySelector('#btn-logout'),
  ],
  drawer: [
    document.querySelector('.profile-menu'), 
    document.querySelector('#navigation-drawer'),
  ],
  content: document.querySelector('#content'),
  body: document.getElementsByTagName('body')[0],
  header: document.getElementById('app-bar'),
  menuItem: [
    document.querySelectorAll('.app-bar .app-bar__navigation ul li a')[0],
    document.querySelectorAll('.app-bar .app-bar__navigation ul li a')[1]
  ],
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});