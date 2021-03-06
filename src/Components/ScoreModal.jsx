import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { answerSave } from "../Services/answerSave";

function ScoreModal(props) {
  const handleSave = async () => {
    const payload = {
      name: props.name,
      questions: props.payload,
      history: props.history,
    };
    props.fixProperties([["modalOpened", false]]);
    // props.setObjectRenderEdit(true, clickCount);
    const saved = await answerSave(payload);
  };
  return (
    <Dialog
      open={props.modalOpened}
      onClose={() => {
        props.fixProperties([["modalOpened", false]]);
      }}
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
            props.changeItem("pointWorth", e.target.value);
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

            props.fixProperties([
              ["questionOut", true],
              ["modalOpened", false],
            ]);
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ScoreModal;
