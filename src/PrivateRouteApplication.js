import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "components/Auth/Auth.js"


const auth = new Auth();


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if(localStorage.getItem("id_token") && localStorage.getItem("user_id")) {
          return <Component {...props}/>;
        } 
          else 
        {
          return <Redirect to="/application" />;
        }
      }}
    />
  );
};

export default PrivateRoute;