import React, { useState, useEffect } from "react";
import loggedIn from "./../Services/loggedIn";
import {
  quizzesWithName,
  findAverages,
  findTroubled,
  paidQuizArr,
} from "./../Services/quizzesWithName";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MessageCard from "./MessageCard";
import { getCurrUser } from "../Services/balanceService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
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
  const [NaNFlag, setNaNFlag] = useState(false);

  loggedIn(setApproved);
  useEffect(() => {
    const findSuccessHistory = async () => {
      const user = getCurrUser();
      const { _id } = user;
      //get curr user
      //send that number into find quizzes
      //Alter their logic so that they make sure to only return quizzes stamped with the user's number
      //Also, make it so that the user can delete their copy of a quiz without it
      //taking it away from those who purchased it
      const findAllQuizzes = await quizzesWithName(
        props.paidAnalytics
          ? props.paidAnalytics.currentName
          : props.currentName,
        localStorage.getItem("account"),
        props.paidAnalytics ? true : null,
        _id
      );
      if (findAllQuizzes === false) {
        return setApproved(false);
      }
      if (JSON.stringify(findAllQuizzes) === "[]") {
        setNaNFlag(true);
      }
      const average = findAverages(findAllQuizzes);
      const troubled = findTroubled(
        findAllQuizzes,
        setLow,
        props.paidAnalytics ? true : null
      );
      setHigh(findAllQuizzes.length);
      setEarned(average);
      setMistakes(JSON.stringify(troubled));
    };
    findSuccessHistory();
  }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const findQuiz = (number) => {
    const userQuizzes = props.paidAnalytics
      ? paidQuizArr()
      : JSON.parse(localStorage.getItem("account")).quizzes;
    const name = localStorage.getItem("quizName");
    let foundQuiz;
    if (props.paidAnalytics) {
      for (var i = 0; i < userQuizzes.length; i++) {
        if (userQuizzes[i].name === name) {
          foundQuiz = { ...userQuizzes[i].questions };
          break;
        }
      }
    } else {
      for (var i = 0; i < userQuizzes.length; i++) {
        if (userQuizzes[i].quiz.name === name) {
          foundQuiz = { ...userQuizzes[i].quiz.questions };
          break;
        }
      }
    }
    let realNum = Number(number) - 1;
    const question = foundQuiz[realNum];
    if (question.singleAnswer.length > 0) {
      return question.singleAnswer;
    }
    const correctOrWrong = {
      Q1Correct: question.Q1Correct,
      Q2Correct: question.Q2Correct,
      Q3Correct: question.Q3Correct,
      Q4Correct: question.Q4Correct,
    };
    let correctChoice;
    for (var key in correctOrWrong) {
      if (correctOrWrong[key]) {
        correctChoice = key;
      }
    }
    const keyConverter = {
      Q1Correct: "Q1",
      Q2Correct: "Q2",
      Q3Correct: "Q3",
      Q4Correct: "Q4",
    };
    return question[keyConverter[correctChoice]];
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
    const mappedQuestions = questionsArray.map((item) => {
      const correct = findQuiz(item.number);

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
            <div style={{ marginLeft: 3 }}>{correct}</div>
          </div>
        </div>
      );
    });
    return mappedQuestions;
  };

  return approved ? (
    NaNFlag ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <MessageCard {...props} quizName={localStorage.getItem("quizName")} />
      </div>
    ) : (
      <div className={classes.container}>
        <h1>{`Your average score for ${
          props.currentName
            ? props.currentName
            : localStorage.getItem("quizName")
        } is ${earned}`}</h1>
        <Button onClick={handleDialogOpen}>
          Click here to see which questions need the most improvement
        </Button>

        <Dialog
          aria-describedby="where-mistakes-lie"
          onClose={handleDialogClose}
          open={dialogOpen}
        >
          <DialogContent>
            <DialogTitle>
              {low === 0
                ? `You haven't made a mistake once.  Keep up the great work!`
                : `These are the questions that have stumped you the most, with ${low} out of ${high}
            attempts being incorrect.`}
            </DialogTitle>
            {low === 0 ? null : (
              <DialogContentText id="where-mistakes-lie">
                {mistakes !== null && findQuestions(mistakes)}
              </DialogContentText>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  ) : (
    <div>Log in required</div>
  );
}

export default Analytics;
