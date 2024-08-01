const createCitySliderTemplate = (city) => `
  <div class="slide-wrapper">
    <div class="side-container">
      <img src="information.png" >
      <div class="city-info">
        <ul>
          <li>Nama kota: <span>${city.cityName}</span></li>
          <li>Jumlah pengunjung: <span>${city.visitors}</span></li>
          <li>Peringkatmu: <span>2</span></li>
          <li>Skor tertinggimu: <span>70</span></li>
        </ul>
        <button id="leaderboard" onclick="window.location.href='#/leaderboard'">
          <img src="podium.png" />
        </button>
      </div>
    </div>
    <div class="cities">
      <h2 class="title">${city.cityName}</h2>
      <div class="image-city-slider">
        <button class="btn-city-info">
          <img src="info.png">
        </button>
        <div class="city-info">
          <ul>
            <li>Nama kota: <span>${city.cityName}</span></li>
            <li>Jumlah pengunjung: <span>${city.visitors}</span></li>
            <li>Peringkatmu: <span>2</span></li>
            <li>Skor tertinggimu: <span>70</span></li>
          </ul>
        </div>
        <button class="arrow prev" >&#10094</button>
        <img class="city-picture" src="${city.imgUrl}">
        <img class="padlock" src="padlock.png">
        <button class="btn-buy-city">
          Buka Kota: <span>${city.price}</span>
          <img src="candy.png">
        </button>
        <button class="arrow next">&#10095</button>      
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
  </div>
`;

const createGreetingBubble = (username) => `
  <div class="bubble-chat">
    <img src="bubble.png" >
    <p>Halo <span>${username}</span>, ayo jelajahi lebih banyak kota menarik dengan bermain game matematika!</p>
  </div>
`;

const createButtonBackToLobby = () => `
  <button class="btn-back-to-lobby">
    <i class="fa-solid fa-house"></i>
    <p>Kembali ke Lobby</p>
  </button>
`;

export { createCitySliderTemplate, createGreetingBubble, createButtonBackToLobby };