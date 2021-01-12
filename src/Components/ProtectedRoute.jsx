import React, { useEffect } from "react";
import { Route } from "react-router-dom";

function ProtectedRoute(props) {
  const component = props.component;
  const loginComponent = props.loginComponent;
  const loggedIn = localStorage.getItem("token");
  if (!loggedIn) {
    window.location = "/login";
  }
  return (
    <Route
      exact
      path={props.path}
      render={(props) => {
        return component(props);
      }}
    />
  );
}

export default ProtectedRoute;
