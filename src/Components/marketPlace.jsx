import React, { useState, useEffect } from "react";
import "./../Styling/marketPlace.css";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { getAll } from "../Services/findQuiz";
import _ from "lodash";
import {
  matchBySpelling,
  matchByContains,
  matchByTags,
  concatArray,
  makeDropdown,
  trendingMarketService,
  getMostDownloaded,
  getLikedMarkets,
} from "./../Services/menuCreation";
import {
  downloadQuiz,
  freeDownloadService,
} from "./../Services/downloadService";
import ChargeOverlay from "../Components/chargeOverlay";
import {
  balanceService,
  tradeFunds,
  addFunds,
  getCurrUser,
} from "../Services/balanceService";
import {
  removeUnpaidQuestions,
  premiumBuyService,
} from "../Services/premiumBuyService";
import BalanceScreenOverlay from "./balanceScreenOverlay";
import QuizScreenOverlay from "./quizScreenOverlay";
import PremiumScreenOverlay from "./PremiumScreenOverlay";
import DownloadOverlay from "./DownloadOverlay";
import { getUserInfo } from "../Services/authenticateUserToken";
import axios from "axios";

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
    markets: [],
    sameAlert: false,
    owned: false,
    downloadOpen: false,
    sortedMarkets: [],
    sortedPopularMarkets: [],
    sortedLikedMarkets: [],
    quizScreenOpen: false,
    balanceScreenOpen: false,
    premiumScreenOpen: false,
    hidden: {},
    checkboxes: {},
    total: 0,
    userInfo: null,
  });
  const topics = [
    { name: "Trending" },
    { name: "Most Downloaded" },
    { name: "Most Liked" },
  ];
  useEffect(() => {
    populateCache();
  }, []);
  const populateCache = async () => {
    const getAllData = await getAll();
    const balance = await balanceService();
    let allDataWithTs;
    if (allData.userInfo === null) {
      const userId = getCurrUser()._id;
      const userInfo = await getUserInfo(userId);
      allDataWithTs = { ...allData, balance, userInfo, ...getAllData };
    } else {
      allDataWithTs = { ...allData, balance, ...getAllData };
    }
    const marketTrends = await trendingMarketService();
    const sortedMarkets = marketTrends.unsorted
      ? marketTrends.returnedQuizzes
      : marketTrends.sort(function (a, b) {
          return b.timesDownloaded - a.timesDownloaded;
        });
    const mostDownloaded = await getMostDownloaded();
    const sortedLikedMarkets = await getLikedMarkets();
    allDataWithTs.sortedMarkets = sortedMarkets;
    allDataWithTs.sortedPopularMarkets = mostDownloaded;
    allDataWithTs.sortedLikedMarkets = sortedLikedMarkets;
    // const allDataWithTs = { ...allData, balance, ...getAllData };
    setAllData(allDataWithTs);
  };
  const fixCheckBoxes = (value, cost) => {
    const numCost = Number(cost);
    let presentState = allData.checkboxes[value];
    let total = Number(allData.total);
    if (!presentState) {
      total += numCost;
    } else {
      total -= numCost;
    }
    //check if present check box is truthy or falsy
    //if truthy, then deduct cost from total
    //if falsy, add it
    let checkboxes = {
      ...allData.checkboxes,
      [value]: allData.checkboxes[value] ? !allData.checkboxes[value] : true,
    };
    setAllData({ ...allData, checkboxes, total });
  };

  const handleSearch = async (term) => {
    if (term.length === 0) {
      return setAllData({ ...allData, dropDown: [] });
    }
    const currentTime = Date.now();
    if (currentTime >= allData.ts + 600000) {
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
    // const balance = await balanceService();
    const updatedDropdown = {
      ...allData,
      dropDown: concattedArray,
      term,
      // balance,
    };
    setAllData(updatedDropdown);
  };

  const handleScreenClose = () => {
    setAllData({ ...allData, quizScreenOpen: false });
  };
  const openQSafterDownload = () => {
    setAllData({ ...allData, quizScreenOpen: true });
  };
  const handleDownload = (value) => {
    setAllData({ ...allData, downloadOpen: value });
  };
  const premiumClose = (value, killCheckboxAndTotal) => {
    if (killCheckboxAndTotal) {
      return setAllData({
        ...allData,
        premiumScreenOpen: value,
        total: 0,
        checkboxes: {},
      });
    }
    setAllData({ ...allData, premiumScreenOpen: value });
  };

  const interpretResponse = async (response, item) => {
    const balance = await balanceService();
    if (typeof response === "object") {
      if (response.charge) {
        const { cost } = response;
        let hidden = response.hidden ? response.hidden : undefined;
        return setAllData(
          hidden
            ? {
                ...allData,
                open: true,
                cost,
                quizName: item.name,
                presentQuiz: item,
                balance,
                hidden,
              }
            : {
                ...allData,
                open: true,
                cost,
                quizName: item.name,
                presentQuiz: item,
                balance,
              }
        );
      }
      if (
        (!response.charge && response.hidden && !response.premiumCost) ||
        (!response.charge && !response.hidden && !response.premiumCost)
      ) {
        let hidden = response.hidden ? response.hidden : undefined;

        return setAllData({
          ...allData,
          downloadOpen: true,
          quizName: item.name,
          presentQuiz: item,
          hidden: hidden ? hidden : null,
        });
      }
      if (
        (response.premiumCost && response.hidden) ||
        (response.premiumCost && !response.hidden)
      ) {
        let updatedQuiz = _.cloneDeep(item);
        updatedQuiz.premiumCost = response.premiumCost;
        if (response.hidden) {
          updatedQuiz.hidden = response.hidden;
        }
        return setAllData({
          ...allData,
          premiumScreenOpen: true,
          quizName: item.name,
          presentQuiz: updatedQuiz,
          hidden: null,
        });
        //create a modal that takes in premium
        //cost as a prop
        //It will allow user to select which of the questions
        //the user wants to select
        //Then, once user selects buying them,
        //we'll add up their total cost, trim off
        //the ones they didn't buy, and trade funds
        //with the total cost
      }
    }
  };
  const handleFund = async () => {
    const balance = await addFunds(allData.chargeTerm, allData.presentQuiz);
    setAllData({ ...allData, balance });
  };

  const handleQuizDownload = async (quiz, hidden) => {
    hidden = hidden === null ? {} : hidden;

    let newQuiz = _.cloneDeep(quiz);
    let { questions } = newQuiz;
    let finalQuestions = [];
    for (var i = 0; i < questions.length; i++) {
      if (!hidden[i + 1]) {
        finalQuestions.push(questions[i]);
      }
    }
    newQuiz.questions = finalQuestions;
    newQuiz.hidden = hidden;
    newQuiz.freeHidden = true;
    const downloaded = await freeDownloadService(newQuiz);
    if (downloaded) {
      updateUserAccount(allData.presentQuiz);
      setAllData({ ...allData, downloadOpen: false, quizScreenOpen: true });
    }
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
  const handleClose = (val) => {
    if (val === "balanceScreenOpen") {
      return setAllData({ ...allData, [val]: false, total: 0, checkboxes: {} });
    }
    setAllData({ ...allData, [val]: false });
  };
  const reshowBuy = () => {
    setAllData({ ...allData, premiumScreenOpen: true });
  };

  const handleBuy = async (amount) => {
    const bought = await tradeFunds(
      amount,
      allData.presentQuiz,
      allData.hidden
    );
    if (bought === 404) {
      return setAllData({ ...allData, sameAlert: true });
    }
    if (bought.owned) {
      return setAllData({ ...allData, owned: true });
    }
    if (bought) {
      updateUserAccount(allData.presentQuiz);
      setAllData({ ...allData, open: false, quizScreenOpen: true });
      //bring up modal that gives them option to either see their quizzes that they've
      //purchased, or to continue shopping in the market place
    }
  };

  const updateUserAccount = (quiz) => {
    const parsedAccount = JSON.parse(localStorage.getItem("account"));
    if (parsedAccount !== "") {
      const newParsedAccount = _.cloneDeep(parsedAccount);
      const { user } = parsedAccount;
      const quizzesOwned = user.quizzesOwned ? user.quizzesOwned : {};
      const newQuizzes = { ...quizzesOwned, [quiz._id]: quiz };
      newParsedAccount.user.quizzesOwned = newQuizzes;
      const strungObj = JSON.stringify(newParsedAccount);
      return localStorage.setItem("account", strungObj);
    }
    //Make sure to clear out account before trying to fix this
    //again
    const user = _.cloneDeep(allData.userInfo);
    const quizzesOwned = user.quizzesOwned ? user.quizzesOwned : {};
    const newQuizzes = { ...quizzesOwned, [quiz._id]: quiz };
    user.quizzesOwned = newQuizzes;
    const finalAccount = { user, quizzes: [] };
    const strungObj = JSON.stringify(finalAccount);
    return localStorage.setItem("account", strungObj);
  };
  const handlePremiumBuy = async () => {
    const quiz = _.cloneDeep(allData.presentQuiz);
    let keepers = quiz.premiumCost;
    const keepersOriginal = _.cloneDeep(keepers);
    let keepGuide = { ...allData.checkboxes };
    for (var key in keepGuide) {
      if (keepGuide[key] === true && keepers[key]) {
        delete keepers[key];
      }
    }
    let finalPruningObj = {};
    // let costs = 0;
    let costs = allData.total;

    if (quiz.hidden) {
      for (var key in quiz.hidden) {
        finalPruningObj[key] = true;
      }
      //add keys from hidden to finalPruningObj
    }
    for (var key in keepers) {
      finalPruningObj[key] = true;
    }

    // for (var key in keepersOriginal) {
    //   if (!finalPruningObj[key]) {
    //     costs += Number(keepersOriginal[key]);
    //   }
    // }
    const balance = await balanceService();
    if (balance < costs) {
      return setAllData({
        ...allData,
        cost: costs,
        premiumScreenOpen: false,
        balanceScreenOpen: true,
      });
    }
    const readyQuiz = removeUnpaidQuestions(finalPruningObj, quiz);
    const finalizePremiumBuy = await premiumBuyService(readyQuiz, costs);
    if (finalizePremiumBuy) {
      updateUserAccount(allData.presentQuiz);
      setAllData({
        ...allData,
        quizScreenOpen: true,
        premiumScreenOpen: false,
      });
    }
  };
  const locateQuiz = (name) => {
    const quiz = allData.quizzes.filter((item) => {
      return item.name === name;
    });
    return quiz;
  };
  const handleOnClick = async (item) => {
    if (typeof item === "string") {
      item = locateQuiz(item)[0];
    }
    if (item === undefined) {
      return;
    }
    const downloadedQuiz = await downloadQuiz(item);
    const interpretedResponse = await interpretResponse(downloadedQuiz, item);
  };
  const determineContent = (section) => {
    if (section === "Trending") {
      return allData.sortedMarkets;
    }
    if (section === "Most Downloaded") {
      return allData.sortedPopularMarkets;
    }
    if (section === "Most Liked") {
      return allData.sortedLikedMarkets;
    }

    return [];
  };
  const determineCost = (id) => {
    let marketObj = allData.markets.filter((item) => {
      return item.makerId === id;
    });
    if (marketObj.length === 0) {
      marketObj = [{ cost: "You own this already." }];
    }
    if (marketObj[0].cost) {
      return [
        marketObj[0].cost,
        marketObj[0].description
          ? marketObj[0].description
          : "No description provided",
      ];
    }
    return [
      "Free",
      marketObj[0].description
        ? marketObj[0].description
        : "No description provided",
    ];
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
                e.preventDefault();
                handleSearch(e.target.value);
              }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            {allData.dropDown && allData.dropDown.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
      <div className="topics">
        {topics.map((topic, i) => {
          return (
            <div key={i} className="paperClosed">
              <Paper className="paperInside">
                <h2 className="topicsTitle">{topic.name}</h2>
                {determineContent(topic.name).map((item, i) => {
                  if (item.noClick) {
                  }
                  return (
                    <div key={i} className="quizzesList">
                      <div className="quickInfo">
                        <div className="nameAndCost">
                          <div
                            onClick={
                              !item.noClick
                                ? () => {
                                    handleOnClick(item.name);
                                  }
                                : null
                            }
                            className={
                              !item.noClick ? "quizName" : "noClickQuizName"
                            }
                          >
                            {item.name}
                          </div>
                          <div style={{ marginLeft: "1em" }}>{`Cost: ${
                            determineCost(item._id)[0]
                          }`}</div>
                        </div>
                        <div className="quizDescription">
                          <div style={{ fontWeight: "bold", fontSize: "12px" }}>
                            Description
                          </div>
                          <div
                            className="descriptionStyle"
                            style={{ fontSize: "12px" }}
                          >
                            {determineCost(item._id)[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Paper>
            </div>
          );
        })}
      </div>
      {allData.open && (
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
      )}

      {allData.quizScreenOpen && (
        <QuizScreenOverlay
          {...props}
          open={allData.quizScreenOpen}
          close={handleScreenClose}
          title={`You may either continue browsing the marketplace, see all of your purchased quizzes, or take ${
            allData.presentQuiz !== null ? allData.presentQuiz.name : null
          }`}
        />
      )}
      {allData.downloadOpen && (
        <DownloadOverlay
          {...props}
          hidden={allData.hidden}
          open={allData.downloadOpen}
          handleDownload={handleQuizDownload}
          close={handleDownload}
          quizName={
            allData.presentQuiz !== null ? allData.presentQuiz.name : null
          }
          quiz={allData.presentQuiz !== null ? allData.presentQuiz : null}
        />
      )}
      {allData.premiumScreenOpen && (
        <PremiumScreenOverlay
          {...props}
          handlePremiumBuy={handlePremiumBuy}
          total={allData.total}
          checkboxes={allData.checkboxes}
          fixCheckBoxes={fixCheckBoxes}
          hidden={allData.hidden}
          open={allData.premiumScreenOpen}
          handleDownload={handleQuizDownload}
          close={premiumClose}
          quizName={
            allData.presentQuiz !== null ? allData.presentQuiz.name : null
          }
          quiz={allData.presentQuiz !== null ? allData.presentQuiz : null}
        />
      )}
      {allData.balanceScreenOpen && (
        <BalanceScreenOverlay
          {...props}
          costs={allData.cost}
          balance={allData.balance}
          handlePremiumBuy={handlePremiumBuy}
          checkboxes={allData.checkboxes}
          fixCheckBoxes={fixCheckBoxes}
          hidden={allData.hidden}
          reshowBuy={reshowBuy}
          open={allData.balanceScreenOpen}
          handleTextChange={handleTextChange}
          handleFund={handleFund}
          close={handleClose}
          quizName={
            allData.presentQuiz !== null ? allData.presentQuiz.name : null
          }
          quiz={allData.presentQuiz !== null ? allData.presentQuiz : null}
        />
      )}
      <Button
        onClick={async () => {
          await axios.put(`api/quizzes/destroy/${getCurrUser()._id}`);
        }}
      >
        Delete Buys and Downloads
      </Button>
    </div>
  );
}

export default MarketPlace;
