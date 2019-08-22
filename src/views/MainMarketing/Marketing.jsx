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

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from '@material-ui/core/Hidden';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import Button from "components/CustomButtons/Button.jsx";
import headerbg from "assets/img/pawsnfind_marketing_BG.png";
import div_1pic from "assets/img/marketing_img.png";
import div_2pic from "assets/img/marketing_img_dashboard_iso.png";
import div_3pic from "assets/img/marketing_img_animalCards_iso.png";
import div_4pic from "assets/img/marketing_img_application_iso.png";
import applicationIcon from "assets/img/appliation-rose.png";
import breedIcon from "assets/img/breed-rose.png";
import donationIcon from  "assets/img/donation-rose.png";

import marketingPageStyle from "assets/jss/material-dashboard-pro-react/views/marketingPageStyle.jsx";

class MarketingPage extends React.Component {
  render() {
    const { classes } = this.props;
  
    const getBgImage = () => {
      return headerbg;
    };
    
    return (
      <div className={classes.container}>
      <div className={classes.div_1}
      style={{ backgroundImage: "url(" + getBgImage() + ")" }}>
        <GridContainer style={{width: "80%", margin:"0 auto"}}>
        <GridItem xs={12} sm={12} md={8} >
          <h1 className={classes.headerTitle}>Promote and Manage Shelter</h1>
          <h4 className={classes.description} style={{color: "white", textShadow: "1px 1px 1px black"}}>All from One App</h4>
          <Link to={"/shelter-signup"}><Button className={classes.signupButton}>Sign Up</Button></Link>
        </GridItem>
        </GridContainer>
        <Hidden smDown>
        <div className={classes.div1img}>
        <img src= {div_1pic} className={classes.div_1_pic}></img>
      </div>
      </Hidden> 
      </div>
      <div className={classes.iconsBar}>
      <GridContainer style={{ display: "flex",justifyContent: "center", alignItems: "center"}}>
      <GridItem xs={12} sm={12} md={4} >
        <img className={classes.icon} src= {breedIcon}></img>
        <h1 className={classes.barType}>Promote & Manage Animals</h1>
      </GridItem>
      <GridItem xs={12} sm={12} md={4} >
      <img className={classes.icon} src= {applicationIcon}></img>
        <h1 className={classes.barType}>Accept & Manage Applications Online</h1>
      </GridItem>
      <GridItem xs={12} sm={12} md={4} >
      <img className={classes.icon} src= {donationIcon}></img>
        <h1 className={classes.barType}>Accept & Manage & Track Donations</h1>
      </GridItem>
      </GridContainer>
      </div>
      <div className={classes.div_2}>
      <GridContainer style={{width: "80%", margin:"0 auto"}} >
      <GridItem xs={12} sm={12} md={6} >
        <h1 className={classes.subTitle}>Shelter Management Snapshot</h1>
        <h4 className={classes.description} style={{color:"#9A9A9A"}}> Get all the important data from your shelter operation at one page.</h4>
        <h4 className={classes.description} style={{marginTop: "1.5rem"}}>From tracking your recent donations and applications to getting a visualized chart on how your fundraising efforts is going.</h4>
      </GridItem>
      </GridContainer>
      </div>
      <Hidden smDown>
        <div className={classes.div2img}>
        <img src= {div_2pic} className={classes.div_2_pic}></img>
      </div>
      </Hidden> 
    <div className={classes.div_3}>
    <GridContainer style={{width: "80%", margin:"0 auto"}}>
      <GridItem xs={12} sm={12} md={6} >
        <h1 className={classes.subTitle}>Promote Adoptable Animals</h1>
        <h4 className={classes.description} style={{color:"#9A9A9A"}}> Show your current adoptable animals to potential adopters who are looking for their new best friend!</h4>
        <h4 className={classes.description} style={{marginTop: "1.5rem"}}>Adding and updating information about your adorable animals will take less time. Allowing potential adopters to follow the animals and directly donate to your shelter cause.</h4>
      </GridItem>
    </GridContainer>
    </div>
    <Hidden smDown>
        <div className={classes.div3img}>
        <img src= {div_3pic} className={classes.div_3_pic}></img>
      </div>
      </Hidden> 
    <div className={classes.div_4}>
    <GridContainer style={{width: "80%", margin:"0 auto"}}>
      <GridItem xs={12} sm={12} md={6} >
        <h1 className={classes.subTitle}>Paperless Online Application</h1>
        <h4 className={classes.description} style={{color:"#9A9A9A"}}> Streamline your application process so that you will have more time looking for the right adopter!</h4>
        <h4 className={classes.description} style={{marginTop: "1.5rem"}}>Potential adopters can find your application form easily. You can manage incoming applications and make notes on them, making the application process painless.</h4>
      </GridItem>
    </GridContainer>
    </div>
    <Hidden smDown>
        <div className={classes.div4img}>
        <img src= {div_4pic} className={classes.div_4_pic}></img>
      </div>
      </Hidden> 
    </div>
  );
  }
}

MarketingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(marketingPageStyle)(MarketingPage);