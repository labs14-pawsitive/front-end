import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import shelterPageStyle from "assets/jss/material-dashboard-pro-react/views/shelterPageStyle";

const PetsList = props => {
        return (
            <>
            <img className={props.classes.petpicStyle} src={props.animal.img_url}></img> 
            </>
        );
    }

export default withStyles(shelterPageStyle)(PetsList)