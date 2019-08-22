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
import AnimalCard from "components/AnimalCard/AnimalCard.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import bgheader from "assets/img/shelter_img.png";
import houseIcon from "assets/img/007-house.png";
import mailIcon from "assets/img/013-mail.png";
import phoneIcon from "assets/img/020-telephone-3.png";
import serviceIcon from "assets/img/036-customer-service.png";
import shelterPageStyle from "assets/jss/material-dashboard-pro-react/views/shelterPageStyle";

import StripeDonation from  "components/Stripe/StripeDonation.jsx";

class ShelterPage extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        shelter: {},
        animals: [],
        hasStripe: false,
        shelterFollow: false,
      }
    }
  

  componentDidMount() {
    // axios.all([
    //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${this.props.match.params.id}`),
    //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/animals/shelter/${this.props.match.params.id}`)
    // ])
    //   .then(axios.spread((shelterRes, animalsRes) => {
    //     this.setState({
    //       shelter: shelterRes.data,
    //       animals: animalsRes.data,
    //     })
    //     console.log(this.state.shelter, this.state.animals)
    //   }))
    //   .catch((shelterErr, animalsRes) => { 
    //     console.log(`Shelter Error: ${shelterErr}, Animals Error: ${animalsRes}`)})
    
    let userID = () => {
      if (localStorage.getItem('user_id')){
        return localStorage.getItem('user_id')
      } else { return 0 }
    }


      axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/public/${this.props.match.params.id}/${userID()}`)
      .then(res => { 
          this.setState({
            shelter: res.data,
            animals: res.data.animals,
            hasStripe: res.data.hasStripe,
            shelterFollow: res.data.shelterFollow,
          })
      })
      .catch(err => { 
        console.log(`Shelter Error: ${err}`)
      })
    
      }

    getBgImage = () => {
      return bgheader;
    };

  render() {
    const { classes } = this.props;
    const { shelter } = this.state;
    
    return (
      <>
      <div className={classes.wrapper} >
      <div className={classes.header}
      style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}>
      
        <GridContainer className={classes.contentHeader}>
          <GridItem xs={12} sm={12} md={7}>
            <h1 className={classes.title}>{shelter.shelter}</h1>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
          <Button className={classes.topButtons}>{this.state.shelterFollow? "Unfollow" : "Follow"}</Button> 
          {this.state.hasStripe? <StripeDonation shelter={shelter} /> : null}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}></GridItem>
        </GridContainer>
        </div>
        <GridContainer className={classes.shelterCard}>
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={houseIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.street_address}<br></br>{shelter.city}, {shelter.state} {shelter.zipcode}</h6> </GridItem>
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={mailIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.email}</h6></GridItem>  
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={phoneIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.phone}</h6></GridItem>  
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={serviceIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.name}</h6></GridItem>   
      </GridContainer>
         <div className={classes.picturesStyle}>
        <GridContainer xs={10} style={{margin:"50px auto 0"}}>
              {this.state.animals.map(animal => <AnimalCard animal={animal}/>)}  
            </GridContainer> 
        </div>
        </div>
      </>
  );
  }
}

ShelterPage.propTypes = {
  classes: PropTypes.object.isRequired
};




export default withStyles(shelterPageStyle)(ShelterPage);