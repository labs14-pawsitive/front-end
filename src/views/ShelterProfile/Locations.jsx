import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchShelter ,updateShelterLoc, deleteShelterLoc } from '../../actions/shelterAction';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/ShelterCustomInput.jsx";

import shelterProfileStyles from "assets/jss/material-dashboard-pro-react/views/shelterProfileStyles.jsx";

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            location: this.props.location
        }

    }


handleFormButtonToggle = e => {
      e.preventDefault();
      this.setState({
        editMode : !this.state.editMode
      })
}

changeHandler = e => {
  this.setState({
      location: {
      ...this.state.location,
      [e.target.id] : e.target.value
      }
  })
}

updateLocation = e => {
  e.preventDefault()
}

deleteLocation = e => {
    e.preventDefault()
    this.props.deleteShelterLoc(this.props.location.id)
    .then( () => {
        this.props.fetchShelter(this.props.shelterID)
    })
}

    render() {
        const customStyle = {
            shelterDisplayView : {
              color:"#333333 !important",
            }
          }
          const { classes } = this.props;
        return (
            <>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Nickname"
                    id= "nickname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      style: customStyle.shelterDisplayView,
                      value: this.state.location.nickname,
                      onChange: (e) => this.changeHandler(e)
                    }}
                  />
                </GridItem>
              </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                    labelText="Street Address"
                    id="street_address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.street_address,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
              </GridItem>
               <GridItem xs={12} sm={12} md={6}>
               <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.city,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />  
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
              <CustomInput
                    labelText="State"
                    id="state"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.state,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                    labelText="Zipcode"
                    id="zipcode"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.zipcode,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />
            </GridItem>
            <GridItem xs={12} sm={12} md={7}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
            <Button size= "sm" 
              color="rose" 
              className={classes.updateProfileButton}
              onClick={this.handleFormButtonToggle}
            >
                {this.state.editMode? "Save" : "Update"}
              </Button>
              
            <Button size= "sm" 
                color="danger" 
                onClick={this.deleteLocation}
                className={classes.updateProfileButton} >
                Delete
              </Button>

              
            </GridItem>
            </GridContainer>
            </>
        );
    }
}

Locations.propTypes = {

};

const mapStateToProps = (state) => {
    return {
      userID : state.userReducer.userID,
      shelterID : state.shelterReducer.shelterID,
      shelterWorkerID : state.userReducer.shelterWorkerID,
      roleID : state.userReducer.roleID,
      shelter: state.shelterReducer.shelter,
      fetchingShelter: state.shelterReducer.fetchingShelter, 
    }
  }
 
  
  export default connect(
    mapStateToProps,
    { updateShelterLoc, deleteShelterLoc, fetchShelter }
  )(withStyles(shelterProfileStyles)(Locations))
  