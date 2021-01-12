import axios from "axios";
import decode from "jwt-decode";
import { getCurrUser } from "./balanceService";

export const downloadQuiz = async (quiz) => {
  const user = decode(localStorage.getItem("token"));
  const downloaded = await axios.post("/api/quizzes/download", { quiz, user });
  console.log(downloaded.data, "this is the downloaded");
  return downloaded.data;
};

export const freeDownloadService = async (quiz) => {
  try {
    const userId = getCurrUser()._id;
    const downloaded = await axios.post("api/quizzes/freeDownloadService", {
      quiz,
      userId,
    });
    return downloaded.data;
  } catch (error) {
    console.log(
      `You have an error at downloadService.js/freeDownloadService: ${error}`
    );
  }
};

export const giveQuizToBuyer = async (quiz) => {
  try {
    //Here you'll take the quiz returned by the backend, and you're
    //going to save it in the user's object
  } catch (error) {
    console.log(
      `You have an error at downloadService.js/giveQuizToBuyer: ${error}`
    );
  }
};
