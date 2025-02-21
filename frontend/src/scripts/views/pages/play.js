import DBSource from "../../data/db-source";
import functionMap from "../../globals/function-map";
import quizOption from "../../globals/quiz-option";
import UrlParser from "../../routes/url-parser";
import generateQuiz from "../../utils/generate-quiz";
import HeaderController from "../../utils/header-controller";
import { showPointer } from "../../utils/play-handler";
import { createMainQuiz, createResultQuiz, createSubQuiz } from "../templates/template-creator";

const Play = {
  async render() {
    return `
      <div class="play">
        <div class="top-section">
          <button id="btnBack">
            <i class="fa-solid fa-arrow-left-long"></i>
          </button>
          <p class="quiz-info"><span class="modul-name"></span> - Level <span class="level">0</span></p>
        </div>
        <div class="play-container">
          <div class="gl-progress-bar">
            <div class="gl-minor-progress">
              <img class="water" src="./rewards/plants/water-drop.png">
              <img class="water" src="./rewards/plants/water-drop.png">
              <img class="water" src="./rewards/plants/water-drop.png">
              <img class="water" src="./rewards/plants/water-drop.png">
              <img class="plant big" src="./rewards/plants/apple-tree.png">
            </div>
            <div class="gl-minor-progress">
              <span class="bullet wrong"></span>
              <span class="bullet active"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <img class="plant" src="./rewards/plants/sprout.png">
            </div>
            <div class="gl-minor-progress">
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <img class="plant" src="./rewards/plants/sprout.png">
            </div>
            <div class="gl-minor-progress">
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <img class="plant" src="./rewards/plants/sprout.png">
            </div>
            <div class="gl-minor-progress">
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
              <img class="plant" src="./rewards/plants/sprout.png">
            </div>
          </div>
          <div class="quiz-title">
            <p>Tutorial</p>
          </div>
          <div class="quiz-content">
          </div>
        </div>
        <div id="imageModal">
          <div class="modal-content">
            <img src="./illustrations-quiz/gl-1-1a.png" class="modal-image">
            <button id="closeModalBtn" class="close-btn">×</button>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const header = document.getElementById('app-bar');
    HeaderController.hideHeader(header);
    const content = document.querySelector('#content');
    const playContainer = document.querySelector('.play');
    const btnBack = document.querySelector('.play #btnBack');
    const levelQuiz = document.querySelector('.quiz-info .level');
    const modulName = document.querySelector('.quiz-info .modul-name')

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const cityName = url.cityName;
    const level = url.level;
    const backgroundURL = `url(./wallpapers/${cityName.replace('%20', '-')}/${Number(level) + 1}.png)`;
    playContainer.style.backgroundImage = backgroundURL;
    content.style.padding = 0;

    btnBack.addEventListener('click', () => {
      window.location.href = `#/game/${cityName}`;
    });

    levelQuiz.innerText = level;

    const getCity = await DBSource.getCityByName(cityName);
    const city = getCity.data[0];
    const getModul = await DBSource.getModul(city.id);
    const modul = getModul.data[0];
    modulName.innerText = modul['modul_name'];

    const detailQuiz = generateQuiz(modul.id, level);
    
    this.displayQuiz(detailQuiz, 0);
  },

  displayQuiz(detailQuiz, mainIndex) {
    const step = 1;

    const quizWrapper = document.querySelector('.quiz-content');
    quizWrapper.innerHTML += createMainQuiz(detailQuiz.main[mainIndex].question);
    const currentMainId = detailQuiz.main[mainIndex].id;
  

    this.displayStep(currentMainId, detailQuiz.sub, step);
  },

  displayStep(mainId, stepQuiz, step) {
    const quizWrapper = document.querySelector('.quiz-content');

    const stepId = this.stepChecker(mainId, step);

    const currentStep = stepQuiz.find(quiz => quiz.step === stepId);

    const question = currentStep.question;
    const templateName = currentStep.answerTemplateName;
    const answerTemplate = createResultQuiz(functionMap[templateName](mainId, currentStep));
    

    if (step === 1) {
      quizWrapper.innerHTML += createSubQuiz(step, question) + answerTemplate.htmlElement;
      
    } else {
      const stepLabel = document.querySelector('.sub-quiz h2')
      const questionWrapper = document.querySelector('.sub-quiz p');
      const resultContainer = document.querySelector('.result');
      stepLabel.innerText = `Step ${step}`
      questionWrapper.innerText = question;
      resultContainer.innerHTML = answerTemplate.htmlElement;
    }

    
    const focusInput = document.querySelector('.initial-focus');
    focusInput?.focus();

    if (mainId === 1) {
      showPointer(mainId, step, templateName);
    }

    
    this.gameHandler(mainId, stepQuiz, stepId)
    
  },

  gameHandler(mainId, stepQuiz, step) {
    const currentStep = stepQuiz.find(quiz => quiz.step === step);
    const stepHandler = currentStep.functionHandler;
    const templateName = currentStep.answerTemplateName;

    stepHandler.forEach(handler => {
      functionMap[handler](mainId, stepQuiz, step)
    });

    

  },

  // Untuk mengecek step ke 4
  stepChecker(mainId, step) {
    if (mainId === 1 && step !== 4) {
      return step;
    }

    const choicesAnswer = quizOption.find(opt => opt.mainQuizId === mainId && opt.subQuizId === step - 1);

    const correctAnswer = choicesAnswer.choices.find(opt => opt.isCorrect === true);

    if (correctAnswer.answer === "Tidak") {
      return step + 1;
    }
  }
}

export default Play;