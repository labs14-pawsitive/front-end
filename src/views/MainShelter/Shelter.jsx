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
import SweetAlert from "react-bootstrap-sweetalert";
import Auth from "components/Auth/Auth.js"


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
const auth = new Auth();

class ShelterPage extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        shelter: {},
        animals: [],
        hasStripe: false,
        shelterFollow: false,
        alert: null,
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
      
      localStorage.removeItem('shelterId')
      }

    getBgImage = () => {
      return bgheader;
    };

    setAlert = (str) => {
      if(!localStorage.getItem('token') && !localStorage.getItem('user_id')) {
         this.warningAlert(str);
       } else {
         this.hideAlert();
       }
     }
     
     routeToAuth = () => {
      localStorage.setItem("shelterId", this.props.match.params.id)
      auth.login();
  }
    warningAlert = (str) => {
    this.setState({
      alert: (
        <SweetAlert
          warning
          showCancel
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          style={{ display: "block", marginTop: "-100px", color: "#777", fontFamily: "Roboto", padding:"50px", lineHeight: "1.2" }}
          titleStyle={{fontWeight:"500"}}
          onConfirm={() => this.routeToAuth()}
          onCancel={this.hideAlert}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          confirmBtnText="Signup / Login"
        >
          <h2 style={{fontWeight: '500'}}>OOH MY PAWS</h2>
          <h4 style={{color:"#333333"}}>{`You need to login/sign up in order to ${str}`}</h4>
        </SweetAlert>
      )
    });
  }
  hideAlert = () =>  {
    this.setState({
      alert: null
    });
  }

  setFollow = () => {
    if(!localStorage.getItem('token') && !localStorage.getItem('user_id')) {
      this.warningAlert('follow this shelter');
    } else {
      console.log("i can follow/unfollow this shelter now")
      this.hideAlert();
      if (this.state.shelterFollow){
         this.unfollowShelter()
      } else {
         this.followShelter()
      }
    }
  }

  followShelter = () => {

    // const userId = localStorage.getItem('user_id')
    const follow = {
      shelter_id: this.props.match.params.id,
      user_id : localStorage.getItem('user_id')
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${this.props.match.params.id}/follows`, follow)
      .then(res => { 
          this.setState({
            shelterFollow: true,
          })
          console.log("Successfully follow", res)
      })
      .catch(err => { 
        console.log(`Shelter Error: ${err}`)
      })
  }

  unfollowShelter = () => {
    const userId = localStorage.getItem('user_id')
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${this.props.match.params.id}/${userId}/follows`)
      .then(res => { 
          this.setState({
            shelterFollow: false,
          })
          console.log("Successfully unfollow", res)
      })
      .catch(err => { 
        console.log(`Shelter Error: ${err}`)
      })
  }


  render() {
    const { classes } = this.props;
    const { shelter } = this.state;
    const { id } = this.props.match.params
    
    return (
      <>
      <div className={classes.wrapper} >
      <div className={classes.header}
      style={{ backgroundImage: "linear-gradient(#00000040, #00000005),url(" + this.getBgImage() + ")" }}>

        <GridContainer className={classes.contentHeader} style={{maxWidth: "1200px", margin: "0 auto", padding: "150px 0", width:"80%"}}>
          <GridItem xs={10} sm={10} md={7}>
            <h1 className={classes.title}>{shelter.shelter}</h1>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}></GridItem>
          <GridItem xs={12} sm={12} md={8}>
          {this.state.alert} 
          <Button className={classes.topButtons} onClick = {this.setFollow}>
          {this.state.shelterFollow? "Unfollow" : "Follow"}
          </Button>

          {this.state.hasStripe? <StripeDonation shelter={shelter} id={id} /> : null}
          </GridItem>
          <GridItem xs={12} sm={12} md={4}></GridItem>
        </GridContainer>
        </div>
        <GridContainer className={classes.shelterCard} style={{maxWidth: "1200px", width: "80%"}}>
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={houseIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.street_address}<br></br>{shelter.city}, {shelter.state} {shelter.zipcode}</h6> </GridItem>
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={mailIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.email}</h6></GridItem>  
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={phoneIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.phone}</h6></GridItem>  
        <GridItem xs={12} sm={6} md={6} style={{ minHeight: '40px'}}><img src={serviceIcon} className={classes.imageIcon}></img><h6 className={classes.cardType}>{shelter.name}</h6></GridItem>   
      </GridContainer>
         <div className={classes.picturesStyle}>
        <GridContainer xs={10} style={{margin:"50px auto 0", maxWidth:"1200px", width:"80%"}}>
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