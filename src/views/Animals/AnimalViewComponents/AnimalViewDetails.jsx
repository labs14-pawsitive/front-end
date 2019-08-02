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
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';


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
                borderTop: "1px solid lightgray",
            },
            adoptionStyle: {
                paddingTop: "3%",
                display: "flex",
                flexWrap: 'wrap',
            },
            formControlStyle: {
                width: "100%",
                marginRight: "7%",
                paddingBottom:"10%",
               
            },
            form1ControlStyle: {
                width: "100%",
                marginRight: "10%",
            },
            form2ControlStyle: {
                width: "100%",
                marginRight: "7%",
                paddingBottom:"10%"
            },
            form3ControlStyle: {
                width: "64%",
                marginRight: "7%",
                paddingBottom:"10%",
                marginTop:"16px",
                marginBottom:"8px",
            },
            textStyle:{
                margin:"0px",
                width:"100%",
                color:"rgba(0, 0, 0, 0.87)",
            },
            colorStyle:{
                color:"rgba(0, 0, 0, 0.87)",
            },
            color1Style:{
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
                    <legend style={customStyle.legendStyle}>Details</legend>
                </div>

                <GridContainer style={customStyle.detailsContainerStyle}>
                    <GridItem xs={12} sm={12} md={12} style={customStyle.gridItemStyle}>

                        <form
                            className={classes.root}
                            autoComplete="off" style={customStyle.adoptionStyle}>
                                <GridItem xs={12} sm={12} md={6} >
                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel style={customStyle.colorStyle} htmlFor="animal_status_id">Adoption Status</InputLabel>
                                <Select style={customStyle.color1Style} 
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal.animal_status}
                                    name='animal_status_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    disableUnderline
                                    input={<Input id="animal_status_id" />}
                                >

                                    {this.props.animal_status.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.animal_status}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6} >
                            <FormControl style={customStyle.form2ControlStyle} className={classes.formControl} >
                                <InputLabel style={customStyle.colorStyle} htmlFor="species_id">Species</InputLabel>
                                <Select style={customStyle.color1Style}
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal.species}
                                    name='species_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="species_id" />}
                                    disableUnderline
                                >

                                    {this.props.species.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.species}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6} >
                            <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                                <InputLabel style={customStyle.colorStyle} htmlFor="breed_id">Breed</InputLabel>
                                <Select style={customStyle.color1Style}
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.breed}
                                    name='breed_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="breed_id" />}
                                    disableUnderline
                                >

                                    {this.props.dynamicBreedDropdown.length === 0 ?

                                        this.props.breeds.filter(breed => {
                                            return breed.species_id === this.props.animal.species_id
                                        })
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
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6} >
                            <FormControl style={customStyle.form2ControlStyle} className={classes.formControl} >
                                <InputLabel style={customStyle.colorStyle} htmlFor="age_id">Age</InputLabel>
                                <Select style={customStyle.color1Style}
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.age}
                                    name='age_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="age_id" />}
                                    disableUnderline
                                    InputProps={{
                                        disabled:this.props.isEditing ? false : true,
                                        disableUnderline:true
                                    }} 
                                >
                                    {this.props.ages.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.age}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            </GridItem>


                            <GridItem xs={12} sm={12} md={6} >
                            <FormControl style={customStyle.form2ControlStyle} className={classes.formControl} >
                                <InputLabel style={customStyle.colorStyle} htmlFor="size_id">Size</InputLabel>
                                <Select style={customStyle.color1Style}
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.size}
                                    name='size_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="size_id" />}
                                    disableUnderline
                                >
                                    {this.props.size.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.size}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6} >
                            <FormControl style={customStyle.form2ControlStyle} className={classes.formControl} >
                                <InputLabel style={customStyle.colorStyle} htmlFor='coat_length_id'>Coat Length</InputLabel>
                                <Select style={customStyle.color1Style}
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.coat_length}
                                    name='coat_length_id'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="coat_length_id" />}
                                    disableUnderline
                                   >
                                    {this.props.coat_length.map(status => {
                                        return (
                                            <MenuItem key={status.id} value={status.id}>{status.coat_length}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6} >
                            <FormControl style={customStyle.form2ControlStyle} className={classes.formControl} >
                                <InputLabel style={customStyle.colorStyle} htmlFor='is_male'>Gender</InputLabel>
                                <Select style={customStyle.color1Style}
                                    disabled={this.props.isEditing ? false : true}
                                    value={this.props.animal_meta.is_male ? 'male' : 'female'}
                                    name='is_male'
                                    onChange={this.props.handleAdoption}
                                    renderValue={value => `${value}`}
                                    input={<Input id="is_male" />}
                                    disableUnderline
                                   >

                                    <MenuItem value={true}>male</MenuItem>
                                    <MenuItem value={false}>female</MenuItem>

                                </Select>
                            </FormControl>
                            </GridItem>

                            <GridItem xs={12} sm={12} md={6} >
                                <FormControl style={customStyle.form2ControlStyle} className={classes.formControl} >
                            <TextField style={customStyle.textStyle} 
                                success={this.props.textState.colorState === "success"}
                                error={this.props.textState.colorState === "error"}

                                name="color"
                                label="Color" 
                                className={classes.textField}
                                value={this.props.animal_meta.color}
                                onChange={this.props.handleMetaTextField(3)}
                                margin="normal"
                                InputProps={{
                                    readOnly: this.props.isEditing ? false : true,
                                }}
                                InputLabelProps={{
                                    style: { color: 'rgba(0, 0, 0, 0.87)' },
                                  }}
                            />
                            </FormControl>
                            </GridItem>

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