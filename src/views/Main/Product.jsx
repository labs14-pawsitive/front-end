import React from 'react'

import PropTypes from "prop-types";
import GridItem from "components/Grid/GridItem.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";

import pet from '../../assets/img/main-page/pets-hotel-symbol-with-a-dog-and-a-cat-in-a-circle-with-one-star.png'
import takehome from '../../assets/img/main-page/walking-with-dog.png'
import application from '../../assets/img/main-page/application.png'

class Product extends React.Component {
    

    render(){
        const { classes } = this.props;

        const customStyle = {
            divImageStyle: {
                width: "21%",
                height: "68px",
                margin: "0 auto"
            },
            imageStyle: {
                width: "100%",
                height:"100%"
              },
              headerStyle:{
                  textAlign:"center"
              },
              gridStyle:{
                  marginTop:"5%",
                  height:"275px",
                  backgroundColor:"White",
                  opacity:"0.9"
                
              },
              subGridStyle:{
                // border:"1px solid black"
              },
              subPStyle:{
                  padding:"0 20%"
              },
              encapsulatedGridStyle:{
                  marginTop:"3%",
                display:"flex"
              }
        }
    return (
        <GridItem xs={12} sm={12} md={12} style={customStyle.gridStyle}>
            <h5 style={customStyle.headerStyle}>Adoption Process</h5>
            <GridItem xs={12} sm={12} md={12} style={customStyle.encapsulatedGridStyle}>
            <GridItem xs={12} sm={12} md={4} style={customStyle.subGridStyle}>
                <p style={customStyle.headerStyle}>Find Pets Near You</p>
                <div style={customStyle.divImageStyle}>
                <img src={pet} style={customStyle.imageStyle}/>
                </div>
                <p style={customStyle.subPStyle}>Search for the species, within few miles around your zipcode</p>
               
            </GridItem>
            <GridItem xs={12} sm={12} md={4} style={customStyle.subGridStyle}>
                <p style={customStyle.headerStyle}>Apply Online</p>
                <div style={customStyle.divImageStyle}>
                <img src={application} style={customStyle.imageStyle}/>
                </div>
                <p style={customStyle.subPStyle}>Apply Online as soon as you find your pet and save your time from filling a manual application</p>
               
            </GridItem>
            <GridItem xs={12} sm={12} md={4} style={customStyle.subGridStyle}>
                <p style={customStyle.headerStyle}>Take them Home</p>
                <div style={customStyle.divImageStyle}>
                <img src={takehome} style={customStyle.imageStyle}/>
                </div>
                <p style={customStyle.subPStyle}>Take your pet home once you get approved.</p>
               
            </GridItem>
            </GridItem>
        </GridItem>
    )}
}

Product.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(mainPageStyle)(Product)