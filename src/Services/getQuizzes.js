import axios from "axios";
import decode from "jwt-decode";

async function getQuizzes() {
  try {
    const email = decode(localStorage.getItem("token")).email;
    const data = await axios.post(
      "http://localhost:5000/api/quizzes/savedQuiz",
      { email }
    );
    return data.data;
  } catch (err) {
    console.log(err.response, "This is the failure from getQuizzes");
  }
}

export default getQuizzes;
