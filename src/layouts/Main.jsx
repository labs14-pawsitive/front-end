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
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import MainNavBar from "components/Navbars/MainNavBar.jsx";
import Footer from "components/Footer/Footer.jsx";

import MainPage from "views/Main/Main.jsx";
import AnimalPage from "views/Main/Animal.jsx";
import ErrorPage from "views/Pages/ErrorPage.jsx";
import ShelterPage from "views/Main/Shelter.jsx";
import SearchPage from "views/Main/Search.jsx";
import MarketingPage from "views/Main/Marketing.jsx";
import TeamPage from "views/Main/Team.jsx";

import mainStyle from "assets/jss/material-dashboard-pro-react/layouts/mainStyle.jsx";

import mainBG from "assets/img/bg-application.jpg";
import error from "assets/img/bg-404lostPuppy.jpg";


class MainLayout extends React.Component {
  wrapper = React.createRef();

 
  componentDidMount() {
    document.body.style.overflow = "unset"; 
  }
  
  getBgImage = () => {
    if (window.location.pathname.indexOf("/error") !== -1) {
      return error;
    } else {
      return null;
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <MainNavBar brandText="Pawsnfind" {...rest} />
        <div className={classes.wrapper} ref={this.wrapper}>
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}
          >
            <Switch>
              <Route path="/animal/:id" component={AnimalPage} />
              <Route path="/shelter/:id" component={ShelterPage}/>
              <Route path="/search" component={SearchPage} />
              <Route path="/shelterManagers" component={MarketingPage} />
              <Route path="/team" component={TeamPage} />
              <Route exact path="/" component={MainPage} />
              <Route path="/error" component={ErrorPage} />
              <Redirect from ="/" to="/error" />
            </Switch>
            <Footer white/>
          </div>
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mainStyle)(MainLayout);
