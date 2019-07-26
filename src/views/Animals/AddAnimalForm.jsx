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
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
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
        subscriptions_id: null,
        age_id: null,
      },
      checked: [],
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  componentDidMount () {
    this.props.fetchOptions()
    const { shelterId, locationId } = this.props.match.params
    console.log(shelterId)
  }

  //created an empty object and merged with state.animal
  handleChange = e => {
    let selectedAttribute= {}

  //updating the state based on id of the input
    selectedAttribute[e.target.id] = e.target.value

  //set state equal to the old state with the new value of input
    this.setState({
        animal: {
          ...this.state.animal,
          ...selectedAttribute
        }
    })
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
      checked: newChecked
    });
  }

  submitAnimal = e => {
    e.preventDefault();
    const { checked } = this.state
    let animalAttributes = { ...this.state.animal }

    checked.map(option => {
      animalAttributes[option] = true
    })

    this.props.addAnimal(animalAttributes).then(() => {
      this.props.history.push('/admin/allAnimals');
    });
    
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
        age_id: ""
      },
      checked: [],
    })
  }

  render() {
    const { classes } = this.props;
    // Built up collection of options for the dropdown
    // given necessary data to each option (id, value)
    // the name of the attribute is on the dropdown itself
    const breedsDropdownOptions = this.props.breedsOptions.map(option => {
      return <span onChange={this.handleChange} value={option.id}>{option.breed}</span>
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

   
    //Used find to go through all options to find the matching option with the id that is the same as this.state.animal.breed_id. if there is a 
    //match, display the breed.
    const breedButtonDisplay = this.state.animal.breed_id ? this.props.breedsOptions.find(option => option.id == parseInt(this.state.animal.breed_id)).breed : 'Breed'

    const animalStatusButtonDisplay = this.state.animal.animal_status_id ? this.props.animalStatusOptions.find(option => option.id == parseInt(this.state.animal.animal_status_id)).animal_status : 'Animal Status'

    const sizeButtonDisplay = this.state.animal.size_id ? this.props.sizeOptions.find(option => option.id == parseInt(this.state.animal.size_id)).size : 'Size'

    const coatLengthButtonDisplay = this.state.animal.coat_length_id ? this.props.coatLengthOptions.find(option => option.id == parseInt(this.state.animal.coat_length_id)).coat_length : 'Coat length'

    const speciesButtonDisplay = this.state.animal.species_id ? this.props.speciesOptions.find(option => option.id == parseInt(this.state.animal.species_id)).species : 'Species'

    const agesButtonDisplay = this.state.animal.age_id ? this.props.agesOptions.find(option => option.id == parseInt(this.state.animal.age_id)).age : 'Age'

    return (
      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <legend>Add Animal Profile Image</legend>
          <ImageUpload
            addButtonProps={{
              color: "rose",
              round: true
            }}
            changeButtonProps={{
              color: "rose",
              round: true
            }}
            removeButtonProps={{
              color: "danger",
              round: true
            }}
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
              <CustomInput
                  labelText="name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: this.state.animal.name,
                    onChange: (event) => this.handleChange(event),
                  }}
                />
                <CustomInput
                  labelText="color"
                  id="color"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: this.state.animal.color,
                    onChange: (event) => this.handleChange(event)
                  }}
                />
                <CustomInput
                  labelText="health"
                  id="health"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: this.state.animal.health,
                    onChange: (event) => this.handleChange(event)
                  }}
                />
                <CustomInput
                  labelText="description"
                  id="description"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "text",
                    value: this.state.animal.description,
                    onChange: (event) => this.handleChange(event)
                  }}
                />
                
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl>
                      <CustomDropdown 
                        buttonText= {speciesButtonDisplay}
                        id="species_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          speciesDropdownOptions
                        }
                        dropdownHeader={
                          speciesButtonDisplay
                        }
                      />
                    </FormControl>

                    <FormControl>
                      <CustomDropdown 
                        buttonText= {breedButtonDisplay}
                        // buttonText= "breed"
                        id="breed_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          breedsDropdownOptions
                        }
                        dropdownHeader={
                          breedButtonDisplay
                        }
                     
                      /> 
                    </FormControl>

                    <FormControl>
                      <CustomDropdown 
                        buttonText= {animalStatusButtonDisplay}
                        id="animal_status_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          animalStatusDropdownOptions
                        }
                        dropdownHeader={
                          animalStatusButtonDisplay
                        }
                      /> 
                    </FormControl>

                    <FormControl>
                      <CustomDropdown 
                        buttonText= {sizeButtonDisplay}
                        id="size_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          sizeDropdownOptions
                        }
                        dropdownHeader={
                          sizeButtonDisplay
                        }
                      /> 
                    </FormControl>

                    <FormControl>
                      <CustomDropdown 
                        buttonText= {agesButtonDisplay}
                        id="age_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          agesDropdownOptions
                        }
                        dropdownHeader={
                          agesButtonDisplay
                        }
                      /> 
                    </FormControl>

                    <FormControl>
                      <CustomDropdown 
                        buttonText= {coatLengthButtonDisplay}
                        id="coat_length_id"
                        onChange={this.handleChange}
                        externalHandleClick={this.handleChange}
                        dropdownList={
                          coatLengthDropdownOptions
                        }
                        dropdownHeader={
                          coatLengthButtonDisplay
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
                            onClick={() => this.handleToggle("is_mixed_breed")}
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
    speciesOptions: state.animalReducer.speciesOptions
    
  }
};

AddAnimalForm.propTypes = {
  classes: PropTypes.object
};

export default connect(
  mapStateToProps,
  {addAnimal, fetchOptions}
 )(withStyles(regularFormsStyle)(AddAnimalForm));
