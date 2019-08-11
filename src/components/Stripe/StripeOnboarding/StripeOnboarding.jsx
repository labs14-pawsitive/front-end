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
            email: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone_number: '',
            bankToken: {},

            inputField: '',
            shelter: {},
        }

    };

    testSubmit = async (e) => {
       
        let { bankToken } = stripe.createToken('bank_account', {
            country: 'US',
            currency: 'usd',
            routing_number: '110000000',
            account_number: '000123456789',
            account_holder_name: 'Jenny Rosen',
            account_holder_type: 'individual',
          }).then(function(result) {
            // Handle result.error or result.token
            

          });

        // await fetch(`http://127.0.0.1:8000/api/stripe/account`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         account_holder_name: bankToken.account_holder_name
        //     }),
        // } ) 
     
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
            email: this.state.email
        }

        const id = 4;

        await axios
            .post(`http://127.0.0.1:8000/api/stripe/account`, body) // RETURNS NEWLY CREATED STRIPE ACCOUNT ID
            .then(async results => {
                console.log(results)
                console.log(results.data.id)
                await axios
                    .post(`http://127.0.0.1:8000/api/shelters/${id}/account`, { account_id: results.data.id }) // STORES STRIPE ACCOUNT ID IN SHELTERS TABLE
                    .then(result => {
                        console.log(result)
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
                <GridContainer>

                    <GridItem>
                        <FormControl >
                            <Card style={{ width:"600px" }}>
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
                                            onClick={this.testSubmit}
                                        >
                                            Submit
                                    </Button>
                                    </GridContainer>

                                    {/* <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <CustomInput
                                            labelText="Account Routing Number"
                                            id="accountRoutingNumber"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.routing_number,
                                            }}
                                        />
                                    </GridItem> */}

                                </CardBody>
                            </Card>

                        </FormControl>

                    </GridItem>
                </GridContainer>
            </>
        )
    }

};

export default withStyles(regularFormsStyle)(StripeOnboarding);
