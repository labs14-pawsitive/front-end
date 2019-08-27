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
    window.scrollTo(0, 0);
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingBottom: "150px",
        background: "#e7e7e7",
        margin: 0
      },
      avatarStyle: {
        marginTop: "-75px",
        maxWidth: "175px",
        maxHeight: "175px"
      }
    };
    return (
      <div>
        <GridContainer style={customStyle.mainContainer}>
          <GridItem
            xs={12}
            style={{
              boxShadow: "0 0 30px #00000050",
              height: "500px",
              backgroundImage:
                "linear-gradient(#00000080, #00000015),url(" + bg + ")",
              backgroundSize: "cover",
              backgroundPosition: "center center"
            }}
          ></GridItem>
          <GridItem xs={12} style={{maxWidth:"1280px"}}>
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "80px",
                marginTop: "50px"
              }}
            >
              Meet the Team
            </h1>

            <GridContainer style={customStyle.alignment}>
              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial style={{ marginBottom: "80px" }}>
                  <CardAvatar
                    testimonial
                    testimonialFooter
                    style={customStyle.avatarStyle}
                  >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        src="https://ca.slack-edge.com/T4JUEB3ME-UG1NB3NDT-5148b962dfda-512"
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                  <CardHeader style={{ paddingBottom: "0" }}>
                    <h3
                      className={classes.cardTitle}
                      style={{
                        fontWeight: "600",
                        marginTop: "67px",
                        marginBottom: "0px"
                      }}
                    >
                      Aruna Benjamin
                    </h3>
                  </CardHeader>

                  <CardBody style={{ padding: "0 14px .25rem 14px" }}>
                    <h5
                      style={{
                        fontWeight: "400",
                        color: "rgba(2, 2, 7, 0.87)"
                      }}
                    >
                      Full Stack Web Developer
                    </h5>
                  </CardBody>
                  <CardFooter testimonial style={{ margin: "0 15px 20px" }}>
                    <a href="https://www.linkedin.com">
                      <i
                        style={{ paddingRight: "15px" }}
                        className="fab fa-linkedin-in"
                      />
                    </a>
                    <a href="https://github.com/arunabenji29">
                      <i className="fab fa-github" />
                    </a>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial style={{ marginBottom: "80px" }}>
                  <CardAvatar
                    testimonial
                    testimonialFooter
                    style={customStyle.avatarStyle}
                  >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        src="https://ca.slack-edge.com/T4JUEB3ME-UGHTPEQ2W-9b962480891a-512"
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                  <CardHeader style={{ paddingBottom: "0" }}>
                    <h3
                      className={classes.cardTitle}
                      style={{
                        fontWeight: "600",
                        marginTop: "67px",
                        marginBottom: "0px"
                      }}
                    >
                      Sarah Lee
                    </h3>
                  </CardHeader>

                  <CardBody style={{ padding: "0 14px .25rem 14px" }}>
                    <h5
                      style={{
                        fontWeight: "400",
                        color: "rgba(2, 2, 7, 0.87)"
                      }}
                    >
                      Full Stack Web Developer
                    </h5>
                  </CardBody>
                  <CardFooter testimonial style={{ margin: "0 15px 20px" }}>
                    <a href="https://www.linkedin.com/in/sarah-lee671/">
                      <i
                        style={{ paddingRight: "15px" }}
                        className="fab fa-linkedin-in"
                      />
                    </a>
                    <a href="https://github.com/sarahlee671">
                      <i className="fab fa-github" />
                    </a>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial style={{ marginBottom: "80px" }}>
                  <CardAvatar
                    testimonial
                    testimonialFooter
                    style={customStyle.avatarStyle}
                  >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        src="https://ca.slack-edge.com/T4JUEB3ME-UFH4T28HX-64713d6bec86-512"
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                  <CardHeader style={{ paddingBottom: "0" }}>
                    <h3
                      className={classes.cardTitle}
                      style={{
                        fontWeight: "600",
                        marginTop: "67px",
                        marginBottom: "0px"
                      }}
                    >
                      Ming Liu
                    </h3>
                  </CardHeader>

                  <CardBody style={{ padding: "0 14px .25rem 14px" }}>
                    <h5
                      style={{
                        fontWeight: "400",
                        color: "rgba(2, 2, 7, 0.87)"
                      }}
                    >
                      Full Stack Web Developer
                    </h5>
                  </CardBody>
                  <CardFooter testimonial style={{ margin: "0 15px 20px" }}>
                    <a href="https://www.linkedin.com/in/mingliu68/">
                      <i
                        style={{ paddingRight: "15px" }}
                        className="fab fa-linkedin-in"
                      />
                    </a>
                    <a href="https://github.com/skysthelimit68">
                      <i className="fab fa-github" />
                    </a>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial style={{ marginBottom: "80px" }}>
                  <CardAvatar
                    testimonial
                    testimonialFooter
                    style={customStyle.avatarStyle}
                  >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        src="https://ca.slack-edge.com/T4JUEB3ME-UDN6HNCTT-3544f1e97076-512"
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                  <CardHeader style={{ paddingBottom: "0" }}>
                    <h3
                      className={classes.cardTitle}
                      style={{
                        fontWeight: "600",
                        marginTop: "67px",
                        marginBottom: "0px"
                      }}
                    >
                      Lenna Mau
                    </h3>
                  </CardHeader>

                  <CardBody style={{ padding: "0 14px .25rem 14px" }}>
                    <h5
                      style={{
                        fontWeight: "400",
                        color: "rgba(2, 2, 7, 0.87)"
                      }}
                    >
                      Full Stack Web Developer
                    </h5>
                  </CardBody>
                  <CardFooter testimonial style={{ margin: "0 15px 20px" }}>
                    <a href="https://www.linkedin.com/in/lenna-mau-243607b/">
                      <i
                        style={{ paddingRight: "15px" }}
                        className="fab fa-linkedin-in"
                      />
                    </a>
                    <a href="https://github.com/lennamau">
                      <i className="fab fa-github" />
                    </a>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial style={{ marginBottom: "80px" }}>
                  <CardAvatar
                    testimonial
                    testimonialFooter
                    style={customStyle.avatarStyle}
                  >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        src="https://ca.slack-edge.com/T4JUEB3ME-UGKD4B316-688d205d9cfb-512"
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                  <CardHeader style={{ paddingBottom: "0" }}>
                    <h3
                      className={classes.cardTitle}
                      style={{
                        fontWeight: "600",
                        marginTop: "67px",
                        marginBottom: "0px"
                      }}
                    >
                      James Pak
                    </h3>
                  </CardHeader>

                  <CardBody style={{ padding: "0 14px .25rem 14px" }}>
                    <h5
                      style={{
                        fontWeight: "400",
                        color: "rgba(2, 2, 7, 0.87)"
                      }}
                    >
                      Full Stack Web Developer
                    </h5>
                  </CardBody>
                  <CardFooter testimonial style={{ margin: "0 15px 20px" }}>
                    <a href="https://www.linkedin.com/in/jimpakdev/">
                      <i
                        style={{ paddingRight: "15px" }}
                        className="fab fa-linkedin-in"
                      />
                    </a>
                    <a href="https://github.com/jimpakdev">
                      <i className="fab fa-github" />
                    </a>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial style={{ marginBottom: "80px" }}>
                  <CardAvatar
                    testimonial
                    testimonialFooter
                    style={customStyle.avatarStyle}
                  >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        src="https://ca.slack-edge.com/T4JUEB3ME-UGNJ1JREG-92aeb1cdaaf6-512"
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                  <CardHeader style={{ paddingBottom: "0" }}>
                    <h3
                      className={classes.cardTitle}
                      style={{
                        fontWeight: "600",
                        marginTop: "67px",
                        marginBottom: "0px"
                      }}
                    >
                      Hung Pham
                    </h3>
                  </CardHeader>

                  <CardBody style={{ padding: "0 14px .25rem 14px" }}>
                    <h5
                      style={{
                        fontWeight: "400",
                        color: "rgba(2, 2, 7, 0.87)"
                      }}
                    >
                      Full Stack Web Developer
                    </h5>
                  </CardBody>
                  <CardFooter testimonial style={{ margin: "0 15px 20px" }}>
                    <a href="https://www.linkedin.com/in/hung-pham-86759455/">
                      <i
                        style={{ paddingRight: "15px" }}
                        className="fab fa-linkedin-in"
                      />
                    </a>
                    <a href="https://github.com/ghungpham">
                      <i className="fab fa-github" />
                    </a>
                  </CardFooter>
                </Card>
              </GridItem>

              <GridItem xs={11} sm={8} md={5} lg={4}>
                <Card testimonial style={{ marginBottom: "80px" }}>
                  <CardAvatar
                    testimonial
                    testimonialFooter
                    style={customStyle.avatarStyle}
                  >
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        src="https://ca.slack-edge.com/T4JUEB3ME-UFVUEC918-1fdf146ec13a-512"
                        alt="..."
                      />
                    </a>
                  </CardAvatar>
                  <CardHeader style={{ paddingBottom: "0" }}>
                    <h3
                      className={classes.cardTitle}
                      style={{
                        fontWeight: "600",
                        marginTop: "67px",
                        marginBottom: "0px"
                      }}
                    >
                      Christopher Riffle
                    </h3>
                  </CardHeader>

                  <CardBody style={{ padding: "0 14px .25rem 14px" }}>
                    <h5
                      style={{
                        fontWeight: "400",
                        color: "rgba(2, 2, 7, 0.87)"
                      }}
                    >
                      Full Stack Web Developer
                    </h5>
                  </CardBody>
                  <CardFooter testimonial style={{ margin: "0 15px 20px" }}>
                    <a href="https://www.linkedin.com/in/christopher-riffle-40b223186/">
                      <i
                        style={{ paddingRight: "15px" }}
                        className="fab fa-linkedin-in"
                      />
                    </a>
                    <a href="https://github.com/cmr629">
                      <i className="fab fa-github" />
                    </a>
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
