import axios from "axios";

async function saveScoredObject(scoredObj, idNumber) {
  const finalPayload = { ...scoredObj, idNumber };
  console.log(finalPayload, "this is the final payload");
  try {
    const savedScore = await axios.post(
      "/api/quizzes/ScoredQuiz",
      finalPayload
    );
    return savedScore.data;
  } catch (error) {
    console.log(error, "This is the error from saveScoredObject.js");
  }
}

export default saveScoredObject;
