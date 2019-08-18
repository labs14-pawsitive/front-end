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
import MaskedInput from 'react-text-mask';

import { connect } from "react-redux";

import { getAllOptions } from '../../actions/animalAction.js'
import { initialSearch } from '../../actions/mainPageAction.js'

import Product from './Product.jsx'
import backgroundImag from 'assets/img/main-page/adorable-animal-beach-928449.jpg'
import backgroundImag1 from 'assets/img/main-page/animal-cute-animals-dog-59523.jpg'
import dogImage from 'assets/img/main-page/home_img.png'
import Hidden from '@material-ui/core/Hidden';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Card from "@material-ui/core/Card";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";
import FeatureAnimals from "./FeatureAnimals";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function moveCursor(event) {
  let digits = event.target.value.replace(/\D/g, '');
  event.target.setSelectionRange(digits.length, digits.length);
}

//text mask for zip 5 digit 
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    //showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      species: [],
      dropdownSpecies: [],
      labelWidth: 0,
      zipcode: "",
      distanceDropdown: [5, 10, 15],
      distance: "",
      zipcodeState: '',
      distanceState: '',
      speciesState: ''
    }
  }

  componentDidMount() {
    this.props.getAllOptions(0)
      .then(options => {
        console.log('main component did mount options ', options)
        this.setState({
          dropdownSpecies: this.props.species,
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      })
      .catch(
        error => {
          console.log('animal info error', error)
        }
      )

  }


  verifyDigitOnly(value, length) {
    let digits = value.replace(/\D/g, '');
    if (digits.length === length) {
      return true;
    }
    return false
  }

  isValidated() {
    if (
      this.state.zipcodeState === "success" &&
      this.state.distanceState === "success" &&
      this.state.speciesState === "success"
    ) {
      return true;
    } else {
      if (this.state.zipcodeState !== "success") {
        this.setState({ zipcodeState: "error" });
      }
      if (this.state.distanceState !== "success") {
        this.setState({ distanceState: "error" });
      }
      if (this.state.speciesState !== "success") {
        this.setState({ speciesState: "error" });
      }

    }
    return false;
  }

  handleChange = event => {

    //validate state not empty

    if (event.target.value != null) {
      this.setState({ [event.target.name + "State"]: "success" });
    } else {
      this.setState({ [event.target.name + "State"]: "error" });
    }
    this.setState({ [event.target.name]: event.target.value });

    console.log('this.state.species ', this.state.species)
  };

  handleZip(event, stateName, type, stateNameEqualTo) {
    switch (type) {

      case "digit-only":
        if (this.verifyDigitOnly(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
      default:
        break;
    }

    this.setState({ [stateName]: event.target.value });
  }

  handleSearch = event => {

    event.preventDefault()

    let newArray = []

    for (let i = 0; i < this.state.species.length; i++) {
      let variable = this.props.species.find(species => species.species === this.state.species[i]).id

      newArray.push(variable)
    }

    const searchObject = {

      species_id: newArray,
      zipcode: Number(this.state.zipcode),
      radius: this.state.distance

    }

    console.log('front end search object ', searchObject)

    if (this.isValidated()) {

      this.props.initialSearch(searchObject)
        .then(res => console.log('initial search results ', res))
        .catch(error => console.log('initial search error ', error))
    }
  }

  getStyles(name, that) {
    return {
      fontWeight:
        that.state.name.indexOf(name) === -1
          ? that.props.theme.typography.fontWeightRegular
          : that.props.theme.typography.fontWeightMedium
    };
  }


  render() {
    const { classes } = this.props;

    const styles = theme => ({
      root: {
        // backgroundColor: 'blue',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    });

    // const dropzoneStyles =
    //   window.screen.availWidth < 600 ?
    //     { 'display': 'none' }
    //     : { "marginTop": "167px", 'display': 'flex' };

    const customStyle = {
      speciesOutline: {
        width: "159%"
      },
      distanceOutline: {
        width: "262%"
      },
      speciesCardStyle: {
        padding: "0 3%",
        marginBottom: "30px",
        marginTop: "50px"
      },
      zipDistStyle: {
        display: "flex",
        marginBottom: "30px"
      },
      textStyle: {
        margin: 0,
        width: "95.5%"
      },
      speciesGridStyle: {
        marginBottom: "30px",
      },
      speciesFormStyle: {
        width: "60%"
      },
      buttonStyle: {
        marginTop: "15px",
        marginBottom: "15px",
        width: "100%",
        height: "50px",
        background: "#A364A5",
        color: "white"
      },
      buttonGridStyle: {
        margin: "auto"
      },
      speciesLabel: {
      },
      headingStyle: {
        marginBottom: "30px",
      },
      ImageStyle: {
        display: "flex",
        flexWrap: 'wrap',
        margin:"0 auto"
      },
      imageHeaderStyle: {
        textAlign: "center"
      },
      imageMainStyle: {
        backgroundImage: "url(" + dogImage + ")",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      subGridStyle: {
        width: "100%",
        height: "auto",
        display: "flex",
        background: "white",
        flexWrap: 'wrap',
        borderRadius: "5px",
        // paddingTop: "10px",
        // marginTop: "274px",
      },
      eachGridStyle: {
        width: "100%",
        marginTop: "16px",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
      },
      distanceGridStyle: {
        width: "100%",
        // marginTop: "60px",
        // marginBottom: "15px",
        display: "flex",
        alignItems: "center",
      },
      selectStyle: {
        fullWidth: "true"
      },
      mainGridStyle: {
        display: "flex",
        justifyContent: "center",
        marginTop: "274px",
        position: "relative"
      },
      topGrid: {
        background: "url(" + dogImage + ")",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#349FAD",
        height: "720px",
        position: "relative"

      },
      textTopGrid: {
        // border: "1px solid blue",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        marginRight: "-196px",
        marginTop: "120px"
      },
      textP1: {
        fontSize: "22px",
        color: "white",
      },
      textP2: {
        fontSize: "30px",
        color: "white",
        fontWeight: "bold"
      },
      imageGrid: {
        // border: "1px solid orange",
        width: "100%",
        height: "100%"
      },
      divImage: {
        zIndex: 1,
        position: "relative",
        '@media (min-width:707px)': {
          display: "none"
        }
        // border: "1px solid green",
      },
      signUpButton: {
        background: "#A364A5",
        color: "white",
        // marginLeft: "149px"
      },
      textBoxTop: {
        marginBottom: "20px",
      },
      imageTopGrid: {
        marginTop: "167px",
      },
      topLeft: {
        // border: "1px solid black",
        paddingTop: "100px",
        paddingLeft: "146px",
        position: "relative",
        paddingBottom: "100px",
      },
    }



    return (

      <GridContainer className={classes.bodyStyle}>
        <GridItem xs={12} sm={12} md={12} style={{ background: "#349FAD", zindex: "4", display: "flex" }} >
          <GridItem xs={12} sm={10} md={9} style={customStyle.textTopGrid}>
            <div style={customStyle.topLeft}>
              <div style={customStyle.textBoxTop}>
                <p style={customStyle.textP1}>Search, Discover</p>
                <p style={customStyle.textP2}>ADOPT YOUR PET</p>
              </div>
              <Button size="large" style={customStyle.signUpButton}
                variant="contained" className={classes.button} onClick={this.handleSearch}>
                SIGN UP
              </Button>
            </div>
          </GridItem>
          <Hidden smDown>
            <GridItem md={10} style={{

              zIndex: "7",
              minHeight: "500px",
              backgroundImage: "url(" + dogImage + ")",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto 100%",
              position: "relative",
              marginTop: "100px"
            }}>
            </GridItem>
          </Hidden>
        </GridItem>

        <GridItem xs={10} sm={10} md={10} style={{ minHeight: "200px", marginTop: "-60px", zIndex: "6", backgroundColor: "#ffffff", borderRadius: "5px", boxShadow: "0 0 5px #33333330" }} >
          <GridItem xs={12} sm={11} md={12} style={customStyle.subGridStyle}>
            <div style={{ display: "flex", flexWrap: 'wrap', padding: "56px 10px", width: "100%" }}>
              <GridItem xs={12} sm={12} md={3} style={customStyle.eachGridStyle}>
                <FormControl variant="outlined" className={classes.formControl} style={customStyle.speciesFormStyle} >

                  <InputLabel style={customStyle.speciesLabel}
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="select-multiple-checkbox"
                  >Species</InputLabel>
                  <Select
                    multiple
                    value={this.state.species}
                    onChange={this.handleChange}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                    input={<OutlinedInput
                      name="species"
                      labelWidth={this.state.labelWidth}
                      id="select-multiple-checkbox"
                      style={customStyle.speciesOutline}
                    />}

                  >
                    {this.props.species.map(species => (
                      <MenuItem key={species.id} value={species.species}>
                        <Checkbox checked={this.state.species.indexOf(species.species) > -1} />
                        <ListItemText primary={species.species} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem xs={12} sm={12} md={3} style={customStyle.eachGridStyle}>
                <TextField style={customStyle.textStyle}
                  success={this.props.zipcode === "success"}
                  error={this.props.zipcode === "error"}

                  name="zipcode"
                  label="Zipcode"
                  className={classes.textField}
                  value={this.state.zipcode}
                  margin="normal"
                  variant="outlined"
                  inputProps={{
                    onChange: event => { this.handleZip(event, "zipcode", "digit-only", 5) },
                    onClick: event => moveCursor(event),
                    onFocus: event => moveCursor(event),
                    inputComponent: TextMaskCustom,

                  }}
                />
              </GridItem>
              <GridItem xs={8} sm={8} md={2} style={customStyle.distanceGridStyle}>
                <div style={{ minWidth: "147%" }}>
                  <FormControl variant="outlined" className={classes.formControl}
                    style={{ minWidth: "38.195%", }}
                  >
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="distance"
                    >Distance</InputLabel>
                    <Select

                      value={this.state.distance}
                      name='distance'
                      onChange={this.handleChange}
                      renderValue={value => `${value}`}
                      input={<OutlinedInput
                        name="distance"
                        labelWidth={this.state.labelWidth}
                        id="distance"
                        style={customStyle.distanceOutline}
                      />}
                    >

                      {this.state.distanceDropdown.map(distance => {
                        return (
                          <MenuItem key={distance} value={distance}>
                            {distance}</MenuItem>
                        )
                      })}

                    </Select>
                  </FormControl>
                </div>
              </GridItem>
              <GridItem xs={5} sm={6} md={2} style={customStyle.buttonGridStyle}>
                <Button size="medium" style={customStyle.buttonStyle}
                  variant="contained" className={classes.button} onClick={this.handleSearch}>
                  SEARCH
              </Button>
              </GridItem>
            </div>
          </GridItem>



        </GridItem>

        <div style={{width: "100%"}}>
        <GridItem xs={12} sm={12} md={12} >
          <h4 style={customStyle.imageHeaderStyle}>Featured Animals</h4>
          <div >
          <GridItem xs={12} sm={12} md={10} xl={12} style={customStyle.ImageStyle}>
            {/* <div style={{width:"100%"}}> */}
            {/* <div style={{width:"100%"}}> */}
              <FeatureAnimals />
            {/* </div>
            <div style={{width:"100%"}}> */}
              <FeatureAnimals />
            {/* </div>
            <div style={{width:"100%"}}> */}
              <FeatureAnimals />
            {/* </div>
            <div style={{width:"100%"}}> */}
              <FeatureAnimals />
            {/* </div>
            <div style={{width:"100%"}}> */}
              <FeatureAnimals />
            {/* </div> */}
            {/* </div> */}
          </GridItem>
          </div>
        </GridItem>
        </div>

        <Product />

      </GridContainer >


      //Mings design

      // <GridContainer className={classes.bodyStyle} >
      //   <GridItem xs={12} sm={12} md={12} style={{ background: "#349FAD",zindex:"4"}} >
      //   <GridItem xs={10} sm={10} md={9} style={{ 
      //     zIndex: "7", 
      //     minHeight: "700px", 
      //     backgroundImage: "url(" + dogImage + ")", 
      //     backgroundPosition: "right", 
      //     backgroundRepeat: "no-repeat", 
      //     backgroundSize: "auto",
      //     position: "relative"
      //     // backgroundColor: "#349FAD", 
      //     }}>
      //   {/* <GridItem xs={10} sm={10} md={9} style={customStyle.mainGrid}> */}

      //     <GridItem xs={12} sm={8}>

      //       <div style={{ color: "white", textShadow: "5px 5px #00000030" }}>ADOPT YOUR PET<sup>*</sup></div>

      //     </GridItem>

      //     </GridItem>
      //   </GridItem>
      //   <GridItem xs={10} sm={10} md={10} style={{ minHeight: "200px", marginTop: "-120px", zIndex: "6", backgroundColor: "#ffffff", borderRadius: "5px", boxShadow: "0 0 5px #33333330" }} >
      //     <GridItem sx={12}>
      //       Just Testing
      //     </GridItem>

      //   </GridItem>
      //   <GridItem xs={12} style={{ marginTop: "-100px", background: "#fcfcfc", zIndex: "4", minHeight: "300px" }}>
      //   </GridItem>
      // </GridContainer>


      //My design

      // <GridContainer className={classes.bodyStyle}>
      //   <GridItem xs={12} sm={12} md={12} style={customStyle.MainGrid}>
      //     <GridItem xs={12} sm={12} md={12} style={customStyle.topGrid}>

      //       <GridItem xs={12} sm={12} md={8} style={customStyle.textTopGrid}>
      //         <div style={customStyle.topLeft}>
      //           <div style={customStyle.textBoxTop}>
      //             <p style={customStyle.textP1}>Search, Discover</p>
      //             <p style={customStyle.textP2}>ADOPT YOUR PET</p>
      //           </div>
      //           <Button size="large" style={customStyle.signUpButton}
      //             variant="contained" className={classes.button} onClick={this.handleSearch}>
      //             SIGN UP
      //         </Button>
      //         </div>
      //       </GridItem>
      //       {/* <GridItem xs={12} sm={12} md={7} style={customStyle.imageTopGrid}  > */}
      //       {/* <GridItem xs={12} sm={12} md={7} style={dropzoneStyles}  >
      //       <div style={customStyle.divImage}>
      //         <img src={dogImage} alt='dog showing the adoption steps' style={customStyle.imageGrid} />
      //       </div>
      //     </GridItem> */}
      //     </GridItem>

      //     <GridItem xs={12} sm={12} md={12} style={customStyle.mainGridStyle}>
      //       <GridItem xs={12} sm={11} md={10} style={customStyle.subGridStyle}>
      //         <div style={{ display: "flex", flexWrap: 'wrap', padding: "56px 10px", width: "100%" }}>
      //           <GridItem xs={12} sm={12} md={3} style={customStyle.eachGridStyle}>
      //             <FormControl variant="outlined" className={classes.formControl} style={customStyle.speciesFormStyle} >

      //               <InputLabel style={customStyle.speciesLabel}
      //                 ref={ref => {
      //                   this.InputLabelRef = ref;
      //                 }}
      //                 htmlFor="select-multiple-checkbox"
      //               >Species</InputLabel>
      //               <Select
      //                 multiple
      //                 value={this.state.species}
      //                 onChange={this.handleChange}
      //                 renderValue={selected => selected.join(', ')}
      //                 MenuProps={MenuProps}
      //                 input={<OutlinedInput
      //                   name="species"
      //                   labelWidth={this.state.labelWidth}
      //                   id="select-multiple-checkbox"
      //                   style={customStyle.speciesOutline}
      //                 />}

      //               >
      //                 {this.props.species.map(species => (
      //                   <MenuItem key={species.id} value={species.species}>
      //                     <Checkbox checked={this.state.species.indexOf(species.species) > -1} />
      //                     <ListItemText primary={species.species} />
      //                   </MenuItem>
      //                 ))}
      //               </Select>
      //             </FormControl>
      //           </GridItem>

      //           <GridItem xs={12} sm={12} md={3} style={customStyle.eachGridStyle}>
      //             <TextField style={customStyle.textStyle}
      //               success={this.props.zipcode === "success"}
      //               error={this.props.zipcode === "error"}

      //               name="zipcode"
      //               label="Zipcode"
      //               className={classes.textField}
      //               value={this.state.zipcode}
      //               margin="normal"
      //               variant="outlined"
      //               inputProps={{
      //                 onChange: event => { this.handleZip(event, "zipcode", "digit-only", 5) },
      //                 onClick: event => moveCursor(event),
      //                 onFocus: event => moveCursor(event),
      //                 inputComponent: TextMaskCustom,

      //               }}
      //             />
      //           </GridItem>
      //           <GridItem xs={8} sm={8} md={2} style={customStyle.distanceGridStyle}>
      //             <div style={{ minWidth: "147%" }}>
      //               <FormControl variant="outlined" className={classes.formControl}
      //                 style={{ minWidth: "38.195%", }}
      //               >
      //                 <InputLabel
      //                   ref={ref => {
      //                     this.InputLabelRef = ref;
      //                   }}
      //                   htmlFor="distance"
      //                 >Distance</InputLabel>
      //                 <Select

      //                   value={this.state.distance}
      //                   name='distance'
      //                   onChange={this.handleChange}
      //                   renderValue={value => `${value}`}
      //                   input={<OutlinedInput
      //                     name="distance"
      //                     labelWidth={this.state.labelWidth}
      //                     id="distance"
      //                     style={customStyle.distanceOutline}
      //                   />}
      //                 >

      //                   {this.state.distanceDropdown.map(distance => {
      //                     return (
      //                       <MenuItem key={distance} value={distance}>
      //                         {distance}</MenuItem>
      //                     )
      //                   })}

      //                 </Select>
      //               </FormControl>
      //             </div>
      //           </GridItem>
      //           <GridItem xs={5} sm={6} md={2} style={customStyle.buttonGridStyle}>
      //             <Button size="medium" style={customStyle.buttonStyle}
      //               variant="contained" className={classes.button} onClick={this.handleSearch}>
      //               SEARCH
      //         </Button>
      //           </GridItem>
      //         </div>
      //       </GridItem>
      //     </GridItem>


      //     <GridItem xs={12} sm={12} md={12} >
      //       <h4 style={customStyle.imageHeaderStyle}>Featured Animals</h4>
      //       <GridItem xs={12} sm={12} md={12} style={customStyle.ImageStyle}>
      //         <GridItem xs={12} sm={4} md={4}>
      //           <FeatureAnimals />
      //         </GridItem>
      //         <GridItem xs={12} sm={4} md={4}>
      //           <FeatureAnimals />
      //         </GridItem>
      //         <GridItem xs={12} sm={4} md={4}>
      //           <FeatureAnimals />
      //         </GridItem>
      //       </GridItem>
      //     </GridItem>

      //     <Product />
      //   </GridItem>
      // </GridContainer>


    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    species: state.animalReducer.dropdownAnimalOptions.species,
  }
}

export default connect(
  mapStateToProps, { getAllOptions, initialSearch })
  (withStyles(mainPageStyle)(MainPage));