import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextEditor from "./TextEditor";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import { answerSave } from "../Services/answerSave";

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
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [Q1, setQ1] = useState("");
  const [Q2, setQ2] = useState("");
  const [Q3, setQ3] = useState("");
  const [Q4, setQ4] = useState("");
  const [renderEdit, setRenderEdit] = useState(false);

  const changeQuestion = (content) => {
    setQuestion(content);
  };

  const handleSave = async () => {
    console.log("save ran");
    const questionContent = { question: question, edited: false };
    const answersArray = [Q1, Q2, Q3, Q4];
    const name = props.name;
    const questionPayload = {
      answer: answersArray,
      questions: questionContent,
      name: name,
    };
    const saved = await answerSave(questionPayload);
    console.log(saved, "Is saved running");
    setShowAnswer(false);
    setRenderEdit(true);
  };
  // const showAllButLast = () => {};

  // const showOnlyLast = () => {};

  // const questionMappedArray = [{}];

  // const questionMapped = questionMappedArray.map((item, i) => {

  //   return (
  //     <Paper className={classes.questionPaper} elevation={3}>
  //       <div
  //         // style={{ backgroundColor: "pink" }}
  //         className={classes.questionNumber}
  //       >
  //         <div>
  //           <b>{`# ${i + 1}`}</b>
  //         </div>
  //         <div
  //           style={{
  //             width: "90%",
  //             marginLeft: 5,

  //             // lineHeight: 0,
  //           }}
  //           dangerouslySetInnerHTML={{ __html: question }}
  //         />
  //         <br></br>
  //       </div>
  //     </Paper>
  //   );
  // });

  const handleEdit = () => {
    setRenderEdit(false);
  };

  const showAnswers = () => {
    setShowAnswer(true);
  };
  const handleAnswerChange = (e) => {
    const id = {
      Q1: setQ1,
      Q2: setQ2,
      Q3: setQ3,
      Q4: setQ4,
    };
    const passedInId = e.target.id;
    for (var key in id) {
      if (passedInId === key) {
        id[key](e.target.value);
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
      0: Q1,
      1: Q2,
      2: Q3,
      3: Q4,
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

  return (
    <React.Fragment>
      {question !== "" && (
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
              dangerouslySetInnerHTML={{ __html: question }}
            />
            <br></br>
          </div>
        </Paper>
      )}
      {showAnswer ? (
        <div className={classes.textField}>{mappedInputs}</div>
      ) : renderEdit ? null : (
        <TextEditor initialValue={question} changeQuestion={changeQuestion} />
      )}
      {question !== "" && (
        <div className={classes.buttonGroup}>
          {!showAnswer ? (
            !renderEdit ? (
              <Button onClick={showAnswers} variant="outlined" color="primary">
                Add answers
              </Button>
            ) : (
              <Button onClick={handleEdit} variant="outlined" color="primary">
                Edit
              </Button>
            )
          ) : !renderEdit ? (
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
