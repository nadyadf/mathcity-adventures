import { createButtonBackToLobby, createCategoryCardsContainer, createEmptyCard, createGalleryCard } from "../templates/template-creator";
import Cities from "../../globals/cities";
import CitySpots from "../../globals/city-spots";

const Gallery = {
  async render() {
    return `
    <div class="gallery">
      <div class="gallery__title-container">
        <div class="gallery__title-decor cities-left">
          <img src="./title-decor/city2.png">
          <img src="./title-decor/city4.png">
          <img src="./title-decor/city3.png">
        </div>
        <p>Galeri Spot Rahasia</p>
        <div class="gallery__title-decor cities-right">
          <img src="./title-decor/city.png">
          <img src="./title-decor/city4-backwards.png">
          <img src="./title-decor/city2-backwards.png">
        </div>
      </div>
      <div class="gallery__cards-container"></div>
    </div>
    `;
  },

  async afterRender() {
    const contentContainer = document.querySelector('#content');

    contentContainer.innerHTML += createButtonBackToLobby();

    const btnBackToLobby = document.querySelector('.btn-back-to-lobby');

    btnBackToLobby.addEventListener('click', (e) => {
      e.preventDefault();

      window.location.href = '/';
    });

    const galleryCardsContainer = document.querySelector('.gallery__cards-container');

    Cities.forEach(city => {
      galleryCardsContainer.innerHTML += createCategoryCardsContainer(city.cityName);
    });

    const categoryCardsContainer = document.querySelectorAll('.category-cards-container .wrapper');
    let emptyCard;
    
    categoryCardsContainer.forEach(el => {
      for (let i = 0; i < 5; i++) {
        el.innerHTML += createEmptyCard();
      }
    });

    const citySpots = CitySpots;
    let spots;
    spots = citySpots.filter((citySpots) => citySpots.cityName === "Green Land");
        console.log(spots);
    categoryCardsContainer.forEach(el => {
      
      emptyCard = el.querySelectorAll('.gallery__empty-card');
      for (let i = 0; i < 2; i++) {
        el.removeChild(emptyCard[i]);
        el.insertAdjacentHTML("afterbegin", createGalleryCard(spots[0].spots[i]));
        
      }
    });
  },
};

export default Gallery;