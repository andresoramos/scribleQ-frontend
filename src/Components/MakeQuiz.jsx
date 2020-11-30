import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import QuizQuestion from "./QuizQuestion";
import TextField from "@material-ui/core/TextField";
import { answerSave } from "../Services/answerSave";
import decode from "jwt-decode";
import getQuizzes from "./../Services/getQuizzes";
import authenticateUserToken from "./../Services/authenticateUserToken";
import "../Styling/MakeQuiz.css";

const useStyles = makeStyles((theme) => ({
  // addIcon: { marginLeft: ".5em" },
  // container: {
  //   marginTop: theme.spacing(2),
  //   width: "80%",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // button: {
  //   marginTop: theme.spacing(3),
  //   marginBottom: theme.spacing(3),
  // },
  // ButtonGroup: { marginBottom: theme.spacing(3) },
  // paper: {
  //   marginTop: theme.spacing(12),
  //   width: "80%",
  //   borderRadius: 20,
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  // form: {
  //   width: "100%", // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // name: { display: "flex", flexDirection: "column", marginTop: 10 },
  // questionPaper: {
  //   marginBottom: theme.spacing(5),
  //   width: "70%",
  //   borderRadius: 70,
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  // },
  // styleAdd: {
  //   display: "flex",
  //   alignItems: "center",
  //   width: "60%",
  //   justifyContent: "space-between",
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
}));

export const MakeQuiz = (props) => {
  // const classes = useStyles();
  const [slide, setSlide] = useState(false);
  const [questionOut, setQuestionOut] = useState(false);
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const [mcArray, setMcArray] = useState([]);
  const [firstOut, setFirstOut] = useState(false);
  const [authState, setAuthState] = useState(false);
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
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    async function tokenWorks() {
      const trueOrFalse = await authenticateUserToken(
        localStorage.getItem("token")
      );
      setAuthState(trueOrFalse);
    }
    tokenWorks();
  });

  const setObjectCorrectAnswer = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].Q1Correct = false;
        newArr[i].Q2Correct = false;
        newArr[i].Q3Correct = false;
        newArr[i].Q4Correct = false;
        newArr[i][value] = true;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectSelected = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].selected = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };
  const imgName = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        console.log(newArr[i], "getting a match");
        newArr[i].imgName = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };

  const setObjectShowAnswer = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].showAnswer = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectPointValue = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].pointWorth = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectQx = (value, id, key) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i][key] = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectShowAnswersTrue = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].showAnswer = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectHandleEdit = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].renderEdit = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectAnswerType = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].answerType = value;
        break;
      }
    }
    setNewDisplayArray(newArr);
  };

  const setObjectRenderEdit = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].renderEdit = value;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectQuestion = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].question = value;
      }
    }
    setNewDisplayArray(newArr);
  };

  const bringSlide = async (i) => {
    if (newDisplayArray.length === 1 && firstOut === false) {
      const newClick = clickCount + 1;
      await setClickCount(newClick);
      const fixedFirst = [...newDisplayArray];
      fixedFirst[0].trackNumber = clickCount + 1;
      setNewDisplayArray(fixedFirst);
      return setFirstOut(true);
    }

    const updatedArray = [...newDisplayArray];
    const index = i;

    updatedArray.splice(index + 1, 0, {
      i: index,
      open: false,
      trackNumber: clickCount + 1,
      question: "",
      showAnswer: false,
      Q1: "",
      Q2: "",
      Q3: "",
      Q4: "",
      imgName: "",
      Q1Correct: null,
      Q2Correct: null,
      Q3Correct: null,
      Q4Correct: null,
      renderEdit: false,
      answerType: "",
      singleAnswer: "",
      selected: "",
      modalOpen: false,
      pointWorth: null,
    });
    setClickCount(clickCount + 1);

    setNewDisplayArray(updatedArray);
  };

  const shouldBringSlide = (i) => {
    if (newDisplayArray.length === 1) {
      if (!firstOut) {
        return false;
      }

      return true;
    }
    for (var i = 0; i < newDisplayArray.length; i++) {
      if (i === newDisplayArray[i]["i"]) {
        return true;
      }
    }
    return false;
  };
  const multipleChoice = (i) => {
    const updatedDisplayArray = [...newDisplayArray];
    updatedDisplayArray[i].open = true;
    setNewDisplayArray(updatedDisplayArray);
  };

  const setObjectOpenModal = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].modalOpen = value;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectSingleAnswer = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        newArr[i].singleAnswer = value;
      }
    }
    setNewDisplayArray(newArr);
  };
  const handleTempNameChange = (e) => {
    setTempName(e.target.value);
  };

  const handleNameSave = (e) => {
    setName(tempName);
  };
  const handleQuizSave = async () => {
    console.log("You're trying to handle saving the quiz");
    const email = decode(localStorage.getItem("token")).email;
    const payload = { user: props.signedInName, name: name, email };
    try {
      const saved = await axios.post(
        "http://localhost:5000/api/quizzes/saveQuiz",
        payload
      );
      console.log(saved, "saved has happened");
      const quizzes = await getQuizzes();
      localStorage.setItem("account", JSON.stringify(quizzes));
      window.location = "/";
    } catch (err) {
      if (err.response.data === "This quiz is already in our database") {
        props.history.push("/makeQuiz");
      }
      console.log(err.response, "this is the response");
    }
  };
  const handleDelete = async (trackNumber, name) => {
    if (trackNumber === undefined) {
      trackNumber = 1;
    }
    const newArray = [...newDisplayArray];
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].trackNumber === trackNumber) {
        newArray.splice(i, 1);
        break;
      }
    }
    setNewDisplayArray(newArray);
    const savePayload = { name: name, questions: newArray };
    await answerSave(savePayload);
  };
  const shouldGetTextbox = (i) => {
    return newDisplayArray[i].open;
  };
  const mappedDisplayArray = newDisplayArray.map((item, i) => {
    return (
      <React.Fragment>
        {name !== "" ? (
          <div className={"styleAdd"}>
            <Button
              color="primary"
              variant="outlined"
              className={"button"}
              onClick={() => {
                bringSlide(i);
              }}
            >
              Add Question
              <AddCircleIcon className={"addIcon"}></AddCircleIcon>
            </Button>
            <Button
              color="primary"
              variant="outlined"
              className={"button"}
              onClick={() => {
                handleDelete(item.trackNumber, name, newDisplayArray);
              }}
            >
              Delete question
              <AddCircleIcon className={"addIcon"}></AddCircleIcon>
            </Button>
          </div>
        ) : (
          <div className={"name"}>
            <TextField
              defaultValue="Enter quiz name"
              id="name"
              onChange={handleTempNameChange}
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
                onClick={handleNameSave}
                variant="outlined"
              >
                Save
              </Button>
            </div>
          </div>
        )}
        <Slide direction={"up"} in={shouldBringSlide(i)}>
          <ButtonGroup
            className={"ButtonGroup"}
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              color={
                item.selected === ""
                  ? "default"
                  : item.selected === "open"
                  ? "secondary"
                  : "default"
              }
              onClick={() => {
                setObjectSelected("open", item.trackNumber);
                multipleChoice(i);
                setObjectAnswerType("open", item.trackNumber);
              }}
            >
              Open-ended
            </Button>
            <Button
              color={
                item.selected === ""
                  ? "default"
                  : item.selected === "multiple"
                  ? "secondary"
                  : "default"
              }
              onClick={() => {
                setObjectSelected("multiple", item.trackNumber);

                multipleChoice(i);
                setObjectAnswerType("multiple", item.trackNumber);
              }}
            >
              Multiple Choice
            </Button>
          </ButtonGroup>
        </Slide>
        {shouldGetTextbox(i) && (
          <Slide direction={"up"}>
            <QuizQuestion
              questionCorrect={{
                Q1Correct: item.Q1Correct,
                Q2Correct: item.Q2Correct,
                Q3Correct: item.Q3Correct,
                Q4Correct: item.Q4Correct,
              }}
              imgName={imgName}
              modalOpened={item.modalOpen}
              openModal={setObjectOpenModal}
              setObjectSingleAnswer={setObjectSingleAnswer}
              setObjectCorrectAnswer={setObjectCorrectAnswer}
              question={item.question}
              showAnswer={item.showAnswer}
              answerType={item.answerType}
              handlePointChange={setObjectPointValue}
              Q1={item.Q1}
              Q2={item.Q2}
              Q3={item.Q3}
              Q4={item.Q4}
              value={item.singleAnswer}
              clickCount={item.trackNumber}
              renderEdit={item.renderEdit}
              payload={newDisplayArray}
              setObjectQx={setObjectQx}
              setObjectShowAnswersTrue={setObjectShowAnswersTrue}
              setObjectHandleEdit={setObjectHandleEdit}
              setObjectRenderEdit={setObjectRenderEdit}
              setObjectShowAnswer={setObjectShowAnswer}
              setObjectQuestion={setObjectQuestion}
              name={name}
              number={i + 1}
            />
          </Slide>
        )}
      </React.Fragment>
    );
  });

  return (
    <Container>
      <div className="makeQuizContainer">
        {authState === true ? (
          <React.Fragment>
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
            {mappedDisplayArray}
            {newDisplayArray[0].question !== "" && (
              <Button
                style={{ marginTop: 20 }}
                variant="outlined"
                onClick={handleQuizSave}
              >
                Save Quiz
              </Button>
            )}
          </React.Fragment>
        ) : (
          <div>You need to login to make a quiz.</div>
        )}
      </div>
    </Container>
  );
};
