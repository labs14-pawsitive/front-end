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

class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      declaration: false,
      declarationSuccess: ""
      
    };
  }
  sendState() {
    return this.state;
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = name => event => {
    if(event.target.checked) {
      this.setState({ [name + "Success"] : "success" })
    } else {
      this.setState({ [name + "Success"] : "error" })
    }
    this.setState({ [name]: event.target.checked });
  };

  isValidated() {
    if(this.state.declarationSuccess === "success"){
      return true;
    } else {
      if (this.state.declarationSuccess !== "success") {
        this.setState({ declarationSuccess: "error" });
      }
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    
    const customStyle = {
      errorRed : {
        color: "red"
      }
    }

    return (
      <div>
        <h4 className={classes.infoText}>Declaration</h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={12}>
                <div className={classes.choiche}>
                  <Checkbox
                    tabIndex={-1}
                    onClick={this.handleChange("declaration")}
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
                  <h6 style={this.state.declarationSuccess === "error" ? customStyle.errorRed : null}>Electronic Signature</h6>
                </div>  
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Step4.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step4);
