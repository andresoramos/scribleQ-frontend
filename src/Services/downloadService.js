import axios from "axios";
import decode from "jwt-decode";

export const downloadQuiz = async (quiz) => {
  const user = decode(localStorage.getItem("token"));
  const downloaded = await axios.post("/api/quizzes/download", { quiz, user });
  return downloaded.data;
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
