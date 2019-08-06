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


import MaskedInput from 'react-text-mask';

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Face from "@material-ui/icons/Face";



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

//text mask for 5 digit 
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


class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      streetState: "",
      city: "",  
      cityState: "",
      state: "",
      stateState: "",
      zip: "",
      zipState: "",
      nickname: "",
      nicknameState: "",
      options: []
    };
  }
  sendState() {
    return this.state;
  }

  componentDidMount() {
    axios.get('process.env.backendurl/api/internal/paws/options/3')
    .then(options => {
      this.setState({
        options: options.data.states
      })
      console.log(this.state.options)
    })
    .catch( error => {
      console.log(error)
    })
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
      this.state.streetState === "success" &&
      this.state.cityState === "success" &&
      this.state.stateState === "success" && 
      this.state.zipState === "success" && 
      this.state.nicknameState === "success"
    ) {
      return true;
    } else {
      if (this.state.streetState !== "success") {
        this.setState({ streetState: "error" });
      }
      if (this.state.cityState !== "success") {
        this.setState({ cityState: "error" });
      }
      if (this.state.stateState !== "success") {
        this.setState({ stateState: "error" });
      }
      if (this.state.zipState !== "success") {
        this.setState({ zipState: "error" });
      }
      if (this.state.nicknameState !== "success") {
        this.setState({ nicknameState: "error" });
      }
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Please enter your main location information</h4>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <CustomInput
            success={this.state.streetState === "success"}
            error={this.state.streetState === "error"}
            labelText={
              <span>
                Street Address <small>(required)</small>
              </span>
            }
            id="street"
            formControlProps={{
              fullWidth: true
            }}

            inputProps={{
              onChange: event => this.change(event, "street", "length", 5),
              
            }}

          />
        </GridItem>
        <GridItem xs={12} sm={4}>
          <CustomInput
            success={this.state.cityState === "success"}
            error={this.state.cityState === "error"}
            labelText={
              <span>
                City <small>(required)</small>
              </span>
            }
            id="city"
            formControlProps={{
              fullWidth: true
            }}

            inputProps={{
              onChange: event => this.change(event, "city", "length", 3),
              
            }}
          />
        </GridItem>
       
        <GridItem xs={12} sm={3}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="state" className={classes.selectLabel}>
              Choose State
            </InputLabel>
            <Select
              //disabled
              MenuProps={{
                className: classes.selectMenu
              }}
              classes={{
                select: classes.select
              }}
              value={this.state.state}
              onChange={this.handleSimple}
              name="state"
              id= "state"
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem
                }}
              >
                State
              </MenuItem>

              {this.state.options.map((state, key) => (
                  <MenuItem
                  classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value={state.id}
              >
                {state.state}
              </MenuItem>
              ))}
              
            </Select>
          </FormControl>
        </GridItem>
         <GridItem xs={12} sm={3}>
          
          <CustomInput
            success={this.state.zipState === "success"}
            error={this.state.zipState === "error"}
            labelText={
              <span>
                Zipcode <small>(required)</small>
              </span>
            }
            id="zip"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "zip", "digit-only", 5),
              onClick: event => moveCursor(event),
              onFocus: event => moveCursor(event),
              inputComponent : TextMaskCustom,
            
            }}
          />
          
        </GridItem>
         <GridItem xs={12} sm={4}>
          <CustomInput
            success={this.state.nicknameState === "success"}
            error={this.state.nicknameState === "error"}
            labelText={
              <span>
                Location Name <small>(required)</small>
              </span>
            }
            id="nickname"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "nickname", "length", 3),
              
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
