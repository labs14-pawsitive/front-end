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
import { Link } from 'react-router-dom';


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
import Search from "@material-ui/icons/Search";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";


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

class UsersShelterFollows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelters: [],
      userVerified: ""

    };
  }

  
  componentWillMount() {
    //verifying user before proceeding
    axiosWithAuth()
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/shelter/${localStorage.getItem('user_id')}`)
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
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${localStorage.getItem('user_id')}/follows/shelters`)
    .then(results => {
      console.log(results)
      this.setState({
        shelters : results.data.map((shelter, key) => {
        return {
          id: key,
          shelterId: shelter.id,
          shelter: shelter.shelter,
          email: shelter.email,
          location: `${shelter.city} ${shelter.state}, ${shelter.zipcode}`,
          phone: shelter.phone,
          actions: (
            <div className="actions-left">
              {/* view shelter */}
              <Link to={`/shelter/${shelter.id}`}>
                <Button color="success">
                  <Search />
                </Button>
              </Link>
            </div>
          )
        };
      })
      })
      console.log("state" , this.state.shelters)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const { classes } = this.props;

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

    if(this.state.userVerified !== true) return <div>Verifying User</div>

    return (
      <GridContainer>
         <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>pets</Icon>
                </CardIcon>
                <p className={classes.cardCategory} style={card_category}>I'm Following</p>
                <h3 className={classes.cardTitle} style={card_title}>
                  {this.state.shelters.length} <small>{this.state.shelters.length > 1 ? "Shelters" : "Shelter"}</small>
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
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Shelters</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={this.state.shelters}
                filterable
                columns={[
                  {
                    Header: "Shelter",
                    accessor: "shelter",
                    
                  },
                  {
                    Header: "Location",
                    accessor: "location"
                  },
                  {
                    Header: "Email",
                    accessor: "email"
                  },
                  {
                    Header: "Phone",
                    accessor: "phone"
                  },
                  {
                    Header: "View Shelter",
                    accessor: "actions",
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
    user : state.userReducer.user
  }
  
}

UsersShelterFollows.propTypes = {
  classes: PropTypes.object
};




export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(UsersShelterFollows))

