import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchShelter ,updateShelterCon, deleteShelterCon } from '../../actions/shelterAction';


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
            editMode: false,
            contact : this.props.contact
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
        contact: {
        ...this.state.contact,
        [e.target.id] : e.target.value
        }
    })
  }
      

deleteContact = e => {
    e.preventDefault()
    this.props.deleteShelterCon(this.props.contact.id)
    .then( () => {
        this.props.fetchShelter(this.props.shelterID)
    })
}

updateSubmit = e => {
    e.preventDefault()

    const updatedContact = {
        name: this.state.contact.name,
        email: this.state.contact.email,
        phone: this.state.contact.phone,
        shelter_id: this.props.shelterID
    }

    console.log('UPDATECHANGE', updatedContact)


    this.props.updateShelterCon(this.props.contact.id, updatedContact)
    .then( (res) => {
        this.props.fetchShelter(this.props.shelterID)
        console.log('UPDATESHELTERLOCATION:', res)
    });
    
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
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.contact.name,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.contact.email,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone Number"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.contact.phone,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
            <GridItem xs={12} sm={12} md={7}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
            <Button 
                size= "sm" 
                color="rose" 
                className={classes.updateProfileButton}
                onClick={this.state.editMode? this.updateSubmit : this.handleFormButtonToggle}
              >
                {this.state.editMode? "Save" : "Update"}
              </Button>


              <Button size= "sm" 
              color="danger" 
              className={classes.updateProfileButton}
               onClick={this.deleteContact}>
                Delete
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
    { updateShelterCon, deleteShelterCon, fetchShelter }
  )(withStyles(shelterProfileStyles)(Contacts))
  