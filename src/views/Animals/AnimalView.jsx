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

import { updateAnimal, getInfoByAnimalID, getAllOptions, addNotes, updateNotes, deleteNotes }
  from '../../actions/animalAction.js'
import NotesComponent from './NotesComponent.jsx'

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
      breeds: [],
      size: [],
      coat_length: [],
      ages: [],
      species: [],
      animal_status: [],
      locations: [],
      dynamicBreedDropdown: [],
      isEditing: false,
      isPosting: false,
      isNoteEditing: false,
      clickedNoteID: -1,
      note: '',
      textState:{
        descriptionState:'',
        colorState:'',
        healthState:'',
        nameState:''
      }
    }
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

        })
      })
      .catch(error => {
        console.log('animal info error', error)
      })

  }



  handleNoteUpdate = (event, id) => {
    event.preventDefault()
    if (this.state.isNoteEditing) {

      console.log('is updated')
    }
    else {
      this.state.clickedNoteID = id
      console.log('CLICKED NOTE ID: ', this.state.clickedNoteID)
      this.handleNoteDeleteToggle(event)
    }
  }


  updateForm = () => {

    let updateInfo = {}

    updateInfo = {
      breed_id: this.state.animal_meta.breed_id,
      coat_length_id: this.state.animal_meta.coat_length_id,
      color: this.state.animal_meta.color,
      description: this.state.animal_meta.description,
      health: this.state.animal_meta.health,
      is_good_with_cats: this.state.animal_meta.is_good_with_cats,
      is_good_with_dogs: this.state.animal_meta.is_good_with_dogs,
      is_good_with_kids: this.state.animal_meta.is_good_with_kids,
      is_house_trained: this.state.animal_meta.is_house_trained,
      is_mixed: this.state.animal_meta.is_mixed,
      is_neutered_spayed: this.state.animal_meta.is_neutered_spayed,
      is_vaccinated: this.state.animal_meta.is_vaccinated,
      is_male: this.state.animal_meta.is_male,
      size_id: this.state.animal_meta.size_id,
      animal_status_id: this.state.animal.animal_status_id,
      species_id: this.state.animal.species_id,
      name: this.state.animal.name,
      age_id: this.state.animal_meta.age_id,
      profile_img_id: this.state.animal.img_id,
      shelter_location_id: this.state.animal.shelter_location_id,
      shelter_id: this.state.animal.shelter_id,
      animal_id: this.state.animal.id
    }
 

    console.log('update form editinfo : ', updateInfo)

    console.log('update form editinfo: animal: ', this.state.animal)
    console.log('update form editinfo: animalInfo: ', this.state.animal_meta)
    this.props.updateAnimal(updateInfo,
      this.state.animal.id, this.state.animal_meta.id)
      .then(res => console.log('update animal animal view :success ', res))
      .catch(error => console.log('update error animal view', error))

    this.setState({
      isEditing: false,
    })
  }

  handleAdoption = (event) => {
    console.log('value from drop down is ', event.target.value)

    let targetID = ''
    switch (event.target.name) {
      case 'breed_id':
        targetID = this.state.breeds ? this.state.breeds.find(eachValue => eachValue.id === event.target.value).breed : ''
        this.setState({
          animal_meta: {
            ...this.state.animal_meta,
            breed: targetID,
            [event.target.name]: event.target.value
          },
        })

        break;
      case 'animal_status_id':
        targetID = this.state.animal_status ? this.state.animal_status.find(eachValue => eachValue.id === event.target.value).animal_status : ''
        console.log('inside case: animal status ', targetID)
        this.setState({
          animal: {
            ...this.state.animal,
            animal_status: targetID,
            [event.target.name]: event.target.value
          },
        })
        break;
      case 'species_id':
        targetID = this.state.species ? this.state.species.find(eachValue => eachValue.id === event.target.value).species : ''

        let dynamicDropdown = this.state.breeds ? this.state.breeds.filter(eachBreed => eachBreed.species_id === event.target.value) : ''

        console.log('dynamic breed list based on species selection', dynamicDropdown)
        this.setState({
          animal: {
            ...this.state.animal,
            species: targetID,
            [event.target.name]: event.target.value,
            
          },
          dynamicBreedDropdown: dynamicDropdown
        })
        break;
      case 'age_id':
        targetID = this.state.ages ? this.state.ages.find(eachValue => eachValue.id === event.target.value).age : ''
        this.setState({
          animal_meta: {
            ...this.state.animal_meta,
            [event.target.name]: event.target.value,
            age: targetID
          },
        })
        break;
      case 'size_id':
        targetID = this.state.size ? this.state.size.find(eachValue => eachValue.id === event.target.value).size : ''
        this.setState({
          animal_meta: {
            ...this.state.animal_meta,
            size: targetID,
            [event.target.name]: event.target.value
          },
        })
        break;
      case 'coat_length_id':
        targetID = this.state.coat_length ? this.state.coat_length.find(eachValue => eachValue.id === event.target.value).coat_length : ''
        this.setState({
          animal_meta: {
            ...this.state.animal_meta,
            coat_length: targetID,
            [event.target.name]: event.target.value
          },
        })
        break;
      case 'shelter_location_id':
        targetID = this.state.locations ? this.state.locations.find(eachValue => eachValue.id === event.target.value).nickname : ''
        console.log('inside case: shelter location nickname ', targetID)
        this.setState({
          animal: {
            ...this.state.animal,
            nickname: targetID,
            [event.target.name]: event.target.value
          },
        })
        break;

      default:
        targetID = event.target.value
        this.setState({
          animal_meta: {
            ...this.state.animal_meta,
            [event.target.name]: targetID
          },

        })
    }

    console.log(`target id for ${event.target.name} is ${targetID}`)
    console.log('dropdown id selection ', event.target.value)
    console.log(`target value for ${event.target.name} is ${event.target.value}`)
  }

  handleAddNoteChange = (event) => {
    this.setState({
      note: event.target.value
    })
  }

  submitNote = (event) => {
    event.preventDefault()
    console.log(this.state.note)

    let notes = {}

    notes = {
      notes: this.state.note,
      animal_id: this.state.animal.id,
      shelter_user_id: this.props.shelterWorkerID
    }

    console.log('post notes info: ', notes)

    this.props.addNotes(this.state.animal.id, notes)
      .then(
        (res) => {
          // window.location.reload()
          this.setState({
            note: ''
          });
        }
      )
      .catch(error => {
        console.log('animal view component : add : error ', error)
      })

  }

  submitToggleAddNote = (event) => {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  handleToggle = (event) => {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  //without validation
  // handleTextField = (event) => {
  //   this.setState({
  //     animal: {
  //       ...this.state.animal,
  //       [event.target.name]: event.target.value
  //     }
  //   })
  // }

  //without validation
  // handleMetaTextField = (event) => {
  //   this.setState({
  //     animal_meta: {
  //       ...this.state.animal_meta,
  //       [event.target.name]: event.target.value
  //     }
  //   })
  // }

  verifyLength= (value,length) => {
    if(value.length>=length) {
      console.log(`verify length fn: $[value} is valid length` )
      return true
    }
    else {
      console.log(`verify length fn: $[value} is not valid length` )
      return false
    }
  }

  isValidated() {
    console.log('isValidated fn: before if: descriptionState ', this.state.textState.descriptionState )
      console.log('isValidated fn: before if: colorState ', this.state.textState.colorState )
      console.log('isValidated fn: before if: healthState ', this.state.textState.healthState )
      console.log('isValidated fn: before if: nameState ', this.state.textState.nameState )
    if (
      this.state.textState.descriptionState === "success" &&
      this.state.textState.colorState === "success" &&
      this.state.textState.healthState === "success" &&
      this.state.textState.nameState === "success"
    ) {
      console.log("isValidated fn : is true")
      // console.log('descriptionState ', this.state.textState.descriptionState )
      return true;
    } else {
      if (this.state.textState.descriptionState !== "success") {
        // console.log('descriptionState ', this.state.textState.descriptionState )
        this.setState({ 
          ...this.state,
          textState:{
            ...this.state.textState,
            descriptionState: "error" 
        }
        });
      }
      if (this.state.textState.colorState !== "success") {
        this.setState({ 
          ...this.state,
          textState:{
            ...this.state.textState,
            colorState: "error" 
        }
        });
      }
      if (this.state.textState.healthState !== "success") {
        this.setState({ 
          ...this.state,
          textState:{
            ...this.state.textState,
            healthState: "error" 
        }
        });
      }
      if (this.state.textState.nameState !== "success") {
        this.setState({ 
          ...this.state,
          textState:{
            ...this.state.textState,
          nameState: "error" 
        }
        });
      }
    }
    console.log("isValidated is false")
    return false;
  }

  handleUpdate = (event) => {
    event.preventDefault()
    if (this.state.isEditing && this.isValidated) {
      console.log('descriptionState ', this.state.textState.descriptionState )
      console.log('colorState ', this.state.textState.colorState )
      console.log('healthState ', this.state.textState.healthState )
      console.log('nameState ', this.state.textState.nameState )

      // if(this.isValidated){

      this.updateForm()
    // }
    // else {
    //   console.log('please enter the required length for the fields')
    // }
  }
    else this.handleToggle(event)
  }

  // this.setState( { ...this.state, textState: {...this.state.textState, [stateInfo + "State"] : "success" } } );

  //with validation

  handleTextField = (event,stateInfo,length) => {
    console.log(`concatenate test : ${[stateInfo+"State"]} ${{[stateInfo+"State"]:"success"}}`)

    if(this.verifyLength(event.target.value,length)){
      console.log(`concatenate test : ${[stateInfo+"State"]} ${{[stateInfo+"State"]:"success"}}`)

    this.setState({
      
        ...this.state,
      textState: {
        ...this.state.textState,
        [stateInfo+"State"]: "success"
      }
    
      
    })
    console.log(`${event.target.name}  valid length`)
  }
    else{
      this.setState({
        ...this.state,
        textState: {
          ...this.state.textState,
          [stateInfo+"State"]: "error"
        }
      })
      console.log(`${event.target.name} not valid length`)
    }
    
    this.setState({
      ...this.state,
      animal: {
        ...this.state.animal,
        [event.target.name]: event.target.value
      }
    })
  }

  //with validation
  handleMetaTextField = (event,stateInfo,length) => {
    console.log(`concatenate test : ${[stateInfo+"State"]} ${{[stateInfo+"State"]:"success"}}`)

    if(this.verifyLength(event.target.value,length)){
      console.log(`concatenate test : ${[stateInfo+"State"]} ${{[stateInfo+"State"]:"success"}}`)
      this.setState({
        textState: {
          ...this.state,
          ...this.state.textState,
          [stateInfo+"State"]: "success"
        }
      })}
      else{
        console.log(`${event.target.name} not valid length`)
        this.setState({
          ...this.state,
          textState: {
            ...this.state.textState,
            [stateInfo+"State"]: "error"
          }
        })}
      
    this.setState({
      ...this.state,
      animal_meta: {
        ...this.state.animal_meta,
        [event.target.name]: event.target.value
      }
    })
  }




  callback = (response) => {
    console.log(response)
    this.state.animal.img_url = response[0].image.image_url
    this.state.animal.img_id = response[0].image.image_id

    let updateInfo = {

      profile_img_id: response[0].image.image_id,

    }

    this.props.updateAnimal(updateInfo,
      this.state.animal.id, this.state.animal_meta.id)
      .then(res => console.log('update animal animal view :success ', res))
      .catch(error => console.log('update error animal view', error))
  }


  render() {
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

                      <ImageUpload height="100%" width="100%"
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
                          value={this.state.animal.name}
                          // onChange={this.handleTextField}
                          onChange={(event) => this.handleTextField(event,"name",3)}
                          margin="normal"
                        />

                        <TextField
                          name="description"
                          label="Description"
                          multiline
                          rows="4"
                          className={classes.textField}
                          value={this.state.animal_meta.description}
                          // onChange={this.handleMetaTextField}
                          onChange={(event) => this.handleMetaTextField(event,"description",10)}
                          margin="normal"
                        />

                        <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor="shelter_location_id">Location</InputLabel>
                          <Select
                            value={this.state.animal.nickname}
                            name='shelter_location_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id='shelter_location_id' />}
                          >

                            {this.state.locations.map(status => {
                              return (
                                <MenuItem value={status.id}>
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
                            value={this.state.animal.animal_status}
                            name='animal_status_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="animal_status_id" />}
                          >

                            {this.state.animal_status.map(status => {
                              return (
                                <MenuItem value={status.id}>{status.animal_status}</MenuItem>
                              )
                            })}

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor="species_id">Species</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal.species}
                            name='species_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="species_id" />}
                          >

                            {this.state.species.map(status => {
                              return (
                                <MenuItem value={status.id}>{status.species}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor="breed_id">Breed</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.breed}
                            name='breed_id'
                            onChange={this.handleAdoption}
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

                            {this.state.dynamicBreedDropdown.map(status => {
                              return (
                                <MenuItem value={status.id}>{status.breed}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor="age_id">Age</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.age}
                            name='age_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="age_id" />}
                          >
                            {this.state.ages.map(status => {
                              return (
                                <MenuItem value={status.id}>{status.age}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor="size_id">Size</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.size}
                            name='size_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="size_id" />}
                          >
                            {this.state.size.map(status => {
                              return (
                                <MenuItem value={status.id}>{status.size}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor='coat_length_id'>Coat Length</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.coat_length}
                            name='coat_length_id'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="coat_length_id" />}
                          >
                            {this.state.coat_length.map(status => {
                              return (
                                <MenuItem value={status.id}>{status.coat_length}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor='is_male'>Gender</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_male ? 'male' : 'female'}
                            name='is_male'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_male" />}
                          >

                            <MenuItem value={true}>male</MenuItem>
                            <MenuItem value={false}>female</MenuItem>

                          </Select>
                        </FormControl>

                        <TextField
                          name="color"
                          label="Color"
                          className={classes.textField}
                          value={this.state.animal_meta.color}
                          // onChange={this.handleMetaTextField}
                          onChange={(event) => this.handleMetaTextField(event,"color",3)}
                          margin="normal"
                          InputProps={{
                            readOnly: this.state.isEditing ? false : true,
                          }}
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
                        className={classes.root}
                        autoComplete="off" style={customStyle.adoptionStyle}
                      >
                        <TextField
                          name="health"
                          label="Health"
                          className={classes.textField}
                          value={this.state.animal_meta.health}
                          // onChange={this.handleMetaTextField}
                          onChange={(event) => this.handleMetaTextField(event,"health",10)}
                          margin="normal"
                          InputProps={{
                            readOnly: this.state.isEditing ? false : true,
                          }}
                        />

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor='is_vaccinated'>Vaccinated?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_vaccinated ? 'Yes' : 'No'}
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
                          <InputLabel htmlFor='is_house_trained'>House trained?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_house_trained ? 'Yes' : 'No'}
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
                          <InputLabel htmlFor='is_good_with_kids'>Good with Kids?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_good_with_kids ? 'Yes' : 'No'}
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
                          <InputLabel htmlFor='is_good_with_cats'>Good with Cats?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_good_with_cats ? 'Yes' : 'No'}
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
                          <InputLabel htmlFor='is_good_with_dogs'>Good with Dogs?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_good_with_dogs ? 'Yes' : 'No'}
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
                          <InputLabel htmlFor='is_neutered_spayed'>Neutered/Spayed?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_neutered_spayed ? 'Yes' : 'No'}
                            name='is_neutered_spayed'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_neutered_spayed" />}
                          >

                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>

                          </Select>
                        </FormControl>

                        <FormControl style={customStyle.formControlStyle} className={classes.formControl} >
                          <InputLabel htmlFor='is_mixed'>Is Mixed?</InputLabel>
                          <Select
                            disabled={this.state.isEditing ? false : true}
                            value={this.state.animal_meta.is_mixed ? 'Yes' : 'No'}
                            name='is_mixed'
                            onChange={this.handleAdoption}
                            renderValue={value => `${value}`}
                            input={<Input id="is_mixed" />}
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
                value={this.state.note}
                multiline
                className={classes.textField}
                onChange={this.handleAddNoteChange}
                margin="normal"
              />

              <div style={customStyle.detailsContainerStyle}>
                <Button style={customStyle.noteButtonStyle}
                  variant="contained" color="secondary"
                  className={classes.button} onClick={this.submitToggleAddNote}>
                  CANCEL
                </Button>
                <Button style={customStyle.noteButtonStyle}
                  variant="contained" className={classes.button} onClick={this.submitNote}>
                  SUBMIT
                </Button>
              </div>

              <List
                subheader={<ListSubheader >Notes of {this.state.animal.name}</ListSubheader>}
                className={classes.root}
              >

                {this.state.animal_notes.map(note => (
                  <NotesComponent note={note} animalID={this.state.animal.id} />

                ))}

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
  mapStateToProps,
  {
    updateAnimal,
    getAllOptions,
    getInfoByAnimalID,
    addNotes,
    updateNotes,
    deleteNotes
  }
)(withStyles(regularFormsStyle)(AnimalView))

        //export default withStyles(extendedFormsStyle)(AnimalView);
