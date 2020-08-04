import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import authenticateUserToken from "./../Services/authenticateUserToken";

function SeeScore(props) {
  const [approved, setApproved] = useState(false);
  const scoreScreen = localStorage.getItem("scoreScreen");
  console.log(scoreScreen, "this is screenScore");
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const checkIfLoggedIn = async (token) => {
      const auth = await authenticateUserToken(token);
      if (!auth) {
        return;
      }
      setApproved(true);
    };
    checkIfLoggedIn(token);
  }
  console.log(props.currentScore);
  return approved ? (
    <div>
      <h1>{`You've scored ${props.currentScore.stringScore}!`}</h1>
    </div>
  ) : (
    <div>You're a butt</div>
  );
}

export default SeeScore;
