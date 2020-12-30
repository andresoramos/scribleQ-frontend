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

function DownloadDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
      <List>
        <div>
          <div className="buyCancel">
            <Button
              onClick={() => {
                props.handleDownload(props.quiz, props.hidden);
              }}
              style={{ marginLeft: "15px" }}
            >
              Download
            </Button>
            <Button
              onClick={() => {
                props.close(false);
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
      </List>
    </Dialog>
  );
}

export default function DownloadOverlay(props) {
  return (
    <div>
      <DownloadDialog
        title={`Download "${props.quizName}?"`}
        handleDownload={props.handleDownload}
        open={props.open}
        hidden={props.hidden}
        sameAlert={props.sameAlert}
        error={props.error}
        close={props.close}
        quiz={props.quiz}
      />
    </div>
  );
}
