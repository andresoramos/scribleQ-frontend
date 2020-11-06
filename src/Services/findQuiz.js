import axios from "axios";
import decode from "jwt-decode";
import quizByName from "./quizByName";

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

const findMarketObjByName = async (name, userId) => {
  const marketByName = await axios.post("/api/market/findMarketByName", {
    name,
    userId,
  });
  return marketByName.data;
};
export const dropMarket = async () => {
  const dropped = await axios.get("/api/market/drop");
  return dropped.data;
};

export const updateCurrentQuiz = (name) => {
  const account = JSON.parse(localStorage.getItem("account"));
  const quiz = quizByName(account, name);
  localStorage.setItem("currentQuiz", JSON.stringify(quiz));
};

export const findMarketHistory = async (name) => {
  try {
    const user = decode(localStorage.getItem("token"));

    const marketObj = await findMarketObjByName(name, user._id);
    return marketObj;
  } catch (error) {
    console.log(
      `This is the error from FindMarketHistory in findQuiz.js: ${error.response}`
    );
  }
};
