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

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Button from "components/CustomButtons/Button.jsx";



import marketingPageStyle from "assets/jss/material-dashboard-pro-react/views/marketingPageStyle.jsx";

class MarketingPage extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <>
      <div className={classes.div_1}>
        <GridContainer style={{width: "70%", margin:"0 auto"}}>
        <GridItem xs={12} s={12} md={8} >
          <h1 className={classes.headerTitle}>Promote and Manage Shelter<sup>*</sup></h1>
          <h4 className={classes.description} style={{color: "white"}}>All from One App</h4>
          <Button className={classes.signupButton}>Sign Up</Button>
        </GridItem>
        </GridContainer>
      </div>
      <div className={classes.iconsBar}>
      <GridContainer style={{ display: "flex",justifyContent: "center", alignItems: "center"}}>
      <GridItem xs={12} sm={12} md={4} >
        <h1 className={classes.barType}>Promote & Manage Animals</h1>
      </GridItem>
      <GridItem xs={12} sm={12} md={4} >
        <h1 className={classes.barType}>Accept & Manage Applications Online</h1>
      </GridItem>
      <GridItem xs={12} sm={12} md={4} >
        <h1 className={classes.barType}>Accept & Manage & Track Donations</h1>
      </GridItem>
      </GridContainer>
      </div>
      <div className={classes.div_2}>
      <GridContainer style={{width: "80%", margin:"0 auto"}} >
      <GridItem xs={12} sm={12} md={6} >
        <h1 className={classes.subTitle}>Shelter Management Snapshot</h1>
        <h4 className={classes.description} style={{color:"#9A9A9A"}}> Get all the important data from your shelter operation at one page.</h4>
      </GridItem>
      </GridContainer>
    </div>
    <div className={classes.div_3}>
    <GridContainer style={{width: "80%", margin:"0 auto"}}>
      <GridItem xs={12} sm={12} md={12} >
        <h1 className={classes.subTitle}>Promote Adoptable Animals</h1>
      </GridItem>
    </GridContainer>
    </div>
    <div className={classes.div_4}>
    <GridContainer style={{width: "80%", margin:"0 auto"}}>
      <GridItem xs={12} sm={12} md={12} >
        <h1 className={classes.subTitle}>Paperless Online Application</h1>
      </GridItem>
    </GridContainer>
    </div>
    </>
  );
  }
}

MarketingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(marketingPageStyle)(MarketingPage);