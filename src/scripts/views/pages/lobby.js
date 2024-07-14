const Lobby = {
  async render() {
    return `
      <div class="lobby">
        <div class="city-info">
          <ul>
            <li>Nama kota: GreenLand</li>
            <li>Jumlah pengunjung: 17</li>
            <li>Peringkatmu: 2</li>
            <li>Skor tertinggimu</li>
          </ul>
          <button id="leaderboard" onclick="window.location.href='#/leaderboard'">PP</button>
        </div>
        <div class="cities">
          <h2 class="title">GreenLand</h2>
          <div class="image-city-slider">
            <button class="prev">&#10094;</button>
            <img class="city-picture" src="greenland.png">
          </div>
          <button role="button" id="visit">Pergi</button>
        </div>
        <div class="greetings"></div>
      </div>
    `;
  },

  async afterRender() {

  },
};

export default Lobby;