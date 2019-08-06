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
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";

import wizardStyle from "assets/jss/material-dashboard-pro-react/components/wizardStyle.jsx";

import axios from 'axios';
import customTabsStyle from "assets/jss/material-dashboard-pro-react/components/customTabsStyle";

class ShelterOnboardingWizard extends React.Component {
  constructor(props) {
    super(props);
    var width;
    if (this.props.steps.length === 1) {
      width = "100%";
    } else {
      if (window.innerWidth < 600) {
        if (this.props.steps.length !== 3) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      } else {
        if (this.props.steps.length === 2) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      }
    }
    this.state = {
      currentStep: 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
     
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      },
      allStates: {},
      ein: "",
      shelterName: "", 
      user_id: "",
      shelter_id: "",
      stepOne:false,
      name: "",
      email: "",
      phone: "",
      stepTwo: false,
      state: "",
      city: "",
      zip: "",
      street: "",
      nickname: "",
      stepThree: false,
      error: ""
    };
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
  }
  wizard = React.createRef();
  
  componentDidMount() {
    this.refreshAnimation(0);
    window.addEventListener("resize", this.updateWidth);
    const shelter_id = localStorage.getItem('shelter_id')

    if(shelter_id != "null" && typeof(shelter_id) !== 'undefined') {
      const {history} = this.props;
        history.push('/admin/dashboard')
      } 
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }
  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }
  navigationStepChange(key) {
    if (this.props.steps) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this[this.props.steps[i].stepId].sendState !== undefined) {
            this.setState({
              allStates: {
                ...this.state.allStates,
                [this.props.steps[i].stepId]: this[
                  this.props.steps[i].stepId
                ].sendState()
              }
            });
          }
          if (
            this[this.props.steps[i].stepId].isValidated !== undefined &&
            this[this.props.steps[i].stepId].isValidated() === false
          ) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false
        });
        this.refreshAnimation(key);
      }
    }
  }


  async nextButtonClick() {
    if (
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined)) ||
      this.props.validate === undefined
    ) {
      if (
        this[this.props.steps[this.state.currentStep].stepId].sendState !==
        undefined
      ) {
       
        await this.setState({
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          },
          error: ""
          
        });

        // ***** onboarding process begins after field validation  ******//
        // step one of shelter onboarding : verifying EIN (valid EIN and no record in database), add shelter, add shelter user, and update user with shelter_user_id
        if(this.state.currentStep === 0 && this.state.stepOne === false) {
          await this.setState({
            error : "",
            ein: this.state.allStates.legal_info.ein, 
            shelterName : this.state.allStates.legal_info.shelterName,
          })
          await this.verifyShelter(this.state.ein, this.state.currentStep);
        } 
        // step two of shelter onboarding : add main contact information for shelter
        else if(this.state.currentStep === 1 && this.state.stepTwo === false) 
        {
          await this.setState({
            error: "",
            name: this.state.allStates.contact.name,
            email: this.state.allStates.contact.email,
            phone: this.state.allStates.contact.phone
          })
          const newContact = {shelter_id: this.state.shelter_id, name: this.state.name, email: this.state.email, phone: this.state.phone}
          await this.addContact(newContact)
        }
        // step three of shelter onboarding : add main location information for shelter using modified finishing button click
        //step three now use finishing button instead of current function

        
      }        
      console.log(this.state.allStates.legal_info.ein)
    }
  }

  settingStates = async() => {
      let key = this.state.currentStep + 1;
      await this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      await this.refreshAnimation(key);
  }

  addLocation = async (newLocation) => {
    await axios
    .post(`${process.env.backendurl}/api/shelters/${localStorage.getItem('shelter_id')}/mainLocation`, newLocation)
    .then( result => {
      console.log('result', result)
      localStorage.setItem("location_id", result.data.id)
      localStorage.setItem("new_user", false)
      //this.settingStates();
      this.setState({
        stepThree : true
      })
    })
    .catch (error => {
      this.setState({
        error: "We were unable to save your location information, please try again."
      })
    })
  }

  addContact = async (newContact) => {
    await axios
    .post(`${process.env.backendurl}/api/shelters/${localStorage.getItem('shelter_id')}/mainContact`, newContact )
    .then( result => {
        console.log('result' , result)
        localStorage.setItem("contact_id", result.data.id)
        this.settingStates();
        this.setState({
          stepTwo : true,
        })
    })
    .catch( error => {
      this.setState({
        error: "We were unable to save your contact information, please try again."
      })
    })
  }

  verifyShelter = async (ein, currentStep) => {
          console.log("Step one authentication begins" )
          const newShelter = {shelter : this.state.shelterName}
          
          await axios
          .get(`${process.env.backendurl}/api/ein/validate/${this.state.ein}`)
          .then(result => {
              const shelterInfo = { shelter : this.state.shelterName, EIN: this.state.ein}
              this.addShelter(shelterInfo) 
          })
          .catch(err => {
            console.log(err.toString())
            this.setState({
              error: "The EIN you've entered is either invalid or already exist in our database"
            })
          })
  }

  addShelter = async (shelter) => {
    await axios
    .put(`${process.env.backendurl}/api/shelters/users/${localStorage.getItem('user_id')}`, shelter)
    .then( result => {
      console.log('result' , result)
      localStorage.setItem("shelter_id", result.data.shelterInfo.id)
      localStorage.setItem("token", result.data.shelterInfo.token)
      this.settingStates();
      this.setState({
        stepOne : true,
        shelter_id : result.data.shelterInfo.id
      })
    })
    .catch( error => {
      console.log(error)
      this.setState({
              error: "Having trouble adding your shelter to our database"
        })
    })
  }

  previousButtonClick() {
    if (
      this[this.props.steps[this.state.currentStep].stepId].sendState !==
      undefined
    ) {
      this.setState({
        allStates: {
          ...this.state.allStates,
          [this.props.steps[this.state.currentStep].stepId]: this[
            this.props.steps[this.state.currentStep].stepId
          ].sendState()
        }
      });
    }
    var key = this.state.currentStep - 1;
    if (key >= 0) {
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }
  async finishButtonClick() {
    if (
      (this.props.validate === false &&
        this.props.finishButtonClick !== undefined) ||
      (this.props.validate &&
        ((this[this.props.steps[this.state.currentStep].stepId].isValidated !==
          undefined &&
          this[
            this.props.steps[this.state.currentStep].stepId
          ].isValidated()) ||
          this[this.props.steps[this.state.currentStep].stepId].isValidated ===
            undefined) &&
        this.props.finishButtonClick !== undefined)
    ) {
      await this.setState(
        {
          allStates: {
            ...this.state.allStates,
            [this.props.steps[this.state.currentStep].stepId]: this[
              this.props.steps[this.state.currentStep].stepId
            ].sendState()
          }
        },
      );
        if(this.state.stepThree === false) {
            this.setState({
            error: "",
            street: this.state.allStates.location.street,
            city: this.state.allStates.location.city,
            state: this.state.allStates.location.state,
            zip: this.state.allStates.location.zip,
            nickname: this.state.allStates.location.nickname
          })
          const newLocation = {shelter_id: this.state.shelter_id, street_address: this.state.street, city: this.state.city, zipcode: this.state.zip, state_id: this.state.state, nickname: this.state.nickname, shelter_contact_id: localStorage.getItem("contact_id")}
          this.addLocation(newLocation)
          }
    } 
  }

  refreshAnimation(index) {
    var total = this.props.steps.length;
    var li_width = 100 / total;
    var total_steps = this.props.steps.length;
    var move_distance =
      this.wizard.current.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.wizard.current.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: li_width + "%" });

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
    };
    this.setState({ movingTabStyle: movingTabStyle });
  }
  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    const customStyle={
      warning : {
        width: "70%",
        margin: "50px auto 30px",
        textAlign: "center",
        borderRadius: "5px",
        color:"red",
        fontWeight:"700"
      },
      success : {
        width: "70%",
        margin: "50px auto 30px",
        textAlign: "center",
        borderRadius: "5px",
        color:"green",
        fontWeight:"700"
      }
    }
    return (
      <div className={classes.wizardContainer} ref={this.wizard}>
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                return (
                  <li
                    className={classes.steps}
                    key={key}
                    style={{ width: this.state.width }}
                  >
                    <a
                      href="#pablo"
                      className={classes.stepsAnchor}
                      onClick={e => {
                        e.preventDefault();
                        this.navigationStepChange(key);
                      }}
                    >
                      {prop.stepName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div
              className={classes.movingTab + " " + classes[color]}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div style={customStyle.warning}>
            <h4>{this.state.error}</h4>
            </div>
              
     


          <div className={classes.content}>
            {this.state.stepThree === false? 
            steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key
              });
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={node => (this[prop.stepId] = node)}
                    allStates={this.state.allStates}
                  />
                </div>
              );
            }) 
            : 
            <div style={customStyle.success}>
            <h4>You've successfully registered your shelter</h4>
            </div>
            }
            
          </div>
          <div className={classes.footer}>
           
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color="rose"
                  className={this.props.nextButtonClasses}
                  onClick={() => this.nextButtonClick()}
                >
                  {this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton && this.state.stepThree === false ? (
                <Button
                  color="rose"
                  className={this.finishButtonClasses}
                  onClick={() => this.finishButtonClick()}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
              {this.state.stepThree === true? (
                <NavLink to="/admin/dashboard">
                <Button
                  color="rose"
                  className={this.finishButtonClasses}
                >
                  Go to your shelter dashboard
                </Button></NavLink>
              ) : null }
            </div>
            <div className={classes.clearfix} />
          </div>
        </Card>
      </div>
    );
  }
}

ShelterOnboardingWizard.defaultProps = {
  color: "rose",
  title: "Here should go your title",
  subtitle: "And this would be your subtitle",
  previousButtonText: "Previous",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "Next",
  finishButtonClasses: "",
  finishButtonText: "Finish"
};

ShelterOnboardingWizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.object.isRequired,
      stepId: PropTypes.string.isRequired
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool
};

export default withRouter(withStyles(wizardStyle)(ShelterOnboardingWizard));
