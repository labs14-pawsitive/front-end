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

import { getAllOptions } from '../../actions/animalAction'
import { update_user_profile } from '../../actions/userAction'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

import MaskedInput from 'react-text-mask';

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/UserCustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import CustomSnackBar from './CustomSnackBar'
import SnackBarInfo from './SnackBarInfo'

import userProfileStyles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.jsx";

import avatar from "assets/img/faces/marc.jpg";


function moveZipCursor(event) {
  let digits = event.target.value.replace(/\D/g, '');
  event.target.setSelectionRange(digits.length, digits.length);
}

//text mask for zip 5 digit 
function ZipMaskCustom(props) {
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

ZipMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


function movePhoneCursor(event) {
  let digits = event.target.value.replace(/\D/g, '').length;
  if (digits <= 3) {
    event.target.setSelectionRange(digits + 1, digits + 1);
  } else if (digits > 3 && digits <= 6) {
    event.target.setSelectionRange(digits + 3, digits + 3);
  } else if (digits > 6 && digits <= 10) {
    event.target.setSelectionRange(digits + 4, digits + 4)
  }
}


function PhoneMaskCustom(props) {
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

PhoneMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

//refactor this to a class component

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: "",
        phone_number: "",
        state_id: null
      },
      fieldState: {
        firstNameState: 'success',
        lastNameState: 'success',
        streetAddressState: "success",
        cityState: "success",
        stateState: "success",
        zipcodeState: "success",
        phone_numberState: "success",
        state_idState: "success"
      },
      isUpdate: false,
      updated: false
    }
  }

  componentDidMount() {
    Promise.all(this.props.getAllOptions(0))
      .then(res => {
        this.setState({
          user: {
            username: this.props.user.username,
            email: this.props.user.email,
            streetAddress: this.props.user.street_address,
            city: this.props.user.city,
            state: this.props.user.state,
            zipcode: this.props.user.zip,
            firstName: this.props.user.name ? this.props.user.name.split(' ')[0] : '',
            lastName: this.props.user.name ? this.props.user.name.split(' ')[1] : '',
            phone_number: this.props.user.phone_number
          }
        })
      })
      .catch(error => {
        console.log('component did mount in userprofile error', error)
      })
  }

  componentDidUpdate(prevProps) {

    if (this.props.user !== prevProps.user) {
      this.setState({
        user: {
          username: this.props.user.username,
          email: this.props.user.email,
          streetAddress: this.props.user.street_address,
          city: this.props.user.city,
          state: this.props.user.state,
          zipcode: this.props.user.zip,
          firstName: this.props.user.name ? this.props.user.name.split(' ')[0] : '',
          lastName: this.props.user.name ? this.props.user.name.split(' ')[1] : '',
          phone_number: this.props.user.phone_number
        }
      })
    }
  }

  verifyDigitOnly(value, length) {
    let digits = value.replace(/\D/g, '');
    if (digits.length === length) {
      return true;
    }
    return false
  }

  isValidated() {

    if (
      this.state.fieldState.firstNameState === "success" &&
      this.state.fieldState.lastNameState === "success" &&
      this.state.fieldState.streetAddressState === "success" &&
      this.state.fieldState.zipcodeState === "success" &&
      this.state.fieldState.phone_numberState === "success" &&
      this.state.fieldState.cityState === "success"
    ) {
      return true;
    } else {
      if (this.state.fieldState.firstNameState !== "success") {
        this.setState({
          fieldState: {
            ...this.state.fieldState,
            firstNameState: "error"
          }
        });
      }
      if (this.state.fieldState.lastNameState !== "success") {
        this.setState({
          fieldState: {
            ...this.state.fieldState,
            lastNameState: "error"
          }
        });
      }
      if (this.state.fieldState.streetAddressState !== "success") {
        this.setState({
          fieldState: {
            ...this.state.fieldState,
            streetAddressState: "error"
          }
        });
      }
      if (this.state.fieldState.cityState !== "success") {
        this.setState({
          fieldState: {
            ...this.state.fieldState,
            cityState: "error"
          }
        });
      }
      if (this.state.fieldState.zipcodeState !== "success") {
        this.setState({
          fieldState: {
            ...this.state.fieldState,
            zipcodeState: "error"
          }
        });
      }
      if (this.state.fieldState.phone_numberState !== "success") {
        this.setState({
          fieldState: {
            ...this.state.fieldState,
            phone_numberState: "error"
          }
        });
      }
    }
    // console.log("isValidated is false")
    return false;
  }

  handleChange = (event) => {

    if (event.target.value.length >= 3 || event.target.value.length === 0) {
      this.setState({
        fieldState: {
          ...this.state.fieldState,
          [event.target.id + "State"]: "success"
        }
      })
    }
    else {
      this.setState({
        fieldState: {
          ...this.state.fieldState,
          [event.target.id + "State"]: "error"
        }
      })
    }

    this.setState({
      user: {
        ...this.state.user,
        [event.target.id]: event.target.value
      }
    })
  }

  handleNumbers(event, stateName, type, stateNameEqualTo) {
    switch (type) {

      case "digit-only":
        if (this.verifyDigitOnly(event.target.value, stateNameEqualTo)) {
          this.setState({
            fieldState: {
              ...this.state.fieldState,
              [stateName + "State"]: "success"
            }
          });
        } else {
          this.setState({
            fieldState: {
              ...this.state.fieldState,
              [stateName + "State"]: "error"
            }
          });
        }
      default:
        break;
    }

    this.setState({
      user: {
        ...this.state.user,
        [stateName]: event.target.value
      }
    });
  }

  handleState = (event) => {

    const targetID = this.props.states ? this.props.states.find(state => state.state === event.target.value).id : ''

    console.log('target Id is ', targetID)
    if (targetID) {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value,
          state_id: targetID
        }
      })
    }

  }

  handleToggle = () => {
    this.setState({
      isUpdate: !this.state.isUpdate
    })
  }

  handleUpdate = (event) => {
    event.preventDefault()

    if (this.state.isUpdate) {
      console.log('update state : ', this.state.isUpdate)

      const UserObj = {
        name: `${this.state.user.firstName} ${this.state.user.lastName}`,
        street_address: this.state.user.streetAddress,
        city: this.state.user.city,
        state_id: this.state.user.state_id,
        zip: this.state.user.zipcode,
        phone_number: this.state.user.phone_number
      }

      console.log('updated info is :', UserObj)

      if (this.isValidated()) {

        this.props.update_user_profile(this.props.user.id, UserObj)
          .then(res => {
            console.log('updated user profile data ', res)
            this.setState({
              updated: true
            })
          })
          .catch(error => { console.log('updated user profile error ', error) })
      }
      this.setState({
        isUpdate: false
      })
    }
    else {
      this.handleToggle(event)
    }
  }

  handleCancel = (event) => {
    event.preventDefault()

    this.setState({
      isUpdate: false
    })
  }



  render() {
    const { classes } = this.props;

    console.log('user profile state data : ', this.state.user)

    const customStyle = {

      formControlStyle: {
        width: "100%",
        marginRight: "7%",
        marginBottom: "30px",
      },

      colorStyle: {
        color: "rgba(0, 0, 0, 0.87)"
      },
      color1Style: {
        color: "rgba(0, 0, 0, 0.87)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.54)"
      },

      dropdownGridStyle: {
        marginTop: "12px"
      }

    }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Profile - <small>Complete your profile</small>
                </h4>
                {!this.state.isUpdate && this.props.user.shelter && <SnackBarInfo shelter={this.props.user.shelter} />}
                {this.state.isUpdate && <CustomSnackBar />}
              </CardHeader>

              <CardBody>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={5}>
                    <TextField
                      id="username"
                      label="Username"
                      className={classes.textField}
                      value={this.props.user.username}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                        fullWidth: true
                      }}
                      InputLabelProps={{
                        style: { color: 'rgba(0, 0, 0, 0.87)' },
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={7}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email address"
                      className={classes.textField}
                      disableUnderline
                      value={this.props.user.email}
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        style: { color: 'rgba(0, 0, 0, 0.87)' },
                      }}
                    />
                  </GridItem>

                </GridContainer>


                <GridContainer>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                    
                      success={this.state.isUpdate && this.state.fieldState.firstNameState === "success"}
                      error={this.state.isUpdate && this.state.fieldState.firstNameState === "error"}
                      labelText="First Name"
                      id="firstName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.firstName,
                        onChange: event => this.handleChange(event, "firstName", "length", 3),
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={this.state.isUpdate && this.state.fieldState.lastNameState === "success"}
                      error={this.state.isUpdate && this.state.fieldState.lastNameState === "error"}
                      labelText="Last Name"
                      id="lastName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.lastName,
                        onChange: event => this.handleChange(event, "lastName", "length", 3),
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      success={this.state.isUpdate && this.state.fieldState.streetAddressState === "success"}
                      error={this.state.isUpdate && this.state.fieldState.streetAddressState === "error"}
                      labelText="Street Address"
                      id="streetAddress"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.streetAddress,
                        onChange: event => this.handleChange(event, "streetAddress", "length", 3),
                      }}
                    />

                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      success={this.state.isUpdate && this.state.fieldState.cityState === "success"}
                      error={this.state.isUpdate && this.state.fieldState.cityState === "error"}
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.city,
                        onChange: event => this.handleChange(event, "city", "length", 3),
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3} style={customStyle.dropdownGridStyle}>

                    <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                      <InputLabel style={customStyle.colorStyle} htmlFor="state">State</InputLabel>
                      <Select style={customStyle.color1Style}
                        name='state'
                        id='state'
                        renderValue={value => `${value}`}
                        disableUnderline
                        input={<Input id="state" />}
                        inputProps={{
                          disabled: this.state.isUpdate ? false : true,
                          value: this.state.user.state,
                          onChange: this.handleState

                        }}
                      >

                        {this.props.states.map(state => {
                          return (
                            <MenuItem
                              key={state.id} value={state.state}>{state.state}</MenuItem>
                          )
                        })}

                      </Select>
                    </FormControl>

                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      success={this.state.isUpdate && this.state.fieldState.zipcodeState === "success"}
                      error={this.state.isUpdate && this.state.fieldState.zipcodeState === "error"}
                      labelText="Zipcode"
                      id="zipcode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.zipcode,
                        onChange: event => this.handleNumbers(event, "zipcode", "digit-only", 5),
                        onClick: event => moveZipCursor(event),
                        onFocus: event => moveZipCursor(event),
                        inputComponent: ZipMaskCustom,

                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      success={this.state.isUpdate && this.state.fieldState.phone_numberState === "success"}
                      error={this.state.isUpdate && this.state.fieldState.phone_numberState === "error"}
                      labelText="Phone Number"
                      id="phone_number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.phone_number,
                        onChange: event => this.handleNumbers(event, "phone_number", "digit-only", 10),
                        onClick: event => movePhoneCursor(event),
                        onFocus: event => movePhoneCursor(event),
                        inputComponent: PhoneMaskCustom,
                      }}
                      labelProps={{
                        style:{color:"black !important"}
                      }}
                    />
                  </GridItem>

                </GridContainer>

                <Button color="rose" className={classes.updateProfileButton} onClick={this.handleUpdate}>
                  {this.state.isUpdate ? "SAVE" : "Update Profile"}
                </Button>

                <Button size="small" className={classes.updateProfileButton} onClick={this.handleCancel}
                  style={{ display: this.state.isUpdate ? "block" : "none" }}>
                  CANCEL
                </Button>


                <Clearfix />
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
    user: state.userReducer.user,
    states: state.animalReducer.dropdownAnimalOptions.states
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object
};

export default connect(
  mapStateToProps,
  { getAllOptions, update_user_profile }
)(withStyles(userProfileStyles)(UserProfile))