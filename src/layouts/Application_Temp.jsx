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
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "components/Auth/Auth.js"


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import TempNavBar from "components/Navbars/TempNavBar.jsx";
import Footer from "components/Footer/Footer.jsx";

import ApplicationWizard from "views/Application_Temp/Wizard.jsx";

import routes from "routes.js";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";

import register from "assets/img/register.jpeg";
import login from "assets/img/login.jpeg";
import lock from "assets/img/lock.jpeg";
import error from "assets/img/clint-mckoy.jpg";
import pricing from "assets/img/bg-pricing.jpeg";
import application from "assets/img/bg-application3.jpg";



class Application extends React.Component {
  wrapper = React.createRef();

  componentDidMount() {
    document.body.style.overflow = "unset";

  }
  
  getBgImage = () => {
    return application;
  };
  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <TempNavBar brandText="Pawsnfind" {...rest} />

        <div className={classes.wrapper} ref={this.wrapper}>
          
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}
          >
            <ApplicationWizard />
            
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Application);
