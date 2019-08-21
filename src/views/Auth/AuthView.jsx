import Auth from "components/Auth/Auth.js"
import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fingerprint from "@material-ui/icons/Fingerprint";
import withStyles from "@material-ui/core/styles/withStyles";
import authNavbarStyle from "assets/jss/material-dashboard-pro-react/components/authNavbarStyle.jsx";
 



const auth = new Auth();
 

class AuthView extends React.Component {
  constructor(props){
    super(props)
  }

    authLogin = () => {
        auth.login();
      }


    logout = () => {
      auth.logout();
    }

    render()  {
      const { classes } = this.props
      const customStyle = {
        buttonWrapper : {
          color: "#FFF",
        margin: "0 5px",
        display: "block",
        padding: "10px 15px",
        position: "relative",
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "20px",
        paddingTop: "15px",
        borderRadius: "3px",
        paddingBottom: "15px",
        textTransform: "uppercase",
        textDecoration: "none",
        background:"#ffffff20",
        }, 
        linkStyle: {
          color: "#fcfcfc"
        } 
      }
        return(
          localStorage.getItem("token") 
          ? 
        <ListItem className={classes.listItem} onClick={this.logout} style={customStyle.buttonWrapper}>
            <NavLink to="/">
               <Fingerprint className={classes.listItemIcon} style={customStyle.linkStyle} />
               <ListItemText
                style={customStyle.linkStyle}
                 primary={"Logout"}
                 disableTypography={true}
                 className={classes.listItemText}
               />
            </NavLink>
        </ListItem> 
        :
        <ListItem className={classes.listItem} onClick={this.authLogin} style={customStyle.buttonWrapper}>
            <NavLink to="#">
               <Fingerprint className={classes.listItemIcon} style={customStyle.linkStyle} />
               <ListItemText
                style={customStyle.linkStyle}
                 primary={"Login/Register"}
                 disableTypography={true}
                 className={classes.listItemText}
               />
            </NavLink>
        </ListItem> 
       )
}
  
}

export default withStyles(authNavbarStyle)(AuthView);
