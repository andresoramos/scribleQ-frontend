import React, { useState, useEffect } from "react";
import getSelectedQuiz from "./../Services/getSelectedQuiz";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import MuiAlert from "@material-ui/lab/Alert";
import returnAccountId from "../Services/returnAccountId";
import saveScoredObject from "./../Services/saveScoredObject";

const useStyles = makeStyles((theme) => ({
  addIcon: { marginLeft: ".5em" },
  container: {
    backgroundColor: "green",
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  ButtonGroup: { marginBottom: theme.spacing(3) },
  paper: {
    backgroundColor: "pink",
    marginTop: theme.spacing(12),
    marginBottom: 15,
    // width: "55%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  quizName: {
    margin: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  name: { display: "flex", flexDirection: "column", marginTop: 10 },
  orange: {
    backgroundColor: "Orange",
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: 10,
    marginTop: 10,
  },
  questionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  questionPaper: {
    marginBottom: theme.spacing(5),
    width: "70%",
    flexWrap: "wrap",

    borderRadius: 70,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  styleAdd: {
    display: "flex",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-between",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ViewQuiz(props) {
  const classes = useStyles();
  const [presentQuiz, setPresentQuiz] = useState([]);
  const [quizSuccess, setQuizSuccess] = useState({});
  const [quizScore, setQuizScore] = useState({});

  const iValue = localStorage.getItem("i");
  useState(() => {
    if (iValue === null) {
      return;
    }
    const quizArray = JSON.parse(localStorage.getItem("account"));
    const email = quizArray.user.email;
    const id = quizArray.user._id;
    async function populateQuiz(id, index) {
      const findQuiz = await getSelectedQuiz(id, index, email);
      const quizStrung = JSON.stringify(findQuiz);
      setPresentQuiz(quizStrung);
    }
    populateQuiz(id, iValue);
  });
  const resetQuestion = (number) => {
    const resetObj = { ...quizSuccess };
    for (var key in resetObj) {
      if (key === number) {
        delete resetObj[key];
      }
    }
    setQuizSuccess(resetObj);
  };
  const handleMultipleAnswer = (e, index) => {
    if (quizSuccess[index + 1] !== undefined) {
      return;
    }

    const answerSelected = e.target.innerText;
    const conversionObject = {
      A: "Q1Correct",
      B: "Q2Correct",
      C: "Q3Correct",
      D: "Q4Correct",
    };
    const lookUpKey = conversionObject[answerSelected];

    const quizQuestion = returnQuestionsArray(presentQuiz);

    const specificQuestion = quizQuestion[index];
    const points = specificQuestion["pointWorth"];
    const passOrFail = specificQuestion[lookUpKey];
    const seeSpecifics = findSpecifics(
      specificQuestion,
      answerSelected,
      passOrFail
    );
    console.log(seeSpecifics, "here are specifics");

    const newPayload = { correct: passOrFail, points, specifics: seeSpecifics };
    const newSuccess = { ...quizSuccess };
    newSuccess[index + 1] = newPayload;
    setQuizSuccess(newSuccess);
  };
  const findSpecifics = (question, choice, passed) => {
    const questions = {
      A: "Q1",
      B: "Q2",
      C: "Q3",
      D: "Q4",
    };
    const chosen = questions[choice];
    if (passed) {
      return { answerSelected: chosen, correctAnswer: chosen };
    }
    let rightAnswer;
    const letterCycle = {
      Q1: question.Q1Correct,
      Q2: question.Q2Correct,
      Q3: question.Q3Correct,
      Q4: question.Q4Correct,
    };
    for (var key in letterCycle) {
      if (letterCycle[key] === true) {
        rightAnswer = key;
        break;
      }
    }
    return { answerSelected: chosen, correctAnswer: rightAnswer };
  };

  const letters = [
    { name: "A", question: "Q1" },
    { name: "B", question: "Q2" },
    { name: "C", question: "Q3" },
    { name: "D", question: "Q4" },
  ];
  const mappedLetters = (string, index) => {
    if (typeof string !== "string") {
      return [];
    }
    const quizObject = returnQuestionsArray(string);
    const questionsReturned = letters.map((item, i) => {
      return (
        <div
          style={{
            display: "flex",
            backgroundColor: "pink",
            flexDirection: "row",
          }}
        >
          <Button
            onClick={(e) => {
              handleMultipleAnswer(e, index);
            }}
            component={Avatar}
            key={i}
          >
            {item.name}
          </Button>
          <div>{quizObject[index][item.question]}</div>
        </div>
      );
    });
    return questionsReturned;
  };
  const returnQuestionsArray = (string) => {
    if (typeof string === "string") {
      const quizObj = JSON.parse(string);
      const questionsArray = quizObj.questions;
      return questionsArray;
    }
    return [];
  };
  const stringifyNumber = (value) => {
    const createKey = {};
    createKey[value] = true;
    let returnedNumber;
    for (var key in createKey) {
      returnedNumber = key;
    }
    return returnedNumber;
  };
  const mappedQuestions = returnQuestionsArray(presentQuiz).map((item, i) => {
    // console.log(item, "Use this as your guide");
    const numString = stringifyNumber(i + 1);
    return (
      <Container>
        <div className={classes.questionRow}>
          <Avatar className={classes.orange}>{i + 1}</Avatar>
          <Paper style={{ padding: 10 }}>
            <div dangerouslySetInnerHTML={{ __html: item.question }} />
          </Paper>
          <Button
            style={{ fontSize: 12 }}
            onClick={() => {
              resetQuestion(numString);
            }}
            component={Avatar}
            key={i}
          >
            Reset
          </Button>
        </div>
        {quizSuccess[numString] === undefined ? null : quizSuccess[numString]
            .correct ? (
          <MuiAlert variant="outlined" severity="success">
            Correct! Good Job!
          </MuiAlert>
        ) : (
          <MuiAlert variant="outlined" severity="error">
            You'll get it next time!
          </MuiAlert>
        )}
        {item.selected === "multiple" ? (
          <div>{mappedLetters(presentQuiz, i)}</div>
        ) : (
          "bla"
        )}
      </Container>
    );
  });
  const handleSave = async () => {
    const successObject = { ...quizSuccess };
    console.log(successObject, "his path should lead to specifics");
    let earned = 0;
    let possible = 0;
    let specifics = {};

    for (var key in successObject) {
      possible += Number(successObject[key].points);
      specifics[key] = successObject[key].specifics;
      if (successObject[key].correct === true) {
        earned += Number(successObject[key].points);
      } else {
      }
    }
    console.log(specifics, "correct shizz");
    const actualScore = (earned / possible) * 100;
    const scoreInString = JSON.stringify(actualScore) + "%";
    const scoreObj = {
      earned,
      possible,
      specifics,
    };
    const scoreScreen = { ...scoreObj, stringScore: scoreInString };
    // props.setQuizScore(scoreScreen);
    const stringScoreScreen = JSON.stringify(scoreScreen);
    localStorage.setItem("scoreScreen", stringScoreScreen);
    const backendId = returnAccountId(localStorage.getItem("account"), iValue);
    const savedScore = await saveScoredObject(scoreObj, backendId);
    props.history.push("/seeScore");
  };

  /* To do next - add specifics on the questions to each quiz.  Then, make it
  so that the test taker can see how they did on each individual question.
  Give each specific's object a number and everytime you save a try, update a 
  tracking number on the quiz itself.  That way, you'll know that the last try is
  the specs object that has the same number as the quiz's tracking number. */

  const returnName = (string) => {
    if (typeof string === "string") {
      const nameObject = JSON.parse(string);
      return nameObject.name;
    }
    return "No quizzes to display.";
  };

  return (
    <div className={classes.container}>
      <Paper
        style={{ overflow: "auto" }}
        className={classes.paper}
        elevation={3}
      >
        <h1 className={classes.quizName}>{returnName(presentQuiz)}</h1>
      </Paper>

      {mappedQuestions}
      <Button onClick={handleSave}>Save and view score</Button>
    </div>
  );
}

export default ViewQuiz;
