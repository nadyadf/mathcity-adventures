const Lobby = {
  async render() {
    return `
      <div class="lobby">
        <div class="cities">
          <h2 class="title">GreenLand</h2>
          <div class="image-city-slider">
            <button class="btn-city-info">
              <img src="info.png">
            </button>
            <div class="city-info">
              <ul>
                <li>Nama kota: <span>GreenLand</span></li>
                <li>Jumlah pengunjung: <span>17</span></li>
                <li>Peringkatmu: <span>2</span></li>
                <li>Skor tertinggimu: <span>70</span></li>
              </ul>
              <button id="leaderboard" onclick="window.location.href='#/leaderboard'">
                <img src="podium.png" />
              </button>
            </div>
            <button class="arrow prev">&#10094;</button>
            <img class="city-picture" src="greenland.png">
            <button class="arrow next">&#10095;</button>
          </div>
          <div class="options">
            <button id="leaderboard" onclick="window.location.href='#/leaderboard'">
              <img src="podium.png" />
            </button>
            <button role="button" id="visit">
            Pergi
            <img src="plane.png" />
            </button>
          </div>
        </div>
        <div class="greetings"></div>
      </div>
    `;
  },

  async afterRender() {
    const btnCityInfo = document.querySelector('.btn-city-info');
    const cityInfo = document.querySelector('.city-info');

    btnCityInfo.addEventListener('mousedown', (e) => {
      e.preventDefault();

      cityInfo.style.display = 'block';
    });

    btnCityInfo.addEventListener('mouseup', (e) => {
      e.preventDefault();

      cityInfo.style.display = 'none';
    });

    btnCityInfo.addEventListener('mouseover', (e) => {
      e.preventDefault();

      cityInfo.style.display = 'block';
    });

    btnCityInfo.addEventListener('mouseout', (e) => {
      e.preventDefault();

      cityInfo.style.display = 'none';
    });

  },
};

export default Lobby;