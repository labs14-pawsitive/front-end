import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import Button from "components/CustomButtons/Button.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomInput from "components/CustomInput/ShelterCustomInput.jsx";
import InputAdornment from '@material-ui/core/InputAdornment';

const createOptions = () => {
    return {
      style: {
        base: {
          fontSize: '14px',
          color: '#424770',
          fontFamily: 'Roboto, sans-serif',
          borderBottom: '1px solid silver',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#c23d4b',
        },
      }
    }
  };
  

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            name: "",
            complete: false,
            fullWidth: true,
        }
    }

   
    handleSubmit = e => {
        e.preventDefault();
    
        let { token } = this.props.stripe.createToken({
            name: this.state.name,
        })


        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/stripe/donate`, {
                token: token.id,
                data: { 
                    amount: this.state.amount, 
                    shelter_id: this.props.match.params.id,
                    user_id: localStorage.getItem('user_id'),
                 } 
            })
            .then(res =>{ 
                console.log(res)
                this.setState({complete: true})
            })
            .catch(err => {
                console.log('Donate Error:', err)
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.id] : e.target.value })
    }    

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>
        return (
            <div>
               <DialogTitle id="form-dialog-title">
                        Donate to {this.props.shelter.shelter}
                </DialogTitle>
                <DialogContentText>
                </DialogContentText>
                <DialogContent>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>

                <CustomInput 
                        id = "name"
                        labelText = "Contact Name"
                        inputProps={{
                            type: "text",
                            value: this.state.name,
                            onChange: (e) => this.changeHandler(e)
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                   <CustomInput 
                        id = "amount"
                        labelText = "Donation Amount"
                        inputProps={{
                            value: this.state.amount,
                            onChange: (e) => this.changeHandler(e),
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
            
                </GridItem>
                <GridItem xs={12} sm={12} md={8} style={{marginTop: "15px"}}>
              <CardElement {...createOptions()}/>
              </GridItem>
              </GridContainer>
               </DialogContent>
               <DialogActions>
              <Button color="rose" onClick={this.handleSubmit}>Donate</Button>
              </DialogActions>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);