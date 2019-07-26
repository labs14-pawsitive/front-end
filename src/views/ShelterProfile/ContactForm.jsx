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
import { addShelterCon } from "../../actions/shelterAction";

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


class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            open: false,
            fullWidth: true,
        };
    }

// Dialog functions 

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };

    handleClose = () => {
        this.setState({ open: false });
    };

//

    handleSubmit = e => {
        e.preventDefault()

        const newContact = {
            shelter_id : 1, //localstorage.getItem("shelter_id")
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            }

        this.props.addShelterCon(newContact)

        // .then( () => {
        //     this.props.getLocations
        // });

        this.handleClose()
        this.setState({
            name: '',
            email: '',
            phone: '',
        })
        
    }

    changeHandler = e => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
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
                        id = "name"
                        onChange = {this.changeHandler}
                        name = "name"
                        value = {this.state.name}

                        labelText = "Contact Name"
                        inputProps={{
                            type: "text"
                            }}
                        formControlProps={{
                            fullWidth: true
                            }}
                        
                        />
                        <CustomInput 
                        id = "email"
                        labelText = "Email Address"
                        onChange = {this.changeHandler}
                        name = "email"
                        value = {this.state.email}

                        inputProps={{
                            type: "email",
                            }}
                        formControlProps={{
                            fullWidth: true
                            }}
                        />
                        <CustomInput 
                        id = "phone"
                        labelText = "Phone Number"
                        onChange = {this.changeHandler}
                        name = "phone"
                        value = {this.state.phone}

                        inputProps={{
                            type: "text"
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
                        <Button onClick={this.handleSubmit} color="primary" >
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
    { addShelterCon }
  )(withStyles(shelterProfileStyles)(ContactForm))