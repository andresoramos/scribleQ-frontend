import axios from "axios";

async function getSelectedQuiz(id, index, email) {
  try {
    const payload = { id, index, email };
    const returnedQuiz = await axios.post("/api/quizzes/getUser", payload);
    return returnedQuiz.data;
  } catch (error) {
    console.log("This is the error from getSelectedQuiz.js: ", error);
  }
}

export const getQuizById = async (quizId) => {
  const returnedQuiz = await axios.post("/api/quizzes/quizById", { quizId });

  return returnedQuiz.data;
};
export default getSelectedQuiz;
