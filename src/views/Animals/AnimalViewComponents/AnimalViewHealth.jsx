import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import GridContainer from "components/Grid/GridContainer.jsx";


import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";


class AnimalViewHealth extends React.Component {
    render(){
        const { classes } = this.props;


        const customStyle = {
            titleStyle: {
                padding: "10% 0px 0px 0px"
            },
            detailsContainerStyle: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            gridStyle: {
                // margin: "40px 40px",
                borderTop: "1px solid lightgray",

            },
            adoptionStyle: {
                paddingTop: "3%",
                display: "flex",
                flexWrap: 'wrap',
            },
            formControlStyle: {
                width: "100%",
                // paddingTop: "3%",
                // paddingBottom:"10%"
            },
            form1ControlStyle: {
              width: "100%",
              marginBottom:"30px",
              // paddingTop: "3%",
              // paddingBottom:"10%"
          },
            inputLabelStyle :{
                width:"130%",
                color:"rgba(0, 0, 0, 0.87)"
            },
            healthTextStyle:{
                width:"100%",
                marginBottom:"30px",
                borderBottom:"1px solid rgba(0, 0, 0, 0.54)"
            },
            healthGrid:{
              maxWidth:"100%",
              minWidth:"100%"
            },
            colorStyle:{
                color:"rgba(0, 0, 0, 0.87)",
                borderBottom:"1px solid rgba(0, 0, 0, 0.54)"
            },
            legendStyle:{
              padding:"0 2%"
          }

        }

        return (
            <GridItem xs={12} sm={12} md={12} style={customStyle.gridStyle}>
            <div style={customStyle.titleStyle}>
              <legend style={customStyle.legendStyle}>Health and Personality</legend>
            </div>

            {/* <GridContainer style={customStyle.detailsContainerStyle}> */}

                <form
                  className={classes.root}
                  autoComplete="off" style={customStyle.adoptionStyle}
                >
                    <GridItem xs={12} sm={12} md={12}>
                   <TextField style={customStyle.healthTextStyle}
                    success={this.props.animal_meta.health && this.props.animal_meta.health !== "" && this.props.animal_meta.health.length >= this.props.maxLength}
                    error={this.props.animal_meta.health && (this.props.animal_meta.health.length < this.props.maxLength) || this.props.animal_meta.health === ""}
                    name="health"
                    label="Health"
                    multiline
                    className={classes.textField}
                    value={this.props.animal_meta.health}
                    onChange={this.props.handleMetaTextField}
                    margin="normal"
                    InputProps={{
                      readOnly: this.props.isEditing ? false : true,
                      
                    }}
                    InputLabelProps= {!this.props.isEditing || this.props.animal_meta.health.length >= this.props.maxLength ?{
                                    style: { color: 'rgba(0, 0, 0, 0.87)' },
                                  } : {}}
                
                  />
                  
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                    <InputLabel style={customStyle.inputLabelStyle} htmlFor='is_vaccinated'>Vaccinated?</InputLabel>
                    <Select style={customStyle.colorStyle}
                      disabled={this.props.isEditing ? false : true}
                      value={this.props.animal_meta.is_vaccinated ? 'Yes' : 'No'}
                      name='is_vaccinated'
                      onChange={this.props.handleAdoption}
                      renderValue={value => `${value}`}
                      input={<Input id="is_vaccinated" />}
                      disableUnderline
                    >

                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>

                    </Select>
                  </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                    <InputLabel style={customStyle.inputLabelStyle} htmlFor='is_house_trained'>House trained?</InputLabel>
                    <Select style={customStyle.colorStyle}
                      disabled={this.props.isEditing ? false : true}
                      value={this.props.animal_meta.is_house_trained ? 'Yes' : 'No'}
                      name='is_house_trained'
                      onChange={this.props.handleAdoption}
                      renderValue={value => `${value}`}
                      input={<Input id="is_house_trained" />}
                      disableUnderline
                    >

                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>

                    </Select>
                  </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                    <InputLabel style={customStyle.inputLabelStyle} htmlFor='is_good_with_kids'>Good with Kids?</InputLabel>
                    <Select style={customStyle.colorStyle}
                      disabled={this.props.isEditing ? false : true}
                      value={this.props.animal_meta.is_good_with_kids ? 'Yes' : 'No'}
                      name='is_good_with_kids'
                      onChange={this.props.handleAdoption}
                      renderValue={value => `${value}`}
                      input={<Input id="is_good_with_kids" />}
                      disableUnderline
                    >

                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>

                    </Select>
                  </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                    <InputLabel style={customStyle.inputLabelStyle} htmlFor='is_good_with_cats'>Good with Cats?</InputLabel>
                    <Select style={customStyle.colorStyle}
                      disabled={this.props.isEditing ? false : true}
                      value={this.props.animal_meta.is_good_with_cats ? 'Yes' : 'No'}
                      name='is_good_with_cats'
                      onChange={this.props.handleAdoption}
                      renderValue={value => `${value}`}
                      input={<Input id="is_good_with_cats" />}
                      disableUnderline
                    >

                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>

                    </Select>
                  </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                    <InputLabel style={customStyle.inputLabelStyle} htmlFor='is_good_with_dogs'>Good with Dogs?</InputLabel>
                    <Select style={customStyle.colorStyle}
                      disabled={this.props.isEditing ? false : true}
                      value={this.props.animal_meta.is_good_with_dogs ? 'Yes' : 'No'}
                      name='is_good_with_dogs'
                      onChange={this.props.handleAdoption}
                      renderValue={value => `${value}`}
                      input={<Input id="is_good_with_dogs" />}
                      disableUnderline
                    >

                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>

                    </Select>
                  </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                    <InputLabel style={customStyle.inputLabelStyle} htmlFor='is_neutered_spayed'>Neutered/Spayed?</InputLabel>
                    <Select style={customStyle.colorStyle}
                      disabled={this.props.isEditing ? false : true}
                      value={this.props.animal_meta.is_neutered_spayed ? 'Yes' : 'No'}
                      name='is_neutered_spayed'
                      onChange={this.props.handleAdoption}
                      renderValue={value => `${value}`}
                      input={<Input id="is_neutered_spayed" />}
                      disableUnderline
                    >

                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>

                    </Select>
                  </FormControl>
                  </GridItem>


                  <GridItem xs={12} sm={12} md={6}>
                  <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                    <InputLabel style={customStyle.inputLabelStyle} htmlFor='is_mixed'>Is Mixed?</InputLabel>
                    <Select style={customStyle.colorStyle}
                      disabled={this.props.isEditing ? false : true}
                      value={this.props.animal_meta.is_mixed ? 'Yes' : 'No'}
                      name='is_mixed'
                      onChange={this.props.handleAdoption}
                      renderValue={value => `${value}`}
                      input={<Input id="is_mixed" />}
                      disableUnderline
                    >

                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>

                    </Select>
                  </FormControl>
                  </GridItem>

                </form>
            {/* </GridContainer> */}

          </GridItem>
        )
    }
}

AnimalViewHealth.propTypes = {
    classes: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        locations: state.animalReducer.dropdownAnimalOptions.locations,
        breeds: state.animalReducer.dropdownAnimalOptions.breeds,
        size: state.animalReducer.dropdownAnimalOptions.size,
        coat_length: state.animalReducer.dropdownAnimalOptions.coat_length,
        ages: state.animalReducer.dropdownAnimalOptions.ages,
        animal_status: state.animalReducer.dropdownAnimalOptions.animal_status,
        species: state.animalReducer.dropdownAnimalOptions.species,
    }
}

export default connect(
    mapStateToProps, null
)(withStyles(regularFormsStyle)(AnimalViewHealth)) 