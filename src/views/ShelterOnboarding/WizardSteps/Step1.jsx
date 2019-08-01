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
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import MaskedInput from 'react-text-mask';


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import PictureUpload from "components/CustomUpload/PictureUpload.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};


function moveCursor(event) {
  let digits = event.target.value.replace(/\D/g,'');
  event.target.setSelectionRange(digits.length,digits.length);
}

//text mask for ein 9 digit 
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      //showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};



class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelterName: "",
      shelterNameState: "",
      ein: "",
      einState: "",
      textmask: '(   )    -    ',
      textmaskState: ""

    };
  }
  sendState() {
    return this.state;
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
      this.state.shelterNameState === "success" &&
      this.state.einState === "success" //&&
     // this.state.emailState === "success"
    ) {
      return true;
    } else {
      if (this.state.shelterNameState !== "success") {
        this.setState({ shelterNameState: "error" });
      }
      if (this.state.einState !== "success") {
        this.setState({ einState: "error" });
      }
      /*
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
      */
    }
    return false;
  }

handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



  render() {
    const { classes } = this.props;
        const { textmask } = this.state;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Let{"'"}s start with some legal information
          </h4>
        </GridItem>
        
        <GridItem xs={12} sm={6}>
          <CustomInput
            success={this.state.shelterNameState === "success"}
            error={this.state.shelterNameState === "error"}
            labelText={
              <span>
                Legal Shelter Name <small>(required)</small>
              </span>
            }
            id="shelterName"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "shelterName", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Face className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            success={this.state.einState === "success"}
            error={this.state.einState === "error"}
            labelText={
              <span>
                EIN <small>(required, please enter your 9 digit EIN number only, no dash)</small>
              </span>
            }
            id="ein"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "ein", "digit-only", 9),
              onClick: event => moveCursor(event),
              onFocus: event => moveCursor(event),
              inputComponent : TextMaskCustom,
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
       
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object,
  inputRef: PropTypes.func.isRequired,
};

export default withStyles(style)(Step1);
