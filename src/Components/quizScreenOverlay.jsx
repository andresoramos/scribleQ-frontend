import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import "../Styling/chargeOverlay.css";

function ChoiceDialog(props) {
  const { onClose, open } = props;
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <List>
        <div className="buyCancel">
          <div className="postBuyButtons">
            <Button
              variant="outlined"
              onClick={() => {
                props.history.push("/purchasedQuizzes");
              }}
              style={{ marginLeft: "15px" }}
            >
              See My Purchased Quizzes
            </Button>
          </div>
          <div className="postBuyButtons">
            <Button
              variant="outlined"
              onClick={() => {
                props.handleBuy(props.cost);
              }}
              style={{ marginLeft: "15px" }}
            >
              Take this quiz now
            </Button>
          </div>
          <div className="postBuyButtons">
            <Button variant="outlined" onClick={props.close}>
              Cancel
            </Button>
          </div>
        </div>
      </List>
    </Dialog>
  );
}

export default function QuizScreenOverlay(props) {
  return (
    <div>
      <ChoiceDialog
        title={props.title}
        canBuy={Number(props.balance) > Number(props.cost)}
        handleBuy={props.handleBuy}
        open={props.open}
        sameAlert={props.sameAlert}
        cost={Number(props.cost)}
        error={props.error}
        onClose={props.close}
        owned={props.owned}
        handleFund={props.handleFund}
        handleTextChange={props.handleTextChange}
        {...props}
      />
    </div>
  );
}
