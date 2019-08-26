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
import {
  cardTitle,
  successColor,
  dangerColor,
  roseColor,
  whiteColor
} from "assets/jss/material-dashboard-pro-react.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const regularFormsStyle = {
  ...customCheckboxRadioSwitch,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  staticFormGroup: {
    marginLeft: "0",
    marginRight: "0",
    paddingBottom: "10px",
    margin: "8px 0 0 0",
    position: "relative",
    "&:before,&:after": {
      display: "table",
      content: '" "',
    },
    "&:after": {
      clear: "both"
    }
  },
  staticFormControl: {
    marginBottom: "0",
    paddingTop: "8px",
    paddingBottom: "8px",
    minHeight: "34px"
  },
  inputAdornment: {
    marginRight: "8px",
    position: "relative"
  },
  inputAdornmentIconSuccess: {
    color: successColor[0] + "!important"
  },
  inputAdornmentIconError: {
    color: dangerColor[0] + "!important"
  },
  notesSectionStyle: {
    paddingTop: "10px",
  },
  dropdownStyle: {
    height: "30px",
  },
  menuOptionStyle: {
    marginLeft: '5px',
  },
  underlineStyle: {
    borderBottom: '1px solid black',
  },
  submitButtonStyle: {
    backgroundColor: roseColor[0],
    color: whiteColor,
    width: '200px',
    marginTop: '20px',
    marginRight: '15px',
  },

};

export default regularFormsStyle;
