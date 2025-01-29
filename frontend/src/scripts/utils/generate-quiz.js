import mainQuiz from "../globals/main-quiz";
import quizOption from "../globals/quiz-option";
import subQuiz from "../globals/sub-quiz";

const getRandomQuiz = (arrQuiz, count) => {
  const shuffled = [...arrQuiz].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

const generateQuiz = (modulId, level) => {
  const detailQuiz = {
    main: [],
    sub: [],
    answerChoices: [],
  };

  detailQuiz.main.push(mainQuiz.find(quiz => quiz.modulId === modulId && quiz.difficulty === 1 && quiz.level == level));

  getRandomQuiz(
    mainQuiz.filter(quiz => quiz.modulId === modulId && quiz.level == level && quiz.difficulty === 1)
    .slice(1),
    2
  )
  .forEach(quiz => detailQuiz.main.push(quiz));

  getRandomQuiz(
    mainQuiz.filter(quiz => quiz.modulId === modulId && quiz.level == level && quiz.difficulty === 2),
    2
  )
  .forEach(quiz => detailQuiz.main.push(quiz));

  getRandomQuiz(
    mainQuiz.filter(quiz => quiz.modulId === modulId && quiz.level == level && quiz.difficulty === 3),
    1
  )
  .forEach(quiz => detailQuiz.main.push(quiz));

  subQuiz.filter(step => step.modulId === modulId && step.level == level).forEach(step => detailQuiz.sub.push(step));

  quizOption.filter(option => option.modulId === modulId && option.level == level).forEach(opt => detailQuiz.answerChoices.push(opt));

  return detailQuiz;

}

export default generateQuiz;