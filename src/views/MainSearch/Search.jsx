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
import {fetchOptions} from '../../actions/animalAction'
import {updateSearchOption, updateDisplayedAnimals} from '../../actions/searchAction'

import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount() {
    this.props.fetchOptions(1)
    this.props.updateDisplayedAnimals()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const {searchSelections} = nextProps
    const options = {
      breed_id: searchSelections.breed_ids,
      species_id: searchSelections.species_ids,
      size_id: searchSelections.species_ids,
      age_id: searchSelections.age_ids,
      coat_length_id: searchSelections.coatLength_ids
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
    searchSelections.coatLength_ids != this.props.searchSelections.coatLength_ids

  }
  

  displayOptionLabels(options, label, selectedIds) {
    const filteredOptions = options.filter(option => {
      return selectedIds.includes(option.id)
    })
    return filteredOptions.map(option => option[label])
    }

  handleToggle(event, name) {
    //when option is selected, update option in redux
    this.props.updateSearchOption(name, event.target.value)
  }

  render() {
    const { classes } = this.props;
    
    return (
      <GridContainer className={classes.bodyStyle}>
        <GridItem xs={12} sm={12} md={2}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Breed</InputLabel>
            <Select
              multiple
              value={this.props.searchSelections.breed_ids}
              onChange={e => this.handleToggle(e, "breed_ids")}
              input={<Input id="select-multiple-checkbox" />}
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

        <GridItem xs={12} sm={12} md={2}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Species</InputLabel>
            <Select
              multiple
              value={this.props.searchSelections.species_ids}
              onChange={e => this.handleToggle(e, "species_ids")}
              input={<Input id="select-multiple-checkbox" />}
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

        <GridItem xs={12} sm={12} md={2}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Size</InputLabel>
            <Select
              multiple
              value={this.props.searchSelections.size_ids}
              onChange={e => this.handleToggle(e, "size_ids")}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={{
                name: 'size_ids'
              }}
            >
              {(this.props.sizeOptions || []).map(size => (
                <MenuItem key={size.id} value={size.id} name={size.size}>
                  <Checkbox checked={this.props.searchSelections.size_ids.indexOf(size.size) > -1} />
                  <ListItemText primary={size.size} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>

        <GridItem xs={12} sm={12} md={2}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Age</InputLabel>
            <Select
              multiple
              value={this.props.searchSelections.age_ids}
              onChange={e => this.handleToggle(e, "age_ids")}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={{
                name: 'age_ids'
              }}
            >
              {(this.props.agesOptions || []).map(age => (
                <MenuItem key={age.id} value={age.id} name={age.age}>
                  <Checkbox checked={this.props.searchSelections.age_ids.indexOf(age.age) > -1} />
                  <ListItemText primary={age.age} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>

        <GridItem xs={12} sm={12} md={2}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Coat Length</InputLabel>
            <Select
              multiple
              value={this.props.searchSelections.coatLength_ids}
              onChange={e => this.handleToggle(e, "coatLength_ids")}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={{
                name: 'coatLength_ids'
              }}
            >
              {(this.props.coatLengthOptions || []).map(coat => (
                <MenuItem key={coat.id} value={coat.id} name={coat.coat_length}>
                  <Checkbox checked={this.props.searchSelections.coatLength_ids.indexOf(coat.coat_length) > -1} />
                  <ListItemText primary={coat.coat_length} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={2}>
          <TextField 
            name="zipcode"
            value={this.props.searchSelections.zipcode}
            label="Zipcode"
            className={classes.textField}
            value={this.props.searchSelections.locationsOptions}
            onChange={e => this.handleToggle(e, 'zipcode')}
            margin="normal"
            variant="outlined"
          />
        </GridItem>


          {this.props.displayedAnimals.map(animal => (
            <p key={animal.id}>{animal.name}</p>
          ))}

        

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



