import axios from "axios";
import decode from "jwt-decode";
import getEditDistance from "./levensteinDistance";

export async function quizzesWithName(name, userInfo, paid) {
  if (name === "") {
    name = localStorage.getItem("quizName");
    userInfo = localStorage.getItem("account");
    if (name === "") {
      return false;
    }
  }
  //come back here and figure out how to make
  //sure that paidQuizzes eventually finds
  //the correct quiz of the moment
  localStorage.setItem("quizName", name);
  const parsedAccount = JSON.parse(userInfo);
  let paidQuizzes;
  if (paid) {
    const { user } = parsedAccount;
    console.log(parsedAccount, "these are the quizzes owned");
    const { quizzesOwned } = user;
    let paidQuizArray = [];
    for (var key in quizzesOwned) {
      paidQuizArray.push(quizzesOwned[key]);
    }
    paidQuizzes = paidQuizArray;
  }
  const accountQuizzes = [...parsedAccount.quizzes];
  let foundItem;
  if (paid) {
    for (var i = 0; i < paidQuizzes.length; i++) {
      console.log(paidQuizzes[i], "this is paid quizzes");
      if (paidQuizzes[i].name === name) {
        foundItem = paidQuizzes[i];
        break;
      }
    }
  } else {
    for (var i = 0; i < accountQuizzes.length; i++) {
      if (accountQuizzes[i].quiz.name === name) {
        foundItem = accountQuizzes[i];
        break;
      }
    }
  }
  const payload = { id: paid ? foundItem._id : foundItem.quiz._id };
  const quizzesReturned = await axios.post(
    "http://localhost:5000/api/quizzes/quizStats",
    payload
  );
  return quizzesReturned.data;
}

export const paidQuizArr = () => {
  const parsedAccount = JSON.parse(localStorage.getItem("account"));
  const { user } = parsedAccount;
  const { quizzesOwned } = user;
  let paidQuizArray = [];
  for (var key in quizzesOwned) {
    paidQuizArray.push(quizzesOwned[key]);
  }
  return paidQuizArray;
};

export function findAverages(arr) {
  let total = 0;
  let attained = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i].score.possible;
    attained += arr[i].score.earned;
  }
  let overAll = (attained / total) * 100;
  if (overAll - Math.floor(overAll) >= 0.5) {
    overAll = Math.ceil(overAll);
  } else {
    overAll = Math.floor(overAll);
  }
  return overAll;
}

export function findTroubled(arr, callBack, paid) {
  let finalTally = {};

  for (var i = 0; i < arr.length; i++) {
    for (var key in arr[i].score.specifics) {
      if (arr[i].score.specifics[key].singleAnswerFlag) {
        if (finalTally[key] === undefined) {
          if (
            mockDistanceFormula(
              arr[i].score.specifics[key].answerSelected,
              arr[i].score.specifics[key].correctAnswer
            )
          ) {
            finalTally[key] = 1;
          } else {
            finalTally[key] = 0;
          }
        } else {
          if (
            mockDistanceFormula(
              arr[i].score.specifics[key].answerSelected,
              arr[i].score.specifics[key].correctAnswer
            )
          ) {
            finalTally[key] += 1;
          }
        }
      } else {
        if (finalTally[key] === undefined) {
          if (
            compareAnswers(
              arr[i].score.specifics[key].answerSelected,
              arr[i].score.specifics[key].correctAnswer
            ) === true
          ) {
            finalTally[key] = 1;
          } else {
            finalTally[key] = 0;
          }
        } else {
          if (
            compareAnswers(
              arr[i].score.specifics[key].answerSelected,
              arr[i].score.specifics[key].correctAnswer
            ) === true
          ) {
            finalTally[key] += 1;
          }
        }
      }
    }
  }
  let lowestNum;

  for (var num in finalTally) {
    if (lowestNum === undefined) {
      lowestNum = finalTally[num];
    }
    if (finalTally[num] < lowestNum) {
      lowestNum = finalTally[num];
    }
  }
  let mistakesObj = {};
  for (var key in finalTally) {
    if (finalTally[key] === lowestNum) {
      mistakesObj[key] = { score: finalTally[key] };
    }
  }

  callBack(arr.length - lowestNum);

  const quizzes = paid
    ? paidQuizArr()
    : JSON.parse(localStorage.getItem("account")).quizzes;
  const name = localStorage.getItem("quizName");
  let quizObject;
  if (paid) {
    for (var i = 0; i < quizzes.length; i++) {
      if (quizzes[i].name === name) {
        quizObject = quizzes[i];
      }
    }
    const arrayOfQuestions = quizObject.questions;
    for (var key in mistakesObj) {
      mistakesObj[key] = {
        ...mistakesObj[key],
        quizQuestion: arrayOfQuestions[Number(key) - 1].question,
      };
    }
    mistakesObj.total = arr.length;
    return mistakesObj;
  } else {
    for (var i = 0; i < quizzes.length; i++) {
      if (quizzes[i].quiz.name === name) {
        quizObject = quizzes[i];
      }
    }

    const arrayOfQuestions = quizObject.quiz.questions;
    for (var key in mistakesObj) {
      mistakesObj[key] = {
        ...mistakesObj[key],
        quizQuestion: arrayOfQuestions[Number(key) - 1].question,
      };
    }
    mistakesObj.total = arr.length;
    return mistakesObj;
  }
}

function compareAnswers(a1, a2) {
  return a1 === a2;
}
function mockDistanceFormula(word1, word2) {
  const newWord1 = word1.toLowerCase();
  const newWord2 = word2.toLowerCase();
  const editDistance = getEditDistance(word1, word2);
  if (word2.length < 3) {
    if (editDistance > 0) {
      return false;
    }
    return true;
  }
  if (word2.length >= 3 && word2.length < 10) {
    if (editDistance > 2) {
      return false;
    }
    return true;
  }
  if (word2.length >= 10 && word2.length < 20) {
    if (editDistance > 4) {
      return false;
    }
    return true;
  }
  if (word2.length >= 20) {
    if (editDistance > 7) {
      return false;
    }
    return true;
  }
}
