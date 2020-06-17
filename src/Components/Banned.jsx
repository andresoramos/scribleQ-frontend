import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const Banned = (props) => {
  const goHome = () => {
    props.history.push("/");
  };
  useEffect(() => {
    props.upDateLocation(window.location.pathname);
  });

  return (
    <React.Fragment>
      <h1>You've tried to log in too many times. Please try again later.</h1>
      <Button onClick={goHome}>To Page</Button>
    </React.Fragment>
  );
};
