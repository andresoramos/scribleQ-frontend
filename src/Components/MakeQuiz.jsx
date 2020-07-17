import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import { Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import QuizQuestion from "./QuizQuestion";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  addIcon: { marginLeft: ".5em" },
  container: {
    marginTop: theme.spacing(2),
    width: "80%",
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
    marginTop: theme.spacing(12),
    width: "80%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  questionPaper: {
    marginBottom: theme.spacing(5),
    width: "70%",
    borderRadius: 70,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const MakeQuiz = () => {
  const classes = useStyles();
  const [slide, setSlide] = useState(false);
  const [questionOut, setQuestionOut] = useState(false);
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const [mcArray, setMcArray] = useState([]);
  const [firstOut, setFirstOut] = useState(false);
  const [newDisplayArray, setNewDisplayArray] = useState([
    {
      i: 0,
      question: "",
      showAnswer: false,
      Q1: "",
      Q2: "",
      Q3: "",
      Q4: "",
      renderEdit: false,
      answerType: "",
      singleAnswer: "",
    },
  ]);
  const [clickCount, setClickCount] = useState(0);

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
        console.log("we found a match, ", newArr[i]);
        newArr[i].renderEdit = value;
      }
    }
    setNewDisplayArray(newArr);
  };
  const setObjectQuestion = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        console.log("we found a match, ", newArr[i]);
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
    console.log(updatedArray, "this is the array youre copying");
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
      renderEdit: false,
      answerType: "",
      singleAnswer: "",
    });
    setClickCount(clickCount + 1);

    setNewDisplayArray(updatedArray);
  };

  useEffect(() => {
    console.log("Rerendered and clickCount === ", clickCount);
  });

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

  const setObjectSingleAnswer = (value, id) => {
    const newArr = [...newDisplayArray];
    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].trackNumber === id) {
        console.log("we found a match, ", newArr[i]);
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

  const shouldGetTextbox = (i) => {
    return newDisplayArray[i].open;
  };
  const mappedDisplayArray = newDisplayArray.map((item, i) => {
    return (
      <React.Fragment>
        {name !== "" ? (
          <div
            style={{
              backgroundColor: "pink",
              display: "flex",
              alignItems: "center",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <Button
              color="primary"
              variant="outlined"
              className={classes.button}
              onClick={() => {
                bringSlide(i);
              }}
            >
              Add Question
              <AddCircleIcon className={classes.addIcon}></AddCircleIcon>
            </Button>
            <Button
              color="primary"
              variant="outlined"
              className={classes.button}
              onClick={() => {
                bringSlide(i);
              }}
            >
              Delete question
              <AddCircleIcon className={classes.addIcon}></AddCircleIcon>
            </Button>
          </div>
        ) : (
          <div className={classes.name}>
            <TextField
              defaultValue="Enter quiz name"
              id="name"
              onChange={handleTempNameChange}
              variant="outlined"
            />
            <div
              style={{
                display: "flex",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <Button
                style={{ width: "20%" }}
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
            className={classes.ButtonGroup}
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => {
                multipleChoice(i);
                setObjectAnswerType("open", item.trackNumber);
              }}
            >
              Open-ended
            </Button>
            <Button
              onClick={() => {
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
              setObjectSingleAnswer={setObjectSingleAnswer}
              question={item.question}
              showAnswer={item.showAnswer}
              answerType={item.answerType}
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
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <h1>It's time to put your quiz-making skills to the test!</h1>
        <p>
          Use the form below to create a quiz that drills the material you need
          to learn!
        </p>
        <p>
          Remember: Sharing is caring, so don't forget to make your quiz
          downloadable by others!
        </p>
        <br></br>
      </Paper>
      {mappedDisplayArray}
    </Container>
  );
};
