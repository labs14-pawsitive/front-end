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

import ContactModal from "components/ContactModal/ContactModal.jsx";
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

            <ListItem className={classes.inlineBlock}>
              <NavLink to="/team">
              <div className={block}>
                Team
              </div>
              </NavLink>
            </ListItem>      
            <ContactModal {...props}/>
           
           <ListItem className={classes.inlineBlock}>
              <Button simple style={{padding:"0", color: "#55acee"}}>
                      <a href="https://twitter.com" style={{padding: "5px"}}><i className={"fab fa-twitter"} /></a>
                    </Button>
            </ListItem>   
            <ListItem className={classes.inlineBlock}>
              <Button simple style={{padding:"0", color: "#3b5998"}}>
                      <a href="https://www.facebook.com/Pawsnfind" style={{padding: "5px"}}><i className={"fab fa-facebook"} /></a>
                    </Button>
            </ListItem>   
            <ListItem className={classes.inlineBlock}>
              <Button simple style={{padding:"0", color:"#cb2964"}}>
                      <a href="https://www.instagram.com/pawsnfind/" style={{padding: "5px"}}><i className="fab fa-instagram"></i></a>
              </Button>
            </ListItem>  
           
           
            {/*  
            <ListItem className={classes.inlineBlock}>
              <a href="#contact" className={block}>
               Contact Us
              </a>
            </ListItem>
            */}    
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
