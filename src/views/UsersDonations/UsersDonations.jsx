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
import { connect } from "react-redux";
// react component for creating dynamic tables
import ReactTable from "react-table";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {axiosWithAuth} from 'axiosWithAuth';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Update from "@material-ui/icons/Update";

import Assignment from "@material-ui/icons/Assignment";
// import Dvr from "@material-ui/icons/Dvr";
import Search from "@material-ui/icons/Search";
import Favorite from "@material-ui/icons/Favorite";
// import Close from "@material-ui/icons/Close";
// import Warning from "@material-ui/icons/Warning";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardText from "components/Card/CardText.jsx";
import Table from "components/Table/Table.jsx";

// import Danger from "components/Typography/Danger.jsx";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";




const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  cardCategory: {
    color: "#333333",
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0"
  },
};

class UserDonations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: [],
      top_donations: [],
      count: '',
      total: '',
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
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/donations/user/${localStorage.getItem('user_id')}`)

    .then(results => {
        console.log(results)
        this.setState({
        donations : results.data.donations.map((donation, key) => {
        return {
          id: key,
          donationID: donation.id,
          amount: parseInt(donation.amount),
          shelter: donation.shelter,
          date: `${donation.month}/${donation.day}/${donation.year}`,
          //icon: <Favorite style={{color: '#e0286a'}}/>
          //empty: []
        };
      }),
        count: results.data.total_donations[0].count,
        total: results.data.total_donations[0].total,
        top_donations : results.data.top_donations
      })
      console.log("state" , this.state)
    })
    .catch(error => {
      console.log(error)
    })
  }


  getTopDonationRows = () => {
    let result = []
     this.state.top_donations.map((donation, key) => {
       result.push([`${key+1}`,  `${donation.shelter}`, `${donation.total}`, `${donation.number_of_donations}`])
    })
    return result;
  }

  render() {
    const { classes } = this.props;
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
      marginTop30: {
        marginTop: "30px"
      }
    };
    const card_category = {
      color: "#999",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      paddingTop: "10px",
      marginBottom: "0"
    }
    const card_title = {
      fontSize: "1.825em",
      lineHeight: "1.4em",
      color: "#3C4858",
      minHeight: "auto",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      textDecoration: "none",
      textAlign: "right"
    }

    let topDonationRows = this.getTopDonationRows();


    if(this.state.userVerified !== true) return <div>Verifying donations</div>

    return (

      <GridContainer>     
        <GridItem xs={12} sm={12} md={5} lg={4}>
            <GridContainer>
                <GridItem xs={12} sm={6} md={12} lg={12}>
                    <Card>
                    <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
                        <Icon>pets</Icon>
                        </CardIcon>
                        <p className={classes.cardCategory} style={card_category}>I've Made a Total of</p>
                        <h3 className={classes.cardTitle} style={card_title}>
                        {this.state.count} <small>Donation{this.state.donations.length > 1 ? "s" : "" }</small>
                        </h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats} style={card_category}>
                        <Update />
                        Just Updated
                        </div>
                    </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={12} lg={12}>
                    <Card>
                    <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
                        <Icon>money</Icon>
                        </CardIcon>
                        <p className={classes.cardCategory} style={card_category}>I've Donated a Total Amount of</p>
                        <h3 className={classes.cardTitle} style={card_title}>
                        ${this.state.total}
                        </h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats} style={card_category}>
                        <Update />
                        Just Updated
                        </div>
                    </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </GridItem>


        <GridItem xs={12} sm={12} md={7} lg={8}>
            <Card>
              <CardHeader color="rose" text>
                <CardText color="rose">
                  <h4 className={classes.cardTitleWhite}>My Top 4 Shelters</h4>
                  <h4 className={classes.cardCategoryWhite} style={styles.cardCategoryWhite}>
                    My Top 4 Shelter Donations Over Time
                  </h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <Table
                  hover
                  tableHeaderColor="warning"
                  tableHead={["Rank", "Shelter", "Total Donation", "# of Donations"]}
                  tableData={topDonationRows}
                />
              </CardBody>
            </Card>
          </GridItem>


        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Donations</h4>
            </CardHeader>

      

            <CardBody>
              <ReactTable
                data={this.state.donations}
                filterable
                columns={[
                 
                  {
                    Header: "Donation ID",
                    accessor: "donationID",
                  },
                  {
                    Header: "Donation Amount",
                    accessor: "amount"
                  },
                  
                  {
                    Header: "Shelter",
                    accessor: "shelter"
                  },
                  {
                    Header: "Date",
                    accessor: "date"
                  }
                  
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.userReducer.user
  }
  
}

UserDonations.propTypes = {
  classes: PropTypes.object
};




export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(UserDonations))

