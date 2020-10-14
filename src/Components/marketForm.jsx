import React, { useState } from "react";
import authenticateUserToken from "./../Services/authenticateUserToken";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import htmlToText from "../Services/htmlToText";
import DropDownMenu from "./dropDownMenu";
import { marketSave } from "../Services/answerSave";

const useStyles = makeStyles((theme) => ({
  root: {
    // "& .MuiTextField-root": {
    //   margin: theme.spacing(1),
    //   width: "25ch",
    // },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignContent: "center",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignContent: "center",
    outline: "2px solid black",
    borderRadius: "20%",
  },
}));

function MarketForm(props) {
  const classes = useStyles();
  const [allowed, setAllowed] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [charge, setCharge] = useState(false);
  const [tags, setTags] = useState("");
  const [number, setNumber] = useState(null);
  const [dateObj, setDateObj] = useState("");
  const [date, setDate] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [premium, setPremium] = useState(false);
  const [chosenPremium, setChosenPremium] = useState({});
  const [hidden, setHidden] = useState(false);
  const [hide, setHide] = useState(false);
  const [hiddenCheck, setHiddenCheck] = useState({});
  const [form, setForm] = useState("");
  const [premiumCost, setPremiumCost] = useState({});
  const [hideQuestions, setHideQuestions] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [options, setOptions] = useState([
    "Click here to select a topic",
    "Science",
    "Math",
    "History",
    "Social Studies",
    "Music/Art",
    "Psychology",
    "Other",
  ]);
  const auth = async () => {
    const checked = await authenticateUserToken(localStorage.getItem("token"));
    setAllowed(checked ? true : false);
  };
  auth();
  const handleCheck = () => {
    setCheckBox(!checkBox);
  };

  const prepareTags = (tagString) => {
    let resultsArr = [];
    let tag = "";
    for (var i = 0; i < tagString.length; i++) {
      if (tagString[i] !== "," && i !== tagString.length - 1) {
        tag += tagString[i];
      } else {
        if (tagString[i] === ",") {
          const tagCopy = tag;
          resultsArr.push(tagCopy);
          tag = "";
        }
        if (i === tagString.length - 1 && tagString[i] !== ",") {
          tag += tagString[i];
          resultsArr.push(tag);
        }
      }
    }
    let purgedArr = [];
    for (var i = 0; i < resultsArr.length; i++) {
      if (resultsArr[i] !== "") {
        let word = "";
        for (var j = 0; j < resultsArr[i].length; j++) {
          if (j === 0) {
            if (resultsArr[i][j] !== " ") {
              word += resultsArr[i][j];
            }
          } else {
            if (word !== "") {
              word += resultsArr[i][j];
            } else {
              if (resultsArr[i][j] !== " ") {
                word += resultsArr[i][j];
              }
            }
          }
        }
        purgedArr.push(word);
      }
    }
    let finalReturn = [];
    for (var i = 0; i < purgedArr.length; i++) {
      if (purgedArr[i] !== "") {
        finalReturn.push(purgedArr[i]);
      }
    }
    let cleanUp = [];
    for (var i = 0; i < finalReturn.length; i++) {
      let checkFlag = false;
      for (var j = finalReturn[i].length - 1; j >= 0; j--) {
        if (finalReturn[i][j] === " ") {
          checkFlag = true;
        }
      }
      if (checkFlag) {
        const cleaned = removeSpace(finalReturn[i]);
        cleanUp.push(cleaned);
      } else {
        cleanUp.push(finalReturn[i]);
      }
    }
    return cleanUp;
  };
  const firstClick = () => {
    const newOptions = [...options];
    newOptions.shift();
    setOptions(newOptions);
  };
  const changePremiumCost = (e, i) => {
    const newPremiumCost = { ...premiumCost };
    newPremiumCost[i + 1] = e.target.value;
    setPremiumCost(newPremiumCost);
  };
  const removeSpace = (word) => {
    let stopPoint;
    for (var i = word.length - 1; i >= 0; i--) {
      if (word[i] !== " ") {
        stopPoint = i;
        break;
      }
    }
    let returnWord = "";
    for (var i = 0; i <= stopPoint; i++) {
      returnWord += word[i];
    }
    return returnWord;
  };

  const changeTags = (e) => {
    const value = e.target.value;
    setTags(value);
  };
  const changeNumber = (e) => {
    const value = e.target.value;
    setNumber(value);
  };
  const handleHide = () => {
    if (hide === false && hidden === false) {
      setHide(!hide);
      return setHidden(!hidden);
    }
    if (hide === true && hidden === true) {
      setHide(!hide);
      return setHidden(!hidden);
    }
    if (hide == true && hidden === false) {
      return setHide(!hide);
    }
  };
  const changeCharge = () => {
    setCharge(!charge);
  };
  const changePremium = () => {
    if (premium === false) {
      setQuestions(true);
    }
    setPremium(!premium);
  };
  const handleDialogClose = () => {
    const newChosenPremium = { ...chosenPremium };
    let finalChosenPremium = {};
    for (var key in newChosenPremium) {
      if (newChosenPremium[key] !== false) {
        finalChosenPremium[key] = newChosenPremium[key];
      }
    }
    setChosenPremium(finalChosenPremium);
    if (Object.keys(finalChosenPremium).length === 0) {
      setPremium(false);
    }
    setQuestions(false);
  };
  const handleHiddenClose = () => {
    setHidden(!hidden);
  };
  const questionArray = () => {
    const quiz = JSON.parse(localStorage.getItem("currentQuiz"));
    const questions = quiz.quiz.questions;
    return questions;
  };

  const handleFormChange = (e) => {
    const text = e.target.value;
    if (text.length < 201) {
      return setForm(text);
    }
    return;
  };
  const handleDate = () => {
    setDate(!date);
  };
  const changeDateObj = (e) => {
    const expDate = e.target.value;
    setDateObj(expDate);
  };
  const handleChosenPremium = (index) => {
    const fixed = { ...chosenPremium };
    if (fixed[index] === undefined) {
      fixed[index] = true;
      return setChosenPremium(fixed);
    }
    fixed[index] = !fixed[index];
    return setChosenPremium(fixed);
  };

  const handleSubmit = async () => {
    const quiz = JSON.parse(localStorage.getItem("currentQuiz"));
    const finalObj = {};
    const searchTags = prepareTags(tags);
    finalObj.searchTags = searchTags;
    finalObj._id = quiz.quiz._id;
    finalObj.nsfw = checkBox;
    finalObj.description = form;
    finalObj.hiddenQuestions = hide
      ? JSON.stringify(hideQuestions) !== JSON.stringify({})
        ? hideQuestions
        : null
      : null;
    finalObj.premiumQuestions = premium ? premiumCost : null;
    finalObj.expirationDate = date ? dateObj : null;
    finalObj.cost = charge ? number : null;
    finalObj.subject =
      options[selectedIndex] === "Click here to select a topic"
        ? null
        : options[selectedIndex];
    const saved = await marketSave(finalObj);
    console.log(saved, "This is what saved got us");
  };

  // const mappedHidden = questionArray().map((item, i) => {
  //   var xmlString = item.question;
  //   var doc = new DOMParser().parseFromString(xmlString, "text/xml");
  //   const questionText = doc.firstChild.innerHTML;
  //   return (
  //     <FormControlLabel
  //       key={i}
  //       control={
  //         <Checkbox
  //           checked={hiddenCheck[i] !== undefined ? hiddenCheck[i] : false}
  //           onChange={() => {
  //             setHiddenCheck(i);
  //           }}
  //           name="premiumCheck"
  //           color="primary"
  //         />
  //       }
  //       label={`${i + 1}) Question Text: ${questionText}`}
  //     />
  //   );
  // });
  const mappedPremium = (string) => {
    return questionArray().map((item, i) => {
      const premium = chosenPremium[i] !== undefined ? chosenPremium[i] : false;
      const hide =
        hideQuestions[i + 1] !== undefined ? hideQuestions[i + 1] : false;
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={string === "hide" ? hide : premium}
                onChange={() => {
                  if (string === "hide") {
                    const newHideQuestions = { ...hideQuestions };

                    newHideQuestions[i + 1] === undefined
                      ? (newHideQuestions[i + 1] = true)
                      : (newHideQuestions[i + 1] = !newHideQuestions[i + 1]);
                    return setHideQuestions(newHideQuestions);
                  }

                  handleChosenPremium(i);
                }}
                name="premiumCheck"
                color="primary"
              />
            }
            label={`${i + 1}) Question Text: ${htmlToText(item.question)}`}
          />
          {chosenPremium[i] && string === undefined ? (
            <TextField
              label="Price in Scribloons"
              value={premiumCost[i + 1]}
              type="number"
              onChange={(e) => {
                changePremiumCost(e, i);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          ) : null}
        </div>
      );
    });
  };

  return allowed === null ? null : allowed === true ? (
    <div className={classes.root}>
      <h1>Prepare your quiz for the marketplace</h1>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkBox}
                onChange={handleCheck}
                name="checkedB"
                color="primary"
              />
            }
            label="NSFW/Graphic content"
          />
          <TextField
            id="standard-helperText"
            onChange={changeTags}
            label="Search tags"
            defaultValue="Geometry, Angles, Proofs..."
            helperText={`Type in keywords for your quiz seperated by commas (e.g, "Math, Algebra, Equations...")`}
          />
          {!premium && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={charge}
                  onChange={changeCharge}
                  name="chargeCheck"
                  color="primary"
                />
              }
              label="Charge for download"
            />
          )}
          {charge && (
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              onChange={changeNumber}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          )}
          {!charge && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={premium}
                  onChange={changePremium}
                  name="premiumCheck"
                  color="primary"
                />
              }
              label="Charge only for premium questions"
            />
          )}
          <TextField
            id="outlined-multiline-static"
            label="Describe this quiz in 200 characters or less"
            multiline
            rows={4}
            variant="outlined"
            value={form}
            onChange={handleFormChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={hide}
                onChange={handleHide}
                name="premiumCheck"
                color="primary"
              />
            }
            label="Hide some questions"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={date}
                onChange={handleDate}
                name="dateCheck"
                color="primary"
              />
            }
            label="Add expiration date"
          />
          {date && (
            <TextField
              id="standard-helperText"
              onChange={changeDateObj}
              type="date"
              helperText={`Expiration Date`}
            />
          )}
          <div style={{ width: "30%" }}>
            <DropDownMenu
              firstClick={firstClick}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              options={options}
            />
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
      <Dialog aria-describedby="choose-premiums" open={questions}>
        <DialogContent>
          <DialogTitle>
            {`Select which questions you'd like offer as premium upgrades, and designate a price for each one.`}
          </DialogTitle>
          {mappedPremium()}
        </DialogContent>
        <Button
          onClick={() => {
            handleDialogClose();
          }}
        >
          Save
        </Button>
      </Dialog>
      <Dialog aria-describedby="choose-premiums" open={hidden}>
        <DialogContent>
          <DialogTitle>
            {`Select which questions below you'd like to hide`}
          </DialogTitle>
          {mappedPremium("hide")}
        </DialogContent>
        <Button
          onClick={() => {
            handleHiddenClose();
          }}
        >
          Save
        </Button>
      </Dialog>
    </div>
  ) : null;
}

export default MarketForm;
