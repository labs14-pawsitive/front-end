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
            city: '',
            zipcode: '',
            state_id: '',
            nickname: '',
            shelter_contact_id: '',
            open: false,
            fullWidth: true,
        };
    }

    // componentDidMount(){
    //     this.props.fetchOptions(this.props.shelterID);
    // }


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

        const newLocation = {
            shelter_id: this.props.shelterID,
            street_address: this.state.street_address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            state_id: this.state.state_id,
            nickname: this.state.nickname,
            phone_number: '7012258948',
            shelter_contact_id: this.state.shelter_contact_id
            }

        console.log(newLocation)

        this.props.addShelterLoc(this.props.shelterID, newLocation)

        .then( () => {
            this.props.updateShelter();
        });

        this.handleClose()
        this.setState({
            street_address: '',
            city: '',
            zipcode: '',
            state_id: '',
            phone_number: '',
            nickname: '',
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
                        <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <CustomInput 
                        id = "nickname"
                        labelText = "Location Name"

                        formControlProps={{
                            fullWidth: true
                            }}
                        inputProps={{
                            type: "text",
                            value: this.state.nickname,
                            onChange: (e) => this.inputchangeHandler(e)
                            }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <CustomInput 
                        id = "street_address"
                        labelText = "Street Address"
                        inputProps={{
                            type: "text",
                            value: this.state.street_address,
                            onChange: (e) => this.inputchangeHandler(e)
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
                        inputProps={{
                            type: "text",
                            value: this.state.city,
                            onChange: (e) => this.inputchangeHandler(e)
                            }}
                        formControlProps={{
                                fullWidth: true
                            }}
                        />
                        </GridItem>
                        
                        <GridItem xs={12} sm={12} md={3}>
                        <FormControl
                        fullWidth
                        className={classes.selectFormControl}>
                        <InputLabel
                        htmlFor="states"
                        className={classes.selectLabel}>
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
                        inputProps={{
                            type: "text",
                            value: this.state.zipcode,
                            onChange: (e) => this.inputchangeHandler(e)
                        }}
                        
                        />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <FormControl
                        fullWidth
                        className={classes.selectFormControl}>
                        <InputLabel
                        htmlFor="contacts"
                        className={classes.selectLabel}>
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
                        onChange={this.changeHandler}
                        //callback to pass up the parents
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
  