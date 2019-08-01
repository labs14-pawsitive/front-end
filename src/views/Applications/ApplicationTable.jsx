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
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Update from "@material-ui/icons/Update";

import Assignment from "@material-ui/icons/Assignment";
// import Dvr from "@material-ui/icons/Dvr";
import Search from "@material-ui/icons/Search";
// import Favorite from "@material-ui/icons/Favorite";
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

class ApplicationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
    };
  }

  componentDidMount() {
    axios
    //.get(`https://staging1-pawsnfind.herokuapp.com/api/animals/shelter/${localStorage.getItem("shelter_id")}`)
    // .get(`https://staging1-pawsnfind.herokuapp.com/api/applications/shelter/${this.props.shelterID}`)
    .get(`https://staging1-pawsnfind.herokuapp.com/api/applications/shelter/${this.props.shelterID}`)
    .then(applications => {
      console.log(applications)
      
     this.setState({
        applications : applications.data.map((application, key) => {
        return {
          id: key,
          applicationID: application.id,
          
          name: application.animal_name,
          
          status: application.application_status,
          applicant_email: application.email,
          actions: (
            <div className="actions-right">
              <NavLink to={`/admin/application/${application.id}`}>
                <Button
                  justIcon
                  round
                  simple
                  color="info"
                  className="view"
                >
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

  componentDidUpdate(prevProps, prevState) {

    if (this.props.application !== prevProps.application && this.props.options !== prevProps.application) {

      this.setState({
        ...this.state,
        application: this.props.application,
        options: this.props.options,
      })
    }
  };
  

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

    return (

      <GridContainer>     
         <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>pets</Icon>
                </CardIcon>
                <p className={classes.cardCategory} style={card_category}>Total Applications</p>
                <h3 className={classes.cardTitle} style={card_title}>
                  {this.state.applications.length} <small>Applications</small>
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
                    Header: "Application ID",
                    accessor: "applicationID",
                    //sortable: false,
                    //filterable: false
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
                    Header: "Applicant",
                    accessor: "applicant_email"
                  },
                  
                  {
                    Header: "Actions",
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
    userID : state.userReducer.userID,
    shelterID : state.shelterReducer.shelterID,
    shelterWorkerID : state.userReducer.shelterWorkerID,
    roleID : state.userReducer.roleID
  }
  
}

ApplicationTable.propTypes = {
  classes: PropTypes.object
};




export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(ApplicationTable))


//export default withStyles(styles)(ReactTables);

/*
export default connect(
  mapStateToProps,
  {}
)(ReactTables)
*/