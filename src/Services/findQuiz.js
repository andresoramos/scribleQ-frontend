import axios from "axios";

export function findQuiz(str, i) {
  const obj = JSON.parse(str);
  const iParsed = JSON.parse(i);
  const selectedQuiz = obj.quizzes[i];
  return selectedQuiz;
}

export function findScoreScreen(string) {
  return JSON.parse(localStorage.getItem(string));
}

export const findMarketObj = async (matchNum) => {
  const marketObj = await axios.post("/api/market/findMarketObj", { matchNum });
  return marketObj.data;
};

export const findAllMarkets = async (userId) => {
  const marketObjArray = await axios.post("/api/market/findAllMarketObj", {
    userId,
  });
  return marketObjArray.data;
};

export const findMarketHistory = async () => {
  try {
    console.log("entering findMarketHistory");
    const quiz = JSON.parse(localStorage.getItem("currentQuiz"));
    const marketObj = await findMarketObj(quiz.quiz._id);
    const history = { ...marketObj.history };
    return history;
  } catch (error) {
    console.log(
      `This is the error from FindMarketHistory in findQuiz.js: ${error.response}`
    );
  }
};
