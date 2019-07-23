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
import axios from "axios";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";

import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import DisplayNotes from '../Components/Application/DisplayNotes';

class AppliationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      application: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  componentDidMount() {

    axios
      // get(`http://localhost:8000/api/applications/${this.props.match.params.id}`)
      .get(`https://staging1-pawsnfind.herokuapp.com/api/applications/${this.props.match.params.id}`)
      .then(application => {

        console.log('application', application.data)
        if (application.data.shelter !== this.props.shelter) {
          this.props.history.push('/admin/dashboard')
        } else {
          this.setState({
            application: application.data,
          })
          console.log(this.state.application)
        }

      })
      .catch(error => {
        console.log(error)
      })


  }


  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }
  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }
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
    });
  }


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
        paddingTop: "33px"
      },
      checkBoxStyle: {
        float: "right"
      }
    }

    return (
      <>
        <GridContainer>

          <GridItem xs={false} sm={4} md={7}>
            <GridItem xs={12} sm={12}>
              <Typography>
                <h4>Applicant Information</h4>
              </Typography>
              <Card>
                <CardBody>
                  <form>
                    <CustomInput
                      labelText="Application ID"
                      id="application_id"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        disabled: true,
                        value: this.state.application.application_id,
                      }}
                    />

                    <CustomInput
                      labelText="Animal Name"
                      id="animal_name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        disabled: true,
                        value: this.state.application.animal_name,
                      }}
                    />

                    <CustomInput
                      labelText="Application Status"
                      id="application_status"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: this.state.application.application_status
                      }}
                    />

                    <CustomInput
                      labelText="Applicant Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        disabled: true,
                        value: this.state.application.name
                      }}
                    />

                    <CustomInput
                      labelText="Submission Date"
                      id="application_status"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        disabled: true,
                        // value: this.state.application
                      }}
                    />
                  </form>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12}>
              <Typography>
                <h4>Applicant Contact Information</h4>
              </Typography>
              <Card>
                <CardBody>
                  <CustomInput
                    labelText="Street Address"
                    id="street_address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.street_address,
                    }}

                  />
                  <CustomInput
                    labelText="City / State / Zip"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.city,
                    }}

                  />
                  <CustomInput
                    labelText="Home Phone Number"
                    id="home_number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.home_phone
                    }}
                  />
                  <CustomInput
                    labelText="Cell Phone Number"
                    id="cell_number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.cell_phone
                    }}
                  />
                  <CustomInput
                    labelText="Email"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.email
                    }}
                  />
                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12}>
              <Typography>
                <h4>Applicant References</h4>
              </Typography>

              <Card>
                <CardBody>
                  <CustomInput
                    labelText="Reference 1"
                    id="ref_name_1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.ref_name_1,
                    }}
                  />

                  <CustomInput
                    labelText="Reference 1 Phone Number"
                    id="ref_phone_1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.ref_phone_1,
                    }}
                  />

                  <CustomInput
                    labelText="Reference 1 Relationship"
                    id="ref_relationship_1"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.ref_relationship_1,
                    }}
                  />

                  <CustomInput
                    labelText="Reference 2"
                    id="ref_name_2"
                    formCOntrolProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.ref_name_2
                    }}
                  />

                  <CustomInput
                    labelText="Reference 2 Phone Number"
                    id="ref_phone_2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.ref_phone_2,
                    }}
                  />

                  <CustomInput
                    labelText="Reference 2 Relationship"
                    id="ref_relationship_2"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      disabled: true,
                      value: this.state.application.ref_relationship_2,
                    }}
                  />

                </CardBody>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={16}>
              <Typography>
                <h4>Applicant Signature</h4>
              </Typography>

              <Card>
                <CardBody>

                  <GridContainer direction='row' alignItems='center' >
                    <GridItem xs={10}>
                      <FormLabel style={customStyle.labelStyle}>
                        I hereby certify that the information provided above is true and correct
                      </FormLabel>
                    </GridItem>

                    <GridItem xs={false}>
                      <Checkbox
                        style={customStyle.checkBoxStyle}
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
                    </GridItem>
                  </GridContainer>

                </CardBody>
              </Card>

            </GridItem>
          </GridItem>

          <GridItem xs={12} sm={8} md={5}>
            <Typography>
              <h4>Admin Notes</h4>
            </Typography>

            
                <DisplayNotes />
            
          </GridItem>


        </GridContainer>


      </>
    );
  }
}

AppliationView.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userID: state.userReducer.userID,
    shelterID: state.shelterReducer.shelterID,
    shelterWorkerID: state.userReducer.shelterWorkerID,
    roleID: state.userReducer.roleID,
    shelter: state.shelterReducer.shelter
  }
}

export default connect(
  mapStateToProps,
  {}
)(withStyles(regularFormsStyle)(AppliationView))

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