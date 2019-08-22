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


class StripeDonation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            fullWidth: true,
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

    render() {
        const { classes } = this.props

        return (
            <>
            <Button className={classes.topButtons} onClick={this.handleClickOpen}>
                Donation
            </Button> 
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={this.state.fullWidth}>
            
            <StripeProvider apiKey ="pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh" >
            <Elements>
               <InjectedCheckoutForm shelter={this.props.shelter} /> 
            </Elements>
            </StripeProvider>

            </Dialog>
            </>
        );
    }
}



export default withStyles(shelterPageStyle)(StripeDonation);