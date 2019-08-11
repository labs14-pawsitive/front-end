import React from 'react';
import axios from 'axios';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// custom classes
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";


class StripeOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputField: '',
            email: '',
            emailConfirmed: '',
            account_holder_name: '',
            routing_number: '',
            shelter: {},
        }

    };

    // testSubmit = async (e) => {
    //     const body = {
    //         email: 'idk@mail.com',
    //     }

    //     const id = 7;

    //     await axios
    //         .post(`http://127.0.0.1:8000/api/shelters/${id}/account`, body) 
    //         .then(results => {
    //             console.log(results)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // };

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

        const id = this.state.shelter.id;

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
            },

        }

        return (
            <>
                <GridContainer>
                    <FormControl >

                        <Card >
                            <CardBody>

                                {/* <GridContainer style={customStyle.formStyle} > */}
                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <Typography style={customStyle.headerStyle} > Create Stripe Account </Typography>
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
                                            labelText="Email Confirm Again"
                                            id="emailConfirmed"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                onChange: this.handleInput,
                                                value: this.state.emailConfirmed,
                                            }}
                                        />
                                    </GridItem>

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
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={customStyle.submitButtonStyle}
                                            onClick={this.handleSubmit}
                                        >
                                            Submit
                                    </Button>
                                    </GridItem>
                                {/* </GridContainer> */}

                            </CardBody>
                        </Card>

                    </FormControl>
                </GridContainer>
            </>
        )
    }

};

export default withStyles(regularFormsStyle)(StripeOnboarding);
