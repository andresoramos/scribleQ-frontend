import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";

function DeleteAlert(props) {
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.deleteQuiz} color="primary">
          Delete
        </Button>
        <Button onClick={props.cancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAlert;
