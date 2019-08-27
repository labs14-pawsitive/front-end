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


class UserDashboard extends React.Component {
  state = {
    months: getFullMonths(),
    animalFollows: '',
    applicationCount: '',
    monthlyDonation: [],
    recentApplication: [],
    shelterFollows: '',
    totalDonation: '',
    userVerified : ""
  };


  
  // componentWillMount() {
  //   //verifying shelter before proceeding
  //   axiosWithAuth()
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/shelter/${localStorage.getItem('shelter_id')}`)
  //     .then( result => {
  //       this.setState({
  //         shelterVerified: true
  //       })
  //       console.log(result)
  //     })
  //     .catch( error => {

  //       console.log(error)
  //       this.props.history.push('/')
  //     })
  // }


  // async componentDidMount() {
  //   await axios
  //   //await axiosWithAuth()
  //   //.get(`${process.env.REACT_APP_BACKEND_URL}/api/dashboard/${localStorage.getItem('shelter_id')}`)
  //   .get(`${process.env.REACT_APP_BACKEND_URL}/api/dashboard/${localStorage.getItem('shelter_id')}`)
  //   .then(results => {
  //     if (results){
  //     this.setState({
  //       animal_3 : results.data.animal_3,
  //       animal_count : results.data.animal_count,
  //       application_30 : results.data.application_30,
  //       donation_30 : results.data.donation_30,
  //       follower_count : results.data.follower_count,
  //       monthly_application : results.data.monthly_application,
  //       monthly_donation : results.data.monthly_donation,
  //       recent_application : results.data.recent_application,
  //       shelter_info : results.data.shelter_info,
  //       donationRawSeries : results.data.monthly_donation,
  //       applicationRawSeries : results.data.monthly_application
  //     })
  //   }

  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  //   console.log(this.state)
  // }


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getApplicationRows = () => {
      let result = []
       this.state.recentApplication.map((app, key) => {
         result.push([`${app.id}`,  `${app.animal_name}`,  `${app.shelter}`, `${app.application_status}`, `${app.month}/${app.day}/${app.year}`])
      })
      return result;
    }

  render() {
    const { classes } = this.props;
    
    let applicationRows = this.getApplicationRows();
    
    let donationChartData = {};
    const donationSeries = this.state.monthlyDonation;
    
    if (donationSeries.length > 0 ){
      const monthlyDonationSeries = getDataSeries(donationSeries);
      donationChartData = { labels : this.state.months, series : [monthlyDonationSeries]}
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
    
    if(this.state.userVerified !== true) return <div>Verifying User</div>

    return (
      
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card style={customStyle.cardHeight}>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Pets />
                </CardIcon>
                <p className={classes.cardCategory}>I'm Following</p>
                  {this.state.animalFollows.length > 0 
                  ? 
                    <h3 className={classes.cardTitle}>{this.state.animalFollows}{' '}{this.state.animalFollows > 1 ? "Animals" : "Animal"}</h3>
                  :
                    <h3 className={classes.cardTitle}>0 Animal</h3>}
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                 <AccessTime />
                    Just Updated
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
                <p className={classes.cardCategory}>Total Donations</p>
                    <h3 className={classes.cardTitle}>${this.state.totalDonation}</h3>  
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                <Money />
                  Total Donations Made
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
                <p className={classes.cardCategory}>Total Applications</p>
                <h3 className={classes.cardTitle}>{this.state.applicationCount}{' '}{this.state.applicationCount > 1 ? "Applications" : "Application"}</h3> }
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                <LibraryBooks />
                Total Applications I've Filled Out
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
                <p className={classes.cardCategory}>I'm Following</p>
                <h3 className={classes.cardTitle}>{this.state.shelterFollows}{' '}{this.state.shelterFollows > 1 ? "Shelters" : "Shelter"} </h3>
              </CardHeader>
              <CardFooter stats style={customStyle.bottomFooter}>
                <div className={classes.stats}>
                <AccessTime />
                  Just updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>

        <GridContainer>
           
          <GridItem xs={12} lg={5}>
            <Card chart>
              <CardHeader color="info" className={classes.cardHeaderHover}>
                <ChartistGraph
                  className="ct-chart-white-colors"
                  data={donationChartData}
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
                <h4 className={classes.cardTitle}>My Monthly Donations</h4>
                <p className={classes.cardCategory}>
             
                  A snapshot of my aggregated monthly donation for the past 12 months
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Updated within the last 24 hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} lg={7}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LibraryBooks />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>My Recent Applications</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "App. ID",
                  "Animal Name",
                  "Shelter",
                  "Status",
                  "Date"
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
      </div>
    );
  }
}

UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(shelterDashboardStyle)(UserDashboard);
