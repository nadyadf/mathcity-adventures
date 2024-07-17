import HolderInitiator from "../../utils/holder-initiator";
import Cities from "../../globals/cities";
import { createCitySliderTemplate } from "../templates/template-creator";
import Swiper from "../../utils/swiper";

const Lobby = {
  async render() {
    return `
      <div class="lobby">
        
        <div class="greetings"></div>
      </div>
    `;
  },

  async afterRender() {

    const cities = Cities;
    const greetings = document.querySelector('.greetings');
    let currentSlide;
    let btnPrev;
    let btnNext;
    

    for (let i = 0; i < cities.length; i++) {
      greetings.insertAdjacentHTML('beforebegin', createCitySliderTemplate(cities[i]));

      currentSlide = document.querySelectorAll('.slide-wrapper')[i];

      btnPrev = currentSlide.querySelector('.prev');
      btnNext = currentSlide.querySelector('.next');

      if (i === 0) {
        btnPrev.style.visibility = 'hidden';
      } else if (i === cities.length -1) {
        btnNext.style.visibility = 'hidden';
      };

      HolderInitiator.init(
        currentSlide.querySelector('.image-city-slider .btn-city-info'),
        currentSlide.querySelector('.image-city-slider .city-info'),
      );
    }

    const slideWrapper = document.querySelectorAll('.slide-wrapper'); 

    for (let i = 0; i < cities.length; i++) {

      currentSlide = slideWrapper[i];
      

      // sideCityInfo[i].style.display = 'none';
      // currentSideInfo.style.display = 'block';

      btnPrev = currentSlide.querySelector('.prev');
      btnNext = currentSlide.querySelector('.next');

      Swiper.init({
        slides: slideWrapper,
        nextEl: btnNext,
        prevEl: btnPrev,
        slideIndex: i + 1,
      });
    }

    btnPrev = document.querySelector('.prev');
    btnNext = document.querySelector('.next');

    Swiper.init({
      slides: slideWrapper,
      nextEl: btnNext,
      prevEl: btnPrev,
      slideIndex: 1,
    });


  },
};

export default Lobby;