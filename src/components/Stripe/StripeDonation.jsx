import React from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
import Button from "components/CustomButtons/Button.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import withStyles from "@material-ui/core/styles/withStyles";
import shelterPageStyle from "assets/jss/material-dashboard-pro-react/views/shelterPageStyle";

import SweetAlert from "react-bootstrap-sweetalert";
import Auth from "components/Auth/Auth.js"

const auth = new Auth();

class StripeDonation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            fullWidth: true,
            alert: null,
        }
    }

    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };

    handleClose = () => {
          this.setState({
              open: false,
          })
      }

      setAlert = (str) => {
        if(!localStorage.getItem('token') && !localStorage.getItem('user_id')) {
           this.warningAlert(str);
         } else {
           this.hideAlert();
         }
       }
       
       routeToAuth = () => {
        localStorage.setItem("shelterId", this.props.id)
        auth.login();
    }
      warningAlert = (str) => {
      this.setState({
        alert: (
          <SweetAlert
            warning
            showCancel
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            style={{ display: "block", marginTop: "-100px", color: "#777", fontFamily: "Roboto", padding:"50px", lineHeight: "1.2" }}
            titleStyle={{fontWeight:"500"}}
            onConfirm={() => this.routeToAuth()}
            onCancel={this.hideAlert}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            confirmBtnText="Signup / Login"
          >
            <h2 style={{fontWeight: '500'}}>OOH MY PAWS</h2>
            <h4 style={{color:"#333333"}}>{`You need to login/sign up in order to ${str}`}</h4>
          </SweetAlert>
        )
      });
    }
    hideAlert = () =>  {
      this.setState({
        alert: null
      });
    }
  
    setDonate = () => {
        if(!localStorage.getItem('token') && !localStorage.getItem('user_id')) {
          this.warningAlert('make a donation');
        } else {
          console.log("i can make donation to this animal/shelter now")
          this.hideAlert();
          this.handleClickOpen();
        }
      }
  


    render() {
        const { classes } = this.props

        return (
            <>
   
            <Button className={classes.topButtons} onClick={this.setDonate}>
                Donation
            </Button> 
            {this.state.alert}
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={this.state.fullWidth}>
            <StripeProvider apiKey ="pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh" >
            <Elements>
               <InjectedCheckoutForm 
               shelter={this.props.shelter} 
               shelterID={this.props.id}
               handleClose ={this.handleClose} /> 
            </Elements>
            </StripeProvider>

            </Dialog>
            </>
        );
    }
}



export default withStyles(shelterPageStyle)(StripeDonation);