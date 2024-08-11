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

const createCategoryCardsContainer = (cityName) => `
  <div class="category-cards-container">
    <div class="label">
      <span></span>
      <p class="gallery__category-title">
        ${cityName}
      </p>
    </div>
    <div class="wrapper"></div>
  </div>
`;

const createEmptyCard = () => `
  <div class="gallery__empty-card">
    <img class="question-mark" src="question-mark.png" >
  </div>
`;

const createGalleryCard = (spots) => `
  <div class="gallery__card">
    <img class="badge-card" src="gallery-card.png">
    <div class="gallery__card-content">
      <img src="./secret-spots/${spots.imgUrl}" >
      <p>${spots.spotName}</p>
    </div>
  </div>
`

export { createCitySliderTemplate, createGreetingBubble, createButtonBackToLobby, createCategoryCardsContainer, createEmptyCard, createGalleryCard };