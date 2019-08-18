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
import axios from 'axios';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HomeImg from "assets/img/home_img.png";
import House from "assets/img/007-house.png";


import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";

import AnimalCard from "components/AnimalCard/AnimalCard.jsx"

class MainPage extends React.Component {


    render() {
    const { classes } = this.props;
    
    const animals = [
      {id: 23, name: "Lucy", img_url: "https://s.hdnux.com/photos/01/00/06/67/16805365/3/920x920.jpg", is_male: false, breed: "Mixed Breed Dog", age: "Adult" },
      {id: 13, name: "Casey", img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgEmS14rzA1p8r-fzrm2BfiZivVFAMuBjIa9CDBkHiyqJpyLST", is_male: false, breed: "Mixed Breed Dog", age: "Adult" },
      {id: 25, name: "Chance", img_url: "https://s3.amazonaws.com/filestore.rescuegroups.org/6685/pictures/animals/14523/14523934/66603731_500x500.jpg", is_male: true, breed: "Mixed Breed Dog", age: "Adult" },
      {id: 2, name: "Cutie Pie", img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyGMzMi2ZQdBIHQkdLbIrolWVePbaFhN-zMBbwhqKag26SVN3lDw", is_male: false, breed: "Mixed Breed Dog", age: "Adult" },
      {id: 14, name: "Lucky", img_url: "https://live-cdn.shelterluv.com/sites/default/files/animal_pics/3451/2019/04/10/08/20190410085205.png", is_male: true, breed: "Mixed Breed Dog", age: "Adult" },
      {id: 4, name: "Tina", img_url: "https://epi.azureedge.net/website-images/images/a-year-in-the-life-dog/dog_7_600x400.jpg?sfvrsn=edc6d67b_2", is_male: false, breed: "Mixed Breed Dog", age: "Adult" },

    ]

    return (
      <GridContainer style={{background: "linear-gradient(180deg, #349fad, #268592)", paddingTop: "100px", margin:'0', width:"100%"}}>
        <GridContainer className={classes.bodyStyle} style={{margin: "0"}}>
          <GridItem xs={10} sm={10} md={9} style={{ zIndex: "6", minHeight: "600px", backgroundImage: "url(" + HomeImg + ")", backgroundPosition: "right", backgroundRepeat: "no-repeat", backgroundSize: "auto" }}>
            <GridItem xs={12} sm={8}>
              <div style={{color:"white", textShadow: "5px 5px #00000030"}}>ADOPT YOUR PET<sup>*</sup></div>
            </GridItem>
          </GridItem> 
          <GridItem xs={10} sm={10} md={10} style={{minHeight: "200px", marginTop: "-120px", zIndex:"5", backgroundColor: "#fcfcfc", borderRadius: "5px", boxShadow: "0 0 5px #33333330"}} >
            <GridItem sx={12}>
              Just Testing
            </GridItem>
          </GridItem>
          <GridContainer style={{margin: "-100px 0 0", background: "#e7e7e7", zIndex: "4", minHeight:"300px"}}>
            <GridContainer xs={10} style={{margin:"120px auto 0"}}>
              {animals.map(animal => <AnimalCard animal={animal}/>)}  
            </GridContainer> 
          </GridContainer>  
        </GridContainer>
    </GridContainer>
    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mainPageStyle)(MainPage);