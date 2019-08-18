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
import axios from 'axios';
import {axiosWithAuth} from 'axiosWithAuth';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Update from "@material-ui/icons/Update";

import Assignment from "@material-ui/icons/Assignment";
import Favorite from "@material-ui/icons/Favorite";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";

import Card from "components/Card/Card.jsx";
import CardText from "components/Card/CardText.jsx";

import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

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

class DonationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: [],
      shelterVerified: ""

    };
  }

  
  componentWillMount() {
    //verifying shelter before proceeding
    axiosWithAuth()
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/shelter/${localStorage.getItem('shelter_id')}`)
      .then( result => {
        this.setState({
          shelterVerified : true
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
    //.get(`${process.env.REACT_APP_BACKEND_URL}/api/animals/shelter/${localStorage.getItem("shelter_id")}`)
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${localStorage.getItem('shelter_id')}/follows`)
    .then(followers => {
      console.log(followers)
      this.setState({
        followers : followers.data.map((follower, key) => {
        return {
          id: key,
          userID: follower.user_id,
          username: follower.username,
          email: follower.email,
          location: follower.zip,
          icon: <Favorite style={{color: '#e0286a'}}/>
        };
      })
      })
      console.log("state" , this.state.followers)
    })
    .catch(error => {
      console.log(error)
    })
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

    if(this.state.shelterVerified !== true) return <div>Verifying Shelter</div>

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <GridContainer>
          <GridItem xs={12} sm={6} md={12} lg={12}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>pets</Icon>
                </CardIcon>
                <p className={classes.cardCategory} style={card_category}>Recent Donations</p>
                <h3 className={classes.cardTitle} style={card_title}>
                  <small>$</small>{this.state.followers.length} 
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
                  <Icon>pets</Icon>
                </CardIcon>
                <p className={classes.cardCategory} style={card_category}>Total Donations</p>
                <h3 className={classes.cardTitle} style={card_title}>
                  <small>$</small>{this.state.followers.length} 
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
         
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="rose" text>
                <CardText color="rose">
                  <h4 className={classes.cardTitleWhite}>Top Donors</h4>
                  <h4 className={classes.cardCategoryWhite} style={styles.cardCategoryWhite}>
                    Top Donors Over Time
                  </h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <Table
                  hover
                  tableHeaderColor="warning"
                  tableHead={["Rank", "Username", "Total Donation", "# of Donations"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "3"],
                    ["2", "Minerva Hooper", "$23,789", "5"],
                    ["3", "Sage Rodriguez", "$56,142", "2"],
                    ["4", "Philip Chaney", "$38,735", "8"]
                  ]}
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
                data={this.state.followers}
                filterable
                columns={[
                  {
                    Header: "User ID",
                    accessor: "userID",
                    
                  },
                  {
                    Header: "Username",
                    accessor: "username"
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "Location",
                    accessor: "zip"
                  },
                  {
                    Header: "",
                    accessor: "icon",
                    style: {textAlign: "center"},
                    sortable: false,
                    filterable: false
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
    userID : state.userReducer.userID,
    shelterID : state.shelterReducer.shelterID,
    shelterWorkerID : state.userReducer.shelterWorkerID,
    roleID : state.userReducer.roleID
  }
  
}

DonationTable.propTypes = {
  classes: PropTypes.object
};




export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(DonationTable))
