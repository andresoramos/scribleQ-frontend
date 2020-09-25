import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "../Styling/QuizQuestion.css";
import Avatar from "@material-ui/core/Avatar";
import { answerSave, updateAndSave } from "../Services/answerSave";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Upload from "./Upload";

export default function QuizQuestion(props) {
  const clickCount = props.clickCount;

  const changeQuestion = (content) => {
    props.setObjectQuestion(content, clickCount);
  }; //corrected

  const handleSave = async () => {
    const payload = { name: props.name, questions: props.payload };
    props.setObjectShowAnswer(false, clickCount);
    props.setObjectRenderEdit(true, clickCount);
    const saved = await answerSave(payload);
  }; //corrected

  const handleEdit = () => {
    props.setObjectHandleEdit(false, clickCount);
  }; //corrected

  const showAnswers = () => {
    props.setObjectShowAnswersTrue(true, clickCount);
    // setShowAnswer(true);
  }; //corrected
  const setObjectCorrectAnswer = (value) => {
    props.setObjectCorrectAnswer(value, clickCount);
  };

  const singleInput = (trackingNumber) => {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          size="small"
          style={{
            marginLeft: 5,
            marginBottom: 20,
          }}
          onChange={(e) => {
            props.setObjectSingleAnswer(e.target.value, trackingNumber);
          }}
          value={props.value}
          variant="outlined"
        />
      </div>
    );
  };
  const correctOrNot = (value) => {
    const correct = props.questionCorrect;
    if (correct[value] === true) {
      return true;
    }
    return false;
  };
  const handleModalClose = () => {
    props.openModal(false, clickCount);
  };
  const handlePointChange = (point) => {
    props.handlePointChange(point, clickCount);
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
        props.setObjectQx(e.target.value, clickCount, key);
      }
    }
  };
  const scoreModal = (
    <Dialog
      open={props.modalOpened}
      onClose={handleModalClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Question Value</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter in the line below how many points you would like to
          assign to this question.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          onChange={(e) => {
            handlePointChange(e.target.value);
          }}
          id="name"
          label="Question worth..."
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSave();
            handleModalClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
  const inputArr = [
    { letter: "A", id: "Q1", correct: "Q1Correct" },
    { letter: "B", id: "Q2", correct: "Q2Correct" },
    { letter: "C", id: "Q3", correct: "Q3Correct" },
    { letter: "D", id: "Q4", correct: "Q4Correct" },
  ];
  const mappedInputs = inputArr.map((item, i) => {
    const values = {
      0: props.Q1,
      1: props.Q2,
      2: props.Q3,
      3: props.Q4,
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

  return (
    <React.Fragment>
      {props.question !== "" && (
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
              dangerouslySetInnerHTML={{ __html: props.question }}
            />
            <br></br>
          </div>
        </Paper>
      )}
      {props.showAnswer ? (
        <div className={"textField"}>
          {props.answerType === "multiple"
            ? mappedInputs
            : singleInput(clickCount)}
        </div>
      ) : props.renderEdit ? null : (
        <TextEditor
          initialValue={props.question}
          changeQuestion={changeQuestion}
        />
      )}
      {props.showAnswer ? null : props.renderEdit ? null : (
        <Upload imgName={props.imgName} indexVal={clickCount} />
      )}
      {props.question !== "" && (
        <div className={"buttonGroup"}>
          {!props.showAnswer ? (
            !props.renderEdit ? (
              <Button onClick={showAnswers} variant="outlined" color="primary">
                Add answers
              </Button>
            ) : (
              <Button onClick={handleEdit} variant="outlined" color="primary">
                Edit
              </Button>
            )
          ) : !props.renderEdit ? (
            <Button
              onClick={() => {
                props.openModal(true, clickCount);
              }}
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
          ) : (
            <Button onClick={handleEdit} variant="outlined" color="primary">
              Edit
            </Button>
          )}
        </div>
      )}
      {scoreModal}
    </React.Fragment>
  );
}
