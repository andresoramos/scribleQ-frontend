import axios from "axios";
import decode from "jwt-decode";
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

export const findMarketHistory = async (name) => {
  try {
    const user = decode(localStorage.getItem("token"));

    const marketObj = await findMarketObjByName(name, user._id);
    console.log(name, marketObj, "THIS IS THE MARKET OBJ FINDMARKETHISTORY");
    return marketObj;
  } catch (error) {
    console.log(
      `This is the error from FindMarketHistory in findQuiz.js: ${error.response}`
    );
  }
};
