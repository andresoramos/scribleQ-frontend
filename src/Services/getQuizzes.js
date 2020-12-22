import axios from "axios";
import decode from "jwt-decode";
import { getCurrUser } from "./balanceService";

async function getQuizzes(marketOnly) {
  try {
    if (marketOnly) {
      const userInfo = decode(localStorage.getItem("token"))._id;
      const list = await axios.post("/api/market/findMarketObj", {
        list: true,
        id: userInfo,
      });
      return list.data;
    }
    const email = decode(localStorage.getItem("token")).email;
    const data = await axios.post("/api/quizzes/savedQuiz", { email });
    return data.data;
  } catch (err) {
    console.log(err.response, "This is the failure from getQuizzes");
  }
}

export const getBoughtQuizzes = async () => {
  try {
    const userId = getCurrUser();
    const boughtQuizzes = await axios.put(
      `/api/quizzes/boughtQuizzes/${userId._id}`
    );
    return boughtQuizzes.data;
  } catch (error) {
    console.log(`You had an error at getQuizzes.js/getBoughtQuizzes: ${error}`);
  }
};

export default getQuizzes;
