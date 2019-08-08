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
import Footer from "components/Footer/Footer.jsx";

import Main from "views/Main_Temp/Main.jsx";
import StripeForm from '../views/Stripe/StripeForm.js';
// import routes from "mainRoutes.js";

import pageStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";

// import register from "assets/img/register.jpeg";
// import login from "assets/img/login.jpeg";
// import lock from "assets/img/lock.jpeg";
// import error from "assets/img/clint-mckoy.jpg";
// import pricing from "assets/img/bg-pricing.jpeg";
// import application from "assets/img/bg-application3.jpg";
import mainBG from "assets/img/bg-application.jpg"

class MainTemp extends React.Component {
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
    return mainBG;
   
  };
  
  getActiveRoute = routes => {
    let activeRoute = "Pawsnfind";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
 
 <StripeForm/>
      </div>
    );
  }
}

MainTemp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pageStyle)(MainTemp);
