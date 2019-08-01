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
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import shelterProfileStyles from "assets/jss/material-dashboard-pro-react/views/shelterProfileStyles.jsx";

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            location: this.props.location,
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

selectChangeHandler = e => {
  this.setState({
    location: {
    ...this.state.location,
    [e.target.name] : e.target.value
    }
})
  console.log('WHERES THE CHANGE', [e.target.name])
}

updateLocation = e => {
  e.preventDefault()
}

deleteLocation = e => {
    e.preventDefault()
    this.props.deleteShelterLoc(this.props.location.id)
    .then( () => {
      this.props.updateShelter();
    })
}

updateSubmit = e => {
  e.preventDefault()

  const updatedLocation = {
      shelter_id: this.props.shelterID,
      street_address: this.state.location.street_address,
      city: this.state.location.city,
      zipcode: this.state.location.zipcode,
      state_id: this.state.location.state_id,
      phone_number: '222-222-2222',
      nickname: this.state.location.nickname,
      shelter_contact_id: this.state.location.shelter_contact_id
  }

  console.log('UPDATECHANGE', updatedLocation)


  this.props.updateShelterLoc(this.props.location.id, updatedLocation)
  .then( (res) => {
      this.props.updateShelter();
      console.log('UPDATESHELTERLOCATION:',this.props.shelterID)
  })
  .catch(err => {
    console.log('UpdateShelterLoc Error: ',err)
  });
  this.setState({
    editMode : !this.state.editMode
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
                    id="nickname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.nickname,
                      onChange: (e) => this.changeHandler(e)
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
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
            <FormControl
            fullWidth
            className={classes.selectFormControl}
            disabled= {this.state.editMode? false : true}>
            <InputLabel
            htmlFor="states_id"
            className={classes.selectLabel}>
            States
            </InputLabel>
            <Select
            MenuProps={{
                className: classes.selectMenu
            }}
            classes={{
                select: classes.select
            }}
            value={this.state.location.state_id}          
            onChange={this.selectChangeHandler}
            inputProps={{
                name: "state_id",
                id: "state_id"
            }}>
                {this.props.stateOptions.map(state => (
                    <MenuItem
                    key = {state.id}
                    classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected
                    }}
                    value= {state.id}>
                    {state.state}
                    </MenuItem>
                ))}   
                </Select>
            </FormControl>
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
            <GridItem xs={12} sm={12} md={6}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                  disabled= {this.state.editMode? false : true}>
                  <InputLabel
                  htmlFor="shelter_contact_id"
                  className={classes.selectLabel}>
                  Contact Person
                  </InputLabel>
                  <Select
                  MenuProps={{
                      className: classes.selectMenu
                  }}
                  classes={{
                      select: classes.select
                  }}
                  value={this.state.location.shelter_contact_id}
                  
                  onChange={this.selectChangeHandler}
                  inputProps={{
                      name: "shelter_contact_id",
                      id: "shelter_contact_id"
                  }}>
                      {this.props.contacts && this.props.contacts.map(contact => (
                          <MenuItem
                          key = {contact.id}
                          classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                          }}
                          value= {contact.id}>
                          {contact.name}
                          </MenuItem>
                      ))}   
                            </Select>
                        </FormControl>
                        </GridItem>
            <GridItem xs={12} sm={12} md={7}></GridItem>
            <GridItem xs={12} sm={12} md={5}>
            <Button size= "sm" 
              color="rose" 
              className={classes.updateProfileButton}
              onClick={this.handleFormButtonToggle}
              onClick={this.state.editMode? this.updateSubmit : this.handleFormButtonToggle}
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
      stateOptions: state.shelterReducer.stateOptions,
      fetchingShelter: state.shelterReducer.fetchingShelter, 
    }
  }
 
  
  export default connect(
    mapStateToProps,
    { updateShelterLoc, deleteShelterLoc, fetchShelter }
  )(withStyles(shelterProfileStyles)(Locations))
  