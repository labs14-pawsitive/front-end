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
import { addShelterCon, fetchShelter } from "../../actions/shelterAction";
import {axiosWithAuth} from 'axiosWithAuth';


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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MaskedInput from 'react-text-mask';

//verification and mask up here

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
  

class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameState: '',
            email: '',
            emailState: '',
            phone: '(   )    -    ',
            phoneState: '',
            open: false,
            fullWidth: true,
            isValidatedState: false,
            shelterVerified : ''
        };
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
          //this.props.history.push('/')
        })
    }


// Dialog functions 

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };

    handleClose = () => {
        this.setState({ 
            name: '',
            nameState: '',
            email: '',
            emailState: '',
            phone: '(   )    -    ',
            phoneState: '',
            open: false,
        });

    };

//

 
    handleSubmit = async(e) => { 
      e.preventDefault()
      await this.verifyShelter(localStorage.getItem('shelter_id'))
       
        if (this.isValidated && this.state.shelterVerified) {
          const newContact = {

            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            shelter_id: localStorage.getItem('shelter_id')
            }

        console.log(newContact)
        this.props.addShelterCon(localStorage.getItem('shelter_id'), newContact)

        .then( () => {
            this.props.updateShelter()
            this.setState({
              shelterVerified : ''
            })
        });

        this.handleClose()
        this.setState({
            name: '',
            nameState: '',
            email: '',
            emailState: '',
            phone: '(   )    -    ',
            phoneState: '',
        })
       } else{ console.log('Not validated')}
    }

    
    changeHandler = e => {
        e.preventDefault();
        this.setState({
            [e.target.id] : e.target.value
        })
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
        return (
            <div>
                <Button className={classes.addButton} size="lg" color="rose" onClick={this.handleClickOpen}>
                Add A Contact
                </Button> 
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth={this.state.fullWidth}
                >
                    <DialogTitle id="form-dialog-title">
                        Add A Contact
                    </DialogTitle>
                    <DialogContentText>
                    </DialogContentText>
                    <DialogContent>
                        <CustomInput 
                        success={this.state.nameState === "success"}
                        error={this.state.nameState === "error"}
                        id = "name"
                        labelText = "Contact Name"
                        inputProps={{
                            // type: "text",
                            // value: this.state.name,
                            // onChange: (e) => this.changeHandler(e)
                            onChange: event => this.change(event, "name", "length", 3),
                            }}
                        formControlProps={{
                            fullWidth: true
                            }}
                        />

                        <CustomInput 
                        id = "email"
                        labelText = "Email Address"
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}

                        inputProps={{
                            // type: "email",
                            // value: this.state.email,
                            // onChange: (e) => this.changeHandler(e)
                            onChange: event => this.change(event, "email", "email"),
                            }}
                        formControlProps={{
                            fullWidth: true
                            }}
                        />

                        <CustomInput 
                        id = "phone"
                        labelText = "Phone Number"
                        success={this.state.phoneState === "success"}
                        error={this.state.phoneState === "error"}

                        inputProps={{
                            // type: "text",
                            // value: this.state.phone,
                            // onChange: (e) => this.changeHandler(e)
                            onChange : event => this.change(event, 'phone', 'digit-only', 10) ,
                            onClick: event => moveCursor(event),
                            onFocus: event => moveCursor(event),
                            inputComponent : TextMaskCustom,
                            }}

                        formControlProps={{
                            fullWidth: true
                            }}
                        />
                        

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                    
                        onClick={this.handleSubmit} 
                        color="primary" >
                            Add New Contact
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
      shelterWorkerID : state.userReducer.shelterWorkerID,
      roleID : state.userReducer.roleID
    }
  }
  
  export default connect(
    mapStateToProps,
    { addShelterCon, fetchShelter }
  )(withStyles(shelterProfileStyles)(ContactForm))