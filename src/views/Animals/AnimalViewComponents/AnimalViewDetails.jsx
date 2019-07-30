import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ImageUpload from '../../../components/ImageUpload/ImageUpload'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import GridContainer from "components/Grid/GridContainer.jsx";


import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class AnimalViewDetails extends React.Component {
    render() {
        const { classes } = this.props;


        const customStyle = {
            titleStyle: {
                padding: "10% 0px 0px 0px"
            },
            detailsContainerStyle: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            gridItemStyle: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            gridStyle: {
                margin: "40px 40px",
                borderTop: "1px solid lightgray",

            },
            adoptionStyle: {
                paddingTop: "3%",
                // width: "43%",
                // marginRight: "7%",
                display: "flex",
                flexWrap: 'wrap',
            },
            formControlStyle: {
                // display:"flex",
                // flexWrap: 'wrap',
                width: "50%",
                // marginRight: "1%",
            },
            form1ControlStyle: {
                width: "50%",
                marginRight: "1%",
            }

        }

        return (
            <GridItem xs={12} sm={12} md={12} style={customStyle.gridStyle}>

                <div style={customStyle.titleStyle}>
                    <legend>Details</legend>
                </div>

                <GridContainer style={customStyle.detailsContainerStyle}>
                    <GridItem xs={12} sm={12} md={12} style={customStyle.gridItemStyle}>

                        <form
                            className={classes.root}
                            autoComplete="off" style={customStyle.adoptionStyle}>

                            <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                                <InputLabel htmlFor="animal_status_id">Adoption Status</InputLabel>
                                <Select
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal.animal_status}
                                    name='animal_status_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="animal_status_id" />}
                                >

                                    {this.props.animal_status.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.animal_status}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>

                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel htmlFor="species_id">Species</InputLabel>
                                <Select
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal.species}
                                    name='species_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="species_id" />}
                                >

                                    {this.props.species.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.species}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel htmlFor="breed_id">Breed</InputLabel>
                                <Select
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.breed}
                                    name='breed_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="breed_id" />}
                                >

                                    {/* {this.state.breeds
                            .filter(breed => (breed.species_id===this.state.animal_meta.species_id))
                            .map(status => {
                              return (
                                <MenuItem value={status.id}>{status.breed}</MenuItem>
                              )
                            })} */}

                                    {this.props.dynamicBreedDropdown.length===0 ? 

                                    this.props.breeds.filter(breed => {
                                        return breed.species_id===this.props.animal.species_id})
                                    .map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.breed}</MenuItem>
                                        )
                                    })
                                    :
                                    this.props.dynamicBreedDropdown.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.breed}</MenuItem>
                                        )
                                    })
                                   }
                                </Select>
                            </FormControl>

                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel htmlFor="age_id">Age</InputLabel>
                                <Select
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.age}
                                    name='age_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="age_id" />}
                                >
                                    {this.props.ages.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.age}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel htmlFor="size_id">Size</InputLabel>
                                <Select
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.size}
                                    name='size_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="size_id" />}
                                >
                                    {this.props.size.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.size}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel htmlFor='coat_length_id'>Coat Length</InputLabel>
                                <Select
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.coat_length}
                                    name='coat_length_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="coat_length_id" />}
                                >
                                    {this.props.coat_length.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.coat_length}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel htmlFor='is_male'>Gender</InputLabel>
                                <Select
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.is_male ? 'male' : 'female'}
                                    name='is_male'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="is_male" />}
                                >

                                    <MenuItem value={true}>male</MenuItem>
                                    <MenuItem value={false}>female</MenuItem>

                                </Select>
                            </FormControl>

                            <TextField
                                success={this.props.textState.colorState === "success"}
                                error={this.props.textState.colorState === "error"}

                                name="color"
                                label="Color"
                                className={classes.textField}
                                value={this.props.animal_meta.color}
                                onChange={this.props.handleMetaTextField(3)}
                                // onChange={(event) => this.handleMetaTextField(event, "color", 3)}
                                margin="normal"
                                InputProps={{
                                    readOnly: this.props.isEditing ? false : true,
                                    // onChange:(event) => this.handleMetaTextField(event,3)

                                }}
                            />
                        </form>
                    </GridItem>
                </GridContainer>
            </GridItem>
        )
    }
}

AnimalViewDetails.propTypes = {
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
)(withStyles(regularFormsStyle)(AnimalViewDetails)) 