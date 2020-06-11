import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./Components/Home";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import TestPage from "./Components/TestPage";
import PasswordReset from "./Components/PasswordReset";
import NewPassword from "./Components/NewPassword";

function App() {
  const [signedInName, setSignedInName] = useState(
    localStorage.getItem("name")
  );
  const setName = (name) => {
    setSignedInName(name);
  };
  return (
    <React.Fragment>
      <NavBar signedIn={signedInName} />
      <Switch>
        <Route
          path="/newPassword/:token"
          render={({ ...props }) => {
            localStorage.clear();
            setSignedInName(localStorage.getItem("name"));
            return <NewPassword {...props} />;
          }}
        />
        <Route path="/passwordReset" component={PasswordReset} />
        <Route
          path="/register"
          render={({ ...props }) => {
            return <Register setName={setName} {...props} />;
          }}

          // render={({ setName, ...rest }) => {
          //   return <Register setName={setName} {...rest} />;
          // }}
        />
        <Route
          path="/login"
          render={(...props) => {
            return <Login setName={setName} {...props} />;
          }}
        />
        <Route path="/page" component={TestPage} />
        <Route
          path="/"
          exact
          render={(props) => {
            return <Home />;
          }}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
