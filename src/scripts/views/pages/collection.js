import { createButtonBackToLobby } from "../templates/template-creator";

const Collection = {
  async render() {
    return `
      <h1>Ini adalah halaman Koleksi</h1>
    `;
  },

  async afterRender() {
    const contentContainer = document.querySelector('#content');

    contentContainer.innerHTML = createButtonBackToLobby();

    const btnBackToLobby = document.querySelector('.btn-back-to-lobby');

    btnBackToLobby.addEventListener('click', (e) => {
      e.preventDefault();

      window.location.href = '/';
    })
  },
};

export default Collection;