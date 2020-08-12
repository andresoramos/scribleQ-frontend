import axios from "axios";
import decode from "jwt-decode";
import { number } from "joi";

export async function quizzesWithName(name, userInfo) {
  if (name === "") {
    name = localStorage.getItem("name");
    userInfo = localStorage.getItem("account");
    if (name === "") {
      return false;
    }
  }
  localStorage.setItem("name", name);
  const parsedAccount = JSON.parse(userInfo);
  const accountQuizzes = [...parsedAccount.quizzes];
  let foundItem;
  for (var i = 0; i < accountQuizzes.length; i++) {
    if (accountQuizzes[i].quiz.name === name) {
      foundItem = accountQuizzes[i];
      break;
    }
  }
  const payload = { id: foundItem.quiz._id };
  const quizzesReturned = await axios.post(
    "http://localhost:5000/api/quizzes/quizStats",
    payload
  );
  return quizzesReturned.data;
}

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
  console.log(overAll, "overall");
  return overAll;
}

export function findTroubled(arr) {
  console.log(arr, "This is arr");
  let finalTally = {};
  for (var i = 0; i < arr.length; i++) {
    for (var key in arr[i].score.specifics) {
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

  const quizzes = JSON.parse(localStorage.getItem("account")).quizzes;
  const name = localStorage.getItem("name");
  let quizObject;
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

function compareAnswers(a1, a2) {
  return a1 === a2;
}
