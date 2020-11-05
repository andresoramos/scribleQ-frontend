import React, { useEffect, useState } from "react";
import "../Styling/MarketPerformance.css";
import Paper from "@material-ui/core/Paper";
import GenericTable from "./genericTable";
import { getQuizById } from "./../Services/getSelectedQuiz";
import { createDate } from "../Services/createDate";
function MarketPerformance(props) {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const categories = [
    { category: "Quiz name" },
    { category: "Date uploaded" },
    { category: "Valid until" },
    { category: "Likes" },
    { category: "Dislikes" },
    { category: "Total downloads" },
    { category: "Total revenue" },
  ];

  useEffect(() => {
    getQuizById(JSON.parse(localStorage.getItem("marketObj")).makerId)
      .then((quiz) => {
        setCurrentQuiz(quiz);
      })
      .catch((error) => {
        console.log(`Error fetching in marketPerformance useEffect: ${error}`);
      });
  }, []);

  const createRows = () => {
    if (currentQuiz === null) {
      return null;
    } else {
      const marketObj = JSON.parse(localStorage.getItem("marketObj"));
      const finalArr = [];
      const finalObj = {};
      finalObj.quizName = currentQuiz.name;
      finalObj.dateUploaded = marketObj.uploadDate
        ? createDate(marketObj.uploadDate)
        : undefined;
      finalObj.validUntil = marketObj.expirationDate
        ? marketObj.expirationDate
        : undefined;
      finalObj.likes = marketObj.likes.likes;
      finalObj.dislikes = marketObj.likes.dislikes;
      finalObj.totalDownloads = Object.keys(marketObj.downloadedBy).length;
      finalObj.totalRevenue = marketObj.revenue.total;
      finalArr.push(finalObj);
      return finalArr;
    }
  };
  return (
    <div className="container">
      <div className="left">
        {" "}
        <Paper className="paperMessage" elevation={3}>
          <div className="paperMessageAlign">
            <h1>These little quizzes went to market.</h1>
            <br></br>
            <h2>Let's see how they did.</h2>
          </div>
        </Paper>
      </div>

      <div className="right">
        <Paper>
          <GenericTable
            {...props}
            rows={createRows()}
            categories={categories}
          />
        </Paper>
      </div>
    </div>
  );
}

export default MarketPerformance;
