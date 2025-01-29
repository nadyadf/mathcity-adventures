import { calcHandler, fractionToggler, multiChoicesHandler, numberInputValidation, openImageDetail, submitStepHandler } from "../utils/play-handler";
import { fractionAbilityToSimplify, fractionMultiplication, illustrationChoices, resultFractionMultiplication } from "../views/templates/template-creator";

const functionMap = {
  fractionMultiplication,
  resultFractionMultiplication,
  fractionAbilityToSimplify,
  numberInputValidation,
  calcHandler,
  fractionToggler,
  submitStepHandler,
  multiChoicesHandler,
  illustrationChoices,
  openImageDetail
}

export default functionMap;