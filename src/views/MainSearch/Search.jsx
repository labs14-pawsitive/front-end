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

import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {fetchOptions} from '../../actions/animalAction';
import {updateSearchOption, updateDisplayedAnimals} from '../../actions/searchAction';
import AnimalCard from '../../components/AnimalCard/AnimalCard.jsx';
import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";
import { flexbox } from '@material-ui/system';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radiusOptions: [10, 25, 50, 100],
      genderOptions: [{name: "Male", value: true}, {name: "Female", value: false}],
      labelWidth: 0
    }
  }
  
  componentDidMount() {
    this.props.fetchOptions(0)
    const {searchSelections} = this.props
    const options = {
      breed_id: searchSelections.breed_ids,
      species_id: searchSelections.species_ids,
      size_id: searchSelections.size_ids,
      age_id: searchSelections.age_ids,
      coat_length_id: searchSelections.coatLength_ids,
      zipcode: searchSelections.zipcode,
      is_male: searchSelections.is_male
    }
    this.props.updateDisplayedAnimals(options)
    this.setState({
      breedLabelWidth: ReactDOM.findDOMNode(this.BreedLabelRef).offsetWidth,
      speciesLabelWidth: ReactDOM.findDOMNode(this.SpeciesLabelRef).offsetWidth,
      sizeLabelWidth: ReactDOM.findDOMNode(this.BreedLabelRef).offsetWidth,
      ageLabelWidth: ReactDOM.findDOMNode(this.AgeLabelRef).offsetWidth,
      coatLengthLabelWidth: ReactDOM.findDOMNode(this.CoatLengthLabelRef).offsetWidth,
      genderLabelWidth: ReactDOM.findDOMNode(this.GenderLabelRef).offsetWidth,
      distanceLabelWidth: ReactDOM.findDOMNode(this.DistanceLabelRef).offsetWidth,
    })
  }

  componentWillReceiveProps(nextProps) {
    const {searchSelections} = nextProps
    const options = {
      breed_id: searchSelections.breed_ids,
      species_id: searchSelections.species_ids,
      size_id: searchSelections.size_ids,
      age_id: searchSelections.age_ids,
      coat_length_id: searchSelections.coatLength_ids,
      zipcode: searchSelections.zipcode,
      is_male: searchSelections.is_male
    }
    if(this.detectChanges(searchSelections)) {
      this.props.updateDisplayedAnimals(options)
    }
  } 

  detectChanges(searchSelections) {
    return searchSelections.species_ids != this.props.searchSelections.species_ids ||
    searchSelections.breed_ids != this.props.searchSelections.breed_ids ||
    searchSelections.species_ids != this.props.searchSelections.species_ids ||
    searchSelections.size_ids != this.props.searchSelections.size_ids ||
    searchSelections.age_ids != this.props.searchSelections.age_ids ||
    searchSelections.coatLength_ids != this.props.searchSelections.coatLength_ids ||
    searchSelections.zipcode != this.props.searchSelections.zipcode ||
    searchSelections.is_male != this.props.searchSelections.is_male
  }
  
  displayOptionLabels(options, label, selectedIds) {
    const filteredOptions = options.filter(option => {
      return selectedIds.includes(option.id)
    })
    return filteredOptions.map(option => option[label])
    }

  handleToggle(event, name) {
    console.log(event.target.value)
    this.props.updateSearchOption(name, event.target.value)
  }

  render() {
    const { classes } = this.props;

    const customStyle = {
      outlineStyle: {
        width: "100%",
        borderRadius: "5px",
        background: "#FCFCFC",
        
      },
      zipcodeOutline: {
        width: "100%",
        background: "#fcfcfc"
      },
      speciesCardStyle: {
        padding: "0 3%",
        marginBottom: "30px",
        marginTop: "50px",
      },
      speciesGridStyle: {
        marginBottom: "30px",
      },
      formControlStyle: {
        width: "100%",
        //background: "#fcfcfc"
      },
      labelStyle: {
        top: "-5px",
        left: "14px",
        zIndex: "2"
      },
      eachGridStyle: {
        width: "100%",
        marginTop: "16px",
        marginBottom: "15px",
        alignItems: "center",
      },
      distanceGridStyle: {
        width: "100%",
        display: "flex",
        alignItems: "center",
      },
      textStyle: {
        margin: 0,
        width: "100%",
        //background: "#fcfcfc"
      },
      gridContainerStyle: {
        width: "100%",
        //padding: "100px 0px 20px 20px",
        //padding: "100px 0",
        //backgroundColor: "rgb(163, 100, 165)"
        backgroundColor: "#fcfcfc"
      },
      filterContainerStyle: {
        margin: "20px 30px",
        width: "90%",
        paddingTop: "100px", 
        maxWidth: "1200px"
      },
      animalCardStyle: {
        marginTop: "20px",
        width: "90%",
        display: "flexbox",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        backgroundColor: "white",
        maxWidth:"1200px"
        //margin: "20px 0 0"
      }
    }
    
    return (
      <GridContainer style={customStyle.gridContainerStyle} className={classes.bodyStyle}>
      <GridItem sm={12} style={{backgroundColor:"#588caadb", display:"flex", justifyContent:"center", alignItems: "center", boxShadow: "0 0 15px #00000050"}}>
          <GridContainer style={customStyle.filterContainerStyle}>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl xs={12} md={12} style={customStyle.formControlStyle} className={classes.formControl}>
              <InputLabel style={customStyle.labelStyle} 
                ref={ref => {
                  this.SpeciesLabelRef = ref;
                }}
                htmlFor="select-multiple-checkbox">Species</InputLabel>
              <Select
                multiple
                value={this.props.searchSelections.species_ids}
                onChange={e => this.handleToggle(e, "species_ids")}
                input={<OutlinedInput
                  name="species"
                  labelWidth={this.state.speciesLabelWidth} 
                  id="select-multiple-checkbox"
                  style={customStyle.outlineStyle} 
                />}
                renderValue={selected => this.displayOptionLabels(this.props.speciesOptions, "species", selected).join(', ')}
                MenuProps={{
                  name: 'species_ids'
                }}
              >
                {(this.props.speciesOptions || []).map(species => (
                  <MenuItem key={species.id} value={species.id} name={species.species}>
                    <Checkbox checked={this.props.searchSelections.species_ids.indexOf(species.id) > -1} />
                    <ListItemText primary={species.species} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl style={customStyle.formControlStyle} className={classes.formControl}>
              <div style={{backgroundColor:"#fcfcfc", borderRadius:"5px"}}>
                <TextField style={customStyle.textStyle}
                  name="zipcode"
                  value={this.props.searchSelections.zipcode}
                  label="Zipcode"
                  className={classes.textField}
                  onChange={e => this.handleToggle(e, 'zipcode')}
                  margin="normal"
                  variant="outlined"
                /> 
                </div>
            </FormControl>
           
          </GridItem>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl style={customStyle.formControlStyle} className={classes.formControl}>
              <InputLabel style={customStyle.labelStyle} 
                ref={ref => {
                  this.DistanceLabelRef = ref;
                }}
                htmlFor="select-multiple-checkbox">Distance</InputLabel>
              <Select
                value={this.props.searchSelections.radius}
                onChange={e => this.handleToggle(e, "radius")}
                input={<OutlinedInput 
                  id="select-multiple-checkbox"
                  name="distance"
                  labelWidth={this.state.distanceLabelWidth}
                  style={customStyle.outlineStyle} 
                />}
                renderValue={selected => selected}
                MenuProps={{
                  name: 'radius'
                }}
              >
                {this.state.radiusOptions.map(radius => (
                  <MenuItem key={radius} value={radius} name={radius}>
                  
                    <ListItemText primary={radius} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl style={customStyle.formControlStyle} className={classes.formControl}>
              <InputLabel style={customStyle.labelStyle} 
                ref={ref => {
                  this.BreedLabelRef = ref;
                }}
                htmlFor="select-multiple-checkbox">Breed</InputLabel>
              <Select
                multiple
                value={this.props.searchSelections.breed_ids}
                onChange={e => this.handleToggle(e, "breed_ids")}
                input={<OutlinedInput
                  id="select-multiple-checkbox"
                  name="breed"
                  labelWidth={this.state.breedLabelWidth}
                  style={customStyle.outlineStyle}
                />}
                renderValue={selected => this.displayOptionLabels(this.props.breedsOptions, "breed", selected).join(', ')}
                MenuProps={{
                  name: 'breed_ids'
                }}
              >
                {(this.props.breedsOptions || []).map(breed => (
                  <MenuItem key={breed.id} value={breed.id} name={breed.breed}>
                    <Checkbox checked={this.props.searchSelections.breed_ids.indexOf(breed.id) > -1} />
                    <ListItemText primary={breed.breed} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl style={customStyle.formControlStyle} className={classes.formControl}>
            <InputLabel style={customStyle.labelStyle} 
                ref={ref => {
                  this.GenderLabelRef = ref;
                }}
                htmlFor="select-multiple-checkbox">Gender</InputLabel>
              <Select
                multiple
                value={this.props.searchSelections.is_male}
                name='is_male'
                onChange={e => this.handleToggle(e, "is_male")}
                input={<OutlinedInput
                  id="select-multiple-checkbox"
                  name="is_male"
                  labelWidth={this.state.genderLabelWidth}
                  style={customStyle.outlineStyle}
                />}
                renderValue={selected => this.state.genderOptions.filter(option => selected.includes(option.value)).map(option => option.name).join(', ')}
                MenuProps={{
                  name: 'is_male'
                }}
              >
                {this.state.genderOptions.map(option => (
                  <MenuItem key={option.value}  name={option.name} value={option.value}>
                    <Checkbox checked={this.props.searchSelections.is_male.indexOf(option.value) > -1} />
                    <ListItemText primary={option.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl style={customStyle.formControlStyle} className={classes.formControl}>
            <InputLabel style={customStyle.labelStyle} 
                ref={ref => {
                  this.SizeLabelRef = ref;
                }}
                htmlFor="select-multiple-checkbox">Size</InputLabel>
              <Select
                multiple
                value={this.props.searchSelections.size_ids}
                onChange={e => this.handleToggle(e, "size_ids")}
                input={<OutlinedInput
                  id="select-multiple-checkbox"
                  name="size"
                  labelWidth={this.state.sizeLabelWidth}
                  style={customStyle.outlineStyle}
                />}
                renderValue={selected => this.displayOptionLabels(this.props.sizeOptions, "size", selected).join(', ')}
                MenuProps={{
                  name: 'size_ids'
                }}
              >
                {(this.props.sizeOptions || []).map(size => (
                  <MenuItem key={size.id} value={size.id} name={size.size}>
                    <Checkbox checked={this.props.searchSelections.size_ids.indexOf(size.id) > -1} />
                    <ListItemText primary={size.size} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl style={customStyle.formControlStyle} className={classes.formControl}>
            <InputLabel style={customStyle.labelStyle} 
                ref={ref => {
                  this.AgeLabelRef = ref;
                }}
                htmlFor="select-multiple-checkbox">Age</InputLabel>
              <Select
                multiple
                value={this.props.searchSelections.age_ids}
                onChange={e => this.handleToggle(e, "age_ids")}
                input={<OutlinedInput
                  id="select-multiple-checkbox"
                  name="age"
                  labelWidth={this.state.ageLabelWidth}
                  style={customStyle.outlineStyle}
                />}
                renderValue={selected => this.displayOptionLabels(this.props.agesOptions, "age", selected).join(', ')}
                MenuProps={{
                  name: 'age_ids'
                }}
              >
                {(this.props.agesOptions || []).map(age => (
                  <MenuItem key={age.id} value={age.id} name={age.age}>
                    <Checkbox checked={this.props.searchSelections.age_ids.indexOf(age.id) > -1} />
                    <ListItemText primary={age.age} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={6} md={3} style={customStyle.eachGridStyle}>
            <FormControl style={customStyle.formControlStyle} className={classes.formControl}>
            <InputLabel style={customStyle.labelStyle} 
                ref={ref => {
                  this.CoatLengthLabelRef = ref;
                }}
                htmlFor="select-multiple-checkbox">Coat Length</InputLabel>
              <Select
                multiple
                value={this.props.searchSelections.coatLength_ids}
                onChange={e => this.handleToggle(e, "coatLength_ids")}
                input={<OutlinedInput
                  id="select-multiple-checkbox"
                  name="coat"
                  labelWidth={this.state.coatLengthLabelWidth}
                  style={customStyle.outlineStyle}
                />}
                renderValue={selected => this.displayOptionLabels(this.props.coatLengthOptions, "coat_length", selected).join(', ')}
                MenuProps={{
                  name: 'coatLength_ids'
                }}
              >
                {(this.props.coatLengthOptions || []).map(coat => (
                  <MenuItem key={coat.id} value={coat.id} name={coat.coat_length}>
                    <Checkbox checked={this.props.searchSelections.coatLength_ids.indexOf(coat.id) > -1} />
                    <ListItemText primary={coat.coat_length} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          </GridContainer>
        </GridItem>
      
          <GridContainer style={customStyle.animalCardStyle}>
              {this.props.displayedAnimals.map(animal => (
              
                <AnimalCard key={animal.id} animal={animal}/>
              ))}
          </GridContainer>

      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    breedsOptions: state.animalReducer.breedsOptions,
    speciesOptions: state.animalReducer.speciesOptions,
    sizeOptions: state.animalReducer.sizeOptions,
    coatLengthOptions: state.animalReducer.coatLengthOptions,
    agesOptions: state.animalReducer.agesOptions,
    locationsOptions: state.animalReducer.locationsOptions,
    searchSelections: state.searchReducer.searchSelections,
    displayedAnimals: state.searchReducer.displayedAnimals
  }
}

SearchPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {updateSearchOption, updateDisplayedAnimals, fetchOptions}
)(withStyles(mainPageStyle)(SearchPage));



