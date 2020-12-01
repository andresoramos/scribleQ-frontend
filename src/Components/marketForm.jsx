import React, { useState, useEffect } from "react";
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
import { marketSave, showMakers, marketUpdate } from "../Services/answerSave";
import DatePicker from "./DatePicker";
import MyMarketQuizzes from "./MyMarketQuizzes";
import { findMarketHistory } from "./../Services/findQuiz";

const useStyles = makeStyles((theme) => ({
  root: {
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
  const [formState, setFormState] = useState({
    edit: false,
    allowed: null,
    checkBox: false,
    charge: false,
    tags: "",
    number: null,
    dateObj: new Date(Date.now()),
    date: false,
    questions: false,
    premium: false,
    chosenPremium: {},
    hidden: false,
    hide: false,
    hiddenCheck: {},
    form: "",
    premiumCost: {},
    hideQuestions: {},
    selectedIndex: 0,
    options: [
      "Click here to select a topic",
      "Science",
      "Math",
      "History",
      "Social Studies",
      "Music/Art",
      "Psychology",
      "Other",
    ],
    submitted: false,
    duplicate: false,
  });
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    authenticateUserToken(localStorage.getItem("token"))
      .then((checked) => {
        setAllowed(checked);
        if (localStorage.getItem("editMarket")) {
          restoreEdit();
        }
      })
      .catch((error) => {
        console.log(`Error fetching user data: ${error}`);
      });
  }, []);

  const handleCheck = () => {
    updateFormStateProperty("checkBox", !formState.checkBox);
  };

  const restoreEdit = async () => {
    const history = await findMarketHistory(localStorage.getItem("quizName"));
    setFormState({ ...history.history, edit: true, _id: history._id });
    localStorage.removeItem("editMarket");
  };

  const updateFormStateProperties = (keys, values) => {
    console.log("updating properties is running");
    if (keys.length !== values.length) {
      new Error(
        "there was an error in updateFormStateProperties. Array lengths did not match."
      );
    }

    const newForm = { ...formState };
    for (let i = 0; i < keys.length; i++) {
      newForm[keys[i]] = values[i];
    }
    setFormState(newForm);
  };

  const updateFormStateProperty = (key, value) => {
    const newForm = { ...formState, [key]: value };
    setFormState(newForm);
  };

  const prepareTags = (tagString) => {
    let resultsArr = [];
    let tag = "";
    for (let i = 0; i < tagString.length; i++) {
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
    for (let i = 0; i < resultsArr.length; i++) {
      if (resultsArr[i] !== "") {
        let word = "";
        for (let j = 0; j < resultsArr[i].length; j++) {
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
    for (let i = 0; i < purgedArr.length; i++) {
      if (purgedArr[i] !== "") {
        finalReturn.push(purgedArr[i]);
      }
    }
    let cleanUp = [];
    for (let i = 0; i < finalReturn.length; i++) {
      let checkFlag = false;
      for (let j = finalReturn[i].length - 1; j >= 0; j--) {
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
    const newOptions = [...formState.options];
    newOptions.shift();
    updateFormStateProperty("options", newOptions);
  };
  const changePremiumCost = (e, index) => {
    const newPremiumCost = { ...formState.premiumCost };

    newPremiumCost[index] = e.target.value;
    updateFormStateProperty("premiumCost", newPremiumCost);
  };
  const removeSpace = (word) => {
    let stopPoint;
    for (let i = word.length - 1; i >= 0; i--) {
      if (word[i] !== " ") {
        stopPoint = i;
        break;
      }
    }
    let returnWord = "";
    for (let i = 0; i <= stopPoint; i++) {
      returnWord += word[i];
    }
    return returnWord;
  };

  const changeTags = (e) => {
    const value = e.target.value;
    updateFormStateProperty("tags", value);
  };
  const changeNumber = (e) => {
    const value = e.target.value;
    updateFormStateProperty("number", value);
  };
  const handleHide = () => {
    console.log("hadle hide is running");
    if (!formState.hide && !formState.hidden) {
      return updateFormStateProperties(
        ["hide", "hidden"],
        [!formState.hide, !formState.hidden]
      );
    }
    if (formState.hide && formState.hidden) {
      return updateFormStateProperties(
        ["hide", "hidden"],
        [!formState.hide, !formState.hidden]
      );
    }
    if (formState.hide && !formState.hidden) {
      return updateFormStateProperty("hide", !formState.hide);
    }
  };

  const changePremium = () => {
    if (!formState.premium) {
      return updateFormStateProperties(
        ["questions", "premium"],
        [true, !formState.premium]
      );
    }
    updateFormStateProperty("premium", !formState.premium);
  };
  const handleDialogClose = () => {
    const newChosenPremium = { ...formState.chosenPremium };
    let finalChosenPremium = {};
    for (let key in newChosenPremium) {
      if (newChosenPremium[key] !== false) {
        finalChosenPremium[key] = newChosenPremium[key];
      }
    }

    if (Object.keys(finalChosenPremium).length === 0) {
      return updateFormStateProperties(
        ["premium", "setChosenPremium", "questions"],
        [false, finalChosenPremium, false]
      );
    }
    return updateFormStateProperties(
      ["chosenPremium", "questions"],
      [finalChosenPremium, false]
    );
  };
  const handleHiddenClose = () => {
    updateFormStateProperty("hidden", !formState.hidden);
  };
  const questionArray = () => {
    if (localStorage.getItem("currentQuiz") === undefined) {
      return [];
    }
    const quiz = JSON.parse(localStorage.getItem("currentQuiz"));
    const questions = quiz.quiz.questions;
    for (let i = 0; i < questions.length; i++) {
      questions[i].order = i + 1;
    }
    return questions;
  };

  const hiddenOrPremium = (premCost, hideQuest, string) => {
    let offLimits = [];
    if (string === "hide") {
      for (let key in premCost) {
        if (premCost[key]) {
          offLimits.push(Number(key) - 1);
        }
      }
      return offLimits;
    }
    for (let key in hideQuest) {
      if (hideQuest[key] === true) {
        offLimits.push(Number(key) - 1);
      }
    }
    return offLimits;
  };
  const handleFormChange = (e) => {
    const text = e.target.value;
    if (text.length < 201) {
      return updateFormStateProperty("form", text);
    }
    return;
  };
  const handleDate = () => {
    updateFormStateProperty("date", !formState.date);
  };
  const changeDateObj = (date) => {
    updateFormStateProperty("dateObj", date);
  };
  const handleChosenPremium = (index) => {
    const fixed = { ...formState.chosenPremium };
    if (fixed[index] === undefined) {
      fixed[index] = true;
      return updateFormStateProperty("chosenPremium", fixed);
    }
    fixed[index] = !fixed[index];
    if (fixed[index] === false && formState.premiumCost[index] !== undefined) {
      const newPremCost = { ...formState.premiumCost };
      for (let key in newPremCost) {
        if (Number(key) === index) {
          delete newPremCost[key];
        }
      }
      return updateFormStateProperties(
        ["premiumCost", "chosenPremium"],
        [newPremCost, fixed]
      );
    }
    return updateFormStateProperty("chosenPremium", fixed);
  };

  const handleSubmit = async () => {
    console.log("handle submit is actually being clicked on");
    const quiz = JSON.parse(localStorage.getItem("currentQuiz"));
    const finalObj = {};
    const searchTags = prepareTags(formState.tags);
    finalObj.searchTags = searchTags;
    finalObj.makerId = quiz.quiz._id;
    finalObj.nsfw = formState.checkBox;
    finalObj.description = formState.form;
    finalObj.hiddenQuestions = formState.hide
      ? JSON.stringify(formState.hideQuestions) !== JSON.stringify({})
        ? formState.hideQuestions
        : null
      : null;
    finalObj.premiumQuestions = formState.premium
      ? formState.premiumCost
      : null;
    finalObj.expirationDate = formState.date ? formState.dateObj : null;
    finalObj.cost = formState.charge ? formState.number : null;
    finalObj.subject =
      formState.options[formState.selectedIndex] ===
      "Click here to select a topic"
        ? null
        : formState.options[formState.selectedIndex];
    finalObj.history = {
      allowed: allowed,
      checkBox: formState.checkBox,
      charge: formState.charge,
      tags: formState.tags,
      number: formState.number,
      dateObj: formState.dateObj,
      date: formState.date,
      questions: formState.questions,
      premium: formState.premium,
      chosenPremium: formState.chosenPremium,
      hidden: formState.hidden,
      hide: formState.hide,
      hiddenCheck: formState.hiddenCheck,
      form: formState.form,
      premiumCost: formState.premiumCost,
      hideQuestions: formState.hideQuestions,
      selectedIndex: formState.selectedIndex,
      options: formState.options,
      submitted: formState.submitted,
      duplicate: formState.duplicate,
    };
    if (formState.edit) {
      const updated = await marketUpdate(finalObj, formState._id);
      console.log("we're getting past updated");
      // console.log("DELETE ME", updated);
      return props.history.push("/");
    }
    console.log("THE ISSUE YOU'RE HAVING STARTS WITH MARKET SAVE");
    const saved = await marketSave(finalObj);
    updateFormStateProperties(["submitted", "edit"], [true, false]);

    if (saved.data === "This quiz already exists.") {
      updateFormStateProperty("duplicate", true);
      // setDuplicate(true);
      setTimeout(() => {
        props.history.push("/");
      }, 2000);
    }
  };

  const restoreHistory = (histObj) => {
    setFormState(histObj);
  };

  const mappedPremium = (string) => {
    const offLimits = hiddenOrPremium(
      formState.premiumCost,
      formState.hideQuestions,
      string
    );

    const questions = questionArray();

    let clearedQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      if (offLimits.includes(i) === false) {
        clearedQuestions.push(questions[i]);
      }
    }
    return clearedQuestions.map((item, i) => {
      if (
        formState.chosenPremium === undefined ||
        formState.hideQuestions === undefined
      ) {
        return null;
      }
      const premium =
        formState.chosenPremium[item.order] !== undefined
          ? formState.chosenPremium[item.order]
          : false;
      const hide =
        formState.hideQuestions[item.order] !== undefined
          ? formState.hideQuestions[item.order]
          : false;
      return (
        <div key={i} style={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={string === "hide" ? hide : premium}
                onChange={() => {
                  if (string === "hide") {
                    const newHideQuestions = { ...formState.hideQuestions };

                    newHideQuestions[item.order] === undefined
                      ? (newHideQuestions[item.order] = true)
                      : (newHideQuestions[item.order] = !newHideQuestions[
                          item.order
                        ]);
                    return updateFormStateProperty(
                      "hideQuestions",
                      newHideQuestions
                    );
                  }

                  handleChosenPremium(item.order);
                }}
                name="premiumCheck"
                color="primary"
              />
            }
            label={
              htmlToText(item.question) !== null ? (
                `${item.order}) Question Text: ${htmlToText(item.question)}`
              ) : (
                <span
                  style={{ fontStyle: "italic" }}
                >{`${item.order}) No question text provided.`}</span>
              )
            }
          />
          {formState.chosenPremium[item.order] && string === undefined ? (
            <TextField
              label="Price in Scribloons"
              value={
                formState.premiumCost[item.order]
                  ? formState.premiumCost[item.order]
                  : ""
              }
              type="number"
              onChange={(e) => {
                changePremiumCost(e, item.order);
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

  if (!allowed) {
    return null;
  }

  return formState.submitted ? (
    formState.duplicate === true ? (
      <div>This Quiz has already been sent to the market</div>
    ) : (
      <MyMarketQuizzes
        {...props}
        restoreHistory={restoreHistory}
        description="Select from the menu below to view the quizzes you've contributed to the marketplace."
        title="Quizzes on the market"
        updateFormStateProperties={updateFormStateProperties}
        setEdit={updateFormStateProperty}
      />
    )
  ) : (
    <div className={classes.root}>
      <h1>Prepare your quiz for the marketplace</h1>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.checkBox}
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
          {!formState.premium && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formState.charge}
                  onChange={(ev) =>
                    updateFormStateProperty(ev.target.name, !formState.charge)
                  }
                  name="charge"
                  color="primary"
                />
              }
              label="Charge for download"
            />
          )}
          {formState.charge && (
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              onChange={changeNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          {!formState.charge && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formState.premium}
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
            value={formState.form}
            onChange={handleFormChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.hide}
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
                checked={formState.date}
                onChange={handleDate}
                name="dateCheck"
                color="primary"
              />
            }
            label="Add expiration date"
          />
          {formState.date && (
            <DatePicker
              selectedDate={formState.dateObj}
              setSelectedDate={changeDateObj}
            />
            // <TextField
            //   id="standard-helperText"
            //   onChange={changeDateObj}
            //   type="date"
            //   helperText={`Expiration Date`}
            // />
          )}
          <div style={{ width: "30%" }}>
            <DropDownMenu
              firstClick={firstClick}
              setSelectedIndex={updateFormStateProperty}
              selectedIndex={formState.selectedIndex}
              options={formState.options}
            />
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
      <Dialog aria-describedby="choose-premiums" open={formState.questions}>
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
      <Dialog aria-describedby="choose-premiums" open={formState.hidden}>
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
      <Button onClick={showMakers}>Format Database</Button>
    </div>
  );
}

export default MarketForm;
