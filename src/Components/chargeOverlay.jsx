import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import "../Styling/chargeOverlay.css";

//make it capable of adding sribloons
//once you can add scribloons and get the purchase screen to show, make sure that
//that you can make it purchase a quiz and then see that amount of scribloons
//deducted from your balance

function SimpleDialog(props) {
  const { open } = props;

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <List>
        {props.canBuy ? (
          <div>
            <div className="buyCancel">
              <Button
                onClick={() => {
                  props.handleBuy(props.cost);
                }}
                style={{ marginLeft: "15px" }}
              >
                Buy
              </Button>
              <Button
                onClick={() => {
                  props.close("open");
                }}
              >
                Cancel
              </Button>
            </div>
            {props.sameAlert && (
              <Alert severity="error">
                You can't buy a quiz from yourself!
              </Alert>
            )}
            {props.owned && (
              <Alert severity="error">
                You already own this quiz. Download only if you want to donate
                funds to its author!
              </Alert>
            )}
          </div>
        ) : (
          <ListItem>
            <div className="buyContainer">
              <ListItemText primary="Add Scribloons to your account" />
              <div className="addContainer">
                <TextField
                  helperText={props.error ? "You must enter a number" : null}
                  error={props.error}
                  onChange={(e) => {
                    props.handleTextChange(e.target.value);
                  }}
                />
                <Button
                  style={{ marginLeft: "2em" }}
                  onClick={props.handleFund}
                  variant="contained"
                  color="primary"
                >
                  Fund Account
                </Button>
                <Button
                  style={{ marginLeft: "2em" }}
                  onClick={() => {
                    props.close("open");
                  }}
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}

export default function ChargeOverlay(props) {
  return (
    <div>
      <SimpleDialog
        title={
          Number(props.balance) > Number(props.cost)
            ? `${props.quizName} costs ${Number(
                props.cost
              )} Scribloons!  You currently have ${
                props.balance
              } in your account.  Would you like to buy ${props.quizName}?`
            : `You only have ${Number(
                props.balance
              )} Scribloons in your treasure chest, but ${
                props.quizName
              } costs ${
                props.cost
              }.  Would you like to purchase more Scribloons?`
        }
        canBuy={Number(props.balance) > Number(props.cost)}
        handleBuy={props.handleBuy}
        open={props.open}
        sameAlert={props.sameAlert}
        cost={Number(props.cost)}
        error={props.error}
        close={props.close}
        owned={props.owned}
        handleFund={props.handleFund}
        handleTextChange={props.handleTextChange}
      />
    </div>
  );
}
