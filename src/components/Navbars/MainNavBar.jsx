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
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Face from "@material-ui/icons/Face";

import Auth from "components/Auth/Auth.js"
import AuthView from "views/Auth/AuthView.jsx"
// core components
import Button from "components/CustomButtons/Button";

import authNavbarStyle from "assets/jss/material-dashboard-pro-react/components/authNavbarStyle.jsx";

//import custom style 
import pawsStyle from "assets/custom/pawsnfind.css"

import { get_user } from '../../actions/userAction'

class MainNavBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    if(localStorage.getItem('token') && localStorage.getItem('user_id') !== null && typeof(localStorage.getItem('user_id')) != undefined ) {
       this.getUser(localStorage.getItem('user_id'));
    }
  }

  getUser = async(user_id) => {
    await this.props.get_user(user_id)
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }

  render() {
    const { classes, color, brandText } = this.props;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    const user_id = localStorage.getItem("user_id")
    const shelter_id = localStorage.getItem("shelter_id")
    var list = (
      <List className={classes.list}>
      
        <ListItem className={classes.listItem}>
        {localStorage.getItem("token") && user_id != "null" && typeof(user_id)!== 'undefined' ?
          <NavLink to={'/userDash/dashboard'} className={classes.navLink}>
            <Face className={classes.listItemIcon} />
            <ListItemText
                primary={`Hello ${this.props.user.username}`}
                disableTypography={true}
                className={classes.listItemText}
              />   
          </NavLink>
          : 
          null
        }
        
        </ListItem>

        <ListItem className={classes.listItem}>
          {localStorage.getItem("token") && shelter_id != "null" && typeof(shelter_id) !== 'undefined' ? 
            <NavLink to={'/admin/dashboard'} className={classes.navLink}>
              <Dashboard className={classes.listItemIcon} />
              <ListItemText
                primary={"Shelter Dashboard"}
                disableTypography={true}
                className={classes.listItemText}
              />    
            </NavLink>
            :
             <NavLink to={"/shelterManagers"} className={classes.navLink}>
              <Dashboard className={classes.listItemIcon} />
              <ListItemText
                primary={"Shelter Managers"}
                disableTypography={true}
                className={classes.listItemText}
              />
            </NavLink>
        } 
        </ListItem>
       
        <AuthView {...this.props}/>
        
      </List>
    );
    const logoStyle = {
        fontFamily: "Coiny, cursive",
        color : "#FCFCFC",
        fontSize:"2rem",
      }

    return (
      
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <NavLink to="/"><h3 style={logoStyle}>Pawsnfind</h3>
     
              </NavLink>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <NavLink to="/"> <h4 style={logoStyle}>Pawsnfind</h4>
      
              </NavLink>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.userReducer.user,
  }
}


MainNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string
};

export default connect(
  mapStateToProps,
  { get_user }
)(withStyles(authNavbarStyle)(MainNavBar))
