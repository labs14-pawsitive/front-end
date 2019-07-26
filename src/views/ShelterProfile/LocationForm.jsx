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
import { addShelterLoc } from "../../actions/shelterAction";

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


class LocationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            street_address: '',
            city: '',
            zipcode: '',
            state_id: '',
            nickname: '',
            shelter_contact_id: '',
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

        const newLoc = {
            shelter_id : 1, //localstorage.getItem("shelter_id")
            street_address: this.state.street_address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            state_id: 12, //to be changed later
            nickname: this.state.nickname,
            shelter_contact_id: 1, //to be changed later
            }

        this.props.addShelterLoc(newLoc)

        // .then( () => {
        //     this.props.getLocations
        // });

        this.handleClose()
        this.setState({
            street_address: '',
            city: '',
            zipcode: '',
            // state_id: '',
            phone_number: '',
            nickname: '',
            // shelter_contact_id: '',
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
                        <CustomInput 
                        id = "nickname"
                        labelText = "Location Name"
                        onClick = {this.changeHandler}
                        name= "nickname"
                        value= {this.state.nickname}

                        formControlProps={{
                            fullWidth: true
                            }}
                        inputProps={{
                            type: "text"
                            }}
                        
                        />
                        <CustomInput 
                        id = "street_address"
                        labelText = "Street Address"
                        onClick = {this.changeHandler}
                        name= "street_address"
                        value= {this.state.street_address}
                        inputProps={{
                            type: "text"
                            }}
                        formControlProps={{
                            fullWidth: true
                            }}
                        
                        />
                        <CustomInput 
                        id = "city"
                        labelText = "City"
                        onClick = {this.changeHandler}
                        name= "city"
                        value= {this.state.city}
                        inputProps={{
                            type: "text",
                            
                            }}
                        
                        />
                        
                        <CustomInput 
                        id = "zipcode"
                        labelText = "Zipcode"
                        onClick = {this.changeHandler}
                        name= "zipcode"
                        value= {this.state.zipcode}
                        inputProps={{
                            type: "text"
                            }}
                        
                        />


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
      shelterWorkerID : state.userReducer.shelterWorkerID,
      roleID : state.userReducer.roleID
    }
  }
  
  export default connect(
    mapStateToProps,
    { addShelterLoc }
  )(withStyles(shelterProfileStyles)(LocationForm))
  