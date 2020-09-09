import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import quizByName from "./../Services/quizByName";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log(props.quizName);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          You've never taken this quiz before!
        </Typography>
        <br></br>
        <Typography variant="body2" component="p">
          Take the quiz and see how you do.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            props.history.push("viewQuiz");
          }}
          size="small"
        >
          Take quiz
        </Button>
      </CardActions>
    </Card>
  );
}
