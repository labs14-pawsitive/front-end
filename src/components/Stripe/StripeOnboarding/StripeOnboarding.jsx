import React from "react";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
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
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";

// custom classes
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

// text mask for form
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    )
}

class StripeOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            first_name: '',
            last_name: '',
            routing_number: '110000000',
            account_number: '000123456789',
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
            frontImage: null,
            backImage: null,
            inputField: "",
            shelter: {}
        };
    }

    componentDidMount() {
        axios
            .get(
                `${
                process.env.REACT_APP_BACKEND_URL
                }/api/shelters/${localStorage.getItem("shelter_id")}`
            )
            .then(shelter => {
                console.log(shelter.data);
                this.setState({
                    shelter: shelter.data
                });
                console.log(this.state.shelter);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleInput = event => {

        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async (event) => {

        const stripe = window.Stripe("pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh");

        const state = this.state;

        let frontImage = null;
        if (this.state.frontImage) {
            frontImage = new FormData();
            frontImage.append("file", this.state.frontImage);
            frontImage.append("purpose", "identity_document");
        }
        let backImage = null;
        if (this.state.backImage) {
            backImage = new FormData();
            backImage.append("file", this.state.backImage);
            backImage.append("purpose", "identity_document");
        }
        let frontData = null;
        const frontResult = await axios
            .post("https://uploads.stripe.com/v1/files", frontImage, {
                headers: {
                    Authorization: `Bearer pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh`
                }
            })
            .then(result => {
                frontData = result.data.id;
                console.log(result.data.id);
            })
            .catch(err => {
                console.log(err);
            });

        let backData = null;
        const backResult = await axios
            .post("https://uploads.stripe.com/v1/files", backImage, {
                headers: {
                    Authorization: `Bearer pk_test_x16KAsU777aRjmWMukoNMKfG00PisbA3Vh`
                }
            })
            .then(result => {
                backData = result.data.id;
                console.log(result.data.id);
            })
            .catch(err => {
                console.log(err);
            });

        const header = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        let { token } = stripe
            .createToken("bank_account", {
                country: "US",
                currency: "usd",
                routing_number: "110000000",
                account_number: "000123456789",
                account_holder_name: `${state.first_name}` + `${state.last_name}`,
                account_holder_type: "company"
            })
            .then(async result => {
                // Handle result.error or result.token
                console.log(result.token);
                await axios
                    .post(
                        `${process.env.REACT_APP_BACKEND_URL}/api/stripe/account`,
                        {
                            first_name: state.first_name,
                            last_name: state.last_name,
                            routing_number: state.routing_number,
                            account_number: state.account_number,
                            shelterID: localStorage.getItem("shelter_id"),
                            address1: state.address_1,
                            address2: state.address_2,
                            city: state.city,
                            state: state.state,
                            zip: state.zip,
                            email: state.email,
                            phone: state.phone_number,
                            ssn_last_4: state.ssn_last_4,
                            dob_day: state.dob_day,
                            dob_month: state.dob_month,
                            dob_year: state.dob_year,
                            bankToken: result.token.id,
                            frontImage: frontData,
                            backImage: backData,

                        }
                    )
                    // RETURNS NEWLY CREATED STRIPE ACCOUNT ID
                    .then(async result => {
                        console.log(result);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    frontImage = image => {
        this.setState({ frontImage: image });
    };

    backImage = image => {
        this.setState({ backImage: image });
    };

    render() {

        const { classes } = this.props;

        const customStyle = {
            formStyle: {
                display: "flex",
                flexDirection: "column",
                justify: "center",
                alignItems: "center"
            },
            headerStyle: {
                fontSize: "30px"
            },
            submitButtonStyle: {
                width: "200px",
                height: "40px",
                marginRight: "20px"
            },
            fieldAlert: {
                color: "#333333 !important",
            },

        };
        return (
            <>

                <FormControl>

                    <Card style={{ width: "600px" }}>

                        <CardHeader color="primary" icon>
                            <CardIcon color="primary">
                                <Assignment />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>
                                {" "}
                                Create Stripe Account{" "}
                            </h4>
                        </CardHeader>

                        <CardBody>

                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <CustomInput
                                        labelText="Account Holder First Name"
                                        id="first_name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: this.handleInput,
                                            value: this.state.first_name,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <CustomInput
                                        labelText="Account Holder Last Name"
                                        id="last_name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: this.handleInput,
                                            value: this.state.last_name,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>


                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
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

                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
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
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
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

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
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

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <CustomInput
                                        labelText="Zip"
                                        id="zip"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: (event) => this.handleInput(event),
                                            value: this.state.zip,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
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

                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <CustomInput
                                        labelText="Phone Number"
                                        id={this.state.editMode ? "phone_number_disabled" : "phone_number"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            value: this.state.phone_number,
                                            onChange: (event) => this.handleInput(event),
                                            inputComponent: TextMaskCustom,
                                        }}
                                        style={this.state.editMode ? "" : customStyle.fieldAlert}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
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

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
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

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
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
                            </GridContainer>

                            <GridContainer>
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
                                        labelText="Routing Number"
                                        id="routing_number"
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
                            </GridContainer>

                            <GridContainer justify="center">
                                <GridItem>
                                    <Typography>
                                        <h4 className={classes.cardIconTitle}>
                                            Front ID
                                                </h4>
                                    </Typography>
                                    <ImageUpload callback={this.frontImage} />
                                </GridItem>

                                <GridItem>
                                    <Typography>
                                        <h4 className={classes.cardIconTitle}>
                                            Back ID
                                                </h4>
                                    </Typography>
                                    <ImageUpload callback={this.backImage} />
                                </GridItem>
                            </GridContainer>

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
        );
    }
}
export default withStyles(regularFormsStyle)(StripeOnboarding);

