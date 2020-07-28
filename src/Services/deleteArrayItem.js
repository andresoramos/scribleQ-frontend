import axios from "axios";

async function deleteArrayItem(email, index) {
  try {
    const emailAndId = { email: email, id: index };
    const dataDeletion = await axios.put("/api/quizzes/deleteQuiz", emailAndId);
    return dataDeletion.data;
  } catch (error) {
    console.log("Here is your error from deleteArrayItem");
  }
}

export default deleteArrayItem;
