import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextEditor from "./TextEditor";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { answerSave, updateAndSave } from "../Services/answerSave";
import editOrNew from "../Services/editOrNew";

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    width: "30%",
    marginTop: theme.spacing(5),
  },
  questionNumber: {
    display: "flex",
    alignContent: "column",
    flexDirection: "row",
    alignItems: "center",
    margin: "3em",
    minHeight: "20vh",
  },
  questionPaper: {
    width: "70%",
    borderRadius: 70,
    display: "flex",
    flexDirection: "column",

    marginBottom: theme.spacing(5),

    // alignItems: "center",
  },
  textField: { display: "flex", flexDirection: "column", alignItems: "center" },
}));

export default function QuizQuestion(props) {
  const classes = useStyles();
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

  // const openOrMulti = (idNumber) => {
  //   for (var i = 0; i < newDisplayArray.length; i++) {
  //     if (idNumber === newDisplayArray[i].trackNumber) {
  //       if (newDisplayArray[i].answerType === "multiple") {
  //         return;
  //       }
  //       if (newDisplayArray[i].answerType === "open") {
  //         return "open";
  //       }
  //     }
  //   }
  //   return null;
  // };
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
  const inputArr = [
    { letter: "A", id: "Q1" },
    { letter: "B", id: "Q2" },
    { letter: "C", id: "Q3" },
    { letter: "D", id: "Q4" },
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

  // console.log(`this is the state in question number ${props.number}: question: ${question}, showAnswer: ${showAnswer}, Q1: ${Q1},
  // Q2: ${Q2}, Q3:${Q3}, Q4: ${Q4}, renderEdit: ${renderEdit}, `);
  console.log(props.answerType, "theres an issue with the props");
  return (
    <React.Fragment>
      {props.question !== "" && (
        <Paper className={classes.questionPaper} elevation={3}>
          <div
            // style={{ backgroundColor: "pink" }}
            className={classes.questionNumber}
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
        <div className={classes.textField}>
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
      {props.question !== "" && (
        <div className={classes.buttonGroup}>
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
          ) : /*
              If showAnswer is true, then we'll have to see if render edit is true.  If so, provide a null, otherwise
              provide a text editor

            if Question doesn't equal '', then you'll render the following:  if show answer is false,
            then you'll check to see if renderedit is false.  If so, a button adding answers appears.  Otherwise,
            an edit button appears.  If show answer is not false, then check to see if render edit isn't true.  If
            that's the case, then render a save button.  Otherwise, render an edit button.
            */
          !props.renderEdit ? (
            <Button
              onClick={() => {
                handleSave();
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
    </React.Fragment>
  );
}
