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
import { NavLink } from "react-router-dom";

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


import Auth from "components/Auth/Auth.js"
import AuthView from "views/Auth/AuthViewTemp.jsx"
// core components
import Button from "components/CustomButtons/Button";

import authNavbarStyle from "assets/jss/material-dashboard-pro-react/components/authNavbarStyleTemp.jsx";

//import custom style 
import pawsStyle from "assets/custom/pawsnfind.css"

//const auth = new Auth();

class TempNavBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false
    };
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
    var list = (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/admin/dashboard"} className={classes.navLink}>
            <Dashboard className={classes.listItemIcon} />
            <ListItemText
              primary={"Shelter Dashboard Beta"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        
       
        <AuthView {...this.props}/>
        
        
      </List>
    );
    const logoStyle = {
        fontFamily : "Baloo-Regular",
      }

    return (
      
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <Button href="/" className={classes.title} color="transparent">
                <h3 style={logoStyle}>Pawsnfind</h3>
                {/*{brandText}*/}
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button href="/" className={classes.title} color="transparent">
                <h4 style={logoStyle}>Pawsnfind</h4>
              </Button>
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

TempNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string
};

export default withStyles(authNavbarStyle)(TempNavBar);
