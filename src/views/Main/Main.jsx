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

import { getAllOptions } from '../../actions/animalAction.js'
import { initialSearch } from '../../actions/mainPageAction.js'

import Product from './Product.jsx'
import backgroundImag from 'assets/img/main-page/adorable-animal-beach-928449.jpg'
import backgroundImag1 from 'assets/img/main-page/animal-cute-animals-dog-59523.jpg'


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

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      species: [],
      species_id: [],
      dropdownSpecies: [],
      labelWidth: 0,
      zipcode: "",
      distanceDropdown: [5, 10, 15],
      distance: ""
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

  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value,

    });
    console.log('this.state.species ', this.state.species)
  };

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

    this.props.initialSearch(searchObject)
      .then(res => console.log('initial search results ', res))
      .catch(error => console.log('initial search error ', error))
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

    const customStyle = {
      speciesOutline: {
        width: "160%"
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
        height: "50px"

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
      },
      imageHeaderStyle: {
        textAlign: "center"
      },
      imageMainStyle: {

        backgroundImage: "url(" + backgroundImag1 + ")",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      subGridStyle: {
        width: "100%",
        height: "auto",
        display: "flex",
        background: "white",
        flexWrap: 'wrap',
        border: "1px solid black",
        paddingTop:"10px"
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
        marginTop: "16px",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
      },
      selectStyle: {
        fullWidth: "true"
      },
      mainGridStyle:{
        display: "flex",
        justifyContent: "center",
      }


    }



    return (

      <GridContainer className={classes.bodyStyle}>

        <GridItem xs={12} sm={12} md={12} style={customStyle.mainGridStyle}>
          <GridItem xs={12} sm={7} md={12} style={customStyle.subGridStyle}>
            <div style={{display: "flex",flexWrap: 'wrap',padding:"35px 10px",width:"100%"}}>
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
                // success={this.props.textState.descriptionState === "success"}
                // error={this.props.textState.descriptionState === "error"}

                name="zipcode"
                label="Zipcode"
                className={classes.textField}
                value={this.state.zipcode}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
              />
            </GridItem>
            <GridItem xs={8} sm={8} md={2} style={customStyle.distanceGridStyle}>
              <div style={{ minWidth: "150%" }}>
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
              <Button size="medium" color="primary" style={customStyle.buttonStyle}
                variant="contained" className={classes.button} onClick={this.handleSearch}>
                SEARCH
              </Button>
            </GridItem>
            </div>
          </GridItem>
        </GridItem>


        <GridItem xs={12} sm={12} md={12} >
          <h4 style={customStyle.imageHeaderStyle}>Featured Animals</h4>
          <GridItem xs={12} sm={12} md={12} style={customStyle.ImageStyle}>
            <GridItem xs={12} sm={4} md={4}>
              <FeatureAnimals />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <FeatureAnimals />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
              <FeatureAnimals />
            </GridItem>
          </GridItem>
        </GridItem>

        <Product />
      </GridContainer>


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