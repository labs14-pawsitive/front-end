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
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchShelter , deleteShelterLoc, deleteShelterCon } from '../../actions/shelterAction';
import Locations from './Locations';

import LocationForm from './LocationForm';
import ContactForm from './ContactForm';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import StoreMallDirectory from "@material-ui/icons/StoreMallDirectory"


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/ShelterCustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";

import shelterProfileStyles from "assets/jss/material-dashboard-pro-react/views/shelterProfileStyles.jsx";
import Contacts from "./Contacts";


 class ShelterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode : false,
      shelter : {},
      locations: [],
      contacts: []
    };
  }

  componentDidMount() {
    this.props.fetchShelter(this.props.shelterID)
    .then( () => {
      this.setState({
        shelter: this.props.shelter,
        locations: this.props.shelter.location,
        contacts: this.props.shelter.contacts,
      })
    })
    .catch( err => {
      console.log('setting state error', err)
     })
  }

handleFormButtonToggle = e => {
  e.preventDefault();
  
  this.setState({
    editMode : !this.state.editMode
  })
}


inputchangeHandler = e => {
  this.setState({
      [e.target.id] : e.target.value
  })
}


deleteShelterLoc = locationId => {
  this.props.deleteShelterLoc(locationId)
}

deleteShelterCon = contactId => {
  this.props.deleteShelterCon(contactId)
}

componentDidUpdate(prevProps, prevState){
  if (this.props.shelter.location !== prevProps.shelter.location ||
      this.props.shelter.contacts !== prevProps.shelter.contacts 
    ) {
    this.setState({
      locations : this.props.shelter.location,
      contacts: this.props.shelter.contacts,

    })
  }
}

render() {
      const { classes } = this.props;
      const customStyle = {
        shelterDisplayView : {
          color:"#333333 !important",
        }
      }
return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
              <LocationForm contacts={this.state.contacts} />
              <ContactForm />
      </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <StoreMallDirectory />
              </CardIcon>
              <h3 className={classes.cardIconTitle}>
                {this.state.editMode? "Edit Shelter Profile" : "Shelter Profile"}
              </h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText={this.state.shelter? "" : "Shelter"}
                    id="shelter"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      style: customStyle.shelterDisplayView,
                      value: this.state.shelter.shelter,
                      onChange: (e) => this.inputchangeHandler(e)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <h3 className={classes.cardTitle}>Main Contact</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Name"
                    id={this.state.editMode? "username-disabled" : "name"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.shelter.name,
                      onChange: (e) => this.inputchangeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id={this.state.editMode? "email-address-disabled" : "email"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.shelter.email,
                      onChange: (e) => this.inputchangeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone Number"
                    id={this.state.editMode? "phone-number-disabled" : "phone"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.shelter.phone,
                      onChange: (e) => this.inputchangeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
              </GridContainer>
              
              {/* <Button color="rose" className={classes.updateProfileButton} onClick={this.handleFormButtonToggle}>
                {this.state.editMode? "Save Changes" : "Update Profile"}
              </Button> */}
              <Clearfix />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h3 className={classes.cardTitle}>
              Contacts
              </h3>
            </CardHeader>
            <CardBody>
                      {this.state.shelter && this.state.contacts.map(contact => (
                    <Contacts
                        contact ={contact}
                        classes = {this.props.classes}
                        deleteShelterCon = {this.deleteShelterCon}
                    />
                    ))}
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
            <h3 className={classes.cardTitle}>Locations</h3>
            </CardHeader>
            <CardBody>
                    {this.state.shelter && this.state.locations.map(location => (
                    <Locations
                        location ={location}
                        classes = {this.props.classes}
                        deleteShelterLoc = {this.deleteShelterLoc}
                    />
                    ))}
            
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>


     
    </div>
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

ShelterProfile.propTypes = {
  classes: PropTypes.object
};

export default connect(
  mapStateToProps,
  { fetchShelter, deleteShelterLoc, deleteShelterCon }
)(withStyles(shelterProfileStyles)(ShelterProfile))


{/* <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText={this.state.shelter? "Location Name" : "Location"}
                    id="location"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      style: customStyle.shelterDisplayView,
                      value: this.props.shelter.shelter
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
                      disabled: this.state.editMode? false : true
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
                      disabled: this.state.editMode? false : true
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
                      disabled: this.state.editMode? false : true
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />
                <Button size= "sm" color="danger" className={classes.updateProfileButton} onClick={this.handleFormButtonToggle}>
                Delete
              </Button>
              <Button size= "sm" color="rose" className={classes.updateProfileButton} onClick={this.handleFormButtonToggle}>
                {this.state.editMode? "Save Changes" : "Update"}
              </Button>  
            </GridItem>
            </GridContainer> */}