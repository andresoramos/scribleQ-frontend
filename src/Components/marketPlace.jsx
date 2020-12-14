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
import {
  balanceService,
  tradeFunds,
  addFunds,
} from "../Services/balanceService";

function MarketPlace(props) {
  const [allData, setAllData] = useState({
    ts: Date.now(),
    dropDown: [],
    term: "",
    open: false,
    balance: 0,
    cost: null,
    quizName: null,
    error: false,
    chargeTerm: null,
    presentQuiz: null,
    sameAlert: false,
    owned: false,
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
    const allDataWithTs = { ...allData, ...getAllData };
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
    const balance = await balanceService();
    const updatedDropdown = {
      ...allData,
      dropDown: concattedArray,
      term,
      balance,
    };
    setAllData(updatedDropdown);
  };

  const interpretResponse = (response, item) => {
    if (typeof response === "object") {
      if (response.charge) {
        const { cost } = response;
        setAllData({
          ...allData,
          open: true,
          cost,
          quizName: item.name,
          presentQuiz: item,
        });
      }
    }
  };
  const handleFund = async () => {
    const balance = await addFunds(allData.chargeTerm, allData.presentQuiz);
    setAllData({ ...allData, balance });
    //service will both have to direct money to the creator's balance,
    //as well as correctly increasing the revenue property in the market obj
  };
  const handleTextChange = (term) => {
    if (term === "") {
      return setAllData({ ...allData, error: false });
    }
    const toNumber = Number(term);
    if (JSON.stringify(toNumber) === "null") {
      return setAllData({ ...allData, error: true });
    }
    setAllData({ ...allData, chargeTerm: term });
  };
  const handleClose = () => {
    setAllData({ ...allData, open: false });
  };

  const handleBuy = async (amount) => {
    const bought = await tradeFunds(amount, allData.presentQuiz);
    if (bought === 404) {
      return setAllData({ ...allData, sameAlert: true });
    }
    if (bought.owned) {
      return setAllData({ ...allData, owned: true });
    }
    if (bought) {
      //create a service that handles the download of the quiz itself
    }
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
        <p className="header">Welcome to the Market Place</p>
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
        error={allData.error}
        balance={allData.balance}
        cost={allData.cost}
        handleBuy={handleBuy}
        quizName={allData.quizName}
        handleFund={handleFund}
        open={allData.open}
        sameAlert={allData.sameAlert}
        close={handleClose}
        owned={allData.owned}
        handleTextChange={handleTextChange}
      />
    </div>
  );
}

export default MarketPlace;
