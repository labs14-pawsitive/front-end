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
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  choiche: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px"
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch
};

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_homeowner: false,
      is_agreement: false,
      is_fenced: false,
      is_homevisit: false
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  isValidated() {
    return true;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}>Tell us a little bit about your home</h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("is_homeowner")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-check " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-check " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Do you own your home?</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("is_agreement")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-check " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-check " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Is your family agreeing with adopting a new animal?</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("is_fenced")}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-check " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-check " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Do you have a fenced yard?</h6>
                </div>
              </GridItem>
              <GridItem xs={12} sm={3}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("is_homevisit")}
                    checkedIcon={
                      <i
                        className={"fas fa-check " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-check " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox
                    }}
                  />
                  <h6>Will you agree with a home visit?</h6>
                </div>
                
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step2);
