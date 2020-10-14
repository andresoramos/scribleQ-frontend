import axios from "axios";
import getQuizzes from "./getQuizzes";

export async function answerSave(payload) {
  try {
    const saved = await axios.post(
      "http://localhost:5000/api/quizzes",
      payload
    );
    return saved.data;
  } catch (err) {
    console.log(err, "this is your error from answerSave.js in services");
    return err;
  }
}

export async function updateAndSave(index, quiz) {
  const newQuizQuestions = { ...quiz.questions };
  console.log(newQuizQuestions, "these are the newQuizQuestions");
}

export async function checkEdit(index) {
  const quizArray = await axios.get("http://localhost:5000/api/quizzes");
}
export async function marketSave(payload) {
  try {
    const marketItem = await axios.post("/api/market", payload);
    return marketItem.data;
  } catch (error) {
    console.log(
      `You had the following error in marketSave from answerSave in services: ${error}`
    );
  }
}

export async function saveQuiz(payload, props) {
  try {
    const saved = await axios.post("/api/quizzes/saveQuiz", payload);
    const quizzes = await getQuizzes();
    localStorage.setItem("account", JSON.stringify(quizzes));
    window.location = "/";
  } catch (err) {
    if (err.response.data === "This quiz is already in our database") {
      props.history.push("/newMakeQuiz");
    }
    console.log(err.response, "this is the response");
  }
}
