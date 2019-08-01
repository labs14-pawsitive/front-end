import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("id_token") && localStorage.getItem("shelter_id") !== "null") {
          return <Component {...props}/>;
        } else if (localStorage.getItem("id_token" && localStorage.getItem("shelter_id") === "null")){
          return <Redirect to="/shelter-signup" />
        }
          else
        {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;