/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';

import Auth from 'components/Auth/Auth.js';
import PrivateRoute from 'PrivateRoute.js';
import PrivateRouteShelter from 'PrivateRouteShelter.js';
import PrivateRouteApplication from 'PrivateRouteApplication.js';

import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";
import ApplicationLayout from "layouts/Application_Temp.jsx";
import MainLayout from "layouts/Main_Temp.jsx";
import Callback from "layouts/Callback.jsx";
import ShelterOnboarding from "layouts/ShelterOnboarding.jsx";

import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";


const store = createStore(
    reducer,
   
        applyMiddleware(thunk, logger)
);

const hist = createBrowserHistory();

const auth = new Auth();

const handleAuthentication = ({ location }) => {
    if(/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
}




ReactDOM.render(
    <Provider store = {store} >
        <Router history={hist}>
            <Switch>
            <Route exact path="/" component = {MainLayout} />   
            <Route path="/auth" component={AuthLayout} />
            <Route path="/callback" render={props => {handleAuthentication(props); return <Callback {...props} />}} />
            <Route path="/application/:shelterId/:animalId" component={ApplicationLayout} />
            <Route path="/application" component={ApplicationLayout} />
            <PrivateRoute path="/shelter-signup" component={ShelterOnboarding}/>
            <PrivateRouteShelter path="/admin" component={AdminLayout} />
            {/* <Redirect from="/" to="/admin/dashboard" />  */}
            </Switch>
        </Router>
    </Provider>,
  document.getElementById("root")
);
