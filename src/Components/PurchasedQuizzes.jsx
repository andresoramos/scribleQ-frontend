import React, { useState, useEffect } from "react";
import "../Styling/PurchasedQuizzes.css";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { paidQuizzes } from "./../Services/paidQuizzesService";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";

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
    width: "70%",
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
  const [formState, setFormState] = useState({
    quizzes: [],
    selectedIndex: null,
  });

  useEffect(() => {
    populateQuizzes();
  }, []);

  const populateQuizzes = async () => {
    const quizzes = await paidQuizzes();
    setFormState({ ...formState, quizzes });
  };

  const trimName = (name) => {
    let newName = "";
    for (var i = 0; i < 14; i++) {
      newName += name[i];
    }
    newName += "...";
    return newName;
  };
  const handleClick = (selectedIndex) => {
    setFormState({ ...formState, selectedIndex });
  };

  return (
    <div className="container">
      <div className="sidePanel">
        <div className="collectionHeader">
          <p style={{ fontWeight: "bold" }}>Your Quiz Collection</p>
        </div>
        <Divider light />
        {formState.quizzes.map((item, i) => {
          console.log(item, "name should be here");
          return (
            <div
              key={i}
              onClick={() => {
                handleClick(i);
              }}
              className="cardHolder"
            >
              <Card key={i} className={classes.card}>
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
                    {item.name}
                  </Typography>
                  <Divider light />
                  <div className="profile">
                    <Avatar
                      style={{ width: "22px", height: "22px" }}
                      alt="Travis Howard"
                      src="https://i.pinimg.com/736x/83/ac/1a/83ac1a49be15d0bc75ce03b15aaab640.jpg"
                    />
                    {item.creatorObj && (
                      <Typography
                        style={{
                          marginLeft: "1em",
                          marginTop: "2px",
                          display: "flex",
                          fontSize: "12px",
                          overflow: "auto",
                        }}
                        variant="body2"
                      >
                        {item.creatorObj.user.name.length <= 17
                          ? item.creatorObj.user.name
                          : trimName(item.creatorObj.user.name)}
                      </Typography>
                    )}
                  </div>
                </CardContent>
                {/* <CardActions>
                  <Button size="small" color="primary">
                  View
                  </Button>
                  <Button size="small" color="primary">
                  Edit
                  </Button>
                </CardActions> */}
              </Card>
            </div>
          );
        })}
      </div>
      {formState.selectedIndex !== null && (
        <div className="macroContainer">
          <div className="paperContainer">
            <Paper style={{ width: "100%", height: "70%" }}>
              <div className="paperTitle">
                <p style={{ fontWeight: "bold", fontSize: "40px" }}>
                  {formState.quizzes[formState.selectedIndex].name}
                </p>
              </div>
              <Divider variant="middle" />
              <div className="createdBy">
                <h>Created by:</h>
              </div>
              <div className="macroMakers">
                <Avatar
                  style={{ width: "45px", height: "45px" }}
                  alt="Travis Howard"
                  src="https://i.pinimg.com/736x/83/ac/1a/83ac1a49be15d0bc75ce03b15aaab640.jpg"
                />
              </div>
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
}
//right below avatar in line 162, make it take the name of the maker!
export default PurchasedQuizzes;

//When you click on each one, you'll see a macro of it in the center
//This will tell you the name of the quiz, its maker, an option to like it, an option
//to take it, an option to delete it,
//and an option to share it with friends
