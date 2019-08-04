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
import { Route, withRouter } from "react-router-dom";
import Auth from "components/Auth/Auth.js"
import SweetAlert from "react-bootstrap-sweetalert";
import axios from 'axios';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import TempNavBar from "components/Navbars/TempNavBar.jsx";
import Footer from "components/Footer/Footer.jsx";

import ApplicationWizard from "views/Application_Temp/Wizard.jsx";

import routes from "routes.js";

import applicationTempStyle from "assets/jss/material-dashboard-pro-react/layouts/applicationTempStyle.jsx";

// import register from "assets/img/register.jpeg";
// import login from "assets/img/login.jpeg";
// import lock from "assets/img/lock.jpeg";
// import error from "assets/img/clint-mckoy.jpg";
// import pricing from "assets/img/bg-pricing.jpeg";
import application from "assets/img/bg-application3.jpg";

const auth = new Auth();

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      alert: null,
      show: false,
      match: "",
      animalId: "",
      shelterId: ""
    }
  }

  wrapper = React.createRef();

async componentWillMount() {
    if(this.props.match.params.animalId && this.props.match.params.shelterId) {
     // localStorage.setItem('animalId', this.props.match.params.animalId )
     // localStorage.setItem('shelterId', this.props.match.params.shelterId) 
          //checking for valid link => animal and shelter id match
        await axios
        //.get(`https://staging2-pawsnfind.herokuapp.com/api/animals/${this.props.match.params.animalId}/match/shelter/${this.props.match.params.shelterId}`)
        .get(`https://staging2-pawsnfind.herokuapp.com/api/animals/${this.props.match.params.animalId}/match/shelter/${this.props.match.params.shelterId}`)
        .then(result => {
          console.log(result)
          this.setState({
            match : true,
            animalId : this.props.match.params.animalId,
            shelterId : this.props.match.params.shelterId
          })
        })
        .catch(error => {
          this.setState({
            match : false
          })
          console.log(error)
        })
    } else {
      this.setState({
        match : false
      })
    } 
      this.setAlert();   

  }

 componentDidMount() {
    document.body.style.overflow = "unset";
  }

  setAlert = () => {
    //if (!localStorage.getItem('animalId') && !localStorage.getItem('shelterId')) {
    if(this.state.match == false) {
      this.dangerAlert();
    } else if(!localStorage.getItem('token') && !localStorage.getItem('user_id')) {
      this.warningAlert();
    } else {
      this.hideAlert();
    }
  }

  dangerAlert() {
    this.setState({
      alert: (
       <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px", color: "#777" }}
          title="You've entered an invalid link"
          onConfirm={() => this.backHome()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          confirmBtnText="OK"
        >
          Please try again or request a valid link from your shelter.
          </SweetAlert>
      )
    });
  }

  warningAlert() {
    this.setState({
      alert: (
       <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px", color: "#777" }}
          title="You need to login / signup in order to continue with application process"
          onConfirm={() => auth.login()}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          confirmBtnText="Signup / Login"
        >
          </SweetAlert>
      )
    });
  }

  backHome() {
    this.props.history.push('/')
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  getBgImage = () => {
    return application;
  };
  
  render() {
    const { classes, ...rest } = this.props;
    if(this.state.match === "") return <div></div>
    return (
      <div>
        <TempNavBar brandText="Pawsnfind" {...rest} />

        <div className={classes.wrapper} ref={this.wrapper}>
          
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}
          >
            {this.state.alert}
            {this.state.match === true && localStorage.getItem('token') && localStorage.getItem('user_id')
            ? 
            <ApplicationWizard animalId={this.state.animalId} shelterId={this.state.shelterId}/>
            : 
            null
            } 
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(applicationTempStyle)(Application));
