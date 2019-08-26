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
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import TempNavBar from "components/Navbars/TempNavBar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Onboarding from "views/Onboarding/Onboarding.jsx"

// import routes from "routes.js";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/authStyle.jsx";

// import register from "assets/img/register.jpeg";
// import login from "assets/img/login.jpeg";
// import lock from "assets/img/lock.jpeg";
// import error from "assets/img/clint-mckoy.jpg";
// import pricing from "assets/img/bg-pricing.jpeg";
import mainBG from "assets/img/bg-application.jpg"


class Callback extends React.Component {
  constructor(props) {
    super(props)
    this.interval = setInterval(this.timeoutFunction, 1000);
  }
  wrapper = React.createRef();

  timeoutFunction = () => {
    if (localStorage.getItem('new_user') === null) return;
    
    const newUser = localStorage.getItem('new_user');
    const shelter_id = localStorage.getItem('shelter_id');
    const shelterId = localStorage.getItem('shelterId');
    const animalId = localStorage.getItem('animalId');
    const token = localStorage.getItem('token')

   
    if(token != "null" && typeof(token) !== 'undefined') {
          if (shelter_id != "null" && typeof(shelter_id) !== 'undefined') {
            this.props.history.push('/admin/dashboard')
            clearInterval(this.interval);
          } else if(localStorage.getItem('animalId')) {
            clearInterval(this.interval);
            this.props.history.push(`/animal/${animalId}`)
          } else if (localStorage.getItem('shelterId')) {
            this.props.history.push(`/shelter/${shelterId}`)
            clearInterval(this.interval);
          } else if (localStorage.getItem('shelter_signup')) {
            this.props.history.push('/shelter-signup')
            clearInterval(this.interval);
          } else if (newUser == "true") {
            this.props.history.push('/callback/onboarding')
            clearInterval(this.interval);
          } else {
            this.props.history.push('/')
            clearInterval(this.interval);
          }
    }
  }

  componentDidMount() {
    
    document.body.style.overflow = "unset";
    
  }


  getBgImage = () => {
    return mainBG;
  };



  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <TempNavBar brandText="Pawsnfind" {...rest} />
        <div className={classes.wrapper} ref={this.wrapper}>
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + this.getBgImage() + ")" }}
          >
           <Route path='/callback/onboarding' component={Onboarding}/>
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Callback.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Callback);
