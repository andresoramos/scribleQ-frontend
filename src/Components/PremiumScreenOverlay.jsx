import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import "../Styling/chargeOverlay.css";
import htmlToText from "../Services/htmlToText";

function PremiumDialog(props) {
  const { open } = props;

  const handleChange = (val, cost) => {
    props.fixCheckBoxes(val, cost);
  };
  const premiumQuestionsMap = props.premiumQuestionsArray
    ? props.premiumQuestionsArray.map((item, i) => {
        return (
          <div key={i} className="mappedContainer">
            <FormControl
              required
              // error={error}
              component="fieldset"
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.checkboxes[i + 1]}
                      onChange={() => {
                        handleChange(i + 1, item.premiumCost);
                      }}
                      name={`${htmlToText(item.question)} (${
                        item.premiumCost
                      } Scribloons)`}
                    />
                  }
                  label={`${htmlToText(item.question)} (${
                    item.premiumCost
                  } Scribloons)`}
                />
              </FormGroup>
              {/* <FormHelperText>You can display an error</FormHelperText> */}
            </FormControl>
          </div>
        );
      })
    : null;

  return (
    <Dialog
      // onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <div className="title">
        <FormLabel component="legend">
          Select the questions you want to buy
        </FormLabel>
      </div>
      <div className="checkboxContainer">
        <div className="mappedPremium">{premiumQuestionsMap}</div>
      </div>
      <div className="total">
        <div style={{ fontWeight: "bold" }}>Total</div>
        <div className="divider" />
        <div className="sum">{props.total}</div>
      </div>
      <div>
        <div className="buyCancel">
          <Button
            onClick={props.handlePremiumBuy}
            style={{ marginLeft: "15px" }}
          >
            Buy
          </Button>
          <Button
            onClick={() => {
              props.close(false, true);
            }}
          >
            Cancel
          </Button>
        </div>
        {props.sameAlert && (
          <Alert severity="error">You can't buy a quiz from yourself!</Alert>
        )}
        {props.owned && (
          <Alert severity="error">You already own this quiz!</Alert>
        )}
      </div>
    </Dialog>
  );
}

export default function PremiumScreenOverlay(props) {
  const pluralize = (quiz) => {
    if (quiz === null) {
      return null;
    }
    if (Object.keys(quiz.premiumCost).length > 1) {
      return "questions";
    }
    return "question";
  };
  const findFree = (quiz) => {
    if (!quiz) {
      return { free: 0, questions: "questions" };
    }
    const totalKeys = quiz.questions.length;
    const premiumKeys = quiz.premiumCost
      ? Object.keys(quiz.premiumCost).length
      : 0;
    const finalAmount = totalKeys - premiumKeys;
    return {
      free: finalAmount,
      question: finalAmount > 1 ? "questions" : "question",
    };
  };
  const premiumQuestionsArray = (quiz) => {
    if (!quiz) {
      return;
    }
    const questions = _.cloneDeep(quiz.questions);
    const cost = { ...quiz.premiumCost };
    for (var key in cost) {
      questions[Number(key) - 1].premiumCost = Number(cost[key]);
    }
    const finalArr = [];
    for (var i = 0; i < questions.length; i++) {
      if (quiz.premiumCost[i + 1]) {
        finalArr.push(questions[i]);
      }
    }
    return finalArr;
  };
  return (
    <div>
      <PremiumDialog
        title={`"${props.quizName}" contains ${
          findFree(props.quiz).free
        } free ${findFree(props.quiz).question} and ${
          props.quiz ? Object.keys(props.quiz.premiumCost).length : null
        } premium ${pluralize(
          props.quiz
        )}.  Select which questions you want to purchase, and then hit 'Buy' to finalize your download.  It is important to note that once your quiz has been downloaded, you cannot purchase any additional premium questions for it.`}
        handleDownload={props.handleDownload}
        handlePremiumBuy={props.handlePremiumBuy}
        open={props.open}
        total={props.total}
        premiumQuestionsArray={premiumQuestionsArray(props.quiz)}
        hidden={props.hidden}
        sameAlert={props.sameAlert}
        error={props.error}
        fixCheckBoxes={props.fixCheckBoxes}
        checkboxes={props.checkboxes}
        close={props.close}
        quiz={props.quiz}
      />
    </div>
  );
}
