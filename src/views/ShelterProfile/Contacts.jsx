import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { fetchShelter ,updateShelterCon, deleteShelterCon } from '../../actions/shelterAction';
import { axiosWithAuth } from 'axiosWithAuth';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";


import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/ShelterCustomInput.jsx";

import shelterProfileStyles from "assets/jss/material-dashboard-pro-react/views/shelterProfileStyles.jsx";
import MaskedInput from 'react-text-mask';


function moveCursor(event) {
  let digits = event.target.value.replace(/\D/g,'').length;
  if(digits <= 3){
      event.target.setSelectionRange(digits +1, digits+1);
  } else if (digits > 3 && digits <= 6) {
      event.target.setSelectionRange(digits+3, digits+3);
  } else if (digits > 6 && digits <= 10){
    event.target.setSelectionRange(digits+4, digits+4)
  }
}

//mask for phone number
function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        //showMask
      />
    );
  }


  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };
  

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            contact : this.props.contact,
            nameState: 'success',
            emailState: 'success',
            phoneState: 'success',
            delError: false,
            shelterVerified : ''

        }

    }

  verifyShelter = async(shelter_id) => {
      //verifying shelter before proceeding
      axiosWithAuth()
        .get(`https://staging2-pawsnfind.herokuapp.com/api/auth/shelter/${shelter_id}`)
        .then( result => { 
          this.setState({
            shelterVerified : true
          })
          console.log(result)
        })
        .catch( error => {
          console.log(error)
          this.setState({
            shelterVerified : false
          })
        })
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
      
cancelClick = e => {
  e.preventDefault()
  this.setState({
    editMode : !this.state.editMode,
    contact: this.props.contact,
    nameState: 'success',
    emailState: 'success',
    phoneState: 'success',
    delError: false,
  })
 }

deleteContact = async(e) => {
    e.preventDefault()
    await this.verifyShelter(localStorage.getItem('shelter_id'))
    //if(this.state.shelterVerified) {
    this.props.deleteShelterCon(this.props.contact.id)
    .then( () => {
      this.props.updateShelter();
      this.setState({
        shelterVerified : ''
      })
    })
    this.setState({
      delError: true
    })
  //}
}

updateSubmit = async(e) => {
    e.preventDefault()
    await this.verifyShelter(localStorage.getItem('shelter_id'))

    //if (this.isValidated() && this.state.shelterVerified) {
    if (this.isValidated()){
    const updatedContact = {
        name: this.state.contact.name,
        email: this.state.contact.email,
        phone: this.state.contact.phone,
        shelter_id: localStorage.getItem('shelter_id')
    }

    console.log('UPDATECHANGE', updatedContact)


    this.props.updateShelterCon(this.props.contact.id, updatedContact)
    .then( (res) => {
        this.props.updateShelter();
        this.setState({
          shelterVerified : ''
        })
        console.log('UPDATESHELTERLOCATION:',localStorage.getItem('shelter_id'))
    })
    .then( (res) => {
      console.log('update shelter location shelter:', res)
  })
    .catch(err => {
      console.log('WHATS THE PROBLEM',err)
    });
    this.setState({
      editMode : !this.state.editMode,
      nameState: 'success',
      emailState: 'success',
      phoneState: 'success',
    })
  } else {console.log(' Locations Fields not validated')}
}

//---------Verification for fields:


verifyEmail(value) {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
  return true;
  }
  return false;
}

verifyLength(value, lengthNumber) {
  if (value.length >= lengthNumber) {
    return true;
  }
  return false;
}

verifyExactLength(value, lengthNumber) {
  if( value.length === lengthNumber) {
    return true;
  }
  return false
}

verifyDigitOnly(value, lengthNumber) {
  let digits = value.replace(/\D/g,'');
  if(digits.length === lengthNumber) {
    return true;
  } 
  return false
}

change(event, stateName, type, stateNameEqualTo) {
  switch (type) {
    case "email":
      if (this.verifyEmail(event.target.value)) {
        this.setState({ [stateName + "State"]: "success" });
      } else {
        this.setState({ [stateName + "State"]: "error" });
      }
      break;
    case "length":
      if (this.verifyLength(event.target.value, stateNameEqualTo)) {
        this.setState({ [stateName + "State"]: "success" });
      } else {
        this.setState({ [stateName + "State"]: "error" });
      }
      break;
    case "exact-length":
      if (this.verifyExactLength(event.target.value, stateNameEqualTo)) {
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
    contact: {
      ...this.state.contact,
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
            },
            errorColor: {
              color: "#d81b60"
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
                    success={this.state.editMode? this.state.nameState === "success" : null}
                    error={this.state.nameState === "error"}

                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.contact.name,
                      // onChange: (e) => this.changeHandler(e)
                      onChange: event => this.change(event, "name", "length", 3),

                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    success={this.state.editMode? this.state.emailState === "success" : null }
                    error={this.state.emailState === "error"}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.contact.email,
                      // onChange: (e) => this.changeHandler(e)
                      onChange: event => this.change(event, "email", "email"),
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone Number"
                    id="phone"
                    success={this.state.editMode? this.state.phoneState === "success": null}
                    error={this.state.phoneState === "error"}
                
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: this.state.editMode? false : true,
                      value: this.state.contact.phone,
                      // onChange: (e) => this.changeHandler(e),
                      onChange : event => this.change(event, 'phone', 'digit-only', 10) ,
                      onClick: event => moveCursor(event),
                      onFocus: event => moveCursor(event),
                      inputComponent : TextMaskCustom,
                    }}
                    style={this.state.editMode? "" : customStyle.shelterDisplayView}

                  />
                </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            {this.state.editMode && this.props.error && this.state.delError && <span style={customStyle.errorColor}>
                <small> Error: Contact is associated with an existing location </small> </span>}
            <GridItem xs={12} sm={12} md={12}>
            {this.state.editMode && <Button size= "sm" 
              color="rose" 
              className={classes.updateProfileButton}
               onClick={this.cancelClick}>
                Cancel
              </Button> }
            <Button 
                size= "sm" 
                color="rose" 
                className={classes.updateProfileButton}
                onClick={this.state.editMode? this.updateSubmit : this.handleFormButtonToggle}
              >
                {this.state.editMode? "Save" : "Edit"}
              </Button>

              {this.state.editMode && <Button size= "sm" 
              color="rose" 
              className={classes.updateProfileButton}
               onClick={this.deleteContact}>
                Delete
                  </Button>}
                  </GridItem>
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
      error: state.shelterReducer.error,
      location: state.shelterReducer.location
    }
  }
 
  
  export default connect(
    mapStateToProps,
    { updateShelterCon, deleteShelterCon, fetchShelter }
  )(withStyles(shelterProfileStyles)(Contacts))
  
