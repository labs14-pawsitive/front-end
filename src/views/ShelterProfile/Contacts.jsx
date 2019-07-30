import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchOptions, fetchShelter ,updateShelterCon, deleteShelterCon } from '../../actions/shelterAction';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/ShelterCustomInput.jsx";

import shelterProfileStyles from "assets/jss/material-dashboard-pro-react/views/shelterProfileStyles.jsx";

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        }

    }

deleteContact = e => {
    e.preventDefault()
    this.props.deleteShelterCon(this.props.contact.id)
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
                    labelText="Name"
                    id={this.state.editMode? "name-disabled" : "name"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.props.contact.name
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id={this.state.editMode? "email-address-disabled" : "email"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.props.contact.email
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone Number"
                    id={this.state.editMode? "phone-disabled" : "phone"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.props.contact.phone

                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
            <GridItem xs={12} sm={12} md={7}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <Button size= "sm" 
              color="danger" 
              className={classes.updateProfileButton}
               onClick={this.deleteContact}>
                Delete
              </Button>
              <Button size= "sm" color="rose" className={classes.updateProfileButton} onClick={this.handleFormButtonToggle}>
                {this.state.editMode? "Save Changes" : "Update"}
              </Button>
            </GridItem>
              </GridContainer>
            </>
        );
    }
}



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
    { fetchOptions, updateShelterCon, deleteShelterCon, fetchShelter }
  )(withStyles(shelterProfileStyles)(Contacts))
  