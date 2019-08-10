import React from 'react';
import axios from 'axios';

// @material-ui/core components
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// Stripe
// import { injectStripe } from 'react-stripe-elements';


class StripeOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailConfirmed: '',
        }

    };

    handleInput = event => {
        
        this.setState({
            email: event.target.value
        })
    };

    testSubmit = async (e) => {

        // const body = { 
        //     email: "idk@mail.com"     // this.state.emailConfirmed
        // }

        await axios
        .post(`localhost:8000/api/stripe/account`, { body: {email: "idk@mail.com"} } ) 
        .then( results => {
            console.log(results)
        })
        .catch( error => {
            console.log(error)
        })

    };

    handleSubmit = async (e) => {

                const body = { 
                    email: 'idk@mail.com'     // this.state.emailConfirmed
                }
    
                const id = 11;
    
               await axios
                .post(`localhost:8000/api/stripe/account`, body ) 
                .then( async results => {
                    console.log(results)
                    await axios
                    .post(`localhost:8000/api/shelters/${id}/account`, { account_id: results.id } ) 
                    .then( result => {
                        console.log(result)
                    })
                    .catch( error => {
                        console.log(error)
                    })
                })
                .catch( error => {
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
                padding: '100px',
            },
            headerStyle: {
                fontSize: '30px'
            },
            itemStyle: {
                padding: '10px',
            },
            submitButtonStyle: {
                width: '200px',
                height: '40px',
            },
            alignButton: {
                marginTop: '20px',
                justify: 'center',
            },

        }

        return (
            <>
                <GridContainer style={{ padding: '20px' }}>
                    <FormControl >

                        <Card >
                            <CardBody>

                        <GridContainer style={customStyle.formStyle} >
                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <Typography style={customStyle.headerStyle} > Create Stripe Account </Typography>
                                </GridItem>


                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={customStyle.itemStyle}>
                                    <TextField
                                        label="Email"
                                        fullWidth="true"
                                        
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={customStyle.itemStyle}>
                                    <TextField
                                        label="Email Confirm Again"
                                        fullWidth="true"
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={customStyle.alignButton}>
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    style={customStyle.submitButtonStyle}
                                    onClick={this.testSubmit}
                                    >
                                        Submit
                                    </Button>
                                </GridItem>
                            </GridContainer>

                            </CardBody>
                        </Card>

                    </FormControl>
                </GridContainer>
            </>
        )
    }

};

export default StripeOnboarding;