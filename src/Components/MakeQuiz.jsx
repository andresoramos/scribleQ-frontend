import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    marginTop: theme.spacing(12),
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const MakeQuiz = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <h1>Making a quiz is quick, easy, and fun!</h1>
        <br></br>
      </Paper>
    </Container>
  );
};
