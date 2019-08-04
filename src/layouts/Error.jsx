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

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import TempNavBar from "components/Navbars/TempNavBar.jsx";
import ErrorPage from "views/Pages/ErrorPage.jsx";
import Footer from "components/Footer/Footer.jsx";

import routes from "routes.js";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";

import register from "assets/img/register.jpeg";
import login from "assets/img/login.jpeg";
import lock from "assets/img/lock.jpeg";
import error from "assets/img/bg-404lostPuppy.jpg";
import pricing from "assets/img/bg-pricing.jpeg";

class Pages extends React.Component {
  wrapper = React.createRef();
  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBgImage = () => {
      return error;

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
            <ErrorPage />

            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
