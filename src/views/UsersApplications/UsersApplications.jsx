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
// import Danger from "components/Typography/Danger.jsx";
// import { dataTable } from "variables/general.jsx";

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

class UserApplications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
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
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/applications/user/${localStorage.getItem('user_id')}`)

    .then(applications => {
        console.log(applications)
        const picStyle = { width: '100%' }
        this.setState({
        applications : applications.data.map((application, key) => {
        return {
          id: key,
          profilePic: <img src={application.img_url} style={picStyle}/>,
          applicationID: application.id,
          name: application.animal_name,
          shelter: application.shelter,
          status: application.application_status,
          date: `${application.month}/${application.day}/${application.year}`,
         // icon: <Favorite style={{color: '#e0286a'}}/>

          
          actions: (
            <div className="actions-left">
              <NavLink to={`/animal/${application.animal_id}`}>
              <Button color="success">
                  <Search />
                  </Button>
              </NavLink>{" "}
            </div>
          )
        };
      })
      })
      console.log("state" , this.state.applications)
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

    if(this.state.userVerified !== true) return <div>Verifying applications</div>

    return (

      <GridContainer>     
         <GridItem xs={12} sm={6} md={6} lg={4}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>pets</Icon>
                </CardIcon>
                <p className={classes.cardCategory} style={card_category}>Total Applications</p>
                <h3 className={classes.cardTitle} style={card_title}>
                  {this.state.applications.length} <small>Application{this.state.applications.length > 1 ? "s" : "" }</small>
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
              <h4 className={classes.cardIconTitle}>Applications</h4>
            </CardHeader>

      

            <CardBody>
              <ReactTable
                data={this.state.applications}
                filterable
                columns={[
                  {
                    Header: "Profile Picture",
                    accessor: "profilePic"
                  },
                  {
                    Header: "Application ID",
                    accessor: "applicationID",
                  },
                  {
                    Header: "Animal Name",
                    accessor: "name"
                  },
                  {
                    Header: "Status",
                    accessor: "status"
                  },
                  {
                    Header: "Shelter",
                    accessor: "shelter"
                  },
                  {
                    Header: "Date",
                    accessor: "date"
                  },
                  
                  {
                    Header: "View Animal",
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

UserApplications.propTypes = {
  classes: PropTypes.object
};




export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(UserApplications))

