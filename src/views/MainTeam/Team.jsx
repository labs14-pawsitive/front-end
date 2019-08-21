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
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
import Home from "@material-ui/icons/Home";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormatQuote from "@material-ui/icons/FormatQuote";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Timeline from "components/Timeline/Timeline.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { widgetStories, bugs, website, server } from "variables/general.jsx";

import image from "assets/img/faces/card-profile1-square.jpg";
import bg from "assets/img/bg-team.jpg";

import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";


import {
  cardTitle,
  roseColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};

class TeamPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  
  render() {
    const { classes } = this.props;
    
    const customStyle = {
      alignment: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px"
      },
      mainContainer: {
        zIndex: 3,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
        //paddingTop: "150px",
        paddingBottom: "150px",
        background: "#e7e7e7",
        margin:0
      },
       avatarStyle: {
          marginTop: "-75px",
          maxWidth: "150px",
          maxHeight: "150px"
      }
    }
    return (
      <div>
        <GridContainer style={customStyle.mainContainer}>
          <GridItem xs={12} style={{boxShadow: "0 0 30px #00000050", height:"500px", backgroundImage:"linear-gradient(#00000080, #00000015),url(" + bg + ")", backgroundSize:"cover", backgroundPosition: "center center"}}>

          </GridItem>
          <GridItem xs={10} sm={10} md={10}>             
          <h1>About Our Team</h1>

            <GridContainer style={customStyle.alignment}>
              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial>
                <CardAvatar testimonial testimonialFooter style={customStyle.avatarStyle}>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src="https://ca.slack-edge.com/T4JUEB3ME-UFH4T28HX-64713d6bec86-512" alt="..." />
                      </a>
                    </CardAvatar>
                  {/*<div className={classes.testimonialIcon}>
                      <FormatQuote />
                  </div>*/}
                  <CardBody style={{marginTop: "60px"}}>
                    <h5 className={classes.cardTestimonialDescription}>
                      Highly motivated full stack developer who is awesome at making things happen! 
                      Attention to detail, just the one your company is looking for.
                    </h5>
                  </CardBody>
                  <CardFooter testimonial>
                    <h4 className={classes.cardTitle}>Aruna Benjamin</h4>
                    <h6 className={classes.cardCategory}>@TEAMMEMBER!</h6>
                    
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial>
                  <div className={classes.testimonialIcon}>
                    <FormatQuote />
                  </div>
                  <CardBody>
                    <h5 className={classes.cardTestimonialDescription}>
                    Highly motivated full stack developer who is awesome at making things happen! Attention to detail, just the one your company is looking for.
                    </h5>
                  </CardBody>
                  <CardFooter testimonial>
                    <h4 className={classes.cardTitle}>Sarah Lee</h4>
                    <h6 className={classes.cardCategory}>@TEAMMEMBER2</h6>
                    <CardAvatar testimonial testimonialFooter>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={image} alt="..." />
                      </a>
                    </CardAvatar>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial>
                  <div className={classes.testimonialIcon}>
                    <FormatQuote />
                  </div>
                  <CardBody>
                    <h5 className={classes.cardTestimonialDescription}>
                      Highly motivated full stack developer who is awesome at making things happen! 
                      Attention to detail, just the one your company is looking for.
                    </h5>
                  </CardBody>
                  <CardFooter testimonial>
                    <h4 className={classes.cardTitle}>Ming Liu</h4>
                    <h6 className={classes.cardCategory}>@TEAMMEMBER!</h6>
                    <CardAvatar testimonial testimonialFooter>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={image} alt="..." />
                      </a>
                    </CardAvatar>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial>
                  <div className={classes.testimonialIcon}>
                    <FormatQuote />
                  </div>
                  <CardBody>
                    <h5 className={classes.cardTestimonialDescription}>
                    Highly motivated full stack developer who is awesome at making things happen! Attention to detail, just the one your company is looking for.
                    </h5>
                  </CardBody>
                  <CardFooter testimonial>
                    <h4 className={classes.cardTitle}>Lenna Mau</h4>
                    <h6 className={classes.cardCategory}>@TEAMMEMBER2</h6>
                    <CardAvatar testimonial testimonialFooter>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={image} alt="..." />
                      </a>
                    </CardAvatar>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial>
                  <div className={classes.testimonialIcon}>
                    <FormatQuote />
                  </div>
                  <CardBody>
                    <h5 className={classes.cardTestimonialDescription}>
                      Highly motivated full stack developer who is awesome at making things happen! 
                      Attention to detail, just the one your company is looking for.
                    </h5>
                  </CardBody>
                  <CardFooter testimonial>
                    <h4 className={classes.cardTitle}>James Pak</h4>
                    <h6 className={classes.cardCategory}>@TEAMMEMBER!</h6>
                    <CardAvatar testimonial testimonialFooter>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={image} alt="..." />
                      </a>
                    </CardAvatar>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial>
                  <div className={classes.testimonialIcon}>
                    <FormatQuote />
                  </div>
                  <CardBody>
                    <h5 className={classes.cardTestimonialDescription}>
                    Highly motivated full stack developer who is awesome at making things happen! Attention to detail, just the one your company is looking for.
                    </h5>
                  </CardBody>
                  <CardFooter testimonial>
                    <h4 className={classes.cardTitle}>Hung Pham</h4>
                    <h6 className={classes.cardCategory}>@TEAMMEMBER2</h6>
                    <CardAvatar testimonial testimonialFooter>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={image} alt="..." />
                      </a>
                    </CardAvatar>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial>
                  <div className={classes.testimonialIcon}>
                    <FormatQuote />
                  </div>
                  <CardBody>
                    <h5 className={classes.cardTestimonialDescription}>
                      Highly motivated full stack developer who is awesome at making things happen! 
                      Attention to detail, just the one your company is looking for.
                    </h5>
                  </CardBody>
                  <CardFooter testimonial>
                    <h4 className={classes.cardTitle}>Christopher Riffle</h4>
                    <h6 className={classes.cardCategory}>@TEAMMEMBER!</h6>
                    <CardAvatar testimonial testimonialFooter>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img src={image} alt="..." />
                      </a>
                    </CardAvatar>
                  </CardFooter>
                </Card>
              </GridItem>

              



            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

TeamPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TeamPage);
