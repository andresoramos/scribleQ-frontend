import axios from "axios";
import decode from "jwt-decode";
import quizByName from "./quizByName";
import { getCurrUser } from "../Services/balanceService";
import _ from "lodash";
import { getUserInfo } from "./authenticateUserToken";
import getQuizzes from "./getQuizzes";

export function findQuiz(str, i) {
  const obj = JSON.parse(str);
  const iParsed = JSON.parse(i);
  const selectedQuiz = obj.quizzes[i];
  return selectedQuiz;
}

export async function getAll() {
  const userId = getCurrUser()._id;
  const markets = await axios.get("/api/market");
  const clonedMakers = _.cloneDeep(markets.data.makers);
  const clonedMarkets = _.cloneDeep(markets.data.markets);
  const clonedQuizzes = _.cloneDeep(markets.data.quizzes);
  const filteredObj = cleansedArrays(
    userId,
    clonedMakers,
    clonedMarkets,
    clonedQuizzes
  );
  return filteredObj;
}
const cleansedArrays = async (userId, makers, markets, quizzes) => {
  const user = await getUserInfo(userId);
  let cleansedMarkets = [];
  for (var i = 0; i < markets.length; i++) {
    if (markets[i].downloadedBy && markets[i].downloadedBy[userId]) {
      continue;
    }
    if (markets[i].creatorId === userId) {
      continue;
    }
    cleansedMarkets.push(markets[i]);
  }
  let cleansedQuizzes = [];
  for (var i = 0; i < quizzes.length; i++) {
    if (user.quizzesOwned && user.quizzesOwned[quizzes[i]._id]) {
      console.log("koochwing!");
      continue;
    }
    if (quizzes[i].creatorId && quizzes[i].creatorId === userId) {
      continue;
    }
    cleansedQuizzes.push(quizzes[i]);
  }
  let finalObj = { makers, markets: cleansedMarkets, quizzes: cleansedQuizzes };
  return finalObj;
};

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
