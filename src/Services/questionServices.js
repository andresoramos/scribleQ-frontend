import { answerSave, saveQuiz } from "../Services/answerSave";
import decode from "jwt-decode";
// const savePayload = { name: name, questions: newArray };
// await answerSave(savePayload);

export const deleteQuestion = (
  index,
  findQuestion,
  newDisplayArray,
  setCantDelete,
  setCurrentIndex,
  setQuestionOut,
  setNewDisplayArray,
  questionOut,
  name
) => {
  // console.log(`Your current index is ${index}`);
  let id = findQuestion().i;
  let actualCurrentIndex;
  let updatedArray = [...newDisplayArray];
  for (var i = 0; i < updatedArray.length; i++) {
    if (updatedArray[i].i === id) {
      actualCurrentIndex = i;
    }
  }

  // console.log(`Actual current is ${actualCurrentIndex}`);
  updatedArray.splice(index, 1);
  const payload = { name: name, questions: updatedArray };
  if (actualCurrentIndex === index && questionOut === false) {
    //Checks to see if question being viewed got deleted
    if (updatedArray.length === 0) {
      return setCantDelete(true);
    }
    if (updatedArray[index - 1] !== undefined) {
      setCurrentIndex(index - 1);
      setQuestionOut(false);
      setNewDisplayArray(updatedArray);
      return answerSave(payload);
    }
    setQuestionOut(false);
    setNewDisplayArray(updatedArray);
    return answerSave(payload);
  } else {
    if (actualCurrentIndex === index) {
      if (updatedArray.length === 0) {
        return setCantDelete(true);
      }
      if (updatedArray[index - 1] !== undefined) {
        // updatedArray[index - 1].showAnswer = true;
        setCurrentIndex(index - 1);
        setNewDisplayArray(updatedArray);
        return answerSave(payload);
      }
    } else {
      if (actualCurrentIndex !== index && questionOut === true) {
        setNewDisplayArray(updatedArray);
        return answerSave(payload);
      }
      if (actualCurrentIndex !== index && questionOut === false) {
        if (actualCurrentIndex > index) {
          // updatedArray[actualCurrentIndex - 1].showAnswer = true;
          setCurrentIndex(actualCurrentIndex - 1);
          setNewDisplayArray(updatedArray);
          return answerSave(payload);
        }
        setNewDisplayArray(updatedArray);
        return answerSave(payload);
      }
    }
  }
};

export const quizSave = async (signedInName, name, props) => {
  const email = decode(localStorage.getItem("token")).email;
  const payload = { user: signedInName, name: name, email };
  await saveQuiz(payload, props);
};