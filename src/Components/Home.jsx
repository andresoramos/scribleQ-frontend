import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

export class Home extends React.Component {
  handleIp = async () => {
    const ipTest = await axios.get("http://localhost:5000/api/users");
    console.log(ipTest, "this is what get gets");
  };
  render() {
    return (
      <>
        <h1>You are home.</h1>
        <Button onClick={this.handleIp}>To Page</Button>
      </>
    );
  }
}
