import React from "react";
import "../Styling/MarketPerformance.css";
import Paper from "@material-ui/core/Paper";
import GenericTable from "./genericTable";

function MarketPerformance(props) {
  const categories = [
    { category: "Quiz name" },
    { category: "Date uploaded" },
    { category: "Valid until" },
    { category: "Likes" },
    { category: "Dislikes" },
    { category: "Total downloads" },
    { category: "Total revenue" },
  ];
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
          <GenericTable {...props} categories={categories} />
        </Paper>
      </div>
    </div>
  );
}

export default MarketPerformance;
