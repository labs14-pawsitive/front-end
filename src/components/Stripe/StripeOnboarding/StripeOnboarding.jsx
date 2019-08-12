import React from 'react';
import axios from 'axios';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// custom classes
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

// stripe 
import { injectStripe } from 'react-stripe-elements';


class StripeOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account_holder_name: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone_number: '',
            ssn_last_4: '',
            dob_day: '',
            dob_month: '',
            dob_year: '',
            bankToken: {},

            inputField: '',
            shelter: {},
        }

    };

    testSubmit = async (e) => {

        // await fetch(`http://127.0.0.1:8000/api/stripe/account`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         account_holder_name: bankToken.account_holder_name
        //     }),
        // } ) 


        // const stripe = require("stripe")("pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh");
        // var stripe = Stripe("pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh");

        //     const stripe = window.Stripe("pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh");

        //    let { token } = stripe.createToken('bank_account', {
        //         country: 'US',
        //         currency: 'usd',
        //         routing_number: '110000000',
        //         account_number: '000123456789',
        //         account_holder_name: 'Jenny Rosen',
        //         account_holder_type: 'company',
        //         bankToken: this.result.token.id,
        //         shelterID: localStorage.getItem('shelter_id'),
        //         address1: this.state.address_1,
        //         address2: this.state.address_2,
        //         city: this.state.city,
        //         state: this.state.state,
        //         zip: this.state.zip,
        //         email: this.state.email,
        //         phone: this.state.phone_number
        //     }).then(function (result) {
        //         // Handle result.error or result.token
        //         console.log(result.token)
        //     });


    };

    componentDidMount() {

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${localStorage.getItem('shelter_id')}`)
            .then(shelter => {
                console.log(shelter.data)
                this.setState({
                    shelter: shelter.data
                })
                console.log(this.state.shelter)
            })
            .catch(error => {
                console.log(error)
            })

    }

    handleInput = event => {

        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        })
    };

    handleSubmit = async (e) => {

        const body = {
            email: this.state.email,
            shelterID: localStorage.getItem('shelter_id'),
            address1: this.state.address_1,
            address2: this.state.address_2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            email: this.state.email,
            phone: this.state.phone_number,
            // token: result.token, 
            bankToken: this.state.bankToken
        }

        const id = 3;

        const stripe = window.Stripe("pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh");

        const state = this.state;

        let { token } = stripe.createToken('bank_account', {
            country: 'US',
            currency: 'usd',
            routing_number: '110000000',
            account_number: '000123456789',
            account_holder_name: 'Jenny Rosen',
            account_holder_type: 'company',
        }).then(async result => {
            // Handle result.error or result.token
            console.log(result.token)
            await axios
                .post(`http://127.0.0.1:8000/api/stripe/account`,
                    {   
                        first_name: 'Jenny',
                        last_name: 'Rosen',
                        routing_number: '110000000',
                        account_number: '000123456789',
                        shelterID: localStorage.getItem('shelter_id'),
                        address1: state.address_1,
                        address2: state.address_2,
                        city: state.city,
                        state: state.state,
                        zip: state.zip,
                        email: state.email,
                        phone: state.phone,
                        ssn_last_4: state.ssn_last_4,
                        dob_day: state.dob_day,
                        dob_month: state.dob_month,
                        dob_year: state.dob_year,
                        bankToken: result.token.id
                    })
                .then( results => {
                    console.log(results)
                })
                .catch(error => {
                    console.log(error)
                })
        })
            .catch(error => {
                console.log(error)
            })
    };


    render() {

        const { classes } = this.props

        const customStyle = {
            formStyle: {
                display: 'flex',
                flexDirection: 'column',
                justify: 'center',
                alignItems: 'center',
            },
            headerStyle: {
                fontSize: '30px'
            },
            submitButtonStyle: {
                width: '200px',
                height: '40px',
                marginRight: '20px',
            },

        }

        return (
            <>
                        <FormControl >
                            <Card style={{ width: "600px" }}>
                                <CardHeader color="primary" icon>
                                    <CardIcon color="primary">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> Create Stripe Account </h4>
                                </CardHeader>

                                <CardBody>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Account Holder Name"
                                            id="accountHolderName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.account_holder_name,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Address1"
                                            id="address_1"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.address_1,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Address2"
                                            id="address_2"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.address_2,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="City"
                                            id="city"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.city,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="State"
                                            id="state"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.state,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Zip"
                                            id="zip"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.zip,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Email"
                                            id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.email,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Phone Number"
                                            id="phone_number"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.phone_number,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="SSN Last Four Digits"
                                            id="ssn_last_4"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.ssn_last_4,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="DOB Day"
                                            id="dob_day"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.dob_day,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="DOB Month"
                                            id="dob_month"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.dob_month,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="DOB Year"
                                            id="dob_year"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.dob_year,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Routing Number"
                                            id="routing_number"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                // value: ,
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Account Number"
                                            id="account_number"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.account_number,
                                            }}
                                        />
                                    </GridItem>


                                    <GridContainer justify="flex-end" >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={customStyle.submitButtonStyle}
                                            onClick={this.handleSubmit}
                                        >
                                            Submit
                                    </Button>
                                    </GridContainer>

                                </CardBody>
                            </Card>

                        </FormControl>
            </>
        )
    }

};

export default withStyles(regularFormsStyle)(StripeOnboarding);
// export default injectStripe(StripeOnboarding);
