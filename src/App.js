import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { Home } from "./Components/Home";
import Register from "./Components/Register";
import NavBar from "./Components/NavBar";
import Login from "./Components/Login";
import TestPage from "./Components/TestPage";
import PasswordReset from "./Components/PasswordReset";
import NewPassword from "./Components/NewPassword";
import { Banned } from "./Components/Banned";
import { MakeQuiz } from "./Components/MakeQuiz";
import ViewQuiz from "./Components/ViewQuiz";
import SeeScore from "./Components/SeeScore";
import Analytics from "./Components/Analytics";
import Upload from "./Components/Upload";
import MarketForm from "./Components/marketForm";
import NewMakeQuiz from "./Components/newMakeQuiz";
import ProtectedRoute from "./Components/ProtectedRoute";
import MarketPerformance from "./Components/MarketPerformance";
import Marketplace from "./Components/marketPlace";
import PurchasedQuizzes from "./Components/PurchasedQuizzes";

function App(props) {
  const [signedInName, setSignedInName] = useState(
    localStorage.getItem("name")
  );

  const [location, setLocation] = useState("");
  const [quizScore, setQuizScore] = useState({});
  const [currentName, setCurrentName] = useState("");
  const [paidFormState, setPaidFormState] = useState(null);

  const setName = (name) => {
    const token = localStorage.getItem("token");

    setSignedInName(name);
  };
  const upDateLocation = (path) => {
    setLocation(path);
  };
  const updatePaidQuizAnalytics = (currentName, hidden) => {
    const newAnalytics = { currentName, hidden };
    setPaidFormState(newAnalytics);
  };
  const handleCurrentStatName = (name) => {
    setCurrentName(name);
  };
  const handleSetQuizScore = (score) => {
    setQuizScore(score);
  };
  const iValueIs = (i) => {
    localStorage.setItem("i", i);
  };
  return (
    <BrowserRouter>
      {location !== "/banned" && <NavBar signedIn={signedInName} />}

      <Switch>
        <Route
          path="/banned"
          render={(props) => {
            return <Banned {...props} upDateLocation={upDateLocation} />;
          }}
        />
        <Route
          path="/viewQuiz"
          render={(props) => {
            return (
              <ViewQuiz
                {...props}
                setQuizScore={handleSetQuizScore}
                upDateLocation={upDateLocation}
              />
            );
          }}
        />
        <Route
          path="/marketForm"
          exact
          render={(props) => {
            return (
              <MarketForm
                {...props}
                setQuizScore={handleSetQuizScore}
                upDateLocation={upDateLocation}
              />
            );
          }}
        />
        <ProtectedRoute
          path="/marketPerformance"
          component={(props) => <MarketPerformance {...props} />}
        />
        <ProtectedRoute
          path="/purchasedQuizzes"
          component={(props) => (
            <PurchasedQuizzes
              updatePaidQuizAnalytics={updatePaidQuizAnalytics}
              {...props}
            />
          )}
        />
        <ProtectedRoute
          path="/marketplace"
          component={(props) => <Marketplace {...props} />}
        />
        <Route
          path="/seeScore"
          render={(props) => {
            return (
              <SeeScore
                {...props}
                upDateLocation={upDateLocation}
                currentScore={quizScore}
              />
            );
          }}
        />

        <Route
          path="/analytics"
          render={(props) => {
            return (
              <Analytics
                paidAnalytics={paidFormState}
                currentName={currentName}
                {...props}
              />
            );
          }}
        />
        <Route
          path="/upload"
          render={(props) => {
            return <Upload currentName={currentName} {...props} />;
          }}
        />
        <Route
          path="/makeQuiz"
          render={(props) => {
            return <MakeQuiz signedInName={signedInName} {...props} />;
          }}
        />
        <Route
          path="/newMakeQuiz"
          exact
          render={(props) => {
            return <NewMakeQuiz signedInName={signedInName} {...props} />;
          }}
        />

        <Route
          path="/newPassword/:token"
          render={(props) => {
            localStorage.clear();
            setSignedInName(localStorage.getItem("name"));
            return <NewPassword {...props} />;
          }}
        />
        <Route path="/passwordReset" component={PasswordReset} />
        <Route
          path="/register"
          render={(props) => {
            return <Register setName={setName} {...props} />;
          }}

          // render={({ setName, ...rest }) => {
          //   return <Register setName={setName} {...rest} />;
          // }}
        />
        <Route
          path="/login"
          render={(props) => {
            return <Login setName={setName} {...props} />;
          }}
        />
        <Route path="/page" component={TestPage} />
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <Home
                {...props}
                currentName={currentName}
                currentStatName={handleCurrentStatName}
                upDateLocation={upDateLocation}
                iValueIs={iValueIs}
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
