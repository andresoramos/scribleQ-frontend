import { answerSave, saveQuiz } from "../Services/answerSave";
import decode from "jwt-decode";
// const savePayload = { name: name, questions: newArray };
// await answerSave(savePayload);

export const deleteQuestion = async (
  index,
  findQuestion,
  newDisplayArray,
  setCantDelete,
  fixProperties,
  setNewDisplayArray,
  questionOut,
  name
) => {
  // console.log(`Your current index is ${index}`);
  if (findQuestion() === undefined) {
    return console.log("THERE'S AN ERROR IN FINDING QUESTION");
  }
  let id = findQuestion().i;
  let actualCurrentIndex;
  let updatedArray = [...newDisplayArray];
  for (var i = 0; i < updatedArray.length; i++) {
    if (updatedArray[i].i === id) {
      actualCurrentIndex = i;
    }
  }

  updatedArray.splice(index, 1);
  const payload = { name: name, questions: updatedArray };
  if (actualCurrentIndex === index && questionOut === false) {
    if (updatedArray.length === 0) {
      return setCantDelete(true);
    }
    if (updatedArray[index - 1] !== undefined) {
      fixProperties([
        ["questionOut", false],
        ["currentIndex", index - 1],
      ]);
      setNewDisplayArray(updatedArray);
      return answerSave(payload);
    }
    fixProperties([["questionOut", false]]);
    setNewDisplayArray(updatedArray);
    return answerSave(payload);
  } else {
    if (actualCurrentIndex === index) {
      if (updatedArray.length === 0) {
        return setCantDelete(true);
      }
      if (updatedArray[index - 1] !== undefined) {
        fixProperties([["currentIndex", index - 1]]);
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
          fixProperties([["currentIndex", actualCurrentIndex - 1]]);
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
  const { email } = decode(localStorage.getItem("token"));
  const user = decode(localStorage.getItem("token"));
  const payload = { user: signedInName, name: name, email };
  await saveQuiz(payload, props);
};
