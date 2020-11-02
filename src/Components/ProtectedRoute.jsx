import React from "react";
import { Route } from "react-router-dom";

function ProtectedRoute(props) {
  const component = props.component;

  console.log(props, "This is the props obj for pro route");
  return (
    <Route
      exact
      path={props.path}
      render={(props) => {
        console.log(props, "maybe props in route works");
        return component(props);
      }}
    />
  );
}

export default ProtectedRoute;
