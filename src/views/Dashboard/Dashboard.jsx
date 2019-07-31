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
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import axios from 'axios';

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
import Pets from "@material-ui/icons/Pets";
import Money from "@material-ui/icons/Money";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Face from "@material-ui/icons/Face";

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

import {getFullMonths} from "views/Dashboard/DashboardHelper.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/shelterDashboardCharts.jsx";

import shelterDashboardStyle from "assets/jss/material-dashboard-pro-react/views/shelterDashboardStyle";

import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";

class Dashboard extends React.Component {
  state = {
    //value: 0,
    months: getFullMonths(),
    //series: []
    animal_3 : [],
    animal_count : [],
    application_30 : [],
    donation_30 : [],
    follower_count : [],
    monthly_application : [],
    monthly_donation : [],
    recent_application : [],
    shelter_info : []

  };

  async componentDidMount() {
    //const months = getFullMonths();
    await axios
    .get(`http://localhost:8000/api/dashboard/3`)
    .then(results => {
      this.setState({
        animal_3 : results.data.animal_3,
        animal_count : results.data.animal_count,
        application_30 : results.data.application_30,
        donation_30 : results.data.donation_30,
        follower_count : results.data.follower_count,
        monthly_application : results.data.monthly_application,
        monthly_donation : results.data.monthly_donation,
        recent_application : results.data.recent_application,
        shelter_info : results.data.shelter_info
      })
    })
    .catch(error => {
      console.log(error)
    })
    console.log(this.state)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    const donationChartData = { labels : this.state.months, series : this.state.series }
    const customStyle = {
      imgHover : {
        maxHeight: "250px",
        overflow: "hidden"
      }
    }
    
    if(!this.state.donation_30[0]) return <div>Still loading data</div>

    return (
      
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Pets />
                </CardIcon>
                <p className={classes.cardCategory}>Current Animals</p>
                
                  {this.state.animal_count.map((count, key) => (
                    <h3 className={classes.cardTitle}>{count.count}{' '}{count.species}{count.count > 1 ? "s" : ""}</h3>
                  ))}
                
                
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                 <Pets />
                  
                    Current animals available for adoptions
                 
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                 <Money />
                </CardIcon>
                <p className={classes.cardCategory}>Recent Donations</p>
                <h3 className={classes.cardTitle}>${this.state.donation_30[0].total}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Total donations from the past 30 days
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <LibraryBooks />
                </CardIcon>
                <p className={classes.cardCategory}>Recent Applications</p>
                <h3 className={classes.cardTitle}>{this.state.application_30[0].count}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Total application from the past 30 days
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Face />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>{this.state.follower_count[0].count}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Total Pawsnfind members who are following you
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        {/* 
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="success" icon>
                <CardIcon color="success">
                  <Language />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Global Sales by Top Locations
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="space-between">
                  <GridItem xs={12} sm={12} md={5}>
                    <Table
                      tableData={[
                        [
                          <img src={us_flag} alt="us_flag" key={"flag"} />,
                          "USA",
                          "2.920",
                          "53.23%"
                        ],
                        [
                          <img src={de_flag} alt="us_flag" key={"flag"} />,
                          "Germany",
                          "1.300",
                          "20.43%"
                        ],
                        [
                          <img src={au_flag} alt="us_flag" key={"flag"} />,
                          "Australia",
                          "760",
                          "10.35%"
                        ],
                        [
                          <img src={gb_flag} alt="us_flag" key={"flag"} />,
                          "United Kingdom",
                          "690",
                          "7.87%"
                        ],
                        [
                          <img src={ro_flag} alt="us_flag" key={"flag"} />,
                          "Romania",
                          "600",
                          "5.94%"
                        ],
                        [
                          <img src={br_flag} alt="us_flag" key={"flag"} />,
                          "Brasil",
                          "550",
                          "4.34%"
                        ]
                      ]}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent"
                      zoomOnScroll={false}
                      containerStyle={{
                        width: "100%",
                        height: "280px"
                      }}
                      containerClassName="map"
                      regionStyle={{
                        initial: {
                          fill: "#e4e4e4",
                          "fill-opacity": 0.9,
                          stroke: "none",
                          "stroke-width": 0,
                          "stroke-opacity": 0
                        }
                      }}
                      series={{
                        regions: [
                          {
                            values: mapData,
                            scale: ["#AAAAAA", "#444444"],
                            normalizeFunction: "polynomial"
                          }
                        ]
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        */}
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="info" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={donationChartData}
                  //type="Line"
                  type="Bar"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Monthly Donations</h4>
                <p className={classes.cardCategory}>
                  {/* <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  */} 
                  A snapshot of your aggregated monthly donation for the past 12 months
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="warning" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart className={classes.cardHover}>
              <CardHeader color="danger" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="Refresh"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button simple color="info" justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Change Date"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <h3>Animal Spotlights</h3>
        <br />
        <GridContainer>
          {this.state.animal_3.map((animal, key) => (
            <GridItem xs={12} sm={12} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover} style={customStyle.imgHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={animal.img_url} alt={animal.name} />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    {animal.name}
                  </a>
                </h4>
               {/*
                 <p className={classes.cardProductDesciprion}>
                  The place is close to Barceloneta Beach and bus stop just 2
                  min by walk and near to {'"'}Naviglio{'"'} where you can enjoy
                  the main night life in Barcelona.
                </p>
                */}
              </CardBody>
              {/*
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$899/night</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Barcelona, Spain
                </div>
              </CardFooter>
              */}
            </Card>
          </GridItem>
          ))}
          



          {/* 
          <GridItem xs={12} sm={12} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={priceImage2} alt="..." />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Office Studio
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                  The place is close to Metro Station and bus stop just 2 min by
                  walk and near to {'"'}Naviglio{'"'} where you can enjoy the
                  night life in London, UK.
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$1.119/night</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> London, UK
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card product className={classes.cardHover}>
              <CardHeader image className={classes.cardHeaderHover}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={priceImage3} alt="..." />
                </a>
              </CardHeader>
              <CardBody>
                <div className={classes.cardHoverUnder}>
                  <Tooltip
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="success" simple justIcon>
                      <Refresh className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="danger" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </div>
                <h4 className={classes.cardProductTitle}>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Beautiful Castle
                  </a>
                </h4>
                <p className={classes.cardProductDesciprion}>
                  The place is close to Metro Station and bus stop just 2 min by
                  walk and near to {'"'}Naviglio{'"'} where you can enjoy the
                  main night life in Milan.
                </p>
              </CardBody>
              <CardFooter product>
                <div className={classes.price}>
                  <h4>$459/night</h4>
                </div>
                <div className={`${classes.stats} ${classes.productStats}`}>
                  <Place /> Milan, Italy
                </div>
              </CardFooter>
            </Card>
          </GridItem>*/}
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(shelterDashboardStyle)(Dashboard);
