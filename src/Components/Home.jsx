import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import getQuizzes from "./../Services/getQuizzes";
import { createDate } from "./../Services/createDate";
import deleteArrayItem from "./../Services/deleteArrayItem";
const useStyles = makeStyles((theme) => ({
  paperMessage: {
    width: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  paperTop: {
    marginTop: 40,
    marginBottom: 20,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    minWidth: 650,
  },
}));

export const Home = (props) => {
  const classes = useStyles();
  const [quizArray, setQuizArray] = useState([]);

  useEffect(() => {
    async function populateQuizArray() {
      const quizzes = await getQuizzes();
      if (!quizzes) {
        console.log("we're going to the not quizzes");
        return;
      } else {
        localStorage.setItem("account", JSON.stringify(quizzes));
      }
    }
    populateQuizArray();
    createRows();
    // Update the document title using the browser API
    props.upDateLocation(window.location.pathname);
  });

  const handleDelete = async (i) => {
    const email = decode(localStorage.getItem("token")).email;
    const localInfo = localStorage.getItem("account");
    const parsedInfo = JSON.parse(localInfo);
    const newQuizzes = [...parsedInfo.quizzes];
    newQuizzes.splice(i, 1);
    parsedInfo.quizzes = newQuizzes;
    const inString = JSON.stringify(parsedInfo);
    localStorage.setItem("account", inString);
    await deleteArrayItem(email, i);
    const parsed = JSON.parse(quizArray);
    parsed.splice(i, 1);
    const restrung = JSON.stringify(parsed);
    setQuizArray(restrung);
    window.location = "/";
  };

  //Find how to make it so that this thing instantly deletes the quizzes off of the homepage.  The magic for that happens around here.

  const rows = [
    { name: "test", dateCreated: "test", likes: "test", dislikes: "test" },
  ];

  const createRows = () => {
    const loadOrNot = localStorage.getItem("account");
    if (!loadOrNot) {
      return [];
    }

    const quizInfo = JSON.parse(localStorage.getItem("account"));
    if (!quizInfo) {
      return [];
    }
    const quizArray = [...quizInfo.quizzes];
    const finalArray = [];
    for (var i = 0; i < quizArray.length; i++) {
      const newObj = {};
      newObj.name = quizArray[i].quiz.name;
      newObj.dateCreated = createDate(quizArray[i].dateCreated);
      newObj.likes = "TBD";
      newObj.dislikes = "TBD";
      finalArray.push(newObj);
    }
    const stringData = JSON.stringify(finalArray);
    return setQuizArray(stringData);
  };
  const waitForStringification = (quizzes) => {
    if (typeof quizzes === "object") {
      return [];
    }
    const parsed = JSON.parse(quizzes);
    return parsed;
  };

  const mappedRows = waitForStringification(quizArray).map((item, i) => {
    return (
      <TableRow key={i}>
        <TableCell component="th" scope="row">
          <Button
            onClick={() => {
              props.iValueIs(i);
            }}
            to="/viewQuiz"
            component={Link}
          >
            {item.name}
          </Button>
        </TableCell>
        <TableCell>{item.dateCreated}</TableCell>
        <TableCell>{item.likes}</TableCell>
        <TableCell>{item.dislikes}</TableCell>
        <Button
          onClick={() => {
            handleDelete(i);
          }}
        >
          Delete Test
        </Button>
      </TableRow>
    );
  });
  const headers = [
    { name: "Quiz" },
    { name: "Date Created" },
    { name: "Likes" },
    { name: "Dislikes" },
  ];

  const mappedHeaders = headers.map((item, i) => {
    return (
      <TableCell key={i} style={{ fontWeight: "bold" }}>
        {item.name}
      </TableCell>
    );
  });

  return (
    <React.Fragment>
      {localStorage.getItem("account") ? (
        <React.Fragment>
          <div className={classes.paperTop}>
            <Paper className={classes.paperMessage} elevation={3}>
              <h1>My quizzes</h1>
            </Paper>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>{mappedHeaders}</TableRow>
              </TableHead>
              <TableBody>{mappedRows}</TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      ) : (
        <div>You're Home</div>
      )}
    </React.Fragment>
  );
};
