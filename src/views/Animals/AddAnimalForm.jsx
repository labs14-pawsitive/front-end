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
import {connect} from "react-redux";
import {addAnimal, fetchOptions} from '../../actions/animalAction';
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import { axiosWithAuth } from 'axiosWithAuth';


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx"; 
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import CustomDropdown from "components/CustomDropdown/CustomDropdown";

class AddAnimalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: {
        name: "",
        color: "",
        health: "",
        description: "",
        species_id: null,
        breed_id: null,
        animal_status_id: null,
        size_id: null,
        coat_length_id: null,
        age_id: null,
        shelter_location_id: null,
 
        is_male: false,
        is_house_trained: false,
        is_neutered_spayed: false,
        is_good_with_kids: false,
        is_good_with_dogs: false,
        is_good_with_cats: false,
        is_vaccinated: false,
        is_mixed: false,
        shelter_id: null,
        profile_img_id: null,
      },
      validation: {
        is_male: true,
        is_house_trained: true,
        is_neutered_spayed: true,
        is_good_with_kids: true,
        is_good_with_dogs: true,
        is_good_with_cats: true,
        is_vaccinated: true,
        is_mixed: true,
        
      },
      checked: [],
      shelterVerified : ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  componentWillMount() {
    this.verifyShelter(localStorage.getItem('shelter_id'))
    this.setState({
          animal: {
            ...this.state.animal,
            shelter_id : localStorage.getItem('shelter_id')
          },
          validation : {
            ...this.state.validation,
            shelter_id : true
          }
        })
  }

  verifyShelter = async(shelter_id) => {
    //verifying shelter before proceeding
    axiosWithAuth()
      .get(`https://staging2-pawsnfind.herokuapp.com/api/auth/shelter/${shelter_id}`)
      .then( result => { 
        this.setState({
          shelterVerified : true
        })
        console.log(result)
      })
      .catch( error => {
        console.log(error)
        this.setState({
          shelterVerified : false
        })
        this.props.history.push('/')
      })
  }

  componentDidMount () {
 
    const shelterId = localStorage.getItem('shelter_id')
  

    this.props.fetchOptions(this.state.animal.shelter_id)

    // this.setState({
    //   animal: {
    //     name: "snowflake",
    //     color: "white",
    //     health: "healthy",
    //     description: "happy dog",
    //     species_id: 1,
    //     breed_id: 4,
    //     animal_status_id: 2,
    //     size_id: 3,
    //     coat_length_id: 3,
    //     age_id: 3,
    //     shelter_location_id: 1,
    //     states_id: 5,
    //     shelter_id: 1,
    //     is_male: false,
    //     is_house_trained: false,
    //     is_neutered_spayed: true,
    //     is_good_with_kids: true,
    //     is_good_with_dogs: true,
    //     is_good_with_cats: false,
    //     is_vaccinated: false,
    //     profile_img_id: null,
    //     is_mixed: 1
    //   },
    //   validation: {
    //     name: true,
    //     color: true,
    //     health: true,
    //     description: true,
    //     species_id: true,
    //     breed_id: true,
    //     animal_status_id: true,
    //     size_id: true,
    //     coat_length_id: true,
    //     age_id: true,
    //     shelter_location_id: true,
    //     states_id: true,
    //     is_male: true,
    //     is_house_trained: true,
    //     is_neutered_spayed: true,
    //     is_good_with_kids: true,
    //     is_good_with_dogs: true,
    //     is_good_with_cats: true,
    //     is_vaccinated: true,
    //     is_mixed: true,
    //     shelter_id: true,
    //     profile_img_id: true,

    //   },
    //   checked: [],
    // });
 
  }

  handleImgUploadResponse = response => {
   
    if (!response.error) {
      const { image_id, image_url } = response[0].image
      this.setState({
        animal: {
          ...this.state.animal,
          profile_img_id: image_id,
          image_url: image_url
        }
      })
    }
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false
  }

  verifyNotNull(value) {
    if (value) {
      return true;
    }
    return false
  }
  
  handleChange(event, stateName, type, stateNameEqualTo) {
    switch(type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ 
            validation: {
              ...this.state.validation,
              [stateName]: true
            } 
          });
        } else {
          this.setState({ 
            validation: {
              ...this.state.validation,
              [stateName]: false
            } 
          });
        }
        break;
      case "notNull":
        if (this.verifyNotNull(event.target.value)) {
          this.setState({ 
            validation: {
              ...this.state.validation,
              [stateName]: true
            } 
          });
        } else {
          this.setState({ 
            validation: {
              ...this.state.validation,
              [stateName]: false
            } 
          });
        }
        break;
      default:
      this.setState({ 
        validation: {
          ...this.state.validation,
          [stateName]: false
        } 
      });
        break;
    }
    
    this.setState({
      animal: {
        ...this.state.animal, 
        [stateName]: event.target.value
      } 
    })
  }  

  isValidated() {
    if (
      this.state.validation.name &&
      this.state.validation.color &&
      this.state.validation.health &&
      this.state.validation.description &&
      this.state.validation.breed_id &&
      this.state.validation.age_id &&
      this.state.validation.animal_status_id &&
      this.state.validation.coat_length_id &&
      this.state.validation.is_good_with_cats &&
      this.state.validation.is_good_with_dogs &&
      this.state.validation.is_good_with_kids &&
      this.state.validation.is_house_trained &&
      this.state.validation.is_male &&
      this.state.validation.is_neutered_spayed &&
      this.state.validation.is_vaccinated &&
      this.state.validation.is_mixed &&
      this.state.animal.profile_img_id &&
      this.state.validation.shelter_location_id &&
      this.state.validation.size_id &&
      this.state.validation.species_id &&
 
      this.state.validation.shelter_id
    ) {
      return true
    } 
    return false;
  }

  handleChangeEnabled(event) {
    this.setState({ selectedEnabled: event.target.value });
  }

  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
      animal:{
        ...this.state.animal,
        [value]: !this.state.animal[value]
      },
      
    });
  }

  submitAnimal = e => {
    e.preventDefault();
    this.verifyShelter(this.state.animal.shelter_id)
    if (this.isValidated()) {
      const { checked } = this.state
      let animalAttributes = { ...this.state.animal }
      this.props.addAnimal(animalAttributes).then((animalId) => {
        if (animalId) {
          this.setState({
            animal: {
              name: "",
              color: "",
              health: "",
              description: "",
              species_id: "",
              breed_id: "",
              animal_status_id: "",
              size_id: "",
              coat_length_id: "",
              subscriptions_id: "",
              age_id: "",
              shelter_location_id: "",
              shelter_id: "",
              is_male: false,
              is_house_trained: false,
              is_neutered_spayed: false,
              is_good_with_kids: false,
              is_good_with_dogs: false,
              is_good_with_cats: false,
              is_vaccinated: false,
              is_mixed: false
            },
            checked: [],
          })

          this.props.history.push(`/admin/animal/${animalId}`);
        }
      });
    } else {
      return console.log("Invalid: Fill out all required fields")
    }
  }

  render() {
    const { classes } = this.props;

    const styles = {
      photo: {
        textAlign: "center"
      },
      formControl: {
        width:"100%"
      },
      dropdown: {
        minWidth: "100%",
        marginTop: "20px",
        marginRight: "10px",
        maxWidth: "100%"
      },
      dropdownList: {
        minWidth: "100%"
      },
      dropdownOptions: {
        minWidth: "100%"
      },

      
    }

    const filterBreedOptions = this.props.breedsOptions.filter(breed => {
      if (this.state.animal.species_id) {
        return breed.species_id === this.state.animal.species_id
      } else {
        return true
      }
    })

    const breedsDropdownOptions = filterBreedOptions.map(option => {
      return <span style={styles.dropdownOptions} onChange={this.handleChange} value={option.id}>{option.breed}</span>
    })
    const animalStatusDropdownOptions = this.props.animalStatusOptions.map(option => {
      return <span onChange={this.handleChange} value={option.id}>{option.animal_status}</span>
    })
    const sizeDropdownOptions = this.props.sizeOptions.map(option => {
      return <span onChange={this.handleChange} value={option.id}>{option.size}</span>
    })
    const coatLengthDropdownOptions = this.props.coatLengthOptions.map(option => {
      return <span onChange={this.handleChange} value={option.id}>{option.coat_length}</span>
    })
    const speciesDropdownOptions = this.props.speciesOptions.map(option => {
      return <span onChange={this.handleChange} value={option.id}>{option.species}</span>
    })
    const agesDropdownOptions = this.props.agesOptions.map(option => {
      return <span onChange={this.handleChange} value={option.id}>{option.age}</span>
    })
    const locationsDropdownOptions = this.props.locationsOptions.map(option => {
      return <span onChange={this.handleChange} value={option.id}>{option.nickname}</span>
    })

    const buttonDisplay = (animalAttribute, optionType, nameAttribute, defaultText) => {
      const attributeId = this.state.animal[animalAttribute]
      if(attributeId) {
        const option = this.props[optionType].find(option => option.id == parseInt(attributeId))
        if (option) {
          return option[nameAttribute]
        }  
      }
      return defaultText
    }
    const breedButtonDisplay = buttonDisplay('breed_id', 'breedsOptions', 'breed', 'Breed')
    const animalStatusButtonDisplay = buttonDisplay('animal_status_id', 'animalStatusOptions', 'animal_status', 'Animal Status')
    const sizeButtonDisplay = buttonDisplay('size_id', 'sizeOptions', 'size', 'Size')
    const coatLengthButtonDisplay = buttonDisplay('coat_length_id', 'coatLengthOptions', 'coat_length', 'Coat length')
    const speciesButtonDisplay = buttonDisplay('species_id', 'speciesOptions', 'species', 'Species')
    const agesButtonDisplay = buttonDisplay('age_id', 'agesOptions', 'age', 'Age')
    const locationsButtonDisplay = buttonDisplay('shelter_location_id', 'locationsOptions', 'nickname', 'Shelter location')

    if(this.state.shelterVerified !== true) return <div>Verifying Shelter</div>

    return (
      
      <GridContainer>
        <GridItem 
          xs={12} sm={12} md={12}
          style={styles.photo}
        >
          <legend>Add Animal Profile Image</legend>
          <ImageUpload 
            height="250px" 
            width="250px" 
            borderRadius="5px" 
            imageLimit={1} 
            editable={true} 
            callback={this.handleImgUploadResponse} 
 
            url="https://staging2-pawsnfind.herokuapp.com/api/pictures/animal/1"
 
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" text>
              <CardText color="rose">
                <h4 className={this.props.cardTitle}>Add Animal Information</h4>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
              <span>{ this.state.validation.name }</span>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    success={this.state.validation.name}
                    error={this.state.validation.name === false}
                    labelText="name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.animal.name,
                      onChange: event => this.handleChange(event, "name", "length", 2),
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    success={this.state.validation.color}
                    error={this.state.validation.color === false}
                    labelText="color"
                    id="color"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: this.state.animal.color,
                      onChange: event => this.handleChange(event, "color", "length", 2)
                    }}
                  />
                </GridItem>

                </GridContainer>
                <CustomInput
                  success={this.state.validation.health}
                  error={this.state.validation.health === false}
                  labelText="health"
                  id="health"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: this.state.animal.health,
                    onChange: event => this.handleChange(event, "health", "length", 2)
                  }}
                />
                <CustomInput
                  success={this.state.validation.description}
                  error={this.state.validation.description === false}
                  labelText="description"
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: this.state.animal.description,
                    onChange: event => this.handleChange(event, "description", "length", 2)
                  }}
                />
                
                <GridContainer>
                  <GridItem xs={12} sm={6} md={4}>
                    <FormControl style={styles.formControl}>
                      <CustomDropdown
                        buttonText= {speciesButtonDisplay}
                        buttonProps={{
                          style:styles.dropdown
                        }}
                        id="species_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          speciesDropdownOptions
                        }
                        dropdownHeader={
                          "SPECIES"
                        }
                      />
                    </FormControl>
                  </GridItem>
                    
                  <GridItem xs={12} sm={6} md={4}>
                    <FormControl style={styles.formControl}>
                      <CustomDropdown
                        buttonText= {breedButtonDisplay}
                        buttonProps={{
                          style:styles.dropdown
                        }}
                        id="breed_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          breedsDropdownOptions
                        }
                        dropdownHeader={
                          "BREED"
                        }
                      /> 
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={6} md={4}>
                    <FormControl style={styles.formControl}>
                      <CustomDropdown
                        buttonText= {locationsButtonDisplay}
                        buttonProps={{
                          style:styles.dropdown
                        }}
                        id="shelter_location_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          locationsDropdownOptions
                        }
                        dropdownHeader={
                          "SHELTER LOCATION"
                        }
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={6} md={3}> 
                    <FormControl style={styles.formControl}>
                      <CustomDropdown 
                        buttonText= {animalStatusButtonDisplay}
                        buttonProps={{
                          style:styles.dropdown
                        }}
                        id="animal_status_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          animalStatusDropdownOptions
                        }
                        dropdownHeader={
                          "ANIMAL STATUS"
                        }
                      /> 
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={6} md={3}> 
                    <FormControl style={styles.formControl}>
                      <CustomDropdown 
                        buttonText= {sizeButtonDisplay}
                        buttonProps={{
                          style:styles.dropdown
                        }}
                        id="size_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          sizeDropdownOptions
                        }
                        dropdownHeader={
                          "SIZE"
                        }
                      /> 
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={6} md={3}> 
                    <FormControl style={styles.formControl}>
                      <CustomDropdown 
                        buttonText= {agesButtonDisplay}
                        buttonProps={{
                          style:styles.dropdown
                        }}

                        
                        id="age_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          agesDropdownOptions
                        }
                        dropdownHeader={
                          "AGE"
                        }
                      /> 
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={6} md={3}> 
                    <FormControl style={styles.formControl}>
                      <CustomDropdown 
                        buttonText= {coatLengthButtonDisplay}
                        buttonProps={{
                          style:styles.dropdown
                        }}
                        id="coat_length_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          coatLengthDropdownOptions
                        }
                        dropdownHeader={
                          "COAT LENGTH"
                        }
                      /> 
                    </FormControl>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={2}>
                    <FormLabel
                      className={
                        classes.labelHorizontal +
                        " " +
                        classes.labelHorizontalRadioCheckbox
                      }
                    >
                      Check all that applies
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={10}>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_house_trained")}
                            checked={this.state.animal.is_house_trained}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="house trained"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                    <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_male")}
                            checked={this.state.animal.is_male}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="male (Do not check if the animal is female)"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_good_with_kids")}
                            checked={this.state.animal.is_good_with_kids}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="Good with kids"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                    <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_good_with_dogs")}
                            checked={this.state.animal.is_good_with_dogs}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="Good with dogs"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                    <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_good_with_cats")}
                            checked={this.state.animal.is_good_with_cats}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="Good with cats"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_vaccinated")}
                            checked={this.state.animal.is_vaccinated}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="Vaccinated"
                      />
                    </div>
                    <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_neutered_spayed")}
                            checked={this.state.animal.is_neutered_spayed}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="neutered/spayed"
                      />
                      <div
                      className={
                        classes.checkboxAndRadio +
                        " " +
                        classes.checkboxAndRadioHorizontal
                      }
                    >
                    </div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle("is_mixed")}
                            checked={this.state.animal.is_mixed_breed}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                          />
                        }
                        classes={{
                          label: classes.label,
                          root: classes.labelRoot
                        }}
                        label="mixed breed"
                      />
                    </div>
                  <Button onClick={this.submitAnimal} color="rose">Submit</Button>  
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    addingAnimal: state.animalReducer.addingAnimal,
    breedsOptions: state.animalReducer.breedsOptions,
    animalStatusOptions: state.animalReducer.animalStatusOptions,
    sizeOptions: state.animalReducer.sizeOptions,
    coatLengthOptions: state.animalReducer.coatLengthOptions,
    subscriptionOptions: state.animalReducer.subscriptionOptions,
    agesOptions: state.animalReducer.agesOptions,
    speciesOptions: state.animalReducer.speciesOptions,
    locationsOptions: state.animalReducer.locationsOptions,
    statesOptions: state.animalReducer.statesOptions
    
  }
};

AddAnimalForm.propTypes = {
  classes: PropTypes.object
};

export default connect(
  mapStateToProps,
  {addAnimal, fetchOptions}
 )(withStyles(regularFormsStyle)(AddAnimalForm));
