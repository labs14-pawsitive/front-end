import React from "react";
import { Route, Redirect } from "react-router-dom";
import { axiosWithAuth } from 'axiosWithAuth.js'

/*
let verified = ''
const  PrivateRoute = ({ component: Component, ...rest }) => {
  
  
    //verifying shelter before proceeding
  axiosWithAuth()
  .get(`http://localhost:8000/api/auth/shelter/${localStorage.getItem('shelter_id')}`)
  .then( result => {
    console.log(result)
    verified = true;
  })
  .catch( error => {
    console.log(error)
    verified = false;
  })
  
  console.log(verified)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (verified && localStorage.getItem("shelter_id") && localStorage.getItem("shelter_id") !== "null") {
          return <Component {...props}/>;
        } else if (localStorage.getItem("token") && localStorage.getItem("shelter_id") === "null"){
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
*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token") && localStorage.getItem("shelter_id") && localStorage.getItem("shelter_id") !== "null") {
          return <Component {...props}/>;
        } else if (localStorage.getItem("token") && localStorage.getItem("shelter_id") === "null"){
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
