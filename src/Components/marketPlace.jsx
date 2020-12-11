import React, { useState, useEffect } from "react";
import "./../Styling/marketPlace.css";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import { getAll, updateCurrentQuiz } from "../Services/findQuiz";
import _ from "lodash";
import {
  matchBySpelling,
  matchByContains,
  matchByTags,
  concatArray,
  makeDropdown,
} from "./../Services/menuCreation";
import { downloadQuiz } from "./../Services/downloadService";
import ChargeOverlay from "../Components/chargeOverlay";
import { balanceService } from "../Services/balanceService";

function MarketPlace(props) {
  const [allData, setAllData] = useState({
    ts: Date.now(),
    dropDown: [],
    term: "",
    open: false,
    balance: 0,
    cost: null,
    quizName: null,
  });
  const topics = [
    { name: "Blum" },
    { name: "Blum" },
    { name: "Blum" },
    { name: "Blum" },
    { name: "Blum" },
    { name: "Blum" },
  ];
  useEffect(() => {
    populateCache();
  }, []);
  const populateCache = async () => {
    const getAllData = await getAll();
    const balance = await balanceService();
    const allDataWithTs = { ...allData, ...getAllData, balance };
    setAllData(allDataWithTs);
  };
  const handleSearch = async (term) => {
    if (term.length === 0) {
      return setAllData({ ...allData, dropDown: [] });
    }
    const currentTime = Date.now();
    if (currentTime >= allData.ts + 6000) {
      await populateCache();
    }
    let clonedArr = _.cloneDeep(allData.quizzes);
    const matchedBySpelling = matchBySpelling(term, clonedArr, []);
    let secondClonedArr = _.cloneDeep(allData.quizzes);
    const contains = matchByContains(term, secondClonedArr);
    let clonedMarketArr = _.cloneDeep(allData.markets);
    let thirdClonedArr = _.cloneDeep(allData.quizzes);
    const matchedByTags = matchByTags(term, clonedMarketArr, thirdClonedArr);
    const concattedArray = concatArray(
      matchedBySpelling,
      contains,
      matchedByTags
    );
    const updatedDropdown = { ...allData, dropDown: concattedArray, term };
    setAllData(updatedDropdown);
  };

  const interpretResponse = (response, item) => {
    if (typeof response === "object") {
      if (response.charge) {
        const { cost } = response;
        setAllData({ ...allData, open: true, cost, quizName: item.name });
      }
    }
  };
  const handleTextChange = (term) => {
    //for 12/15/2020
    const toNumber = Number(term);
    // console.log(
    //   JSON.stringify(toNumber) === null,
    //   typeof JSON.stringify(toNumber),
    //   typeof null,
    //   "this is the number"
    // );
    if (JSON.stringify(toNumber) === "null") {
      console.log("this is the letter case");
    }
    console.log("got to the number case");
    //take the term and find out if its a number
    //if its not, then change the state to reflect that error property is true
    //otherwise, create a service that allows you to change add scribloons to
    //your account
  };
  const handleClose = () => {
    setAllData({ ...allData, open: false });
  };

  const handleOnClick = async (item) => {
    const downloadedQuiz = await downloadQuiz(item);
    const interpretedResponse = interpretResponse(downloadedQuiz, item);

    //create service that saves quiz to both the user, and updates market performance
    //as well as the quiz itself, if necessary.
    //Once the quiz is downloaded, then create an overlay that informs
    //users that their quiz has been downloaded and that they can either take it
    //now, go to their downloads page, or simply return to the market
  };
  return (
    <div className="headerContainer">
      <div className="headerTop">
        <p className="header">Welcome to the Market Place</p>;
        <div className="search">
          <SearchIcon style={{ fontSize: 70 }} />
          <div className="searchDropdown">
            <TextField
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            {allData.dropDown ? (
              allData.dropDown.length > 0 ? (
                <Paper className="dropDown">
                  <div className="searchTitle">
                    <p style={{ fontWeight: "bold", marginBottom: "-1px" }}>
                      Search Results
                    </p>
                  </div>
                  <div className="controlDivider">
                    <div className="divider" />
                  </div>
                  {makeDropdown(allData.dropDown, allData.term, handleOnClick)}
                </Paper>
              ) : null
            ) : null}
          </div>
        </div>
      </div>
      <div className="topics">
        {topics.map((topic, i) => {
          return (
            <div key={i} className="paperClosed">
              <Paper className="paperInside">{topic.name}</Paper>
            </div>
          );
        })}
      </div>
      <ChargeOverlay
        balance={allData.balance}
        cost={allData.cost}
        quizName={allData.quizName}
        open={allData.open}
        close={handleClose}
        handleTextChange={handleTextChange}
      />
    </div>
  );
}

export default MarketPlace;
