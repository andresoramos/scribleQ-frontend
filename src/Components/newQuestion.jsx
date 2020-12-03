import React from "react";
import "../Styling/newQuestion.css";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextEditor from "./TextEditor";
import Upload from "../Components/Upload";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import ScoreModal from "./ScoreModal";

function NewQuestion(props) {
  const changeQuestion = (message) => {
    props.changeItem("question", message);
  };

  const handleAnswerChange = (e) => {
    const id = {
      Q1: true,
      Q2: true,
      Q3: true,
      Q4: true,
    };

    const passedInId = e.target.id;
    for (var key in id) {
      if (passedInId === key) {
        props.changeItem(key, e.target.value);
      }
    }
  };
  const correctOrNot = (value) => {
    const correct = props.question;
    if (correct[value] === true) {
      return true;
    }
    return false;
  };
  const inputArr = [
    { letter: "A", id: "Q1", correct: "Q1Correct" },
    { letter: "B", id: "Q2", correct: "Q2Correct" },
    { letter: "C", id: "Q3", correct: "Q3Correct" },
    { letter: "D", id: "Q4", correct: "Q4Correct" },
  ];
  const mappedInputs = inputArr.map((item, i) => {
    const values = {
      0: props.question.Q1,
      1: props.question.Q2,
      2: props.question.Q3,
      3: props.question.Q4,
    };

    return (
      <div key={i} style={{ display: "flex", flexDirection: "row" }}>
        <Button
          onClick={() => {
            setObjectCorrectAnswer(item.correct);
          }}
        >
          {correctOrNot(item.correct)
            ? "Correct answer"
            : "Click to select correct answer"}
        </Button>
        <Avatar>{item.letter}</Avatar>
        <TextField
          size="small"
          style={{
            marginLeft: 5,
            marginBottom: 20,
          }}
          onChange={handleAnswerChange}
          variant="outlined"
          value={values[i]}
          id={item.id}
        />
      </div>
    );
  });

  const setObjectCorrectAnswer = (value) => {
    props.setObjectCorrectAnswer(value);
  };
  return (
    <div className="questionContainer">
      {!props.showAnswer ? (
        <div>
          <TextEditor
            initialValue={props.currentQuestion}
            changeQuestion={changeQuestion}
          />
          <Upload imgName={props.changeItem} />
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <Button
              variant="outlined"
              onClick={() => {
                props.changeItem("selected", "multiple");
                props.changeItem("showAnswer", true);
              }}
            >
              Multiple Choice Answer
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                props.changeItem("selected", "open");
                props.changeItem("showAnswer", true);
              }}
            >
              Fill in the blank
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Paper className={"questionPaper"} elevation={3}>
              <div
                // style={{ backgroundColor: "pink" }}
                className={"questionNumber"}
              >
                <div>
                  <b>{`# ${props.number}`}</b>
                </div>
                <div
                  style={{
                    width: "90%",
                    marginLeft: 5,

                    // lineHeight: 0,
                  }}
                  dangerouslySetInnerHTML={{ __html: props.question.question }}
                />
                <br></br>
              </div>
            </Paper>
            <Button
              onClick={() => {
                props.changeItem("showAnswer", false);
              }}
              style={{ height: "20%" }}
              variant="outlined"
            >
              Edit Question
            </Button>
          </div>
          {props.selected === "multiple" ? (
            mappedInputs
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                size="small"
                style={{
                  marginLeft: 5,
                  marginBottom: 20,
                }}
                onChange={(e) => {
                  props.changeItem("singleAnswer", e.target.value);
                }}
                value={props.singleAnswer}
                variant="outlined"
              />
            </div>
          )}
          <Button
            onClick={() => {
              props.fixProperties([["modalOpened", true]]);
            }}
          >
            Save Question
          </Button>
        </div>
      )}
      <ScoreModal
        changeItem={props.changeItem}
        modalOpened={props.modalOpened}
        name={props.name}
        fixProperties={props.fixProperties}
        payload={props.payload}
      />
    </div>
  );
}

export default NewQuestion;
