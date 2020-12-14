import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import "../Styling/chargeOverlay.css";

//make it capable of adding sribloons
//once you can add scribloons and get the purchase screen to show, make sure that
//that you can make it purchase a quiz and then see that amount of scribloons
//deducted from your balance

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
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
              <Button>Cancel</Button>
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
                  onClick={props.handleFund}
                  variant="contained"
                  color="primary"
                >
                  Fund Account
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
  const [selectedValue, setSelectedValue] = useState(emails[1]);

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
        selectedValue={selectedValue}
        handleBuy={props.handleBuy}
        open={props.open}
        sameAlert={props.sameAlert}
        cost={Number(props.cost)}
        error={props.error}
        onClose={props.close}
        owned={props.owned}
        handleFund={props.handleFund}
        handleTextChange={props.handleTextChange}
      />
    </div>
  );
}
