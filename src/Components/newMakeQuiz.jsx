import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NewQuestion from "../Components/newQuestion";
import "../Styling/MakeQuiz.css";
import "fontsource-roboto";
import PreviewContainer from "../Components/PreviewContainer";
import Trashcan from "./Trashcan";
import AlertMessage from "./AlertMessage";
import { UsbOutlined } from "@material-ui/icons";

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
  const [cantDelete, setCantDelete] = useState(false);
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
  const dropHappened = (selected, landed) => {
    const fixedArray = [...newDisplayArray];
    const moved = { ...fixedArray[selected] };
    fixedArray.splice(landed + 1, 0, moved);
    let finalArray = [];
    for (var i = 0; i < fixedArray.length; i++) {
      if (JSON.stringify(fixedArray[i]) !== JSON.stringify(moved)) {
        finalArray.push(fixedArray[i]);
      } else {
        if (i === landed + 1) {
          finalArray.push(fixedArray[i]);
        }
      }
    }
    let newIndex;
    for (i = 0; i < finalArray.length; i++) {
      if (finalArray[i].i === moved.i) {
        finalArray[i].showAnswer = true;
        newIndex = i;
      }
    }
    setCurrentIndex(newIndex);
    setNewDisplayArray(finalArray);
    setQuestionOut(false);
  };

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
    console.log(arrayCopy, "This is array copy in find question");

    if (currentIndex === null) {
      console.log("current index equals null in find question");
      const questionInfo = arrayCopy[arrayCopy.length - 1];
      console.log(questionInfo, "question info is not undefined");
      return questionInfo;
    }
    console.log("got to the end of find question");
    console.log(currentIndex, "this is the current index");
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
    if (newDisplayArray.length >= 1 && newDisplayArray[0].question !== "") {
      const newQuestion = {
        i: newDisplayArray.length,
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
  const deleteQuestion = (index) => {
    console.log(`Your current index is ${index}`);
    let id = findQuestion().i;
    let actualCurrentIndex;
    let updatedArray = [...newDisplayArray];
    for (var i = 0; i < updatedArray.length; i++) {
      if (updatedArray[i].i === id) {
        actualCurrentIndex = i;
      }
    }

    console.log(`Actual current is ${actualCurrentIndex}`);
    const testArray = [...updatedArray];
    updatedArray.splice(index, 1);
    if (actualCurrentIndex === index) {
      console.log("actualcurr vs index is working correctly");
      //Checks to see if question being viewed got deleted
      if (updatedArray.length === 0) {
        setCantDelete(true);
      }
      if (updatedArray[index - 1] !== undefined) {
        updatedArray[index - 1].showAnswer = true;
        setNewDisplayArray(updatedArray);
        setCurrentIndex(index - 1);
        return setQuestionOut(false);
      }
      return console.log("you'd have to go to the one before");
    }
  };

  const insertQuestion = (item) => {
    const existing = [...newDisplayArray];
    let newI = 0;
    for (var i = 0; i < existing.length; i++) {
      if (existing[i].i > newI) {
        newI = existing[i].i;
      }
    }
    let newQuestion = {
      i: newI + 1,
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
    let index;
    for (i = 0; i < existing.length; i++) {
      if (existing[i].i === item) {
        index = i;
      }
    }
    existing.splice(index + 1, 0, newQuestion);
    setNewDisplayArray(existing);
  };
  const setIndex = (index) => {
    const arrayCopy = [...newDisplayArray];
    const switchView = localStorage.getItem("divPressed");
    console.log(switchView, "this is switch view");
    if (switchView !== "false") {
      let newIndex;
      for (var i = 0; i < arrayCopy.length; i++) {
        if (arrayCopy[i].i === index) {
          newIndex = i;
        }
      }
      arrayCopy[newIndex].showAnswer = true;
      setNewDisplayArray(arrayCopy);
      setCurrentIndex(newIndex);
      return setQuestionOut(false);
    }
    console.log("should only now show up with the plus button");
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
        <AlertMessage
          cantDelete={cantDelete}
          title={"Your quiz must contain at least one question"}
          setCantDelete={setCantDelete}
          contentText={
            "If you'd like to change this question, please use the editing options available."
          }
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            backgroundColor: "white",
            borderBottom: "3px solid black",
          }}
        >
          <Typography align="center" variant="h5">
            My Questions...
          </Typography>
        </div>
        <DndProvider backend={HTML5Backend}>
          {newDisplayArray.map((item, i) => {
            return (
              <PreviewContainer
                key={i}
                setIndex={setIndex}
                dropHappened={dropHappened}
                containerIndex={i}
                question={item.question}
                item={item}
                addQuestion={insertQuestion}
              />
            );
          })}
          <Trashcan deleteQuestion={deleteQuestion} />
        </DndProvider>
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
