import axios from "axios";
import getQuizzes from "./getQuizzes";
import decode from "jwt-decode";

export async function answerSave(payload) {
  try {
    console.log("Answer save is running");
    const correctedPayload = { ...payload };
    const creatorId = decode(localStorage.getItem("token"))._id;
    correctedPayload.creatorId = creatorId;
    console.log("Answer save is running");
    const saved = await axios.post(
      "http://localhost:5000/api/quizzes",
      correctedPayload
    );
    console.log("answersaved ran with no issues");
    return saved.data;
  } catch (err) {
    console.log(err, "this is your error from answerSave.js in services");
    return err;
  }
}
export const updateMakers = async (quizId) => {
  const updatedMakers = await axios.put(`/api/quizzes/updateMakers/${quizId}`);
  return updateMakers.data;
};

export async function updateAndSave(index, quiz) {
  const newQuizQuestions = { ...quiz.questions };
  console.log(newQuizQuestions, "these are the newQuizQuestions");
}

export async function checkEdit(index) {
  const quizArray = await axios.get("http://localhost:5000/api/quizzes");
}
export async function showMakers() {
  const quizArray = await axios.get("http://localhost:5000/api/market");
  console.log(quizArray.data);
  return quizArray.data;
}
export async function marketSave(payload) {
  try {
    const marketItem = await axios.post("/api/market", payload);
    return marketItem.data;
  } catch (error) {
    console.log(
      `You had the following error in marketSave from answerSave in services: ${error}`
    );
    return error.response;
  }
}
export const marketUpdate = async (payload, quizId) => {
  const newPayload = { ...payload, quizId };
  console.log(
    newPayload,
    "this is the new payload, which should have whatever is causing the maker id to change.  Don't give up."
  );
  try {
    const marketItem = await axios.post("/api/market/updateMarket", {
      newPayload,
    });
    return marketItem.data;
  } catch (error) {
    console.log(
      `Your error in marketUpdate from answerSave.js is the following: ${error.response}`
    );
  }
};

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
