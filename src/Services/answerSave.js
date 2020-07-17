import axios from "axios";

export async function answerSave(payload) {
  try {
    console.log(payload, "this is the payload from save");
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
