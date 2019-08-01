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

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import MaskedInput from 'react-text-mask';

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  ...customSelectStyle
};


function moveCursor(event) {
  let digits = event.target.value.replace(/\D/g,'');
  event.target.setSelectionRange(digits.length,digits.length);
}

//text mask for zip 5 digit 
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      //showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


//text mask for zip 5 digit 
function PhoneMask(props) {
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

PhoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name1: "",
      name1State: "",
      phone1: "",
      phone1State:"",
      relationship1:"",
      relationship1State:"",
       name2: "",
      name2State: "",
      phone2: "",
      phone2State:"",
      relationship2:"",
      relationship2State:"",
    };
  }
  sendState() {
    return this.state;
  }

  

  //validate state not empty
  handleSimple = event => {
    if(event.target.value != null) {
      this.setState({ [event.target.name + "State"]: "success" });
        } else {
          this.setState({ [event.target.name + "State"]: "error" });
        }
      this.setState({ [event.target.name]: event.target.value });
    }
    

  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
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
    
    this.setState({ [stateName]: event.target.value });
  }

  isValidated() {
    if (
      this.state.name1State === "success" &&
      this.state.phone1State === "success" &&
      this.state.relationship1State === "success" &&
      this.state.name2State === "success" && 
      this.state.phone2State === "success" && 
      this.state.relationship2State === "success"
   
    ) {
      return true;
    } else {
      if (this.state.name1State !== "success") {
        this.setState({ name1State: "error" });
      }
      if (this.state.phone1State !== "success") {
        this.setState({ phone1State: "error" });
      }
      if (this.state.relationship1State !== "success") {
        this.setState({ relationship1State: "error" });
      }
      if (this.state.name2State !== "success") {
        this.setState({ name2State: "error" });
      }
      if (this.state.phone2State !== "success") {
        this.setState({ phone2State: "error" });
      }
      if (this.state.relationship2State !== "success") {
        this.setState({ relationship2State: "error" });
      }
    }
    return false;
  }


  render() {
    const { classes } = this.props;
    //let hideDropdown = editMode? disabled : null;
    const customStyle = {
      centerAlign: {
        textAlign:"center"
      }
    }
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText} style={customStyle.centerAlign}>Please provide 2 references</h4>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <CustomInput
            success={this.state.name1State === "success"}
            error={this.state.name1State === "error"}
            labelText={
              <span>
                Name <small>(required)</small>
              </span>
            }
            id="namd1"
            formControlProps={{
              fullWidth: true
            }}

            inputProps={{
              onChange: event => this.change(event, "name1", "length", 5),
              
            }}

          />
        </GridItem>
         <GridItem xs={12} sm={5}>
          <CustomInput 
          success={this.state.phone1State === "success"}
            error={this.state.phone1State === "error"}
            labelText={
              <span>
                Phone Number <small>(required)</small>
              </span>
            }
            id="phone1"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange : event => this.change(event, 'phone1', 'digit-only', 10) ,
              onClick: event => moveCursor(event),
              onFocus: event => moveCursor(event),
              inputComponent : PhoneMask,
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>

              )
            }}
          />
          </GridItem>
        <GridItem xs={12} sm={10}>
          <CustomInput
            success={this.state.relationship1State === "success"}
            error={this.state.relationship1State === "error"}
            labelText={
              <span>
                Relationship <small>(required)</small>
              </span>
            }
            id="relationship1"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "relationship1", "length", 5),
              
            }}
          />
        </GridItem>
       
        <GridItem xs={12} sm={5}>
          <CustomInput
            success={this.state.name2State === "success"}
            error={this.state.name2State === "error"}
            labelText={
              <span>
                Name <small>(required)</small>
              </span>
            }
            id="namd2"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "name2", "length", 5),
              
            }}
          />
        </GridItem>
         <GridItem xs={12} sm={5}>
          <CustomInput 
          success={this.state.phone2State === "success"}
            error={this.state.phone2State === "error"}
            labelText={
              <span>
                Phone Number <small>(required)</small>
              </span>
            }
            id="phone2"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange : event => this.change(event, 'phone2', 'digit-only', 10) ,
              onClick: event => moveCursor(event),
              onFocus: event => moveCursor(event),
              inputComponent : PhoneMask,
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>

              )
            }}
          />
          </GridItem>
        <GridItem xs={12} sm={10}>
          <CustomInput
            success={this.state.relationship2State === "success"}
            error={this.state.relationship2State === "error"}
            labelText={
              <span>
                Relationship <small>(required)</small>
              </span>
            }
            id="relationship2"
            formControlProps={{
              fullWidth: true
            }}

            inputProps={{
              onChange: event => this.change(event, "relationship2", "length", 5),
              
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}


Step3.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step3);
