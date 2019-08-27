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
import { axiosWithAuth } from 'axiosWithAuth';

import { updateAnimal, getInfoByAnimalID, getAllOptions, addNotes, updateNotes, deleteNotes, getAnimalPictures, deleteAnimalPictures }
  from '../../actions/animalAction.js'
import AnimalNotes from './AnimalViewComponents/AnimalNotes.jsx'
import AnimalViewTop from './AnimalViewComponents/AnimalViewTop.jsx'
import AnimalViewDetails from './AnimalViewComponents/AnimalViewDetails.jsx'

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
import ImageUploadEdit from '../../components/ImageUpload/ImageUploadEdit'
import placeholderImage from '../../assets/img/image_placeholder.jpg'

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
import AnimalViewHealth from "./AnimalViewComponents/AnimalViewHealth.jsx";
import { isConstructorDeclaration } from "typescript";

class AnimalView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animal: {},
      animal_meta: {},
      animal_notes: [],
      animal_followers: [],
      animalPictures: [],
      // placeholderImages:Array(6).fill("url(" + placeholderImage + ")"),
      placeholderImages: Array(6).fill(''),
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
      isViewingPhotos: false,
      isEditingPhotos: false,
      note: '',
      textState: {
        descriptionState: 'success',
        colorState: 'success',
        healthState: 'success',
        nameState: 'success'
      },
      breedState: 'success',
      shelterVerified: "",
      open: false
    }

    this.maxLength = 3;
  }


  componentWillMount() {
    this.verifyShelter(localStorage.getItem('shelter_id'))
  }

  componentDidMount() {

    Promise.all([this.props.getInfoByAnimalID(this.props.match.params.id),
    this.props.getAnimalPictures(this.props.match.params.id),
    this.props.getAllOptions(localStorage.getItem('shelter_id'))])
      .then(([animalInfo, animalOptions]) => {

      

        //verifying shelter
        this.verifyShelter(this.props.animal.shelter_id)

        let newArray = this.props.animalPictures;

        for (let i = 6 - (6 - newArray.length); i < 6; i++){
          newArray.push('');
        }
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
          locations: this.props.locations,
          animalPictures: this.props.animalPictures,
          placeholderImages: newArray
        })
      })
      .catch(error => {
        console.log('animal info error', error)
      })
  }


  verifyShelter = async (shelter_id) => {
    //verifying shelter before proceeding
    await axiosWithAuth()
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/shelter/${shelter_id}`)
      .then(result => {
        this.setState({
          shelterVerified: true
        })
      })
      .catch(error => {
        this.setState({
          shelterVerified: false
        })
        this.props.history.push('/admin/allAnimals')
      })
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.animalNotes !== prevProps.animalNotes) {
      this.setState({
        animal_notes: this.props.animalNotes
      })

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

    this.props.updateAnimal(updateInfo,
      this.state.animal.id, this.state.animal_meta.id)
      .then(res => console.log('update animal animal view :success ', res))
      .catch(error => console.log('update error animal view', error))

    this.setState({
      isEditing: false,
    })
  }



  handleAdoption = (event) => {

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

        this.setState({
          animal: {
            ...this.state.animal,
            species: targetID,
            [event.target.name]: event.target.value,

          },
          animal_meta: {
            ...this.state.animal_meta,
            "breed": "select a breed",

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

  }

  handleToggle = (event) => {
    event.preventDefault()
    this.setState({
      isEditing: !this.state.isEditing,
      isEditingPhotos: !this.state.isEditingPhotos
      // open:!this.state.open

    })

  }

  handleCancel = async (event) => {
    event.preventDefault()
    await this.setState({
      isEditing: false,
      animal: this.props.animal,
      animal_meta: this.props.animalMeta
    })
    console.log('handle cancel :', this.state.animal.name)
  }

  handleClose = (event) => {
    event.preventDefault()
    this.setState({
      open: false,
      isViewingPhotos: false,
      isEditingPhotos: false
    })
  }

  verifyLength = (value) => {
    if (value.length >= this.maxLength) {
      return true
    }
    else {
      return false
    }
  }

  isValidated() {

    if (
      this.state.textState.descriptionState === "success" &&
      this.state.textState.colorState === "success" &&
      this.state.textState.healthState === "success" &&
      this.state.textState.nameState === "success" &&
      this.state.breedState === "success"
    ) {
      return true;
    } else {
      if (this.state.textState.descriptionState !== "success") {
        this.setState({
          textState: {
            ...this.state.textState,
            descriptionState: "error"
          }
        });
      }
      if (this.state.textState.colorState !== "success") {
        this.setState({
          textState: {
            ...this.state.textState,
            colorState: "error"
          }
        });
      }
      if (this.state.textState.healthState !== "success") {
        this.setState({
          textState: {
            ...this.state.textState,
            healthState: "error"
          }
        });
      }
      if (this.state.textState.nameState !== "success") {
        this.setState({
          textState: {
            ...this.state.textState,
            nameState: "error"
          }
        });
      }
      if (this.state.breedState !== "success") {
        this.setState({
          breedState: "error"
        });
      }
    }
    return false;
  }

  //with validation
  handleTextField = (event) => {
    let stateName = `${event.target.name}State`

    if (event.target.value.length >= this.maxLength) {
      this.setState({
        textState: {
          ...this.state.textState,
          [stateName]: "success"
        }
      })
    }
    else {
      this.setState({
        textState: {
          ...this.state.textState,
          [stateName]: "error"
        }
      })
    }
    this.setState({
      animal: {
        ...this.state.animal,
        [event.target.name]: event.target.value
      }
    })
  }

  //with validation
  handleMetaTextField = event => {
    // console.log(`concatenate test : [${event.target.name}State] [${event.target.name}State]:success `)
    let stateName = `${event.target.name}State`

    if (event.target.value.length >= this.maxLength) {
      // console.log(`concatenate test : ${[stateInfo+"State"]} ${{[stateInfo+"State"]:"success"}}`)
      this.setState({
        textState: {
          ...this.state.textState,
          [stateName]: "success"
          // [event.target.name + "State"]: "success"
        }
      })
    }
    else {
      this.setState({
        textState: {
          ...this.state.textState,
          [stateName]: "error"
        }
      })
    }

    this.setState({

      animal_meta: {
        ...this.state.animal_meta,
        [event.target.name]: event.target.value
      }
    })
  }

  handleUpdate = (event) => {
    event.preventDefault()
    if (this.state.isEditing) {
      if (this.isValidated() && this.state.animal_meta.breed !== 'select a breed') {

        this.updateForm()
      }
      else {

      }
    }

    else this.handleToggle(event)
  }

  handleViewPics = (event) => {
    event.preventDefault()
    console.log('this.props.isEditingPhotos is ', this.state.isEditingPhotos)
    console.log('this.props.isViewingPhotos is ', this.state.isViewingPhotos)

    this.setState({
      isEditingPhotos: !this.state.isEditingPhotos,
      isViewingPhotos: !this.props.isViewingPhotos,
      open: !this.state.open
    })

  }

  deletePictures = (imageId, animalId) => {

    const arrayAfterDelete = this.state.placeholderImages.map(image => image.img_id === imageId ? '' : image)

    console.log('animal view: array after delete ',arrayAfterDelete)

    this.setState({
      placeholderImages: arrayAfterDelete
    })

    this.props.deleteAnimalPictures(imageId, animalId)
      .then(res => console.log('delete pic fn from animal view component ', res))
      .catch(error => console.log(error))
  }

  callback = async (response) => {
    console.log('callback img_id ', response)

    let newArray = this.state.placeholderImages;
    for(let i = 0; i < this.state.placeholderImages.length; i++){
        if (newArray[i] === ''){
          newArray[i] = response[0].image;
          break;
        }
    }
    this.setState({
      placeholderImages: newArray
    })

    let updateInfo = {
      img_id: response[0].image.image_id,
      img_url: response[0].image.image_url,
      animal_id: this.state.animal.id
    }

    console.log('call updated info ', updateInfo)

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/animals/pictures`, updateInfo)
      .then(result => {
        console.log('upload image success animal view', result)
      })
      .catch(error => {
        console.log('upload image error animal view', error)
      })


  }

  render() {

    // console.log('animal view component updated pictures ', this.state.placeholderImages)
    console.log('animal view component: this.state.placeholderImages ', this.state.placeholderImages)

    const { classes } = this.props;

    const customStyle = {

      containerStyle: {
        padding: "3%"
      },
      animalButtonStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '12%'
      },
    }


    if (this.state.shelterVerified !== true) return <div>Verifying animal</div>

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} lg={8}>
            <Card>
              <GridContainer style={customStyle.containerStyle}>
                <AnimalViewTop
                  animal={this.state.animal}
                  animal_meta={this.state.animal_meta}
                  isEditing={this.state.isEditing}
                  textState={this.state.textState}
                  callback={this.callback}
                  handleMetaTextField={this.handleMetaTextField}
                  handleTextField={this.handleTextField}
                  handleAdoption={this.handleAdoption}
                  paramsId={this.props.match.params.id}
                  handleToggle={this.handleToggle}
                  maxLength={this.maxLength}
                  open={this.state.open}
                  handleClose={this.handleClose}
                  placeholderImages={this.state.placeholderImages}
                  animalPictures = {this.state.animalPictures}
                  deletePictures={this.deletePictures}
                  handleViewingPics={this.handleViewPics}
                  isViewingPhotos={this.state.isViewingPhotos} />
                <GridItem xs={12} sm={12} md={12}>
                  <div style={customStyle.animalButtonStyle}>

                    <Button size="small" className={classes.button} onClick={this.handleUpdate}>
                      {this.state.isEditing ? "SAVE" : "EDIT"}
                    </Button>

                    <Button size="small" className={classes.button} onClick={this.handleCancel}
                      style={{ display: this.state.isEditing ? "block" : "none" }}>
                      CANCEL
                      </Button>

                  </div>
                </GridItem>

                <AnimalViewDetails
                  animal={this.state.animal}
                  animal_meta={this.state.animal_meta}
                  isEditing={this.state.isEditing}
                  handleAdoption={this.handleAdoption}
                  handleMetaTextField={this.handleMetaTextField}
                  dynamicBreedDropdown={this.state.dynamicBreedDropdown}
                  textState={this.state.textState}
                  breedState={this.state.breedState}
                  speciesProps={this.state.species}
                  breedsProps={this.state.breeds}
                  maxLength={this.maxLength}
                />

                <AnimalViewHealth
                  textState={this.state.textState}
                  animal_meta={this.state.animal_meta}
                  isEditing={this.state.isEditing}
                  handleAdoption={this.handleAdoption}
                  handleMetaTextField={this.handleMetaTextField}
                  maxLength={this.maxLength}
                />

              </GridContainer>
            </Card>
          </GridItem>

          <AnimalNotes animal_id={this.state.animal.id} shelter_id={this.state.animal.shelter_id} />
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
    animalPictures: state.animalReducer.animalPictures,
    picturesAfterDelete: state.animalReducer.picturesAfterDelete
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
    deleteNotes,
    getAnimalPictures,
    deleteAnimalPictures
  }
)(withStyles(regularFormsStyle)(AnimalView))

