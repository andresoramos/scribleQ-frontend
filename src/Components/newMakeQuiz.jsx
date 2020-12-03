import React, { useState, useEffect } from "react";
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
import { deleteQuestion, quizSave } from "../Services/questionServices";
import { answerSave } from "../Services/answerSave";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {},
}));

function NewMakeQuiz(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    questionOut: false,
    name: "",
    hideName: "",
    currentIndex: null,
    cantDelete: false,
    modalOpened: false,
    newDisplayArray: [
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
        modalOpened: false,
        pointWorth: null,
      },
    ],
  });
  // const [newDisplayArray, setNewDisplayArray] = useState([
  //   {
  //     i: 0,
  //     question: "",
  //     showAnswer: false,
  //     Q1: "",
  //     Q2: "",
  //     Q3: "",
  //     Q4: "",
  //     imgName: "",
  //     Q1Correct: false,
  //     Q2Correct: false,
  //     Q3Correct: false,
  //     Q4Correct: false,
  //     renderEdit: false,
  //     answerType: "",
  //     singleAnswer: "",
  //     selected: "",
  //     correctAnswer: null,
  //     modalOpen: false,
  //     pointWorth: null,
  //   },
  // ]);

  const fixProperties = (arr) => {
    let newFormState = { ...formState };
    for (var i = 0; i < arr.length; i++) {
      newFormState[arr[i][0]] = arr[i][1];
    }
    setFormState(newFormState);
  };
  const dropHappened = (selected, landed) => {
    const fixedArray = [...formState.newDisplayArray];
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
    setFormState({
      ...formState,
      newDisplayArray: finalArray,
      currentIndex: newIndex,
      questionOut: false,
    });
  };

  const handleModal = (openOrClose) => {
    if (openOrClose === "open") {
      return fixProperties([["modalOpened", true]]);
    }
    return fixProperties([["modalOpened", false]]);
  };
  const setObjectCorrectAnswer = (value) => {
    const newArr = [...formState.newDisplayArray];
    const id =
      formState.currentIndex !== null
        ? formState.currentIndex
        : formState.newDisplayArray.length - 1;

    newArr[id].Q1Correct = false;
    newArr[id].Q2Correct = false;
    newArr[id].Q3Correct = false;
    newArr[id].Q4Correct = false;
    newArr[id][value] = true;
    fixProperties(["newDisplayArray", newArr]);
    // setNewDisplayArray(newArr);
  };

  const handleNameChangeOrSave = (e, bool) => {
    if (bool !== undefined) {
      console.log("the save was clicked");
      return fixProperties([
        ["hideName", true],
        ["questionOut", true],
      ]);
    }
    fixProperties([["name", e.target.value]]);
  };
  const findQuestion = () => {
    const arrayCopy = [...formState.newDisplayArray];
    if (formState.currentIndex === null) {
      const questionInfo = arrayCopy[arrayCopy.length - 1];
      return questionInfo;
    }
    return arrayCopy[formState.currentIndex];
  };
  const changeItem = (key, change) => {
    const index =
      formState.currentIndex === null
        ? formState.newDisplayArray.length - 1
        : formState.currentIndex;
    const arrCopy = [...formState.newDisplayArray];
    arrCopy[index][key] = change;
    fixProperties([["newDisplayArray", arrCopy]]);
    // setNewDisplayArray(arrCopy);
  };
  const handleAddQuestion = () => {
    if (
      formState.newDisplayArray.length >= 1 &&
      formState.newDisplayArray[0].question !== ""
    ) {
      const newQuestion = {
        i: formState.newDisplayArray.length,
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
      const displayUpdate = [...formState.newDisplayArray];
      displayUpdate.push(newQuestion);
      // setNewDisplayArray(displayUpdate);
      return setFormState({
        ...formState,
        newDisplayArray: displayUpdate,
        questionOut: false,
      });
    }
    setFormState({ ...formState, questionOut: false });
    // setQuestionOut(false);
  };

  const insertQuestion = (item) => {
    const existing = [...formState.newDisplayArray];
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
    setFormState({ ...formState, newDisplayArray: existing });
    // setNewDisplayArray(existing);
  };

  //here what you can try is setting up a new set index
  //that only sets index but doesn't mess with the array
  const setIndex = (index) => {
    const arrayCopy = [...formState.newDisplayArray];
    const switchView = localStorage.getItem("divPressed");
    if (switchView !== "false") {
      let newIndex;
      for (var i = 0; i < arrayCopy.length; i++) {
        if (arrayCopy[i].i === index) {
          newIndex = i;
        }
      }
      arrayCopy[newIndex].showAnswer = true;
      // setNewDisplayArray(arrayCopy);
      return setFormState({
        ...formState,
        newDisplayArray: arrayCopy,
        currentIndex: newIndex,
        questionOut: false,
      });
    }
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
          cantDelete={formState.cantDelete}
          title={"Your quiz must contain at least one question"}
          fixProperties={fixProperties}
          contentText={
            "If you'd like to change this question, please use the editing options available."
          }
          buttonMessage="Accept"
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
          {formState.newDisplayArray.map((item, i) => {
            return (
              <PreviewContainer
                key={i}
                name={formState.name}
                questionNumber={i + 1}
                setIndex={setIndex}
                dropHappened={dropHappened}
                containerIndex={i}
                fixProperties={fixProperties}
                question={item.question}
                item={item}
                addQuestion={insertQuestion}
              />
            );
          })}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Trashcan
              deleteQuestion={deleteQuestion}
              findQuestion={findQuestion}
              newDisplayArray={formState.newDisplayArray}
              fixProperties={fixProperties}
              // setNewDisplayArray={setNewDisplayArray}
              questionOut={formState.questionOut}
              name={formState.name}
            />
            <Button
              onClick={async () => {
                if (
                  formState.name === "" ||
                  (formState.newDisplayArray.length === 1 &&
                    formState.newDisplayArray[0].question === "")
                ) {
                  return props.history.push("/");
                }
                const payload = {
                  name: formState.name,
                  questions: formState.newDisplayArray,
                };
                const saved = await answerSave(payload);
                quizSave(props.signedInName, formState.name, props);
              }}
              style={{ marginTop: "25em" }}
            >
              Save Quiz
            </Button>
          </div>
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
        {formState.hideName !== "" ? (
          formState.questionOut === false ? (
            <NewQuestion
              singleAnswer={findQuestion().singleAnswer}
              name={formState.name}
              selected={findQuestion().selected}
              payload={formState.newDisplayArray}
              modalOpened={formState.modalOpened}
              currentQuestion={findQuestion().question}
              showAnswer={findQuestion().showAnswer}
              question={findQuestion()}
              changeItem={changeItem}
              fixProperties={fixProperties}
              number={
                formState.currentIndex !== null
                  ? formState.currentIndex + 1
                  : formState.newDisplayArray.length
              }
              setObjectCorrectAnswer={setObjectCorrectAnswer}
            />
          ) : (
            <div className={"styleAdd"}>
              <Slide direction="up" in={formState.questionOut === true}>
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

            <div className={"saveStyle"}>
              <Button
                className={"saveButton"}
                color="primary"
                onClick={(e) => {
                  handleNameChangeOrSave(e, true);
                  // fixProperties([["questionOut", true]]);
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
