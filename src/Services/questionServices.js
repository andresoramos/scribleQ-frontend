import { answerSave, saveQuiz } from "../Services/answerSave";
import decode from "jwt-decode";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
// const savePayload = { name: name, questions: newArray };
// await answerSave(savePayload);

export const deleteQuestion = async (
  index,
  findQuestion,
  newDisplayArray,
  fixProperties,
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

  updatedArray.splice(index, 1);
  const payload = { name: name, questions: updatedArray };
  if (actualCurrentIndex === index && questionOut === false) {
    if (updatedArray.length === 0) {
      return fixProperties([["cantDelete", true]]);
    }
    if (updatedArray[index - 1] !== undefined) {
      fixProperties([
        ["questionOut", false],
        ["currentIndex", index - 1],
        ["newDisplayArray", updatedArray],
      ]);
      // setNewDisplayArray(updatedArray);
      return answerSave(payload);
    }
    fixProperties([
      ["questionOut", false],
      ["newDisplayArray", updatedArray],
    ]);
    // setNewDisplayArray(updatedArray);
    return answerSave(payload);
  } else {
    if (actualCurrentIndex === index) {
      if (updatedArray.length === 0) {
        return fixProperties([["cantDelete", true]]);
      }
      if (updatedArray[index - 1] !== undefined) {
        fixProperties([
          ["currentIndex", index - 1],
          ["newDisplayArray", updatedArray],
        ]);
        // setNewDisplayArray(updatedArray);
        return answerSave(payload);
      }
    } else {
      if (actualCurrentIndex !== index && questionOut === true) {
        // setNewDisplayArray(updatedArray);
        fixProperties([["newDisplayArray", updatedArray]]);
        return answerSave(payload);
      }
      if (actualCurrentIndex !== index && questionOut === false) {
        if (actualCurrentIndex > index) {
          fixProperties([
            ["currentIndex", actualCurrentIndex - 1],
            ["newDisplayArray", updatedArray],
          ]);
          // setNewDisplayArray(updatedArray);
          return answerSave(payload);
        }
        fixProperties([["newDisplayArray", updatedArray]]);
        // setNewDisplayArray(updatedArray);
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
