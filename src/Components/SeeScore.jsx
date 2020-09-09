import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import authenticateUserToken from "./../Services/authenticateUserToken";
import { makeStyles } from "@material-ui/core/styles";
import { findQuiz, findScoreScreen } from "../Services/findQuiz";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  answerColumn: {
    display: "flex",
    flexDirection: "column",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "20%",
  },

  container: {
    backgroundColor: "green",
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: { padding: 20, backgroundColor: "pink" },
  question: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  questionContainer: {
    flexDirection: "column",
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "yellow",
  },
}));

function SeeScore(props) {
  const classes = useStyles();
  const [approved, setApproved] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const scoreScreen = localStorage.getItem("scoreScreen");

  const scoreScreentoObject = JSON.parse(scoreScreen);

  const showIncorrect = () => {
    setShowWrong(!showWrong);
  };

  const createQuestion = () => {
    const quiz = findQuiz(
      localStorage.getItem("account"),
      localStorage.getItem("i")
    );
    const scoreScreen = findScoreScreen("scoreScreen");
    const { specifics } = scoreScreen;
    const returnArray = [];
    for (var key in specifics) {
      const returnObj = {};
      if (specifics[key].answerSelected !== specifics[key].correctAnswer) {
        returnObj.questionWrong = key;
        const newId = Number(key) - 1;
        returnObj.newId = newId;
        returnObj.question = quiz.quiz.questions[newId].question;
        const wrongAnswer = specifics[key].singleAnswerFlag
          ? specifics[key].answerSelected
          : quiz.quiz.questions[newId][specifics[key].answerSelected];
        returnObj.yourResponse = wrongAnswer;

        returnObj.correctAnswer = specifics[key].singleAnswerFlag
          ? specifics[key].correctAnswer
          : quiz.quiz.questions[newId][specifics[key].correctAnswer];
        returnArray.push(returnObj);
      }
    }
    const mapped = returnArray.map((item, i) => {
      return (
        <div key={i} className={classes.questionContainer}>
          <h2>Question</h2>
          <Paper className={classes.paper}>
            <div className={classes.question}>
              <Avatar style={{ marginRight: 10, marginTop: 10 }} rounded>
                {item.newId + 1}
              </Avatar>
              <div dangerouslySetInnerHTML={{ __html: item.question }} />
            </div>
            <div className={classes.answerColumn}>
              <Paper style={{ marginBottom: 5 }}>
                <div>
                  <b>Your Answer: </b>
                  {item.yourResponse}
                </div>
              </Paper>
              <Paper>
                <div>
                  <b>Correct Answer: </b>
                  {item.correctAnswer}
                </div>
              </Paper>
            </div>
          </Paper>
        </div>
      );
    });
    return mapped;
  };

  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const checkIfLoggedIn = async (token) => {
      const auth = await authenticateUserToken(token);
      if (!auth) {
        return;
      }
      setApproved(true);
    };
    checkIfLoggedIn(token);
  }
  const fixFinalNumber = (string) => {
    let compounder = "";
    for (var i = 0; i < string.length; i++) {
      if (string[i] !== "%") {
        compounder += string[i];
      }
    }
    let finalNum;
    const toNum = JSON.parse(compounder);
    if (toNum - Math.floor(toNum) >= 0.5) {
      finalNum = Math.ceil(toNum);
    } else {
      finalNum = Math.floor(toNum);
    }
    const backToString = JSON.stringify(finalNum) + "%";

    return backToString;
  };

  const buttomButtons = (string) => {
    props.history.push(string);
  };
  return approved ? (
    <div className={classes.container}>
      <h1>{`You've scored ${fixFinalNumber(
        scoreScreentoObject.stringScore
      )}`}</h1>
      {fixFinalNumber(scoreScreentoObject.stringScore) !== "100%" && (
        <Button onClick={showIncorrect}>
          Click to see which questions you got wrong
        </Button>
      )}
      {showWrong ? createQuestion() : null}
      <div className={classes.buttonRow}>
        <Button
          onClick={() => {
            buttomButtons("/viewQuiz");
          }}
        >
          Take quiz again
        </Button>
        <Button
          onClick={() => {
            buttomButtons("/");
          }}
        >
          Profile overview
        </Button>
      </div>
    </div>
  ) : (
    <div>You must login to view this page.</div>
  );
}

export default SeeScore;
