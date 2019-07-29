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

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameState: "",
      email: "",
      emailState:"",
      over18: false,
     // over18State:"",
      street: "",
      streetState: "",
      city: "",  
      cityState: "",
      state: "",
      stateState: "",
      zip: "",
      zipState: "",
      phone: "",
      phoneState: "",
      cell: "",
      cellState: "",
      options: []
    };
  }
  sendState() {
    return this.state;
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/internal/paws/options/3')
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
      this.state.nameState === "success" &&
      this.state.streetState === "success" &&
      this.state.cityState === "success" &&
      this.state.stateState === "success" && 
      this.state.zipState === "success" && 
      this.state.phoneState === "success" && 
      this.state.emailState === "success" 
   
    ) {
      return true;
    } else {
      if (this.state.nameState !== "success") {
        this.setState({ nameState: "error" });
      }
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
      if (this.state.phoneState !== "success") {
        this.setState({ phoneState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    
    }
    return false;
  }

  handleToggle() {
    this.setState({
      over18: !this.state.over18
    })
    /*
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
    */
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
          <h4 className={classes.infoText} style={customStyle.centerAlign}>Please tell us a little bit about yourself</h4>
        </GridItem>
        <GridItem xs={12} sm={5}>
          <CustomInput
            success={this.state.nameState === "success"}
            error={this.state.nameState === "error"}
            labelText={
              <span>
                Name <small>(required)</small>
              </span>
            }
            id="name"
            formControlProps={{
              fullWidth: true
            }}

            inputProps={{
              onChange: event => this.change(event, "name", "length", 5),
              
            }}

          />
        </GridItem>
        <GridItem xs={12} sm={5}>
          <CustomInput
            success={this.state.emailState === "success"}
            error={this.state.emailState === "error"}
            labelText={
              <span>
                Email <small>(required)</small>
              </span>
            }
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "email", "email"),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />

        </GridItem>
       

        <GridItem xs={12} sm={4}>
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
        <GridItem xs={12} sm={3}>
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
              {/* 
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="2"
              >
                France
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value="3"
              >
                Romania
              </MenuItem>
              */}
            </Select>
          </FormControl>
        </GridItem>
         <GridItem xs={12} sm={5}>
          
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
          {/* 
          <CustomInput
            success={this.state.zipState === "success"}
            error={this.state.zipState === "error"}
            labelText="ZipCode"
            id="zip"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "zip", "digit-only", 5),
              
            }}
          />
          */}
        </GridItem>
        <GridItem xs={12} sm={5}>
        
              <div className={classes.checkboxAndRadio}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => this.handleToggle()}
                        value={this.state.over18}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        //icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    classes={{
                      label: classes.label,
                      root: classes.labelRoot
                    }}
                    label="Are you over 18 years old?"
                  />
                </div>
        </GridItem>




         <GridItem xs={12} sm={5}>
          <CustomInput 
          success={this.state.phoneState === "success"}
            error={this.state.phoneState === "error"}
            labelText={
              <span>
                Phone Number <small>(required)</small>
              </span>
            }
            id="phone"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange : event => this.change(event, 'phone', 'digit-only', 10) ,
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
        <GridItem xs={12} sm={5}>
          <CustomInput 
          //success={this.state.phoneState === "success"}
          //  error={this.state.phoneState === "error"}
            labelText={
              <span>
                Cell Number <small>(required)</small>
              </span>
            }
            id="cell"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange : event => this.change(event, 'cell', 'digit-only', 10) ,
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
      </GridContainer>
    );
  }
}


Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
