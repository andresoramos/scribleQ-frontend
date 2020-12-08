import React, { useState, useEffect } from "react";
import "./../Styling/marketPlace.css";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import { getAll } from "../Services/findQuiz";
import { findSimilarities, matchBySpelling } from "./../Services/menuCreation";

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
    console.log("populate cache ran");
    const allData = await getAll();
    const allDataWithTs = { ...allData };
    allDataWithTs.ts = Date.now();
    setAllData(allDataWithTs);
  };
  const handleSearch = async (term) => {
    const currentTime = Date.now();
    if (currentTime >= allData.ts + 6000) {
      await populateCache();
    }
    const matchedBySpelling = matchBySpelling(term, allData.quizzes, []);
    console.log(matchedBySpelling, "This should be reading undefined for now");
    //find closest 5 by exact term
    //find closest 5 by tags
    //use a function that takes in the first 5 and the second five, and returns
    //them as a combined menu
  };
  return (
    <div className="headerContainer">
      <div className="headerTop">
        <p className="header">Welcome to the Market Place</p>;
        <div className="search">
          <SearchIcon style={{ fontSize: 70 }} />
          <TextField
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
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
