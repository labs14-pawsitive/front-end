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
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

// @material-ui/icons
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CustomDropdown from 'components/CustomDropdown/CustomDropdown.jsx';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

import DisplayNotes from '../Components/Application/DisplayNotes';

import moment from 'moment';

import { getOptions, updateApplication } from '../../actions/applicationAction';

class ApplicationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      application: {},

      options: [],

      statusChanged: false,
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }


  loadApplication = async () => {

    await axios
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
          console.log('app from state', this.state.application)
        }
      })
      .catch(error => {
        console.log(error)
      })
  };

  loadOptions = async () => {
    await axios
      .get(`https://staging1-pawsnfind.herokuapp.com/api/internal/paws/options/${this.props.match.params.id}`)
      .then(options => {
        console.log('options', options.data)

        this.setState({
          options: options.data.application_status
        })
        console.log('options from state', this.state.options)
      })
      .catch(error => {
        console.log(error)
      })
  };

  updateAppStatus = async (event) => {

   let updatedStatus = {           
      animal_id: 3,         
      shelter_id: 3, 
      user_id: 3,
      application_status_id: this.state.application.application_status_id
    };

    let id = 3;

    await axios
    .put(`https://staging1-pawsnfind.herokuapp.com/api/applications/${id}/status`, updatedStatus)
    .then(updatedApp => {
        console.log('updated app status', updatedApp.data)
    })
    .catch(error => {
      console.log(error)
    })

  //  this.updateApplication(updatedStatus, 3 ) // this.state.application.application_id
  };


  componentWillMount() {

    this.loadApplication()

    this.loadOptions()

  };

 handleChange = async (event) => {

    const appStatus = this.state.options[event.target.value - 1].application_status

    await this.setState({ ...this.state, application: {...this.state.application, application_status: appStatus, application_status_id: event.target.value, } });

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
        paddingTop: "33px",
      },
      checkBoxStyle: {
        float: "right",
        color: "#000"
      },
      inputStyle: {
        background: '#edeae8',
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "0px",
        paddingRight: "0px",
      },
      textFieldStyle: {
        background: '#edeae8',
        marginTop: '3%',
        marginBottom: '3%',
        fontStyle: "Sans-serif",
        // paddingLeft: "3%",
      },
      dropDownStyle: {
        background: '#edeae8',
        padding: '4%',
        marginTop: '3%',
        marginBottom: '3%'
      },
      headerStyle: {
        fontStyle: "Sans-serif",
        fontSize: "30px",
        paddingTop: "10px",
      },

    };

    // const appStatusDropdown = this.props.statusOptions.map(option => {

    // })

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
                      fullWidth='true'
                      disabled='true'
                      value={this.state.application.application_id}
                      style={customStyle.textFieldStyle}
                    />

                    <TextField
                      label="Animal Name"
                      id="animal_name"
                      fullWidth='true'
                      disabled='true'
                      value={this.state.application.animal_name}
                      style={customStyle.textFieldStyle}
                    />

                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel htmlFor="application_status" className={classes.selectLabel}>
                        Application Status
                              </InputLabel>

                      <Select
                        MenuProps={{
                          className: classes.selectMenu 
                        }}
                        classes={{
                          select: classes.select
                        }}
                        renderValue={value => `${value}`}
                        value={this.state.application.application_status}
                        onChange={this.handleChange}
                        name="application_status"
                        id="application_status"
                      >

                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Application Status
                        </MenuItem>

                        {this.state.options.map((option, key) => (
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

                    </FormControl>

                    <TextField
                      label="Applicant Name"
                      id="name"
                      fullWidth='true'
                      disabled='true'
                      value={this.state.application.name}
                      style={customStyle.textFieldStyle}
                    />

                    <TextField
                      label="Submission Date"
                      id="application_status"
                      fullWidth='true'
                      disabled='true'
                      value={moment(this.state.application.created_at).format("MMMM Do YYYY").toString()}
                      style={customStyle.textFieldStyle}
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
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.street_address}
                    style={customStyle.textFieldStyle}
                  />
                  <TextField
                    label="City / State / Zip"
                    id="city"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.city}
                    style={customStyle.textFieldStyle}
                  />
                  <TextField
                    label="Home Phone Number"
                    id="home_number"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.home_phone}
                    style={customStyle.textFieldStyle}
                  />
                  <TextField
                    label="Cell Phone Number"
                    id="cell_number"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.cell_phone}
                    style={customStyle.textFieldStyle}
                  />
                  <TextField
                    label="Email"
                    id="name"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.email}
                    style={customStyle.textFieldStyle}
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
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.ref_name_1}
                    style={customStyle.textFieldStyle}
                  />

                  <TextField
                    label="Reference 1 Phone Number"
                    id="ref_phone_1"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.ref_phone_1}
                    style={customStyle.textFieldStyle}
                  />

                  <TextField
                    label="Reference 1 Relationship"
                    id="ref_relationship_1"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.ref_relationship_1}
                    style={customStyle.textFieldStyle}
                  />

                  <TextField
                    label="Reference 2"
                    id="ref_name_2"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.ref_name_2}
                    style={customStyle.textFieldStyle}
                  />

                  <TextField
                    label="Reference 2 Phone Number"
                    id="ref_phone_2"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.ref_phone_2}
                    style={customStyle.textFieldStyle}
                  />

                  <TextField
                    label="Reference 2 Relationship"
                    id="ref_relationship_2"
                    fullWidth='true'
                    disabled='true'
                    value={this.state.application.ref_relationship_2}
                    style={customStyle.textFieldStyle}
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

                  <GridContainer style={customStyle.textFieldStyle} direction='row' justify='center' alignItems='center' >
                    <GridItem xs={10}>
                      <TextField
                        fullWidth='true'
                        disabled='true'
                        value="I hereby certify that the information provided above is true and correct"
                        style={customStyle.textFieldStyle}
                      />

                    </GridItem>

                    <Checkbox
                      style={customStyle.checkboxStyle}
                      name="is_declaration"
                      icon={this.state.application.is_declaration ? <Check className={classes.checkedIcon} /> : <Check className={classes.uncheckedIcon} />}
                      disabled={true}
                    />

                  </GridContainer>

                </CardBody>
              </Card>

            </GridItem>
          </GridItem>

          <GridItem xs={6} sm={8} md={5} className={classes.notesSectionStyle}>

            <DisplayNotes application={this.state.application} application_id={this.props.match.params.id} />

          </GridItem>


        </GridContainer>


      </>
    );
  }
}

ApplicationView.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userID: state.userReducer.userID,
    shelterID: state.shelterReducer.shelterID,
    shelterWorkerID: state.userReducer.shelterWorkerID,
    roleID: state.userReducer.roleID,
    shelter: state.shelterReducer.shelter,
    options: state.applicationReducer.options
  }
}

export default connect(
  mapStateToProps,
  { getOptions }
)(withStyles(regularFormsStyle)(ApplicationView))

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