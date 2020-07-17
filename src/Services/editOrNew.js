import axios from "axios";

async function editOrNew(index, name, questionObj, answers) {
  console.log(index, name, "these are the inputs, index and name");
  try {
    const shouldBeEdited = await axios.get("http://localhost:5000/api/quizzes");
    const array = shouldBeEdited.data;
    let quiz;
    for (var i = 0; i < array.length; i++) {
      if (array[i].name === name) {
        quiz = array[i];
      }
    }
    if (!quiz) {
      console.log("entered not quiz block");
      return [false];
    }
    if (quiz.questions[index].question.edited === false) {
      const id = quiz._id;
      console.log(id, "got to id part");
      const payload = { ...questionObj, answers, index };
      const update = await axios.put(
        `http://localhost:5000/api/quizzes/${id}`,
        payload
      );
      console.log("got past update");
    }

    // let keyCount = 0;
    // for (var key in quiz.questions) {
    //   keyCount += 1;
    // }
    // console.log(keyCount, "key cunt");
    // if (keyCount >= index) {
    //   return [true, quiz];
    // }
    // return [false, quiz];
  } catch (err) {
    console.log(err, "This is your error in editOrNew service");
  }
}
export default editOrNew;
