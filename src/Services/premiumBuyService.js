import axios from "axios";
import _ from "lodash";
import { getCurrUser } from "../Services/balanceService";

export const removeUnpaidQuestions = (removeQuestions, quiz) => {
  let newQuestions = _.cloneDeep(quiz.questions);
  let fixedQuestions = [];
  for (var i = 0; i < newQuestions.length; i++) {
    if (!removeQuestions[i + 1]) {
      fixedQuestions.push(newQuestions[i]);
    }
  }
  quiz.questions = fixedQuestions;
  quiz.hidden = removeQuestions;
  return quiz;
};

export const premiumBuyService = async (quiz, amount) => {
  try {
    //  amount, userId, creatorId, quizId, hidden
    const userId = getCurrUser()._id;
    const bought = await axios.post("api/users/tradeFunds", {
      amount,
      userId,
      creatorId: quiz.creatorId,
      quizId: quiz._id,
      hidden: quiz.hidden,
    });
    return bought.data;
  } catch (error) {
    console.log(`You had a problem at premiumBuyService.js/premiumBuyService`);
  }
};
