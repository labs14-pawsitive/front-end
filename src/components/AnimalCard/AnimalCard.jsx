import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

// core components

import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";

import animalCardStyle from 'assets/jss/material-dashboard-pro-react/components/animalCardStyle.jsx'


class AnimalCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }
   
    hoverEffect = async () => {
 
 
            await this.setState({
                hover: true
            })
     }
 

    hoverOutEffect = async () => {
        await this.setState({
            hover: false
        })
    }

    render() {
        const { classes } = this.props;
 
      
       return(
 
            <GridItem xs={6} sm={4} md={3} lg={2}>
                <Link to={`/animal/${this.props.animal.id}`}>
                    <div className={classes.maincard} onMouseOver={this.hoverEffect} onMouseOut={this.hoverOutEffect} style={{backgroundImage :"url(" + this.props.animal.img_url + ")", backgroundSize: "cover", backgroundPosition: "center center"}}>
                        <div className={this.state.hover ? classes.cardOverlayHover : classes.cardOverlay}>
                            <div className={classes.cardInner}>
                                <div className={classes.animalName}>{this.props.animal.name}</div>
                                <div className={classes.animalDesc}>{this.props.animal.breed}</div>
                                <div className={classes.animalDesc}>{this.props.animal.age} . {this.props.animal.is_male ? "Boy" : "Girl"}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </GridItem>
 
    
        ) 
    }
    
 
}

AnimalCard.propTypes = {
    classes: PropTypes.object.isRequired
  };

 
 
export default withStyles(animalCardStyle)(AnimalCard);
 
 