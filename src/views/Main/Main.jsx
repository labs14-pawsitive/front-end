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

import { getAllOptions, getPublicAnimalInfoByCount } from '../../actions/animalAction.js'
import { initialSearch } from '../../actions/mainPageAction.js'

import Product from './Product.jsx'
import backgroundImag from 'assets/img/main-page/pawsnfind_home_BG.png'
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
import AnimalCard from "components/AnimalCard/AnimalCard.jsx";

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
    window.scrollTo(0, 0);
    Promise.all([this.props.getPublicAnimalInfoByCount(6),
    this.props.getAllOptions(0)])
      .then(([allAnimalCardInfo, options]) => {
        console.log('main component did mount options ', options)
        console.log('main component did mount allAnimalCardInfo ', this.props.allAnimals)
        this.setState({
          dropdownSpecies: this.props.species,
          labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
      })
      .catch(
        error => {
          console.log('animal info error', error)
        })

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
      // this.props.initialSearchForm = {...searchObject}
      console.log('reducer form entered data ',searchObject )
      this.props.initialSearch(searchObject)
        .then(
          res =>{ 
          console.log('initial search results ', res)
          this.props.history.push('/search/advancedSearch')
          })
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

    const customStyle = {
      speciesOutline: {
        //width: "159%"
      },
      distanceOutline: {
        //width: "262%"
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
        width: "100%"
      },
      speciesGridStyle: {
        marginBottom: "30px",
      },
      speciesFormStyle: {
        width: "100%"
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
        margin: "0 auto",
        maxWidth:"1280px"
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
        flexWrap: 'wrap',
        borderRadius: "5px",

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
        marginRight: "-196px",
        marginTop: "120px"
      },
      textP1: {
        fontSize: "2rem",
        color: "white",
      },
      textP2: {
        fontSize: "3rem",
        lineHeight: "1.1",
        color: "white",
        fontWeight: "bold",
        textShadow: "5px 4px #2B2B2B80"
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
        boxShadow: "2px 2px #31343151"
        // marginLeft: "149px"
      },
      textBoxTop: {
        marginBottom: "20px",
        width:"164%"
      },
      imageTopGrid: {
        marginTop: "167px",
      },
      topLeft: {
        // border: "1px solid black",
        margin:"100px 14%",
        textAlign: "left"
      },
      backdrop: {
        background: "url(" + backgroundImag + ")",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        height: "720px",
        position: "relative"

      },
    }



    return (

      <GridContainer className={classes.bodyStyle}>
        {/* full background container */}
        <GridItem xs={12} sm={12} md={12} xl={12}
        style={{ 
          background: "url(" + backgroundImag + ")", 
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
          backgroundSize: "cover",
        display: "flex" 
        }} >
          <GridItem xs={11}  md={10}  style={{margin: "0 auto", display:"flex", justifyContent: "space-between", maxWidth: "1200px"}}>
            <GridItem xs={10} sm={10} md={6} style={customStyle.textTopGrid}>
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
              <GridItem md={12} xl={6} style={{

                zIndex: "7",
                minHeight: "450px",
                maxHeight: "600px",
                backgroundImage: "url(" + dogImage + ")",
                backgroundPosition: "right bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto 100%",
                position: "relative",
                marginTop: "100px",
                //marginRight: "5%",
                marginBottom:"20px"
              }}>
              </GridItem>
            </Hidden> 

          </GridItem>

          
          
        </GridItem>
       
        <GridItem xs={10} sm={10} md={10}
          style={{
            marginTop: "-60px",
            zIndex: "6",
            backgroundColor: "#f5f4f4",
            borderRadius: "5px",
            boxShadow: "0 0 5px #33333330",
            maxWidth:"1280px"
          }} >

          <GridItem xs={12} sm={12} md={12} style={customStyle.subGridStyle}>
            <div style={{ display: "flex", flexWrap: 'wrap', padding: "30px 10px", width: "100%" }}>
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
              <GridItem xs={12} sm={12} md={3} style={customStyle.eachGridStyle}>
                
                  <FormControl variant="outlined" className={classes.formControl} style={{width:"100%"}}
                    
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
               
              </GridItem>
              <GridItem xs={12} sm={12} md={3} style={customStyle.buttonGridStyle}>
                <Button size="medium" style={customStyle.buttonStyle}
                  variant="contained" className={classes.button} onClick={this.handleSearch}>
                  SEARCH
              </Button>
              </GridItem>
            </div>
          </GridItem>
        </GridItem>


        <GridContainer xs={12} sm={12} md={12} style={{
          width: "100%",
          paddingTop: "158px",
          marginTop: "-90px",
          backgroundColor: "#e7e7e7",
        }}>
            <GridContainer xs={10} sm={10} md={10} xl={10} style={customStyle.ImageStyle}>
              {this.props.allAnimals.slice(0, 6).map(animal => {
                return <AnimalCard animal={animal} key={animal.id} />
              })}
            </GridContainer>
          </GridContainer>
      
      
      </GridContainer >



 
    );
  }
}

MainPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    species: state.animalReducer.dropdownAnimalOptions.species,
    allAnimals: state.animalReducer.allAnimals,
    initialSearchForm:state.mainPageReducer.initialSearchForm,
    
  }
}

export default connect(
  mapStateToProps, { getAllOptions, initialSearch, getPublicAnimalInfoByCount })
  (withStyles(mainPageStyle)(MainPage));
