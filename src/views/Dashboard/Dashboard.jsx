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
import { NavLink } from 'react-router-dom'

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
import Search from "@material-ui/icons/Search";


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

import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";

import {getFullMonths, getDataSeries } from "views/Dashboard/DashboardHelper.jsx";

import {
  donationChart,
  applicationChart,
  setDonationHigh,
  setApplicationHigh,
} from "variables/shelterDashboardCharts.jsx";

import shelterDashboardStyle from "assets/jss/material-dashboard-pro-react/views/shelterDashboardStyle";


//let monthlyDonation = [];
//let monthlyApplication = [];

class Dashboard extends React.Component {
  state = {
    months: getFullMonths(),
    animal_3 : [],
    animal_count : [],
    application_30 : [],
    donation_30 : [],
    follower_count : [],
    monthly_application : [],
    monthly_donation : [],
    recent_application : [],
    shelter_info : [],
    donationRawSeries : [],
    applicationRawSeries : []

  };

  

  async componentDidMount() {
    await axios
    .get(`https://staging1-pawsnfind.herokuapp.com/api/dashboard/${localStorage.getItem('shelter_id')}`)
    .then(results => {
      if (results){
      this.setState({
        animal_3 : results.data.animal_3,
        animal_count : results.data.animal_count,
        application_30 : results.data.application_30,
        donation_30 : results.data.donation_30,
        follower_count : results.data.follower_count,
        monthly_application : results.data.monthly_application,
        monthly_donation : results.data.monthly_donation,
        recent_application : results.data.recent_application,
        shelter_info : results.data.shelter_info,
        donationRawSeries : results.data.monthly_donation,
        applicationRawSeries : results.data.monthly_application
      })
    }

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

  getApplicationRows = () => {
      let result = []
       this.state.recent_application.map((app, key) => {
         result.push([`${app.id}`,  `${app.animal_name}`, `${app.application_status}`, `${app.applicant_username}`, `${app.month}/${app.day}/${app.year}`, this.getApplication(app.id)])
      })
      return result;
    }
  getApplication = id => {
    return (
      <NavLink to={`/admin/application/${id}`}>
      <Button color="success">
          <Search />
        </Button>
      </NavLink>
    )
  }

  render() {
    const { classes } = this.props;
    
    let applicationRows = this.getApplicationRows();
    
    
    let donationChartData = {};
    let applicationChartData = {};
    const donationSeries = this.state.donationRawSeries;
    const applicationSeries = this.state.applicationRawSeries;
    
    if (donationSeries.length > 0 ){
      const monthlyDonationSeries = getDataSeries(donationSeries);
      donationChartData = { labels : this.state.months, series : [monthlyDonationSeries]}
    }

    if (applicationSeries.length > 0 ){
      const monthlyApplicationSeries = getDataSeries(applicationSeries)
      applicationChartData = { labels : this.state.months, series : [monthlyApplicationSeries]}
    } 
  

    const customStyle = {
      imgHover : {
        maxHeight: "250px",
        overflow: "hidden"
      },
      cardHeight : {
        minHeight: "180px"
      }, 
     bottomFooter : {
        position: "absolute",
        bottom: '0',
      },
      tightLineHeight : {
        lineHeight : "1.2em"
      }

    }
    
    if(!this.state.shelter_info[0]) return <div>Still loading data</div>

    return (
      
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card style={customStyle.cardHeight}>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Pets />
                </CardIcon>
                <p className={classes.cardCategory}>Current Animals</p>
                  {this.state.animal_count.length > 0 
                  ? 
                  this.state.animal_count.map((count, key) => (
                    <h3 className={classes.cardTitle} style={customStyle.tightLineHeight}>{count.count}{' '}{count.species}{count.count > 1 ? "s" : ""}</h3>
                  ))
                  :
                    <h3 className={classes.cardTitle}>0 Animals</h3>}
                
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                 <Pets />
                  
                    Animals available for adoptions
                 
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card style={customStyle.cardHeight}>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                 <Money />
                </CardIcon>
                <p className={classes.cardCategory}>Recent Donations</p>
                {this.state.donation_30.length > 0 ? <h3 className={classes.cardTitle}>${this.state.donation_30[0].total}</h3> :<h3 className={classes.cardTitle}>$0</h3>  }
                
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                <Money />
                  Total donations from the past 30 days
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card style={customStyle.cardHeight}>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <LibraryBooks />
                </CardIcon>
                <p className={classes.cardCategory}>Recent Applications</p>
                {this.state.application_30.length > 0 ? <h3 className={classes.cardTitle}>{this.state.application_30[0].count}</h3> : <h3 className={classes.cardTitle}>0</h3> }
                
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                <LibraryBooks />
                  Total application from the past 30 days
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card style={customStyle.cardHeight}>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Face />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>{this.state.follower_count[0].count}</h3>
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                <Face />
                  Total Pawsnfind members who are following you
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        

        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={donationChartData}
                  //type="Line"
                  type="Bar"
                  options={donationChart.options}
                  listener={donationChart.animation}
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
             
                  A snapshot of your aggregated monthly donation for the past 12 months
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Updated within the last 24 hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="danger" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={applicationChartData}
                  type="Line"
                  options={applicationChart.options}
                  listener={applicationChart.animation}
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
                <h4 className={classes.cardTitle}>Monthly Applications</h4>
                <p className={classes.cardCategory}>
                  A snapshot of your aggregated monthly application for the past 12 months
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Updated within the last 24 hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>



        <GridContainer>
          <GridItem xs={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LibraryBooks />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Recent Applications</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Application ID",
                  "Animal Name",
                  "Application Status",
                  "Applicant",
                  "Submission Date",
                  "View Application"
                ]}
                tableData={applicationRows}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>





{/*
        <GridContainer>
          <GridItem xs={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LibraryBooks />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Recent Applications</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Application ID",
                  "Animal Name",
                  "Application Status",
                  "Applicant",
                  "Submission Date",
                  "View Application"
                ]}
                tableData={[
                  applicationRows[0],
                  applicationRows[1],
                  applicationRows[2],
                  applicationRows[3],
                  applicationRows[4]
                ]}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>
          </Card>
        </GridItem>
        </GridContainer>
 */}


        <h3>Animal Spotlights</h3>
        <br />
        <GridContainer>
          {this.state.animal_3.map((animal, key) => (
            <GridItem xs={12} sm={12} md={4}>
              <NavLink to={`/admin/animal/${animal.id}`}>
            <Card product>
              <CardHeader image className={classes.cardHeaderHover} style={customStyle.imgHover}>
               
                  <img src={animal.img_url} alt={animal.name} />
               
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
                  <NavLink to={`/admin/animal/${animal.id}`}>
                    {animal.name}
                  </NavLink>
                </h4>
              
              </CardBody>
             
            </Card>
            </NavLink>
          </GridItem>
          ))}
          

        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(shelterDashboardStyle)(Dashboard);
