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
            street_addressState: '',
            cityState: '',
            zipcodeState: '',
            nicknameState: '',
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
      shelter_id: localStorage.getItem('shelter_id'),
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
      console.log('UPDATESHELTERLOCATION:',localStorage.getItem('shelter_id'))
  })
  .catch(err => {
    console.log('UpdateShelterLoc Error: ',err)
  });
  this.setState({
    street_addressState: '',
    cityState: '',
    zipcodeState: '',
    nicknameState: '',
    editMode : !this.state.editMode
  })  
}

verifyLength(value, lengthNumber) {
  if (value.length >= lengthNumber) {
    return true;
  }
  return false;
}

verifyExactLen(value, length) {
  if( value.length === length) {
    return true;
  }
  return false
}

verifyDigitOnly(value, length) {
  let digits = value.replace(/\D/g,'');
  if(digits.length === length) {
    return true;
  } 
  return false
}

change(event, stateName, type, stateNameEqualTo) {
  switch (type) {
    case "length":
      if (this.verifyLength(event.target.value, stateNameEqualTo)) {
        this.setState({ [stateName + "State"]: "success" });
      } else {
        this.setState({ [stateName + "State"]: "error" });
      }
      break;
    case "exact-length":
      if (this.verifyExactLen(event.target.value, stateNameEqualTo)) {
        this.setState({ [stateName + "State"]: "success" });
      } else {
        this.setState({ [stateName + "State"]: "error" });
      }
      break;
    case "digit-only":
      if (this.verifyDigitOnly(event.target.value, stateNameEqualTo)) {
        this.setState({ [stateName + "State"]: "success" });
      } else {
        this.setState({ [stateName + "State"]: "error" });
      }
    default:
      break;
  }
  this.setState({ 
    location: {
    ...this.state.location,
    [stateName]: event.target.value 
    }
    })
}

isValidated() {
  if (
    this.state.nameState === "success" &&
    this.state.phoneState === "success" &&
    this.state.emailState === "success"
  ) {
    return true;
  } else {
    if (this.state.nameState !== "success") {
      this.setState({ nameState: "error" });
    }
    if (this.state.phoneState !== "success") {
      this.setState({ phoneState: "error" });
    }
    if (this.state.emailState !== "success") {
      this.setState({ emailState: "error" });
    }
  }
  return false;
}


    render() {
        const customStyle = {
            shelterDisplayView : {
              color:"#333333 !important",
            }
          }
        const selectStyle = {
          underline: {
            "&:hover:not($disabled):before,&:before": {
              borderColor: "#D2D2D2 !important",
              borderWidth: "1px !important"
            },
            "&:after": {
              borderColor: "#9c27b0"
            },
            "& + p": {
              fontWeight: "300"
            }
          },
          
          labelRoot: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "300",
            lineHeight: "1.5em",
            color: "#333333",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "1.42857",
            top: "10px",
            letterSpacing: "unset",
            "& + $underline": {
              marginTop: "0px"
            }
          },

          formControl: {
            margin: "0 0 17px 0",
            paddingTop: "12px",
            position: "relative",
            verticalAlign: "unset",
            "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
            color: "#495057",
            }
          },

          input: {
            color: "#495057",
            height: "unset",
            fontSize: "14px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "400",
            lineHeight: "1.42857",
            underline: {
              "&:hover:not($disabled):before,&:before": {
                borderColor: "#D2D2D2 !important",
                borderWidth: "1px !important"
              },
              "&:after": {
                borderColor: "#9c27b0"
              },
              "& + p": {
                fontWeight: "300"
              }
            },
          
          },

        }
          const { classes } = this.props;
        return (
            <>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Nickname"
                    id="nickname"
                    success={this.state.nicknameState === "success"}
                    error={this.state.nicknameState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.nickname,
                      onChange: event => this.change(event, "nickname", "length", 4) 
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
                    success={this.state.street_addressState === "success"}
                    error={this.state.street_addressState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.street_address,
                      onChange: event => this.change(event, "street_address", "length", 5),
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
              </GridItem>
               <GridItem xs={12} sm={12} md={6}>
               <CustomInput
                    labelText="City"
                    id="city"
                    success={this.state.cityState === "success"}
                    error={this.state.cityState === "error"}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.city,
                      onChange: event => this.change(event, "city", "length", 3),
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />  
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
            <FormControl
            fullWidth
            className={classes.selectFormControl}
            style = {selectStyle.formControl}
            disabled= {this.state.editMode? false : true}>
            <InputLabel
            htmlFor="states_id"
            style={selectStyle.labelRoot}
            className={classes.selectLabel}>
            States
            </InputLabel>
            <Select
            MenuProps={{
                className: classes.selectMenu
            }}
            style= {selectStyle.input}
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
                    style = {selectStyle.input}
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
                    success={this.state.zipcodeState === "success"}
                    error={this.state.zipcodeState === "error"}

                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.location.zipcode,
                      onChange: event => this.change(event, "zipcode", "digit-only", 5),
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}
                  />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}
                  style= {selectStyle.formControl}
                  disabled= {this.state.editMode? false : true}
                  >
                  <InputLabel
                  htmlFor="shelter_contact_id"
                  className={classes.selectLabel}
                  style={selectStyle.labelRoot}
                  >
                  Contact Person
                  </InputLabel>
                  <Select
                  MenuProps={{
                      className: classes.selectMenu
                  }}
                  classes={{
                      select: classes.select
                  }}
                  style= {selectStyle.input}
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
                color="rose" 
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
  