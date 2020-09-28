import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import QuizQuestion from "./QuizQuestion";
import { answerSave } from "../Services/answerSave";
import decode from "jwt-decode";
import getQuizzes from "./../Services/getQuizzes";
import NewQuestion from "../Components/newQuestion";
import authenticateUserToken from "./../Services/authenticateUserToken";
import "../Styling/MakeQuiz.css";

import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {},
}));

function NewMakeQuiz(props) {
  const classes = useStyles();
  const [slide, setSlide] = useState(false);
  const [questionOut, setQuestionOut] = useState(false);
  const [name, setName] = useState("");
  const [addQuestion, setAddQuestion] = useState(false);
  const [hideName, setHideName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [tempName, setTempName] = useState("");
  const [mcArray, setMcArray] = useState([]);
  const [firstOut, setFirstOut] = useState(false);
  const [authState, setAuthState] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [newDisplayArray, setNewDisplayArray] = useState([
    {
      i: 0,
      question: "",
      showAnswer: false,
      Q1: "",
      Q2: "",
      Q3: "",
      Q4: "",
      imgName: "",
      Q1Correct: false,
      Q2Correct: false,
      Q3Correct: false,
      Q4Correct: false,
      renderEdit: false,
      answerType: "",
      singleAnswer: "",
      selected: "",
      correctAnswer: null,
      modalOpen: false,
      pointWorth: null,
    },
  ]);
  const handleModal = (openOrClose) => {
    if (openOrClose === "open") {
      return setModalOpened(true);
    }
    return setModalOpened(false);
  };
  const setObjectCorrectAnswer = (value) => {
    const newArr = [...newDisplayArray];
    const id =
      currentIndex !== null ? currentIndex : newDisplayArray.length - 1;

    newArr[id].Q1Correct = false;
    newArr[id].Q2Correct = false;
    newArr[id].Q3Correct = false;
    newArr[id].Q4Correct = false;
    newArr[id][value] = true;

    setNewDisplayArray(newArr);
  };

  const handleNameChangeOrSave = (e, bool) => {
    if (bool !== undefined) {
      return setHideName(true);
    }
    setName(e.target.value);
  };
  const findQuestion = () => {
    const arrayCopy = [...newDisplayArray];

    if (currentIndex === null) {
      const questionInfo = arrayCopy[arrayCopy.length - 1];
      return questionInfo;
    }
    return arrayCopy[currentIndex];
  };
  const changeItem = (key, change) => {
    const index =
      currentIndex === null ? newDisplayArray.length - 1 : currentIndex;
    const arrCopy = [...newDisplayArray];
    arrCopy[index][key] = change;
    setNewDisplayArray(arrCopy);
  };
  const handleAddQuestion = () => {
    if (newDisplayArray.length === 1 && newDisplayArray[0].question !== "") {
      const newQuestion = {
        i: 0,
        question: "",
        showAnswer: false,
        Q1: "",
        Q2: "",
        Q3: "",
        Q4: "",
        imgName: "",
        Q1Correct: false,
        Q2Correct: false,
        Q3Correct: false,
        Q4Correct: false,
        renderEdit: false,
        answerType: "",
        singleAnswer: "",
        selected: "",
        correctAnswer: null,
        modalOpen: false,
        pointWorth: null,
      };
      const displayUpdate = [...newDisplayArray];
      displayUpdate.push(newQuestion);
      setNewDisplayArray(displayUpdate);
    }
    setQuestionOut(false);
  };

  return (
    <div className="mainContainer">
      <div
        className="questionList"
        style={{
          borderRight: "3px solid blue",
          borderColor: "black",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            backgroundColor: "white",
            borderBottom: "3px solid black",
          }}
        >
          <Typography align="center" variant="h5">
            My Questions...
          </Typography>
        </div>
      </div>
      <div className="question-content">
        <Paper className={"paper"} elevation={3}>
          <h1>It's time to put your quiz-making skills to the test!</h1>
          <p>
            Use the form below to create a quiz that drills the material you
            need to learn!
          </p>
          <p>
            Remember: Sharing is caring, so don't forget to make your quiz
            downloadable by others!
          </p>
          <br></br>
        </Paper>
        {hideName !== "" ? (
          questionOut === false ? (
            <NewQuestion
              handleModalClose={handleModal}
              name={name}
              payload={newDisplayArray}
              modalOpened={modalOpened}
              currentQuestion={findQuestion().question}
              showAnswer={findQuestion().showAnswer}
              question={findQuestion()}
              changeItem={changeItem}
              reopenQuestion={setQuestionOut}
              number={
                currentIndex !== null
                  ? currentIndex + 1
                  : newDisplayArray.length
              }
              setObjectCorrectAnswer={setObjectCorrectAnswer}
            />
          ) : (
            <div className={"styleAdd"}>
              <Slide direction="up" in={questionOut === true}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={"button"}
                  onClick={handleAddQuestion}
                >
                  Add Question
                  <AddCircleIcon className={"addIcon"}></AddCircleIcon>
                </Button>
              </Slide>
            </div>
          )
        ) : (
          <div className={"name"}>
            <TextField
              placeholder="Enter quiz name"
              id="name"
              onChange={(e) => {
                handleNameChangeOrSave(e);
              }}
              variant="outlined"
            />

            <div
              className={"saveStyle"}
              // style={{
              //   display: "flex",
              //   marginTop: 10,
              //   justifyContent: "center",
              // }}
            >
              <Button
                className={"saveButton"}
                color="primary"
                onClick={(e) => {
                  handleNameChangeOrSave(e, true);
                  setQuestionOut(true);
                }}
                variant="outlined"
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewMakeQuiz;
