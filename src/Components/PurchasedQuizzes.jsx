import React, { useState, useEffect } from "react";
import "../Styling/PurchasedQuizzes.css";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { paidQuizzes } from "./../Services/paidQuizzesService";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "50%",
    width: "60%",
    display: "flex",
    marginBottom: "1.5em",
    marginTop: "1.5em",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function PurchasedQuizzes(props) {
  const classes = useStyles();
  const arrTest = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    populateQuizzes();
  }, []);

  const populateQuizzes = async () => {
    const quizzes = await paidQuizzes();
  };

  return (
    <div className="container">
      <div className="sidePanel">
        {arrTest.map((item, i) => {
          return (
            <div className="cardHolder">
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    style={{ fontWeight: "bold" }}
                    variant="subtitle2"
                    component="h2"
                  >
                    Butt in your dick
                  </Typography>
                  <Typography style={{ fontSize: "12px" }} variant="body2">
                    This
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PurchasedQuizzes;

//For this, make a stack using flexbox on the left hand side that will
//contain a column of paper selectors

//Each selector will be a representation of a quiz you've bought

//For visual effect, we're going to find some images, and make each
//one get a randomly assigned image

//When you click on each one, you'll see a macro of it in the center
//This will tell you the name of the quiz, its maker, an option to like it, an option
//to take it, an option to delete it,
//and an option to share it with friends
