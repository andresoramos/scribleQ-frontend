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

function MarketPlace(props) {
  const [allData, setAllData] = useState({});
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
    const allData = await getAll();
    const allDataWithTs = { ...allData };
    allDataWithTs.ts = Date.now();
    allDataWithTs.dropDown = [];
    allDataWithTs.term = "";
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
                  {makeDropdown(allData.dropDown, allData.term)}
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
    </div>
  );
}

export default MarketPlace;
