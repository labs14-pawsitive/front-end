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
import { withRouter } from "react-router-dom";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";

class ShelterPage extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        shelter: {},
        animals: []
      }
    }
  
  componentDidMount() {
    axios.all([
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${this.props.match.params.id}`),
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/animals/shelter/${this.props.match.params.id}`)
    ])
      .then(axios.spread((shelterRes, animalsRes) => {
        this.setState({
          shelter: shelterRes.data,
          animals: animalsRes.data,
        })
        console.log(this.state.shelter, this.state.animals)
      }))
      .catch((shelterErr, animalsRes) => { 
        console.log(`Shelter Error: ${shelterErr}, Animals Error: ${animalsRes}`)})
    }

  
  
  render() {
    const { classes } = this.props;
    
    return (
      <GridContainer className={classes.bodyStyle}>
        <GridItem xs={12} sm={12} md={3}>
          <GridItem xs={12} sm={12} md={12}>
          <h1 className={classes.subTitle}>{this.state.shelter.shelter}</h1>
          <h4>{this.state.shelter.name}</h4>
          <h4>{this.state.shelter.email}</h4>
          <h4>{this.state.shelter.phone}</h4>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Button color="rose">Donate Here</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Button color="rose">Follow this Shelter</Button>
          </GridItem>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
        <div className={classes.picturesStyle}>
        {this.state.animals.map(animal => {
          return (
          <div key={animal.id}><img src={animal.img_url} className={classes.petpicStyle}></img></div>
          )
        })}
        </div>
        </GridItem>
      </GridContainer>
  );
  }
}

ShelterPage.propTypes = {
  classes: PropTypes.object.isRequired
};




export default withStyles(mainPageStyle)(ShelterPage);