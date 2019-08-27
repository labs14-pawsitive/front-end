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

import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";

class SearchPage extends React.Component {
  render() {
    const { classes } = this.props;
    
    return (
      <GridContainer className={classes.bodyStyle}>
        <GridItem xs={10} >
          <h1 className={classes.title}>I Search Animals!<sup>*</sup></h1>
        
        </GridItem>
      </GridContainer>
  );
  }
}

SearchPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mainPageStyle)(SearchPage);