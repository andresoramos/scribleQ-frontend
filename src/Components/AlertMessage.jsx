import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

function AlertMessage(props) {
  return (
    <Dialog open={props.cantDelete} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setCantDelete(false);
          }}
          color="primary"
        >
          {props.buttonMessage}
        </Button>
        {props.backButton && (
          <Button
            onClick={() => {
              props.backButtonFunc();
            }}
            color="primary"
          >
            {props.backButtonMessage}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default AlertMessage;
