import React, { useState } from "react";
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
  const [newDisplayArray, setNewDisplayArray] = useState([{ i: 0 }]);
  const bringSlide = (i) => {
    if (newDisplayArray.length === 1 && firstOut === false) {
      return setFirstOut(true);
    }

    const updatedArray = [...newDisplayArray];
    const index = i;

    updatedArray.splice(index + 1, 0, { i: index, open: false });

    setNewDisplayArray(updatedArray);

    // setSlide(true);

    // let number = questionNumber;
    // number += 1;
    // setQuestionNumber(number);
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
    // setQuestionOut(true);
    // const newMcArray = [...mcArray];
    // newMcArray.push(i);
    // setMcArray(newMcArray);

    const updatedDisplayArray = [...newDisplayArray];
    updatedDisplayArray[i].open = true;
    setNewDisplayArray(updatedDisplayArray);
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
            <Button>Open-ended</Button>
            <Button
              onClick={() => {
                multipleChoice(i);
              }}
            >
              Multiple Choice
            </Button>
          </ButtonGroup>
        </Slide>
        {shouldGetTextbox(i) && (
          <Slide direction={"up"}>
            <QuizQuestion name={name} number={i + 1} />
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
      {/* {name !== "" ? (
        <Button
          color="primary"
          variant="outlined"
          className={classes.button}
          onClick={bringSlide}
        >
          Add Question
          <AddCircleIcon className={classes.addIcon}></AddCircleIcon>
        </Button>
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
      <Slide direction={"up"} in={slide}>
        <ButtonGroup
          className={classes.ButtonGroup}
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button>Open-ended</Button>
          <Button onClick={multipleChoice}>Multiple Choice</Button>
        </ButtonGroup>
      </Slide>
      {questionOut && (
        <Slide direction={"up"}>
          <QuizQuestion name={name} number={questionNumber} />
        </Slide>
      )} */}
    </Container>
  );
};
