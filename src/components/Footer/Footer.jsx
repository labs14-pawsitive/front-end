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
/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { withRouter, NavLink } from 'react-router-dom'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";

function Footer({ ...props }) {
  const { classes, fluid, black , white } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
    [classes.blackColor]: black
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.blackColor]: black
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
    [classes.blackColor]:black
  });
  const customStyle={
    link: {
      color:"white"
    }
  }
  return (
    <footer className={classes.footer}>
      <div className={container}>
        
       <div className={classes.left}>
         <List className={classes.list}>
           <ListItem className={classes.inlineBlock}>
             <NavLink to="/">
             <div className={block}
              target={window.location.pathname.indexOf("/admin/") !== -1 ? "_blank" : ""}>
               Home
              </div>
              </NavLink>
            </ListItem>
{/* 
          {window.location.pathname.indexOf("/admin/") !== -1 
          ? 
          null
          : 
            localStorage.getItem("token") && localStorage.getItem("shelter_id") != "null" && typeof(localStorage.getItem("shelter_id")) !== 'undefined' 
            ?
            <ListItem className={classes.inlineBlock}>
              <NavLink to="/admin/dashboard">
                <div className={block}>
                Shelter Dashboard
                </div>
              </NavLink>
            </ListItem>
            :
            <ListItem className={classes.inlineBlock}>
              <NavLink to="/shelter-signup">
                <div className={block}>
                Register Your Shelter
                </div>
              </NavLink>
            </ListItem>


          
         }
*/}
             
            <ListItem className={classes.inlineBlock}>
              <NavLink to="/team">
              <div className={block}>
                Team
              </div>
              </NavLink>
            </ListItem>           
            <ListItem className={classes.inlineBlock}>
              <a href="#contact" className={block}>
               Contact Us
              </a>
            </ListItem>
          </List> 
        </div>
       
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="/"
            className={anchor}

            target={window.location.pathname.indexOf("/admin/") !== -1 ? "_blank" : ""}
          > Pawsnfind
          </a>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};

export default withRouter(withStyles(footerStyle)(Footer));
