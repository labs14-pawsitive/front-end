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
import axios from "axios";
import { connect } from "react-redux";

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


 class ShelterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode : false,
      shelter : {}
    };
  }

  componentDidMount() {
    axios
    //.get(`http://localhost:8000/api/animals/shelter/${localStorage.getItem("shelter_id")}`)
    .get(`http://localhost:8000/api/shelters/${this.props.shelterID}`)
    .then( shelter => {
      console.log(shelter.data)
      this.setState({
        shelter:shelter.data
      })
    })
    .catch( error => 
      console.log(error)
      )
  }

handleFormButtonToggle = e => {
  e.preventDefault();
  
  this.setState({
    editMode : !this.state.editMode
  })
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
              <LocationForm />
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
                    id="company"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      style: customStyle.shelterDisplayView,
                      value: this.state.shelter.shelter
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
                    id={this.state.editMode? "username-disabled" : "username"}
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
                    labelText="Email address"
                    id={this.state.editMode? "email-address-disabled" : "email-address"}
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
                    labelText="Phone Number"
                    id={this.state.editMode? "email-address-disabled" : "email-address"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
              </GridContainer>
              
              <Button color="rose" className={classes.updateProfileButton} onClick={this.handleFormButtonToggle}>
                {this.state.editMode? "Save Changes" : "Update Profile"}
              </Button>
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
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Name"
                    id={this.state.editMode? "username-disabled" : "username"}
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
                    labelText="Email address"
                    id={this.state.editMode? "email-address-disabled" : "email-address"}
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
                    labelText="Phone Number"
                    id={this.state.editMode? "email-address-disabled" : "email-address"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
              </GridContainer>
              <Button size= "sm" color="danger" className={classes.updateProfileButton} onClick={this.handleFormButtonToggle}>
                Delete
              </Button>
              <Button size= "sm" color="rose" className={classes.updateProfileButton} onClick={this.handleFormButtonToggle}>
                {this.state.editMode? "Save Changes" : "Update"}
              </Button>
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
            <GridContainer>
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
                      value: this.state.shelter.shelter
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
            </GridContainer>
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
    roleID : state.userReducer.roleID
  }
}

ShelterProfile.propTypes = {
  classes: PropTypes.object
};

export default connect(
  mapStateToProps,
  {}
)(withStyles(shelterProfileStyles)(ShelterProfile))


