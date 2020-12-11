import axios from "axios";
import decode from "jwt-decode";

export const downloadQuiz = async (quiz) => {
  const user = decode(localStorage.getItem("token"));
  const downloaded = await axios.post("/api/quizzes/download", { quiz, user });
  return downloaded.data;
};
