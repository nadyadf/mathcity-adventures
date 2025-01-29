import quizOption from "../globals/quiz-option";
import Play from "../views/pages/play";



const numberInputValidation = () => {
  const numberInput = document.querySelectorAll('.number-input.show');

  numberInput.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^0-9]/g, '');
      areAllInputsFilledIn();
    });
  });
};

const calcHandler = () => {
  const numberButtons = document.querySelectorAll('.number-buttons button');
  
  numberButtons.forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!btn.hasAttribute('id')) {
        const number = btn.textContent;
        insertTextAtCursor(number);
      } else {
        switch (btn.id) {
          case 'deleteNumber':
            deleteNumberInput();
            break;
          case 'fractionMode':
            toggleFractionMode();
            break;
          default:
            break;
        }
      }
      areAllInputsFilledIn();
    });
  });
}

const fractionToggler = () => {
  const btnFraction = document.querySelector('.btn-fraction');
  const numberInput = document.querySelectorAll('.number-input');
  
  numberInput.forEach(input => {
    input.addEventListener('focus', () => {
      if (input.id === 'firstNum' || input.id === 'secondNum') {
        btnFraction.classList.remove('active');
      } else {
        btnFraction.classList.add('active');
      }
    });

    input.addEventListener('blur', () => {
      btnFraction.classList.remove('active');
    });
  });
}

const areAllInputsFilledIn = () => {
  const numberInputs = document.querySelectorAll('.number-input.show');
  const btnSubmitResult = document.querySelector('#btnSubmitResult');
  const numberOfInputs = numberInputs.length;
  let filledInput = 0


  numberInputs.forEach(input => {
    if (input.value.length >= 1) {
      filledInput++;
    }
  });

  if (numberOfInputs === filledInput) {
    btnSubmitResult.classList.add('active');
  } else {
    btnSubmitResult.classList.remove('active');
  }
};

const toggleFractionMode = () => {
  const activeInput = document.activeElement;
  const firstFractionContainer = document.querySelector('.fraction-container.first');
  const secondFractionContainer = document.querySelector('.fraction-container.second');
  const firstRealNum = document.querySelector('#firstNum');
  const secondRealNum = document.querySelector('#secondNum');
  const firstNumerator = document.querySelector('.fraction-container.first #numerator');
  const secondNumerator = document.querySelector('.fraction-container.second #numerator');
  const firstDenominator = document.querySelector('.fraction-container.first #denominator');
  const secondDenominator = document.querySelector('.fraction-container.second #denominator');
  const fractionInput = document.querySelectorAll('.fraction-container input');
  

  if (activeInput.classList.contains('first-fraction')) {
    fractionInput.forEach(el => {
      el.classList.remove('show');
    });
    firstFractionContainer.classList.remove('show');
    firstRealNum.classList.add('show');
    firstRealNum.focus();
  } else if (activeInput.classList.contains('second-fraction')) {
    fractionInput.forEach(el => {
      el.classList.remove('show');
    });
    secondFractionContainer.classList.remove('show');
    secondRealNum.classList.add('show');
    secondRealNum.focus();
  } else if (activeInput.id === 'firstNum') {
    firstFractionContainer.classList.add('show');
    firstDenominator.classList.add('show');
    firstNumerator.classList.add('show');
    firstRealNum.classList.remove('show');
    firstNumerator.focus();
  } else if (activeInput.id === 'secondNum') {
    secondDenominator.classList.add('show');
    secondNumerator.classList.add('show');
    secondFractionContainer.classList.add('show');
    secondRealNum.classList.remove('show');
    secondNumerator.focus();
  }
}

const submitStepHandler = (mainIndex, stepQuiz, step) => {
  const btnSubmitResult = document.querySelector('.btn-submit-result');
  
  btnSubmitResult.addEventListener('click', () => {
    step++;
    Play.displayStep(mainIndex, stepQuiz, step);
  });
}

const deleteNumberInput = () => {
    const activeInput = document.activeElement;
  
    const start = activeInput.selectionStart;
    const end = activeInput.selectionEnd;
  
    if (start === end) {
      if (start > 0) {
        const beforeCursor = activeInput.value.slice(0, start - 1);
        const afterCursor = activeInput.value.slice(start);

        activeInput.value = beforeCursor + afterCursor;

        activeInput.setSelectionRange(start - 1, start - 1);
      }
    } else {
        const beforeCursor = activeInput.value.slice(0, start);
        const afterCursor = activeInput.value.slice(end);
  
        activeInput.value = beforeCursor + afterCursor;
 
        activeInput.setSelectionRange(start, start);
    }
  }

const insertTextAtCursor = (text) => {
  const activeInput = document.activeElement;
  const secondInput = document.querySelector('#secondNum');

  if (activeInput.tagName === 'INPUT' && activeInput.value.length < 2) {
    const cursorPosition = activeInput.selectionStart; 
    const currentText = activeInput.value;
    
    const beforeCursor = currentText.substring(0, cursorPosition);
    const afterCursor = currentText.substring(cursorPosition);

    
    activeInput.value = beforeCursor + text + afterCursor;

    activeInput.setSelectionRange(cursorPosition + text.length, cursorPosition + text.length);

    if (activeInput.value.length === 2) {
      if (activeInput.id === 'firstNum') {
        secondInput.focus();
      } else {
        activeInput.blur();
      }
      return;
    } 
    activeInput.focus(); // Fokus tetap pada input
  } 
  return;
}

const multiChoicesHandler = (mainId, stepQuiz, step) => {
  const btnAnswerChoices = document.querySelectorAll('.answer-choices button');

  btnAnswerChoices.forEach(btn => {
    btn.addEventListener('click', () => {
      step++;
      Play.displayStep(mainId, stepQuiz, step);
    });
  });
}

const openImageDetail = () => {
  const openImageBtn = document.querySelectorAll('.open-image-btn');
  const imageModal = document.getElementById('imageModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalImage = document.querySelector('.modal-image');
  const imageOptions = document.querySelectorAll('.answer-choices .illustration');

  openImageBtn.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const srcImage = imageOptions[index].getAttribute('src');
      modalImage.src = srcImage;
      imageModal.style.display = 'flex';
    });
  })

  closeModalBtn.addEventListener('click', () => {
    imageModal.style.display = 'none'; 
  });

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
    }
  });
}

const showFingerPoints = (mainId, step) => {
  const fingerElement = document.querySelectorAll('.finger-container');

  const stepQuiz = quizOption.find(sub => sub.mainQuizId === mainId && sub.subQuizId === step)

  const correctAnswer = stepQuiz.choices.find(opt => opt.isCorrect === true);

  console.log(correctAnswer);

  if (mainId === 1) {
    
  }
}

export { numberInputValidation, insertTextAtCursor, areAllInputsFilledIn, deleteNumberInput, toggleFractionMode, calcHandler, fractionToggler, submitStepHandler, multiChoicesHandler, openImageDetail, showFingerPoints };