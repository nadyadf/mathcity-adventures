import DBSource from "../../data/db-source";
import UrlParser from "../../routes/url-parser";
import HeaderController from "../../utils/header-controller";
import { createButtonLevel } from "../templates/template-creator";

/*  */

const Level = {
  async render() {
    return `
      <div class="level-container">
        <div class="overlay"></div>
        <div class="title-label">
          <div class="bg-label">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img src="./title-decor/diamond.png" class="diamond">
          <img src="./title-decor/label-level.png" class="label-level">
          <p class="title-text">
            Tema: </br>
            <span></span>
          </p>
        </div>
        <div class="game-details">
          <button class="btn-mission" id="btnMission" tooltip="Misi">
            <i class="fa-solid fa-flag"></i>
          </button>
          <p>Skor Tertinggi: 
            <span class="high-score"></span>
          </p>
        </div>
        <div class="button-wrapper">
          
        </div>
        <button id="btnBack"><i class="fa-solid fa-house-chimney"></i></button>
        <div class="modal-mission hide">
          <div class="modal-mission__header">
            <p class="modal-mission__title">
              Misi <i class="fa-solid fa-flag"></i>
            </p>
            <button class="btn-close trigger" href="#">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div class="modal-mission__content">
            <p class="mission-GL">
              Di kota Green Land, kamu akan mengumpulkan tanaman yang didapatkan selama bermain. Semakin banyak jawaban yang berhasil dijawab dengan benar, maka semakin tumbuh dengan sempurna tanaman yang didapatkan.<br/> Setiap tanaman yang didapat akan ditukarkan dengan candy pada akhir permainan. Setiap jenis tanaman memiliki nilai candy yang berbeda-beda tergantung tingkatannya: <br/>
                <img src="plants-convert.png">
            </p>
          </div>
          <button class="btn-ok">Oke, mengerti!</button>
        </div>
      </div>
    `;
  }, 
  
  async afterRender() {
    const header = document.getElementById('app-bar')
    HeaderController.hideHeader(header);
    const levelContainer = document.querySelector('.level-container');
    const content = document.querySelector('#content');
    const highScoreEl = document.querySelector('.high-score');
    const btnCloseMission = document.querySelector('.modal-mission .btn-close');
    const missionModal = document.querySelector('.modal-mission');
    const btnMission = document.querySelector('.btn-mission');
    const btnOkMission = document.querySelector('.modal-mission .btn-ok');

    const from = sessionStorage.getItem('from');

    if (from === 'lobby') {
      missionModal.style.display = 'block';
      
      sessionStorage.removeItem('from');
      setTimeout(() => {
        missionModal.classList.remove('hide'); 
        this._unableButton();     
      }, 500);
    }

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    
    const cityName = url.cityName;
    const backgroundURL = `url(./wallpapers/${cityName.replace('%20', '-')}/1.png)`;
    levelContainer.style.backgroundImage = backgroundURL;
    content.style.padding = 0;

    const getCity = await DBSource.getCityByName(cityName);
    const city = getCity.data[0];
    const getModul = await DBSource.getModul(city.id);
    const modul = getModul.data[0];
    const levelTitle = document.querySelector('.title-text span');
    levelTitle.innerText = modul['modul_name'];

    
    const student = JSON.parse(localStorage.getItem('user'));
    const getScore = await DBSource.getStudentCityProgress(student.id, city.id);
    highScoreEl.innerText = getScore.data.exp;

    const buttonWrapper = document.querySelector('.button-wrapper');
    for (let i = 0; i < modul['num_of_level']; i++) {
      buttonWrapper.innerHTML += createButtonLevel(i+1);
    }

    const button = document.querySelectorAll('.button-lv-pushable');
    button.forEach((opt, index) => {
      const buttonText = opt.querySelector('.button-lv-front');
      if (index > 3) {
        opt.classList.add('locked');
        buttonText.innerHTML += '<i class="fa-solid fa-lock"></i>'
      }

      opt.addEventListener('click', () => {
        const numLevel = index + 1;
        window.location.href = `#/game/${url.cityName}/level/${numLevel}/tutorial`;
      })
    });

    const btnBack = document.querySelector('#btnBack');
    btnBack.addEventListener('click', () => {
      window.location.href = `#/lobby?id=${localStorage.getItem('id')}`;
    });

    btnCloseMission.addEventListener('click', () => {
      missionModal.classList.add('hide');
      btnMission.style.visibility = 'visible';
      this._activateButton();
    });

    btnMission.addEventListener('click', () => {
        // show modal
      const missionModal = document.querySelector('.modal-mission');
      missionModal.style.display = 'block';
      setTimeout(() => {
        missionModal.classList.remove('hide');
      }, 100);
      
      btnMission.style.visibility = 'hidden';
      this._unableButton();
    });

    btnOkMission.addEventListener('click', () => {
      missionModal.classList.add('hide');
      btnMission.style.visibility = 'visible';
      this._activateButton();
    });
  },

  _unableButton() {
    const btnLevel = document.querySelectorAll('.button-lv-pushable');

    const btnMission = document.querySelector('.btn-mission');

    btnMission.style.visibility = 'hidden';

    btnLevel.forEach(el => {
      el.style.pointerEvents = 'none';
    });

  },

  _activateButton() {
    const btnLevel = document.querySelectorAll('.button-lv-pushable');
    const btnMission = document.querySelector('.btn-mission');

    btnMission.style.visibility = 'visible';

    btnLevel.forEach(el => {
      el.style.pointerEvents = 'all';
    });

    // remove modal
    const missionModal = document.querySelector('.modal-mission');
    setTimeout(() => {
      missionModal.style.display = 'none';
    }, 1000);
  },

  _toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }
}

export default Level;