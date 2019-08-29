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
import { Link } from "react-router-dom";
import axios from 'axios';
import {axiosWithAuth} from 'axiosWithAuth';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
import Language from "@material-ui/icons/Language";
import Favorite from "@material-ui/icons/Favorite";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";


import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

import DogBg from "assets/img/dog_tempPlacement.png";
import CatBg from "assets/img/cat_tempPlacement.png";

class UserAnimalFollows extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      animals : [],
      userVerified: ""
    };
  }


  componentWillMount() {
    //verifying user before proceeding
    axiosWithAuth()
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/user/${localStorage.getItem('user_id')}`)
      .then( result => {
        this.setState({
          userVerified : true
        })
        console.log(result)
      })
      .catch( error => {
        console.log(error)
        this.props.history.push('/')
      })
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${localStorage.getItem('user_id')}/follows/animals`)
      .then( results => {
        this.setState({
          animals : results.data
        })        
        console.log(this.state.animals)

      })
      .catch (error => {
        console.log(error)
      })
  }

  unfollowAnimal = animalID => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/${localStorage.getItem('user_id')}/unfollows/animal/${animalID}`)
      .then(results => {
        this.setState({
          animals : results.data
        })
        console.log(this.state.animals)
      })
      .catch (error => {
        console.log(error)
      })
  }

  render() {
    const { classes } = this.props;

    if(this.state.userVerified !== true) return <div>Verifying User</div>

    return (
      <div>

        <h3>Animals I'm Following</h3>
        <br />
        <br />
        <GridContainer>
          {this.state.animals.map(animal => (
             <GridItem xs={12} sm={6} md={4} lg={3} key={animal.animal_id}>
            <Card product className={classes.cardHover}>
             <Link to={`/animal/${animal.animal_id}`}>
              <CardHeader image className={classes.cardHeaderHover} style={{backgroundImage: animal.species_id === 1 ? `url(` + DogBg +  `)` : `url(` + CatBg + `)`, backgroundSize: "cover", backgroundPosition: "center center", height:"250px", boxShadow: "0 0 5px #00000020"}}>
                  <div style={{borderRadius: "6px", backgroundImage: `url(${animal.img_url})`, backgroundSize: "cover", backgroundPosition: "center center", width: "100%", height: "100%"}}></div>
              </CardHeader>
              </Link>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title={`Click Heart to Unfollow ${animal.name}`}
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon onClick={()=> this.unfollowAnimal(animal.animal_id)}>
                      <Favorite className={classes.underChartIcons} style={{color: '#e0286a'}}/>
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                 <Link to={`/animal/${animal.animal_id}`}>
                    {animal.name}
                  </Link>
                </h4>
                <p className={classes.cardProductDesciprion}>
                  {animal.animal_status}
                </p>
                <p className={classes.cardProductDesciprion}>
                  {animal.is_male? "Male" : "Female"} {" "} {animal.age} {" "} {animal.breed}
                </p>
              </CardBody>
              <CardFooter product>
                <Link to={`/shelter/${animal.shelter_id}`}>
                  <div className={`${classes.stats} ${classes.productStats}`}>
                    <Place /> 
                    {animal.shelter}
                  </div>
                </Link>
              </CardFooter>
            </Card>
          </GridItem>


          ))}

        </GridContainer>
      </div>
    );
  }
}

UserAnimalFollows.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(UserAnimalFollows);