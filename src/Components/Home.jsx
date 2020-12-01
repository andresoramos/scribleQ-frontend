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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import getQuizzes from "./../Services/getQuizzes";
import MenuIcon from "@material-ui/icons/Menu";
import { createDate } from "./../Services/createDate";
import deleteArrayItem from "./../Services/deleteArrayItem";
import quizByName from "../Services/quizByName";
import { updateMakers } from "../Services/answerSave";
import { findMarketHistory, dropMarket } from "./../Services/findQuiz";

const useStyles = makeStyles((theme) => ({
  menu: { position: "absolute", marginTop: 7, cursor: "pointer" },
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentMarket, setCurrentMarket] = useState(false);

  useEffect(() => {
    async function populateQuizArray() {
      // await dropMarket();
      const quizzes = await getQuizzes();
      if (!quizzes) {
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

  const handleStatClick = (event, name) => {
    props.currentStatName(name);
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = async (i) => {
    const email = decode(localStorage.getItem("token")).email;
    const localInfo = localStorage.getItem("account");
    const parsedInfo = JSON.parse(localInfo);
    const newQuizzes = [...parsedInfo.quizzes];
    await updateMakers(newQuizzes[i].quiz._id);
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
  const handleStatClose = () => {
    setCurrentMarket(false);
    setAnchorEl(null);
  };

  //Find how to make it so that this thing instantly deletes the quizzes off of the homepage.  The magic for that happens around here.
  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

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
      if (quizArray[i].quiz === null) {
        continue;
      } else {
        const newObj = {};
        newObj.name = quizArray[i].quiz.name;
        newObj.dateCreated = createDate(quizArray[i].dateCreated);
        newObj.likes = "TBD";
        newObj.dislikes = "TBD";
        finalArray.push(newObj);
      }
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
          <div>
            <Button
              onClick={() => {
                // localStorage.setItem("linkName", item.name);
                props.iValueIs(i);
              }}
              to="/viewQuiz"
              component={Link}
            >
              {item.name}
            </Button>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={async (e) => {
                props.iValueIs(i);
                handleStatClick(e, item.name);
                const currentMarket = await findMarketHistory(item.name);
                if (currentMarket) {
                  setCurrentMarket(true);
                }
              }}
              component={MenuIcon}
            />
          </div>
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
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleStatClose}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {!currentMarket ? (
              <MenuItem
                onClick={() => {
                  const userAccount = JSON.parse(
                    localStorage.getItem("account")
                  );
                  const quiz = quizByName(userAccount, props.currentName);
                  localStorage.setItem("currentQuiz", JSON.stringify(quiz));

                  props.history.push("/marketForm");
                }}
              >
                {`Send ${props.currentName} to the market`}
              </MenuItem>
            ) : (
              <div>
                <MenuItem
                  onClick={async () => {
                    const currentMarket = await findMarketHistory(
                      props.currentName
                    );

                    localStorage.setItem(
                      "marketObj",
                      JSON.stringify(currentMarket)
                    );

                    props.history.push("/marketPerformance");
                  }}
                >
                  {`See ${props.currentName}${
                    props.currentName[
                      props.currentName.length - 1
                    ].toLowerCase() === "s"
                      ? "'"
                      : "'s"
                  } performance in the marketplace.`}
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    const userAccount = JSON.parse(
                      localStorage.getItem("account")
                    );
                    const quiz = quizByName(userAccount, props.currentName);
                    localStorage.setItem("editMarket", true);
                    localStorage.setItem("quizName", quiz.quiz.name);
                    // const currentMarket = await findMarketHistory(
                    //   props.currentName
                    // );

                    // localStorage.setItem("currentQuiz", JSON.stringify(quiz));

                    props.history.push("/marketForm");
                  }}
                >
                  {`Edit market properties for ${props.currentName}.`}
                </MenuItem>
              </div>
            )}
            <MenuItem
              onClick={() => {
                props.history.push("/analytics");
              }}
            >
              {`Edit ${props.currentName}.`}
            </MenuItem>
            <MenuItem
              onClick={() => {
                props.history.push("/analytics");
              }}
            >
              {`See Analytics for ${props.currentName}`}
            </MenuItem>
          </StyledMenu>
        </React.Fragment>
      ) : (
        <div>You're Home</div>
      )}
    </React.Fragment>
  );
};
