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
import { NavLink } from 'react-router-dom'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
import Home from "@material-ui/icons/Home";
import Pets from "@material-ui/icons/Pets"
import Store from "@material-ui/icons/Store";
import AccountBalance from "@material-ui/icons/AccountBalance";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import pricingPageStyle from "assets/jss/material-dashboard-pro-react/views/pricingPageStyle.jsx";

class Onboarding extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <h2 className={classes.title}>WELCOME ABOARD</h2>
            <h5 className={classes.description}>
              How Can Pawsnfind Help You Today?
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          
          <GridItem xs={12} sm={12} md={4}>
            <Card pricing raised>
              <CardBody pricing>
                <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                I would like to browse and eventually find my perfect pet
                </h3>
               {/* <h6 className={classes.cardCategory}>I would like to browse and eventually find my perfect pet</h6> */}
                <div className={classes.icon}>
                  <Pets className={classes.iconRose} />
                </div>
                {/*
                <p className={classes.cardDescription}>
                  This is good if your company size is between 2 and 10 Persons.
                </p> 
                */}
                <NavLink to="/">
                <Button round color="rose">
                  Browse Animals
                </Button>
                </NavLink>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card pricing raised>
              <CardBody pricing>
                <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                  I manage a shelter and would like to register my shelter
                </h3>
                <div className={classes.icon}>
                  <Store className={classes.iconRose} />
                </div>
                {/* 
                <p className={classes.cardDescription}>
                  This is good if your company size is between 2 and 10 Persons.
                </p>
                */}
              <NavLink to="/shelter-signup">
                <Button round color="rose">
                  Register Shelter
                </Button>
              </NavLink>
              </CardBody>
            </Card>
          </GridItem>


          
        </GridContainer>
      </div>
    );
  }
}

Onboarding.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pricingPageStyle)(Onboarding);
