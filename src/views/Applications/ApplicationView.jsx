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
import moment from 'moment';
import CreateNotes from "../Components/Application/CreateNotes";
import { fetchOptions, fetchApplication, updateApplication } from "../../actions/applicationAction";
import {axiosWithAuth} from 'axiosWithAuth';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControlLabel } from "@material-ui/core";

// @material-ui/icons
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { async } from "q";


class ApplicationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      application: {},

      options: [],

      statusChanged: false,

      shelterVerified : ""
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  loadApplication = async () => {

    await this.props.fetchApplication(this.props.match.params.id)

    this.verifyShelter(this.props.application.shelter_id)

  };

  verifyShelter = async (shelter_id) => {
    //verifying shelter before proceeding
    await axiosWithAuth()
      .get(`http://localhost:8000/api/auth/shelter/${shelter_id}`)
      .then( result => {
        this.setState({
          shelterVerified : true
        })
      })
      .catch( error => {
        this.setState({
          shelterVerified : false
        })
        this.props.history.push('/admin/currentApplications')
      })
  }


  loadOptions = async () => {

    await this.props.fetchOptions(this.props.match.params.id)

  };


  updateAppStatus = async (event) => {

    let updatedStatus = {
      animal_id: this.state.application.animal_id,
      shelter_id: this.state.application.shelter_id,
      user_id: this.state.application.user_id,
      application_status_id: this.state.application.application_status_id,
    };

    this.props.updateApplication(updatedStatus, this.props.application.application_id)
  };


  componentDidMount(prevProps, prevState) {

    this.loadApplication()

    this.loadOptions()
  };


  componentDidUpdate(prevProps, prevState) {

    if (this.props.application !== prevProps.application && this.props.options !== prevProps.application) {

      this.setState({
        ...this.state,
        application: this.props.application,
        options: this.props.options,
      })
    }
  };


  handleChange = async (event) => {

    const appStatus = this.props.options[event.target.value - 1].application_status

    await this.setState({ ...this.state, application: { ...this.state.application, application_status: appStatus, application_status_id: event.target.value, } });

    await this.updateAppStatus()
  };

  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  };

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    })
  };

  render() {

    const { classes } = this.props;

    const customStyle = {
      titleStyle: {
        padding: "0px 15px"
      },
      imgCardStyle: {
        padding: "0px 15px"
      },
      imgStyle: {
        borderRadius: "4px"
      },
      labelStyle: {
        color: "#333333",
        paddingTop: "33px",
      },
      checkBoxStyle: {
        float: "right",
        color: "#228B22",
      },
      inputStyle: {
        background: '#edeae8',
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "0px",
        paddingRight: "0px",
      },
      textFieldStyle: {
        background: "#edeae8",
        marginTop: "2%",
        marginBottom: "2%",
        fontStyle: "Sans-serif",
        fontColor: "black",

      },
      textFieldStyle2: {
        background: "#edeae8",
        marginTop: "2%",
        marginBottom: '4%',
        fontStyle: "Sans-serif",
        fontColor: "black",
      },
      textFieldStyle3: {
        background: "#edeae8",
        marginTop: "4%",
        marginBottom: "2%",
        fontStyle: "Sans-serif",
        fontColor: "black",
      },
      dropDownStyle: {
        background: "#edeae8",
        padding: '4%',
        marginTop: '3%',
        marginBottom: '3%'
      },
      headerStyle: {
        fontStyle: "Sans-serif",
        fontSize: "30px",
        paddingTop: "10px",
      },
      selectStyle: {
        background: "#edeae8",
        // padding: "1%",
      },
      selectLabel: {
        padding: "12px 10px",
      },
      signatureSectionStyle: {
        background: "#edeae8",
        paddingTop: "1%",
        paddingBottom: "1%",
        borderBottom: "1px solid black",
        paddingRight: '5%',
      },
      signatureTextStyle: {
        background: "#edeae8",
        padding: "1%",

      },
      dropDownValueStyle: {
        // paddingLeft: '2%',
        paddingTop: "4%",
      },

    };


    if(this.state.shelterVerified !== true) return <div>Verifying application</div>

    return (
      <>
        <GridContainer>

          <GridItem xs={false} sm={4} md={7}>
            <GridItem xs={12} sm={12}>
              <Typography style={customStyle.headerStyle} >
                <p>Application Information</p>
              </Typography>
              <Card>
                <CardBody>
                  <form>
                    <TextField
                      label="Application ID"
                      id="application_id"
                      fullWidth="true"
                      value={this.state.application.application_id}
                      style={customStyle.textFieldStyle}
                      inputProps={{
                        disabled: true,
                        disableUnderline: true,
                      }}
                      InputProps={{
                        style: {
                          paddingLeft: "2%",
                          paddingTop: "2%",
                          disableUnderline: true,
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          padding: "18px 12px",

                        }
                      }}
                    />

                    <TextField
                      label="Animal Name"
                      id="animal_name"
                      fullWidth="true"
                      value={this.state.application.animal_name}
                      style={customStyle.textFieldStyle2}
                      inputProps={{
                        disabled: true,
                        disableUnderline: true,
                      }}
                      InputProps={{
                        style: {
                          paddingLeft: "2%",
                          paddingTop: "2%",
                          disableUnderline: true,
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          padding: "18px 12px",
                        }
                      }}
                    />

                    <FormControl fullWidth className={classes.selectFormControl}>

                      <div style={customStyle.selectStyle}>
                        <InputLabel
                          htmlFor="application_status"
                          style={customStyle.selectLabel}
                        >
                          Application Status
                      </InputLabel>


                        <Select
                          SelectDisplayProps={{
                            style: {
                              padding: "12px 6px",
                            }
                          }}
                          MenuProps={{
                            className: classes.menuOptionStyle
                          }}
                          renderValue={value => `${value}`}
                          value={this.state.application.application_status}
                          onChange={this.handleChange}
                          name="application_status"
                          id="application_status"
                          fullWidth="true"
                        >


                          <MenuItem
                            disabled
                            classes={{
                              root: classes.selectMenuItem
                            }}
                          >
                            Application Status
                        </MenuItem>

                          {this.props.options.map((option, key) => (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected
                              }}
                              value={option.id}
                            >
                              {option.application_status}
                            </MenuItem>
                          ))}
                        </Select>

                      </div>

                    </FormControl>

                    <TextField
                      label="Applicant Name"
                      id="name"
                      fullWidth="true"
                      value={this.state.application.name}
                      style={customStyle.textFieldStyle3}
                      inputProps={{
                        disabled: true,
                        disableUnderline: true,
                      }}
                      InputProps={{
                        style: {
                          paddingLeft: "2%",
                          paddingTop: "2%",
                          disableUnderline: true,
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          padding: "18px 12px",
                        }
                      }}
                    />

                    <TextField
                      label="Submission Date"
                      id="application_status"
                      fullWidth="true"
                      value={moment(this.props.application.created_at).format("MMMM Do YYYY").toString()}
                      style={customStyle.textFieldStyle}
                      inputProps={{
                        disabled: true,
                        disableUnderline: true,
                      }}
                      InputProps={{
                        style: {
                          paddingLeft: "2%",
                          paddingTop: "2%",
                          disableUnderline: true,
                        }
                      }}
                      InputLabelProps={{
                        style: {
                          padding: "18px 12px",
                        }
                      }}
                    />
                  </form>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12}>
              <Typography style={customStyle.headerStyle}>
                <p>Applicant Contact Information</p>
              </Typography>
              <Card>
                <CardBody>
                  <TextField
                    label="Street Address"
                    id="street_address"
                    fullWidth="true"
                    value={this.state.application.street_address}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />
                  <TextField
                    label="City / State / Zip"
                    id="city"
                    fullWidth="true"
                    value={this.state.application.city}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />
                  <TextField
                    label="Home Phone Number"
                    id="home_number"
                    fullWidth="true"
                    value={this.state.application.home_phone}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />
                  <TextField
                    label="Cell Phone Number"
                    id="cell_number"
                    fullWidth="true"
                    value={this.state.application.cell_phone}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />
                  <TextField
                    label="Email"
                    id="name"
                    fullWidth="true"
                    value={this.state.application.email}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12}>
              <Typography style={customStyle.headerStyle}>
                <p>Applicant References</p>
              </Typography>

              <Card>
                <CardBody>
                  <TextField
                    label="Reference 1"
                    id="ref_name_1"
                    fullWidth="true"
                    value={this.state.application.ref_name_1}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Reference 1 Phone Number"
                    id="ref_phone_1"
                    fullWidth="true"
                    value={this.state.application.ref_phone_1}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Reference 1 Relationship"
                    id="ref_relationship_1"
                    fullWidth="true"
                    value={this.state.application.ref_relationship_1}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Reference 2"
                    id="ref_name_2"
                    fullWidth="true"
                    value={this.state.application.ref_name_2}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Reference 2 Phone Number"
                    id="ref_phone_2"
                    fullWidth="true"
                    value={this.state.application.ref_phone_2}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Reference 2 Relationship"
                    id="ref_relationship_2"
                    fullWidth="true"
                    value={this.state.application.ref_relationship_2}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12}>
              <Typography style={customStyle.headerStyle}>
                <p>Pet Habitation</p>
              </Typography>

              <Card>
                <CardBody>
                  <TextField
                    label="Applicant is 18 Years Old or Older"
                    id="is_over_18"
                    fullWidth="true"
                    value={this.state.application.is_over_18 ? "Yes" : "No"}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Applicant Owns Current Residence"
                    id="is_homeowner"
                    fullWidth="true"
                    value={this.state.application.is_homeowner ? "Yes" : "No"}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="All Residents Agree to Adopt a New Animal"
                    id="is_in_agreement"
                    fullWidth="true"
                    value={this.state.application.is_in_agreement ? "Yes" : "No"}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Residency Inspection Allowed"
                    id="is_homevisit_allowed"
                    fullWidth="true"
                    value={this.state.application.is_homevisit_allowed ? "Yes" : "No"}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                  <TextField
                    label="Has a Fenced in Yard"
                    id="is_fenced"
                    fullWidth="true"
                    value={this.state.application.is_fenced ? "Yes" : "No"}
                    style={customStyle.textFieldStyle}
                    inputProps={{
                      disabled: true,
                      disableUnderline: true,
                    }}
                    InputProps={{
                      style: {
                        paddingLeft: "2%",
                        paddingTop: "2%",
                        disableUnderline: true,
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        padding: "18px 12px",
                      }
                    }}
                  />

                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={16}>
              <Typography style={customStyle.headerStyle}>
                <p>Applicant Signature</p>
              </Typography>

              <Card>
                <CardBody>

                  <GridContainer style={customStyle.signatureSectionStyle} direction="row" justify="center" alignItems="center" >

                    <FormControlLabel
                      label="I hereby certify that the information provided above is true and correct. "
                      labelPlacement="start"
                      control={<Checkbox
                        style={customStyle.checkboxStyle}
                        name="is_declaration"
                        icon={this.state.application.is_declaration ? <Check className={classes.checkedIcon} /> : <Check className={classes.uncheckedIcon} />}
                        disabled={true} />}
                    />

                  </GridContainer>

                </CardBody>
              </Card>

            </GridItem>

          </GridItem>

          <GridItem xs={6} sm={8} md={5} className={classes.notesSectionStyle}>

            <CreateNotes application={this.state.application} application_id={this.props.match.params.id} />

          </GridItem>


        </GridContainer>


      </>
    );
  };
};
ApplicationView.propTypes = {
  classes: PropTypes.object
};
const mapStateToProps = (state) => {
  return {
    application: state.applicationReducer.application,
    userID: state.userReducer.userID,
    shelterID: state.shelterReducer.shelterID,
    shelterWorkerID: state.userReducer.shelterWorkerID,
    roleID: state.userReducer.roleID,
    shelter: state.shelterReducer.shelter,
    options: state.applicationReducer.options
  }
};
export default connect(
  mapStateToProps,
  { fetchOptions, fetchApplication, updateApplication }
)(withStyles(regularFormsStyle)(ApplicationView));
{/* <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="rose" text>
                <CardText color="rose">
                  <h4>Application for {this.state.application.animal_name}</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal} style={customStyle.labelStyle}>
                      Application ID
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <CustomInput
                      id="application_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        disabled: true,
                        value: this.state.application.application_id
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal} style={customStyle.labelStyle}>
                      Application Status
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <CustomInput
                      id="application_status"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        disabled: true,
                        value: this.state.application.application_status
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>

                  <GridItem xs={12} sm={3}>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            style={customStyle.checkBoxStyle}
                            tabIndex={-1}
                            value={this.state.application.is_over_18}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}

                      />
                    </div>


                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <FormLabel
                      className={
                        classes.labelHorizontal +
                        " " +
                        classes.labelHorizontalRadioCheckbox
                      }
                    >
                      Applicant is over 18 years of age
                    </FormLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Password
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        autoComplete: "off"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Placeholder
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <CustomInput
                      id="placeholder"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "placeholder"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Disabled
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <CustomInput
                      id="disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Disabled",
                        disabled: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel className={classes.labelHorizontal}>
                      Static control
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <div className={classes.staticFormGroup}>
                      <p className={classes.staticFormControl}>
                        hello@creative-tim.com
                      </p>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3}>
                    <FormLabel
                      className={
                        classes.labelHorizontal +
                        " " +
                        classes.labelHorizontalRadioCheckbox
                      }
                    >
                      Checkboxes and radios
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={9}>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(3)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="First Checkbox"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(4)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="Second Checkbox"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.selectedValue === "a"}
                            onChange={this.handleChange}
                            value="a"
                            name="radio button demo"
                            aria-label="A"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="First Radio"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={this.state.selectedValue === "b"}
                            onChange={this.handleChange}
                            value="b"
                            name="radio button demo"
                            aria-label="B"
                            icon={
                              <FiberManualRecord
                                className={classes.radioUnchecked}
                              />
                            }
                            checkedIcon={
                              <FiberManualRecord
                                className={classes.radioChecked}
                              />
                            }
                            classes={{
                              checked: classes.radio,
                              root: classes.radioRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="Second Radio"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel
                      className={
                        classes.labelHorizontal +
                        " " +
                        classes.labelHorizontalRadioCheckbox
                      }
                    >
                      Inline checkboxes
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div className={classes.inlineChecks}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(10)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="a"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(11)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="b"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(12)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="c"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>  */}