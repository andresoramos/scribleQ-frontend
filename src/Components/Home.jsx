import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const Home = (props) => {
  const handleIp = async () => {
    const ipTest = await axios.get("/api/users");
    console.log(ipTest, "this is what get gets");
  };
  useEffect(() => {
    // Update the document title using the browser API
    props.upDateLocation(window.location.pathname);
  });

  return (
    <>
      <h1 className="home-header">You are home.</h1>
      <Button onClick={handleIp}>To Page</Button>
    </>
  );
};
