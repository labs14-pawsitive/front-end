import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchOptions, updateShelterLoc, deleteShelterLoc } from '../../actions/shelterAction';


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
            editMode: false
        }

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
                    id="location"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      style: customStyle.shelterDisplayView,
                      value: this.props.location.nickname
                    }}
                  />
                </GridItem>
              </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                    labelText="Street Address"
                    id={this.state.editMode? "street-address-disabled" : "street-address"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.props.location.street_address
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
              </GridItem>
               <GridItem xs={12} sm={12} md={6}>
               <CustomInput
                    labelText="City"
                    id={this.state.editMode? "city-disabled" : "city"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.props.location.city
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />  
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                    labelText="State"
                    id={this.state.editMode? "city-disabled" : "city"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.props.location.state
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />

            <Button size= "sm" color="danger">
                Delete
              </Button>
              <Button size= "sm" color="rose" >
                {this.state.editMode? "Save Changes" : "Update"}
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
    { fetchOptions, updateShelterLoc, deleteShelterLoc }
  )(withStyles(shelterProfileStyles)(Locations))
  