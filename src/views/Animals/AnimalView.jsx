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
import axios from 'axios';
import moment from 'moment'

import { updateAnimal, getInfoByAnimalID, getAllOptions } from '../../actions/animalAction.js'

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";
// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";
// plugin that creates slider
import nouislider from "nouislider";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import ImageUpload from '../../components/ImageUpload/ImageUpload'

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
// import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { borderBottom } from "@material-ui/system";

class AnimalView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animal: {},
      animal_meta: {},
      animal_notes: [],
      animal_followers: [],

      isEditing: false,

      editInfo: {
        breed_id: 0,
        coat_length_id: 0,
        color: '',
        description: '',
        health: '',
        is_good_with_cats: false,
        is_good_with_dogs: false,
        is_good_with_kids: false,
        is_house_trained: false,
        is_mixed: false,
        is_neutered_spayed: false,
        is_vaccinated: false,
        is_male: false,
        size_id: '',
        animal_status_id: 0,
        notes: '',
        species_id: 0,
        name: '',
        nickname: '',
        shelter_id: 0,
        animal_id: 0,
        age_id: 0,
        profile_img_id: 0,
        shelter_location_id: 0,

      },
      // editInfo: {
      //   breed_id: this.props.animal_meta.breed_id,
      //   coat_length_id: this.props.animal_meta.coat_length_id,
      //   color: this.props.animal_meta.color,
      //   description:this.props.animal_meta.description,
      //   health: this.props.animal_meta.health,
      //   is_good_with_cats: this.props.animal_meta.is_good_with_cats,
      //   is_good_with_dogs: this.props.animal_meta.is_good_with_dogs,
      //   is_good_with_kids: this.props.animal_meta.is_good_with_kids,
      //   is_house_trained: this.props.animal_meta.is_house_trained,
      //   is_mixed: this.props.animal_meta.is_mixed,
      //   is_neutered_spayed: this.props.animal_meta.is_neutered_spayed,
      //   is_vaccinated: this.props.animal_meta.is_vaccinated,
      //   is_male: this.props.animal_meta.is_male,
      //   size_id: this.props.animal_meta.size_id,
      //   animal_status_id: this.props.animal.animal_status_id,
      //   species_id: this.props.animal.species_id,
      //   name: this.props.animal.name,
      //   age_id: this.props.animal_meta.age_id,
      //   profile_img_id: this.props.animal.profile_img_id,
      //   shelter_location_id: this.props.animal,
      // },
      breeds: [],
      size: [],
      coat_length: [],
      ages: [],
      species: [],
      animal_status: [],
      locations: [],

    };
  }

  componentDidMount() {

    Promise.all([this.props.getInfoByAnimalID(this.props.match.params.id),
    this.props.getAllOptions(this.props.shelterID)])
      .then(([animalInfo, animalOptions]) => {
        // call setState here

        this.setState({
          animal: this.props.animal,
          animal_meta: this.props.animalMeta,
          animal_notes: this.props.animalNotes,
          animal_followers: this.props.animalFollowers,
          breeds: this.props.breeds,
          size: this.props.size,
          ages: this.props.ages,
          species: this.props.species,
          coat_length: this.props.coat_length,
          animal_status: this.props.animal_status,
          locations: this.props.locations
          // editInfo: {
          //   // ...this.state.editInfo,
          //   breed_id: this.props.animal_meta.breed_id,
          //   coat_length_id: this.props.animal_meta.coat_length_id,
          //   color: this.props.animal_meta.color,
          //   description: this.props.animal_meta.description,
          //   health: this.props.animal_meta.health,
          //   is_good_with_cats: this.props.animal_meta.is_good_with_cats,
          //   is_good_with_dogs: this.props.animal_meta.is_good_with_dogs,
          //   is_good_with_kids: this.props.animal_meta.is_good_with_kids,
          //   is_house_trained: this.props.animal_meta.is_house_trained,
          //   is_mixed: this.props.animal_meta.is_mixed,
          //   is_neutered_spayed: this.props.animal_meta.is_neutered_spayed,
          //   is_vaccinated: this.props.animal_meta.is_vaccinated,
          //   is_male: this.props.animal_meta.is_male,
          //   size_id: this.props.animal_meta.size_id,
          //   animal_status_id: this.props.animal.animal_status_id,
          //   species_id: this.props.animal.species_id,
          //   name: this.props.animal.name,
          //   age_id: this.props.animal_meta.age_id,
          //   profile_img_id: this.props.animal.img_url,
          //   shelter_location_id: this.props.animal.shelter_location_id,
          // }
        }) 
      })       
      .catch(error => {
        console.log('animal info error', error)
      })
 
}

  handleUpdate = (event) => {
    event.preventDefault()
    if (this.state.isEditing) {
      this.updateForm()
    }
    else this.handleToggle(event)
  }



  updateForm = () => {
    this.setState({
      isEditing: false
    })

    console.log('update form editinfo : ',this.state.editInfo)
    // this.props.updateAnimal(this.state.editInfo,
    //   this.state.animal_meta.animal_id,this.state.animal_meta.id)
  }



  handleAdoption = (event) => {
    // const val = event.target.name === "breed_id" ?
    //   this.state.breeds : (event.target.name === "species_id" ? this.state.species
    //     : (event.target.name === "coat_length_id" ? this.state.coat_length
    //       : (event.target.name === "size_id" ? this.state.size
    //         : (event.target.name === "age_id" ? this.state.ages :
    //           (event.target.name === "animal_status_id" ? this.state.animal_status : '')))))
    // const val = this.state.animal.breed_id ? this.props.breedsOptions.find(option => option.id == parseInt(this.state.animal.breed_id)).breed : ''
    console.log('value from drop down is ', event.target.value)
    console.log('id from drop down is ', event.target.input)
    // console.log('selected value state is ', val)

    let targetID = ''
    switch (event.target.name) {
      case 'breed_id':
        targetID = this.state.breeds ? this.state.breeds.find(eachValue => eachValue.breed === event.target.value).id : ''
        break;
      case 'animal_status_id':
        targetID = this.state.animal_status ? this.state.animal_status.find(eachValue => eachValue.animal_status === event.target.value).id : ''
        break;
      case 'species_id':
        targetID = this.state.species ? this.state.species.find(eachValue => eachValue.species === event.target.value).id : ''
        break;
      case 'age_id':
        targetID = this.state.ages ? this.state.ages.find(eachValue => eachValue.age === event.target.value).id : ''
        break;
      case 'size_id':
        targetID = this.state.size ? this.state.size.find(eachValue => eachValue.size === event.target.value).id : ''
        break;
      case 'coat_length_id':
        targetID = this.state.coat_length ? this.state.coat_length.find(eachValue => eachValue.coat_length === event.target.value).id : ''
        break;
      case 'shelter_location_id':
        targetID = this.state.locations ? this.state.locations.find(eachValue => eachValue.nickname === event.target.value).id : ''
        console.log('inside case shelter location id ',targetID)
        break;  
      case 'is_male':
        targetID = event.target.value === "male" ? true : false
        break;
      case 'is_vaccinated':
        targetID = event.target.value === "Yes" ? true : false
        break;
      case 'is_good_with_cats':
        targetID = event.target.value === "Yes" ? true : false
        break;
      case 'is_good_with_dogs':
        targetID = event.target.value === "Yes" ? true : false
        break;
      case 'is_good_with_kids':
        targetID = event.target.value === "Yes" ? true : false
        break;
      case 'is_house_trained':
        targetID = event.target.value === "Yes" ? true : false
        break;
      case 'is_neutered_spayed':
        targetID = event.target.value === "Yes" ? true : false
        break;
      case 'is_mixed':
        targetID = event.target.value === "Yes" ? true : false
        break;
      default:
        targetID = event.target.value
    }

    console.log(`target id for ${event.target.name} is ${targetID}`)
    // const targetID = val ? val.find(eachValue => eachValue.coat_length == event.target.value).id : ''

    console.log('dropdown id selection ', event.target.value)

    this.setState({
      // endpointEditInfo: {
      //   ...this.state.endpointEditInfo,
      //   [event.target.name]: targetID
      // },
      animal :{
        ...this.state.animal,
        [event.target.name]:event.target.value
      },
      editInfo: {
        ...this.state.editInfo,
        [event.target.id]: targetID
      }
    })

    console.log(`target id for ${event.target.name} is ${targetID}`)
    console.log(`target id for ${event.target.name} is ${event.target.value}`)
  }


  handleToggle = (event) => {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing,
      read: !this.state.read
    })
    
  }

  handleTextField = (event) => {
    this.setState({
      editInfo: {
        ...this.state.editInfo,
        [event.target.name]: event.target.value
      },
      animal: {
        ...this.state.animal,
        [event.target.name]: event.target.value
      }
    })
    // console.log('handleTextField ',this.state.editInfo)
  }

  handleMetaTextField = (event) => {
    this.setState({
      editInfo: {
        ...this.state.editInfo,
        [event.target.name]: event.target.value
      },
      animal_meta: {
        ...this.state.animal_meta,
        [event.target.name]: event.target.value
      }
    })
    // console.log('handleMetaTextField ',this.state.editInfo)
  }

  callback = (response) => {
    console.log(response)
    this.state.animal.img_url = response[0].image.image_url
  }


  render() {
    // console.log('handle update ', this.state.editInfo)
    const { classes } = this.props;


    const customStyle = {
      titleStyle: {
        padding: "10% 0px 0px 0px"
      },
      imgCardStyle: {
        padding: "0px 15px",
        width: "224px",
        height: "224px"
      },
      imgStyle: {
        borderRadius: "4px",
      },
      animalInfoStyle: {
        padding: "20px 0px"
      },
      buttonStyle: {
        margin: "0px 10px 10px 0px"
      },
      noteButtonStyle: {
        margin: "0px 10px 10px 15px",
        width: "40%"
      },
      containerStyle: {
        padding: "3%"
      },
      textFieldStyle: {
        width: "43%",
        marginRight: "7%"
      },
      textFieldNote: {
        padding: "0px 3%"
      },
      oneTextFieldStyle: {
        width: 300,
        marginRight: "150px"
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
      animalButtonStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '12%'
      },
      runningNoteButtonStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      imgTitle: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        opacity: 0.8,
        fontSize: "26px",
        fontWeight: "bold"
      },
      noteStyle: {
        color: "lightgray",
        display: 'flex',
        flexWrap: 'wrap',
      },
      typographyStyle: {
        marginRight: "7%",
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
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <GridContainer style={customStyle.containerStyle}>

                <GridItem xs={12} sm={12} md={5}>
                  <GridList className={classes.gridList} >
                    <GridListTile key={this.state.animal.img_url} style={customStyle.imgCardStyle}>
                      {/* <img src={this.state.animal.img_url} alt={`${this.state.animal_meta.breed} for adoption`}
                        style={customStyle.imgStyle} /> */}

                      <ImageUpload height="200px" width="200px"
                        defaultImage={this.state.animal.img_url}
                        borderRadius="5px" imageLimit={1}
                        editable={this.state.isEditing} callback={this.callback}
                        url={`http://localhost:8000/api/pictures/animal/${this.props.match.params.id}`} />


                      <GridListTileBar style={customStyle.imgTitle}
                        // title={this.state.animal.name}
                        subtitle={<span>#{this.state.animal.id}</span>}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      />
                    </GridListTile>
                  </GridList>
                </GridItem>

                <GridItem xs={12} sm={12} md={7}>
                  <div style={customStyle.titleStyle}>
                    {this.state.isEditing ?
                      <form>
                        <TextField
                          name="name"
                          label="Name"
                          // type="text"
                          className={classes.textField}
                          // value={this.state.editInfo.name}
                          value={this.state.animal.name}

                          onChange={this.handleTextField}
                          margin="normal"
                        // inputProps={{
                        //   type: "text",
                        //   value: this.state.animal.name,
                        //   onChange: (event) => this.handleTextField(event)
                        // }}
                        />

                        <TextField
                          name="description"
                          label="Description"
                          multiline
                          rows="4"
                          className={classes.textField}
                          // value={this.state.editInfo.description}
                          value={this.state.animal_meta.description}

                          onChange={this.handleMetaTextField}
                          margin="normal"
                        />

                        <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor="shelter_location_id">Location</InputLabel>
                          <Select
                            // disabled={this.state.isEditing ? false : true}
                            // value={this.state.editInfo.nickname ? this.state.editInfo.nickname : this.state.animal.nickname}
                            value={this.state.animal.nickname}
                            id='shelter_location_id'
                            name='nickname'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input  id='shelter_location_id'/>}                           
                          >

                            {this.state.locations.map(status => {
                              return (
                                <MenuItem value={status.nickname}>
                                  {status.nickname}, {status.street_address}, {status.city}, {status.state_id}- {status.zipcode}</MenuItem>
                              )
                            })}

                          </Select>
                        </FormControl>
                      </form> :
                      <div>
                        <h1>{this.state.animal.name}</h1>
                        <legend>{this.state.animal_meta.description}</legend>
                        <p>Located at : {this.state.animal.nickname}</p>
                      </div>
                    }

                    <div style={customStyle.animalButtonStyle}>

                      <Button size="small" className={classes.button} onClick={this.handleUpdate}>
                        {this.state.isEditing ? "SAVE" : "EDIT"}
                      </Button>

                      <Button size="small" className={classes.button} onClick={this.handleToggle}
                        style={{ display: this.state.isEditing ? "block" : "none" }}>
                        CANCEL
                      </Button>

                    </div>
                  </div>

                </GridItem>

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
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.editInfo.animal_status_id ? this.state.editInfo.animal_status_id : this.state.animal.animal_status}
                            name='animal_status_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="animal_status_id" />}
                          >

                            {this.state.animal_status.map(status => {
                              return (
                                <MenuItem value={status.animal_status}>{status.animal_status}</MenuItem>
                              )
                            })}

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Species</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.editInfo.species_id ? this.state.editInfo.species_id : this.state.animal.species}
                            name='species_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="species_id" />}
                          >

                            {this.state.species.map(status => {
                              return (
                                <MenuItem value={status.species}>{status.species}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Breed</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.editInfo.breed_id ? this.state.editInfo.breed_id : this.state.animal_meta.breed}
                            name='breed_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="breed_id" />}
                          >
                            {this.state.breeds.map(status => {
                              return (
                                <MenuItem value={status.breed}>{status.breed}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Age</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.editInfo.age_id ? this.state.editInfo.age_id : this.state.animal_meta.age}
                            name='age_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="age_id" />}
                          >
                            {this.state.ages.map(status => {
                              return (
                                <MenuItem value={status.age}>{status.age}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Size</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.editInfo.size ? this.state.editInfo.size : this.state.animal_meta.size}
                            name='size'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="size" />}
                          >
                            {this.state.size.map(status => {
                              return (
                                <MenuItem value={status.size}>{status.size}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Coat Length</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.editInfo.coat_length_id ? this.state.editInfo.coat_length_id : this.state.animal_meta.coat_length}
                            name='coat_length_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="coat_length_id" />}
                          >
                            {this.state.coat_length.map(status => {
                              return (
                                <MenuItem value={status.coat_length}>{status.coat_length}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Gender</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.isEditing ? this.state.editInfo.is_male : (this.state.animal_meta.is_male ? 'male' : 'female')}
                            // value={this.state.editInfo.is_male ? this.state.editInfo.is_male : this.state.animal_meta.is_male}
                            name='is_male'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_male" />}
                          >

                            <MenuItem value="male">male</MenuItem>
                            <MenuItem value="female">female</MenuItem>

                          </Select>
                        </FormControl>

                        <TextField
                          name="color"
                          label="Color"
                          className={classes.textField}
                          // value={this.state.editInfo.color ? this.state.editInfo.color : this.state.animal_meta.color}

                          value={this.state.animal_meta.color}
                          onChange={this.handleMetaTextField}
                          margin="normal"
                        />
                      </form>
                    </GridItem>
                  </GridContainer>
                </GridItem>

                <GridItem xs={12} sm={12} md={12} style={customStyle.gridStyle}>
                  <div style={customStyle.titleStyle}>
                    <legend>Health and Personality</legend>
                  </div>

                  <GridContainer style={customStyle.detailsContainerStyle}>
                    <GridItem xs={12} sm={12} md={10}>

                      <form
                      // className={classes.root}
                      // autoComplete="off" style={customStyle.adoptionStyle}>
                      >
                        <TextField
                          name="health"
                          label="Health"
                          className={classes.textField}
                          // value={this.state.editInfo.color ? this.state.editInfo.color : this.state.animal_meta.color}

                          value={this.state.animal_meta.health}
                          onChange={this.handleMetaTextField}
                          margin="normal"
                        />

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Vaccinated?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_vaccinated ? 'Yes' : 'No'}
                            // value={this.state.editInfo.sex ? this.state.editInfo.coat_length_id : this.state.animal_meta.coat_length}
                            name='is_vaccinated'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_vaccinated" />}
                          >

                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >House trained?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_house_trained ? 'Yes' : 'No'}
                            // value={this.state.editInfo.sex ? this.state.editInfo.coat_length_id : this.state.animal_meta.coat_length}
                            name='is_house_trained'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_house_trained" />}
                          >

                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Good with Kids?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_good_with_kids ? 'Yes' : 'No'}
                            // value={this.state.editInfo.sex ? this.state.editInfo.coat_length_id : this.state.animal_meta.coat_length}
                            name='is_good_with_kids'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_good_with_kids" />}
                          >

                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Good with Cats?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_good_with_cats ? 'Yes' : 'No'}
                            // value={this.state.editInfo.sex ? this.state.editInfo.coat_length_id : this.state.animal_meta.coat_length}
                            name='is_good_with_cats'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_good_with_cats" />}
                          >

                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Good with Dogs?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_good_with_dogs ? 'Yes' : 'No'}
                            // value={this.state.editInfo.sex ? this.state.editInfo.coat_length_id : this.state.animal_meta.coat_length}
                            name='is_good_with_dogs'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_good_with_dogs" />}
                          >

                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel >Neutered/Spayed??</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_neutered_spayed ? 'Yes' : 'No'}
                            // value={this.state.editInfo.sex ? this.state.editInfo.coat_length_id : this.state.animal_meta.coat_length}
                            name='is_neutered_spayed'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_neutered_spayed" />}
                          >

                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>

                          </Select>
                        </FormControl>

                      </form>
                    </GridItem>
                  </GridContainer>

                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card style={customStyle.textFieldNote}>

              <CardHeader>
                <legend>Animal Notes</legend>
              </CardHeader>

              <TextField
                id="standard-textarea"
                label="Add a note"
                multiline
                className={classes.textField}
                margin="normal"
              />

              <div style={customStyle.detailsContainerStyle}>
                <Button style={customStyle.noteButtonStyle} variant="contained" color="secondary" disabled className={classes.button}>
                  CANCEL
                </Button>
                <Button style={customStyle.noteButtonStyle} variant="contained" className={classes.button}>
                  SUBMIT
                </Button>
              </div>

              <List
                subheader={<ListSubheader >Notes of {this.state.animal.name}</ListSubheader>}
                className={classes.root}
              >

                {this.state.animal_notes.map(note => {
                  return (
                    <ListItem button key={note.id}>
                      <ListItemText key={note.id} primary={note.notes}
                        secondary={
                          <React.Fragment>
                            <span style={customStyle.noteStyle}>
                              <Typography style={customStyle.typographyStyle}
                                component="span">
                                User:#{note.shelter_user_id}
                              </Typography>
                              {/* {moment(note.created_at).format("MMMM Do YYYY").toString()} */}
                              {moment(note.created_at).fromNow()}
                            </span>

                            <span style={customStyle.runningNoteButtonStyle}>
                              <Button size="small" disabled className={classes.button}>
                                DELETE
                            </Button>
                              <Button size="small" className={classes.button}>
                                EDIT
                            </Button>
                            </span>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  )
                })}
              </List>
            </Card>
          </GridItem>
        </GridContainer>
      </div >
    );
  }
}


AnimalView.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userID: state.userReducer.userID,
    shelterID: state.shelterReducer.shelterID,
    shelterWorkerID: state.userReducer.shelterWorkerID,
    roleID: state.userReducer.roleID,
    shelter: state.shelterReducer.shelter,
    breeds: state.animalReducer.dropdownAnimalOptions.breeds,
    size: state.animalReducer.dropdownAnimalOptions.size,
    coat_length: state.animalReducer.dropdownAnimalOptions.coat_length,
    ages: state.animalReducer.dropdownAnimalOptions.ages,
    animal_status: state.animalReducer.dropdownAnimalOptions.animal_status,
    species: state.animalReducer.dropdownAnimalOptions.species,
    subscriptions: state.animalReducer.dropdownAnimalOptions.subscriptions,
    application_status: state.animalReducer.dropdownAnimalOptions.application_status,
    roles: state.animalReducer.dropdownAnimalOptions.roles,
    states: state.animalReducer.dropdownAnimalOptions.states,
    locations: state.animalReducer.dropdownAnimalOptions.locations,
    contacts: state.animalReducer.dropdownAnimalOptions.contacts,
    animal: state.animalReducer.animalInfo.animal,
    animalMeta: state.animalReducer.animalInfo.animalMeta,
    animalNotes: state.animalReducer.animalInfo.animalNotes,
    animalFollowers: state.animalReducer.animalInfo.animalFollowers,
  }
}

export default connect(
  mapStateToProps, { updateAnimal, getAllOptions, getInfoByAnimalID }
)(withStyles(regularFormsStyle)(AnimalView))

        //export default withStyles(extendedFormsStyle)(AnimalView);
