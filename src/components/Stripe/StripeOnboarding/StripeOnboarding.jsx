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
import InputAdornment from "@material-ui/core/InputAdornment";

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
};

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function moveCursor(event) {
    let digits = event.target.value.replace(/\D/g, '').length;
    if (digits <= 3) {
        event.target.setSelectionRange(digits + 1, digits + 1);
    } else if (digits > 3 && digits <= 6) {
        event.target.setSelectionRange(digits + 3, digits + 3);
    } else if (digits > 6 && digits <= 10) {
        event.target.setSelectionRange(digits + 4, digits + 4)
    }
};

class StripeOnboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            routing_number: '',
            account_number: '',
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
            shelter: {},

            // VERIFICATION
            first_nameState: '',
            last_nameState: '',
            routing_numberState: '',
            account_numberState: '',
            address_1State: '',
            address_2State: '',
            cityState: '',
            stateState: '',
            zipState: '',
            emailState: '',
            phone_numberState: '',
            ssn_last_4State: '',
            dob_dayState: '',
            dob_monthState: '',
            dob_yearState: '',
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
                account_holder_name: `${state.firstName}` + `${state.lastName}`,
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

    handleInput = event => {

        this.setState({
            ...this.state,
            [event.target.id]: event.target.value,
        })
    };

    // VERIFICATION FOR FIELDS
    verifyEmail(value) {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailRex.test(value)) {
            return true;
        }
        return false;
    };

    verifyLength(value, lengthNumber) {
        if (value.length >= lengthNumber) {
            return true;
        }
        return false;
    };

    verifyExactLength(value, lengthNumber) {
        if (value.length === lengthNumber) {
            return true;
        }
        return false;
    };

    verifyDigitOnly(value, lengthNumber) {
        let digits = value.replace(/\D/g, '');

        if (digits.length === lengthNumber) {
            return true;
        }
        return false;
    };

    change(event, stateName, type, stateNameEqualTo) {
        switch (type) {
            case "email":
                if (this.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" })
                }
                else {
                    this.setState({ [stateName + "State"]: "error" })
                }
                break;
            case "length":
                if (this.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" })
                }
                else {
                    this.setState({ [stateName + "State"]: "error" })
                }
                break;
            case "exact-length":
                if (this.verifyExactLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" })
                }
                else {
                    this.setState({ [stateName + "State"]: "error" })
                }
                break;
            case "digit-only":
                if (this.verifyDigitOnly(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" })
                }
                else {
                    this.setState({ [stateName + "State"]: "error" })
                }
            default:
                break;
        }

        this.setState({
            [stateName]: event.target.value
        });
    };

    isValidated() {
        if (
            this.state.first_nameState === "success" &&
            this.state.last_nameState === "success" &&
            this.state.routing_numberState === "success" &&
            this.state.account_numberState === "success" &&
            this.state.address_1State === "success" &&
            this.state.address_2State === "success" &&
            this.state.cityState === "success" &&
            this.state.stateState === "success" &&
            this.state.zipState === "success" &&
            this.state.emailState === "success" &&
            this.state.phone_numberState === "success" &&
            this.state.ssn_last_4State === "success" &&
            this.state.dob_dayState === "success" &&
            this.state.dob_monthState === "success" &&
            this.state.dob_yearState === "success"
        ) {
            return true;
        }
        else {
            if (this.state.first_nameState !== "success") {
                this.setState({ first_nameState: "error" })
            }
            if (this.state.last_nameState !== "success") {
                this.setState({ last_nameState: "error" })
            }
            if (this.state.routing_numberState !== "success") {
                this.setState({ routing_numberState: "error" })
            }
            if (this.state.account_numberState !== "success") {
                this.setState({ account_numberState: "error" })
            }
            if (this.state.address_1State !== "success") {
                this.setState({ address_1State: "error" })
            }
            if (this.state.address_2State !== "success") {
                this.setState({ address_2State: "error" })
            }
            if (this.state.cityState !== "success") {
                this.setState({ cityState: "error" })
            }
            if (this.state.stateState !== "success") {
                this.setState({ stateState: "error" })
            }
            if (this.state.emailState !== "success") {
                this.setState({ emailState: "error" })
            }
            if (this.state.phone_numberState !== "success") {
                this.setState({ phone_numberState: "error" })
            }
            if (this.state.ssn_last_4State !== "success") {
                this.setState({ ssn_last_4State: "error" })
            }
            if (this.state.dob_dayState !== "success") {
                this.setState({ dob_dayState: "error" })
            }
            if (this.state.dob_monthState !== "success") {
                this.setState({ dob_monthState: "error" })
            }
            if (this.state.dob_yearState !== "success") {
                this.setState({ dob_yearState: "error" })
            }
        }
        return false;
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
            defaultViewStyle: {
                color: "#333333 !important",
            },
            errorColor: {
                color: "#d81b60"
            }
        };

        return (
            <>

                <FormControl>
                    <Card>
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
                                        success={this.state.first_nameState === "success"}
                                        error={this.state.first_nameState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "first_name", "length", 2),
                                            value: this.state.first_name,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <CustomInput
                                        labelText="Account Holder Last Name"
                                        id="last_name"
                                        success={this.state.last_nameState === "success"}
                                        error={this.state.last_nameState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "last_name", "length", 2),
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
                                        success={this.state.address_1State === "success"}
                                        error={this.state.address_1State === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "address_1", "length", 5),
                                            value: this.state.address_1,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <CustomInput
                                        labelText="Address2"
                                        id="address_2"
                                        success={this.state.address_2State === "success"}
                                        error={this.state.address_2State === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "address_2", "length", 5),
                                            value: this.state.address_2,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <CustomInput
                                        labelText="City"
                                        id="city"
                                        success={this.state.cityState === "success"}
                                        error={this.state.cityState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "city", "length", 2),
                                            value: this.state.city,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <CustomInput
                                        labelText="State"
                                        id="state"
                                        success={this.state.stateState === "success"}
                                        error={this.state.stateState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "state", "length", 2),
                                            value: this.state.state,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <CustomInput
                                        labelText="Zip"
                                        id="zip"
                                        success={this.state.zipState === "success"}
                                        error={this.state.zipState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "zip", "digit-only", 5),
                                            value: this.state.zip,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <CustomInput
                                        success={this.state.emailState === "success"}
                                        error={this.state.emailState === "error"}
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "email", "email"),
                                            value: this.state.email,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={6} sm={6} md={6} lg={6} xl={6} >
                                    <CustomInput
                                        labelText="Phone Number"
                                        id="phone_number"
                                        success={this.state.phone_numberState === "success"}
                                        error={this.state.phone_numberState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            value: this.state.phone_number,
                                            onChange: event => this.change(event, "phone_number", "digit-only", 10),
                                            onClick: event => moveCursor(event),
                                            onFocus: event => moveCursor(event),
                                            inputComponent: TextMaskCustom,

                                        }}
                                        style={this.state.editMode ? "" : customStyle.defaultViewStyle}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <CustomInput
                                        labelText="DOB Month"
                                        id="dob_month"
                                        success={this.state.dob_monthState === "success"}
                                        error={this.state.dob_monthState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "dob_month", "digit-only", 2),
                                            value: this.state.dob_month,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <CustomInput
                                        labelText="DOB Day"
                                        id="dob_day"
                                        success={this.state.dob_dayState === "success"}
                                        error={this.state.dob_dayState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "dob_day", "digit-only", 2),
                                            value: this.state.dob_day,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                    <CustomInput
                                        labelText="DOB Year"
                                        id="dob_year"
                                        success={this.state.dob_yearState === "success"}
                                        error={this.state.dob_yearState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "dob_year", "digit-only", 4),
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
                                        success={this.state.ssn_last_4State === "success"}
                                        error={this.state.ssn_last_4State === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "ssn_last_4", "digit-only", 4),
                                            value: this.state.ssn_last_4,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <CustomInput
                                        labelText="Routing Number"
                                        id="routing_number"
                                        success={this.state.routing_numberState === "success"}
                                        error={this.state.routing_numberState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "routing_number", "digit-only", 9),
                                            value: this.state.routing_number,
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
                                    <CustomInput
                                        labelText="Account Number"
                                        id="account_number"
                                        success={this.state.account_numberState === "success"}
                                        error={this.state.account_numberState === "error"}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: event => this.change(event, "account_number", "digit-only", 8),
                                            value: this.state.account_number,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>

                            <GridContainer justify="center">
                                <GridItem>
                                    <Typography>
                                        <p className={classes.cardIconTitle}>
                                            Front ID
                                        </p>
                                    </Typography>
                                    <ImageUpload callback={this.frontImage} />
                                </GridItem>

                                <GridItem>
                                    <Typography>
                                        <p className={classes.cardIconTitle}>
                                            Back ID
                                            </p>
                                    </Typography>
                                    <ImageUpload callback={this.backImage} />
                                </GridItem>
                            </GridContainer>

                            <GridContainer justify="flex-end" >
                                    <Button
                                        variant="contained"
                                        className={classes.submitButtonStyle}
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

