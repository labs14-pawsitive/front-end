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
import CustomCarousel from "../../components/Carousel /Carousel.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";


class AnimalPage extends React.Component {
  render() {
    const customStyles = {
      carousel: {
        // display: "flex",
        // marginLeft: "50px",
        // alignItems: "center"
      }
    }
    const { classes } = this.props;
    
    return (
      <GridContainer className={classes.bodyStyle} >
        <GridItem xs={12} sm={12} md={7} style={customStyles.carousel}>
          
          <CustomCarousel 
            animalId={this.props.match.params.id}
          />
        
        </GridItem>
      </GridContainer>
  );
  }
}

AnimalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mainPageStyle)(AnimalPage);