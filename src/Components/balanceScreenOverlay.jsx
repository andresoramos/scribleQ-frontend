import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import "../Styling/chargeOverlay.css";
import { balanceService } from "./../Services/balanceService";

function BalanceDialog(props) {
  const { open } = props;

  return (
    <Dialog
      // onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <List>
        <div>
          <div className="premQuestionBuyContainer">
            <div className="premQuestionBuy">
              <TextField
                helperText={props.error ? "You must enter a number" : null}
                error={props.error}
                onChange={(e) => {
                  props.handleTextChange(e.target.value);
                }}
              />
              <Button
                onClick={async () => {
                  await props.handleFund();
                  let balance = await balanceService();
                  if (Number(balance) >= props.costs) {
                    await props.reshowBuy();
                  }
                }}
                variant="contained"
                color="primary"
              >
                Fund Account
              </Button>
            </div>
            <div className="cancelContainer">
              <Button
                onClick={() => {
                  props.close("balanceScreenOpen");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
          {props.sameAlert && (
            <Alert severity="error">You can't buy a quiz from yourself!</Alert>
          )}
          {props.owned && (
            <Alert severity="error">You already own this quiz!</Alert>
          )}
        </div>
      </List>
    </Dialog>
  );
}

export default function BalanceScreenOverlay(props) {
  const pluralize = (costs) => {
    if (costs !== 1) {
      return "Scribloons";
    }
    return "Scribloon";
  };

  return (
    <div>
      <BalanceDialog
        title={`You presently have ${props.balance} ${pluralize(
          Number(props.balance)
        )} in your warchest, but ${props.quiz ? props.quiz.name : null} costs ${
          props.costs
        } ${pluralize(Number(props.costs))}.`}
        open={props.open}
        costs={Number(props.costs)}
        hidden={props.hidden}
        balance={Number(props.balance)}
        reshowBuy={props.reshowBuy}
        handleFund={props.handleFund}
        error={props.error}
        handleTextChange={props.handleTextChange}
        close={props.close}
        quiz={props.quiz}
      />
    </div>
  );
}
