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
import { addShelterLoc , fetchOptions, fetchShelter  } from "../../actions/shelterAction";

import shelterProfileStyles from "assets/jss/material-dashboard-pro-react/views/shelterProfileStyles.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/ShelterCustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            street_address: '',
            street_addressState: '',
            city: '',
            cityState: '',
            zipcode: '',
            zipcodeState: '',
            state_id: '',
            nickname: '',
            nicknameState: '',
            shelter_contact_id: '',
            open: false,
            fullWidth: true,
        };
    }

    // componentDidMount(){
    //     this.props.fetchOptions(localStorage.getItem('shelter_id'));
    // }


// Dialog functions 

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };

    handleClose = () => {
        this.setState({
            street_address: '',
            street_addressState: '',
            city: '',
            cityState: '',
            zipcode: '',
            zipcodeState: '',
            state_id: '',
            nickname: '',
            nicknameState: '',
            shelter_contact_id: '', 
            open: false 
        });
    };

//

    handleSubmit = e => {
        e.preventDefault()

        const newLocation = {
            shelter_id: localStorage.getItem('shelter_id'),
            street_address: this.state.street_address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            state_id: this.state.state_id,
            nickname: this.state.nickname,
            phone_number: '7012258948',
            shelter_contact_id: this.state.shelter_contact_id
            }

        console.log(newLocation)

        this.props.addShelterLoc(localStorage.getItem('shelter_id'), newLocation)

        .then( () => {
            this.props.updateShelter();
        });

        this.handleClose()
        this.setState({
            street_address: '',
            street_addressState: '',
            city: '',
            cityState: '',
            zipcode: '',
            zipcodeState: '',
            state_id: '',
            nickname: '',
            nicknameState: '',
            shelter_contact_id: '',
        })
        
    }

    changeHandler = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    inputchangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    //---------Verification for fields:
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
        this.setState({ [stateName]: event.target.value });
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
        const { classes } = this.props;
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
        return (
            <div>
                <Button className={classes.addButton} size="lg" color="rose" onClick={this.handleClickOpen}>
                Add A Location
                </Button> 
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={this.state.fullWidth}
                >
                    <DialogTitle id="form-dialog-title">
                        Add A Location
                    </DialogTitle>
                    <DialogContentText>
                    </DialogContentText>
                    <DialogContent>
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <CustomInput 
                        id = "nickname"
                        labelText = "Location Name"
                        success={this.state.nicknameState === "success"}
                        error={this.state.nicknameState === "error"}
                        formControlProps={{
                            fullWidth: true
                            }}
                        inputProps={{
                            // type: "text",
                            // value: this.state.nickname,
                            // onChange: (e) => this.inputchangeHandler(e)
                            onChange: event => this.change(event, "nickname", "length", 4)
                            }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <CustomInput 
                        id = "street_address"
                        labelText = "Street Address"
                        success={this.state.street_addressState === "success"}
                        error={this.state.street_addressState === "error"}

                        inputProps={{
                            // type: "text",
                            // value: this.state.street_address,
                            // onChange: (e) => this.inputchangeHandler(e)
                            onChange: event => this.change(event, "street_address", "length", 5),
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <CustomInput 
                        id = "city"
                        labelText = "City"
                        success={this.state.cityState === "success"}
                        error={this.state.cityState === "error"}

                        inputProps={{
                            // type: "text",
                            // value: this.state.city,
                            // onChange: (e) => this.inputchangeHandler(e)
                            onChange: event => this.change(event, "city", "length", 3),

                            }}
                        formControlProps={{
                                fullWidth: true
                            }}
                        />
                        </GridItem>
                        
                        <GridItem xs={12} sm={12} md={3}>
                        <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                        style={selectStyle.formControl}>
                        <InputLabel
                        htmlFor="states"
                        className={classes.selectLabel}
                        style={selectStyle.labelRoot}>
                        States
                        </InputLabel>
                        <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                        value={this.state.state_id}
                        style={selectStyle.input}
                        onChange={this.changeHandler}
                        inputProps={{
                            name: "state_id",
                            id: "state-select"
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

                        <GridItem xs={12} sm={12} md={3}>

                        <CustomInput 
                        id = "zipcode"
                        labelText = "Zipcode"
                        success={this.state.zipcodeState === "success"}
                        error={this.state.zipcodeState === "error"}

                        inputProps={{
                            // type: "text",
                            // value: this.state.zipcode,
                            // onChange: (e) => this.inputchangeHandler(e)
                            onChange: event => this.change(event, "zipcode", "digit-only", 5),
                        }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                        style={selectStyle.formControl}>
                        <InputLabel
                        htmlFor="contacts"
                        className={classes.selectLabel}
                        style={selectStyle.labelRoot}>
                        Contact Person
                        </InputLabel>
                        <Select
                        MenuProps={{
                            className: classes.selectMenu
                        }}
                        classes={{
                            select: classes.select
                        }}
                        value={this.state.shelter_contact_id}
                        style={selectStyle.input}
                        onChange={this.changeHandler}
                        inputProps={{
                            name: "shelter_contact_id",
                            id: "contact-select"
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

                    </GridContainer>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" >
                            Add New Location
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      userID : state.userReducer.userID,
      shelterID : state.shelterReducer.shelterID,
      stateOptions: state.shelterReducer.stateOptions,
      contactOptions: state.shelterReducer.contactOptions,
      shelterWorkerID : state.userReducer.shelterWorkerID,
      roleID : state.userReducer.roleID
      
    }
  }
  
  export default connect(
    mapStateToProps,
    { addShelterLoc , fetchOptions, fetchShelter }
  )(withStyles(shelterProfileStyles)(LocationForm))
  