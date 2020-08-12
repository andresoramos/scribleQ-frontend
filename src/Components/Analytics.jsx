import React, { useState } from "react";
import loggedIn from "./../Services/loggedIn";
import {
  quizzesWithName,
  findAverages,
  findTroubled,
} from "./../Services/quizzesWithName";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import QuizQuestion from "./QuizQuestion";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "pink",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

function Analytics(props) {
  const classes = useStyles();
  const [approved, setApproved] = useState(false);
  const [earned, setEarned] = useState(null);
  const [mistakes, setMistakes] = useState(null);
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  loggedIn(setApproved);

  const findSuccessHistory = async () => {
    const findAllQuizzes = await quizzesWithName(
      props.currentName,
      localStorage.getItem("account")
    );
    if (findAllQuizzes === false) {
      return setApproved(false);
    }

    const average = findAverages(findAllQuizzes);
    const troubled = findTroubled(findAllQuizzes);
    console.log(troubled, "Maybe the trouble is here");

    setEarned(average);
    setMistakes(JSON.stringify(troubled));
  };
  findSuccessHistory();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const findQuiz = (number) => {
    const userQuizzes = JSON.parse(localStorage.getItem("account")).quizzes;
    const name = localStorage.getItem("name");
    let foundQuiz;
    for (var i = 0; i < userQuizzes.length; i++) {
      if (userQuizzes[i].quiz.name === name) {
        foundQuiz = { ...userQuizzes[i].quiz.questions };
        break;
      }
    }
    let answerWithNum = {};
    for (var key in foundQuiz) {
      let answersObj = {
        Q1Correct: foundQuiz[key].Q1Correct,
        Q2Correct: foundQuiz[key].Q2Correct,
        Q3Correct: foundQuiz[key].Q3Correct,
        Q4Correct: foundQuiz[key].Q4Correct,
      };
      let answerLookUp = {
        Q1Correct: "Q1",
        Q2Correct: "Q2",
        Q3Correct: "Q3",
        Q4Correct: "Q4",
      };

      for (var answer in answersObj) {
        if (answersObj[answer] === true) {
          answerWithNum[key] = foundQuiz[key][answerLookUp[answer]];
        }
      }
    }
    for (var key in answerWithNum) {
      const keyNum = Number(key);
      const num = Number(number) - 1;
      if (keyNum !== num) {
        delete answerWithNum[key];
      }
    }
    return answerWithNum;
  };
  const findQuestions = (string) => {
    let questionsArray = [];
    const objThawedOut = JSON.parse(string);
    for (var key in objThawedOut) {
      if (key !== "total") {
        questionsArray.push({
          question: objThawedOut[key].quizQuestion,
          number: key,
        });
      }
    }
    console.log(questionsArray, "questions array");
    const mappedQuestions = questionsArray.map((item) => {
      const correct = findQuiz(item.number);
      let correctAnswer = "";
      for (var key in correct) {
        correctAnswer += correct[key];
      }
      return (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ marginTop: 17, marginRight: 10 }}
            >{`${item.number})`}</div>
            <div dangerouslySetInnerHTML={{ __html: item.question }} />
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", marginLeft: 24 }}
          >
            <div>
              <b>{`Correct answer: `}</b>
            </div>
            <div style={{ marginLeft: 3 }}>{correctAnswer}</div>
          </div>
        </div>
      );
    });
    return mappedQuestions;
  };
  return approved ? (
    <div className={classes.container}>
      <h1>{`Your average score for ${
        props.currentName ? props.currentName : localStorage.getItem("name")
      } is ${earned}`}</h1>
      <Button onClick={handleDialogOpen}>
        Click here to see which questions need the most improvement
      </Button>
      <Dialog aria-describedby="where-mistakes-lie" open={dialogOpen}>
        <DialogContent>
          <DialogTitle>
            These are the questions that have stumped you the most, with out of
            attempts being incorrect.
          </DialogTitle>
          <DialogContentText id="where-mistakes-lie">
            {mistakes !== null && findQuestions(mistakes)}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  ) : (
    <div>Log in required</div>
  );
}

export default Analytics;
