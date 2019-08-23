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

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
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
        state_id:null
      },
      isUpdate: false,
      updated:false
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

  componentDidUpdate(prevProps){

    if(this.props.user !== prevProps.user){
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
    })}
  }

  handleChange = (event) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.id]: event.target.value
      }
    })
  }

  handleState = (event) => {

    const targetID = this.props.states ? this.props.states.find(state => state.state === event.target.value).id : ''

    if(targetID){
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
        state_id:targetID
      }
    })}
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

      this.props.update_user_profile(this.props.user.id, UserObj)
      .then(res => 
        {console.log('updated user profile data ', res)
        this.setState({
          updated: true
        })
        })
      .catch(error => { console.log('updated user profile error ', error)})

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
                {this.state.updated && !this.state.isUpdate && this.props.user.shelter && <SnackBarInfo shelter={this.props.user.shelter}/>}
                {this.state.isUpdate && <CustomSnackBar />}
              </CardHeader>

              <CardBody>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Username"
                      id="username"

                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.props.user.username,
                        onChange:this.handleChange
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.props.user.email,
                        onChange: this.handleChange
                      }}
                    />
                  </GridItem>

                </GridContainer>


                <GridContainer>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="firstName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.firstName,
                        onChange: this.handleChange
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="lastName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.lastName,
                        onChange: this.handleChange
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Street Address"
                      id="streetAddress"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.streetAddress,
                        onChange: this.handleChange
                      }}
                    />

                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.city,
                        onChange: this.handleChange
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
                      labelText="Zipcode"
                      id="zipcode"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.zipcode,
                        onChange: this.handleChange

                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Phone Number"
                      id="phone_number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isUpdate ? false : true,
                        value: this.state.user.phone_number,
                        onChange: this.handleChange
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