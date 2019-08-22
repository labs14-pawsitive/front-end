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
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";


// custom styles
import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";

// photo carousel
import CustomCarousel from "../../components/Carousel/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// icon images
import addressIcon from "assets/img/address.png"
import phoneIcon from "assets/img/phone.png"
import rescueIcon from "assets/img/rescue.png"
import emailIcon from "assets/img/email.png"
import breedIcon from "assets/img/breed-rose.png"
import ageIcon from "assets/img/age-rose.png"
import sizeIcon from "assets/img/size-rose.png"
import coatLengthIcon from "assets/img/coat_length-rose.png"
import genderIcon from "assets/img/gender-rose.png"
import colorIcon from "assets/img/color-rose.png"
import vaccinationIcon from "assets/img/vaccination-rose.png"
import neuterSpayedIcon from "assets/img/neuterSpayed-rose.png"
import houseTrainedIcon from "assets/img/houseTrained-rose.png"
import myStoryIcon from "assets/img/my_story.png"
import myHealthIcon from "assets/img/my_health.png"
import noCatIcon from "assets/img/no_cat-grey.png"
import noDogIcon from "assets/img/no_dog-grey.png"
import noKidIcon from 'assets/img/no_kid-grey.png'
import catFriendlyIcon from "assets/img/cat_friendly-grey.png"
import dogFriendlyIcon from "assets/img/dog_friendly-grey.png"
import kidFriendlyIcon from "assets/img/kid_friendly-grey.png"

class AnimalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animal: {},

    }
  }

  async componentDidMount() {

    // verify if user is logged in
    let userID = () => {
      if (localStorage.getItem('user_id')) {
        return localStorage.getItem('user_id')
      } else { return 0 }
    }



    await axios
      .get(` ${process.env.REACT_APP_BACKEND_URL}/api/animals/public/${this.props.match.params.id}/${userID()} `)
      .then(result => {
        console.log(result)
        this.setState({
          animal: result.data
        })
      })
      .catch(error => {
        console.log(error)
      })

  }

  addNewFollow = e => {

    axios
      .post(` ${process.env.REACT_APP_BACKEND_URL}/api/users/${localStorage.getItem('user_id')}/follows/animal/${this.props.match.params.id}`)
      .then(result => {
        console.log(result)
        this.setState({
          animal: {
            animalFollow: "true",
          }
        })
      })
      .catch(result => {
        console.log(result)
      })
  }

  wrapper = React.createRef();

  render() {

    const { classes, ...rest } = this.props;

    const customStyle = {
      cardFormatStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
      },
      leftSectionStyle: {
        justifyContent: "center",
        display: "flex",
        marginTop: "20px",
      },
      leftRowStyle: {
        marginTop: "30px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      myStoryStyle: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        marginBottom: "40px",
      },
      myHealthStyle: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid grey"
      },
      kidFreeStyle: {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginTop: "40px",
      },
      goodWithDogStyle: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      goodWithCatStyle: {
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "40px",
      },
      caredForByStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "40px",
      },
      adoptionStatusStyle: {
        backgroundColor: "#b5c7b6",
        borderRadius: "3px",
        padding: "12px 30px",
        fontWeight: "bold",
        fontSize: "20px",
        color: "black",
        textAlign: "center",
        position: "relative",
        maxWidth: "340px",
        textTransform: "uppercase",
      },
      buttonStyle: {
        backgroundColor: "#A464A3",
        marginTop: "25px",
        boxShadow: "5px 5px #A364A533",
        fontSize: "1em",
        fontWeight: "700",
        "&:hover": {
          backgroundColor: "#A464A3"
        }
      },
      animalSummaryStyle: {
        maxWidth: "480px",
      },
      cardItemStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: "30px",
        marginBottom: "30px",
      },
      cardItemStyle2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: "30px",
      },



    }

    // on grid container around grid item with carousel
    // className={classes.bodyStyle}

    return (
      <div className={classes.wrapper} ref={this.wrapper}>
        <div className={classes.header}>

          <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

          <GridItem className={classes.floatLeftStyle} xs={12} sm={12} md={6} lg={6} xl={6}>
              <CustomCarousel animalId={this.props.match.params.id} />
            </GridItem>

            <GridItem xs={12} sm={12} md={6} lg={6} xl={6} className={classes.floatRightStyle}>

              <GridItem style={{ marginTop: "100px" }}>
                <GridItem>
                  <InputLabel
                    style={customStyle.adoptionStatusStyle}
                  >
                    {this.state.animal.animal_status}
                  </InputLabel>
                </GridItem>
              </GridItem>

              <GridItem style={{ marginTop: "40px" }} >

                <GridItem>
                  <TextField
                    value={this.state.animal.name}
                    label={"Hello my name is,"}
                    className={classes.animalNameStyle}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "50px",
                        // textShadow: "5px 5px #2b2b2b51"
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        color: "white",
                        fontSize: "30px",
                        fontWeight: "400",
                        letterSpacing: "6px",
                        paddingBottom: "20px",
                      }
                    }}
                  />
                </GridItem>

              </GridItem>

              <GridItem style={{ marginTop: "20px" }} >
                <GridItem>
                  <TextField
                    multiline
                    fullWidth="true"
                    value={`I'm an ${this.state.animal.age} ${this.state.animal.is_male ? "boy" : "girl"} who is on the ${this.state.animal.size} side. I am a ${this.state.animal.breed} who has ${this.state.animal.coat_length} length hair.  I am ${this.state.animal.is_neutered_spayed ? "neutered" : "not neutered"}, ${this.state.animal.is_vaccinated ? "up to date on all shots" : "and in need of shots from the vet"}.  I am ${this.state.animal.is_house_trained ? "house trained" : "in need of training"} and ${this.state.animal.is_good_with_dogs ? "good with other dogs" : "not friendly with other dogs"}.`}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "400",
                        letterSpacing: "6px",
                        lineHeight: "30px",
                      },

                    }}
                    style={customStyle.animalSummaryStyle}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={false} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "120px", marginBottom: "120px" }}></GridItem>

              {/* <GridItem xs={12} sm={12} md={12} lg={12} xl={12}> */}

                <GridContainer style={{ display: "flex", justifyContent: "center", alignItems: "center" }} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <GridItem xs={10} sm={4} md={4} lg={4} xl={4}>
                        
                        <Button
                          fullWidth="true"
                          style={customStyle.buttonStyle}
                          onClick={this.addNewFollow}
                        >
                          {this.state.animal.animalFollow ? "Followed" : "Follow Me"}
                        </Button>
                     
                  </GridItem>

                  <GridItem xs={10} sm={4} md={4} lg={4} xl={4}>
                    <Button
                      fullWidth="true"
                      style={customStyle.buttonStyle}
                    >
                      Adopt Me
                   </Button>
                  </GridItem>

                  <GridItem xs={10} sm={4} md={4} lg={4} xl={4}>
                    <Button
                      fullWidth="true"
                      style={customStyle.buttonStyle}
                    >
                      Donate
                   </Button>
                  </GridItem>
                </GridContainer>

              </GridItem>
            {/* </GridItem> */}

          </GridContainer>


          <GridContainer className={classes.shelterCard}>

            <GridItem xs={12} sm={6} md={6} >
              <GridItem xs={10} sm={10} md={10} lg={10} xl={10} style={customStyle.cardItemStyle}>
                <img className={classes.iconStyle} src={addressIcon}></img>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    multiline
                    fullWidth="true"
                    value={`${this.state.animal.street_address},`}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                  <TextField
                    multiline
                    fullWidth="true"
                    style={{ marginTop: "-60px" }}
                    value={`${this.state.animal.city}, ` + `${this.state.animal.state}, ` + `${this.state.animal.zipcode}`}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </div>
              </GridItem>
            </GridItem>

            <GridItem xs={12} sm={6} md={6} >
              <GridItem xs={10} sm={10} md={10} lg={10} xl={10} style={customStyle.cardItemStyle}>
                <img className={classes.iconStyle} src={emailIcon}></img>

                <div>
                  <TextField
                    multiline
                    fullWidth="true"
                    value={this.state.animal.email}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </div>

              </GridItem>
            </GridItem>

            <GridItem xs={12} sm={6} md={6} >
              <GridItem xs={10} sm={10} md={10} lg={10} xl={10} style={customStyle.cardItemStyle2}>
                <img className={classes.iconStyle} src={phoneIcon}></img>

                <div>
                  <TextField
                    multiline
                    fullWidth="true"
                    value={this.state.animal.phone}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </div>
              </GridItem>
            </GridItem>

            <GridItem xs={12} sm={6} md={6} >
              <GridItem xs={10} sm={10} md={10} lg={10} xl={10} style={customStyle.cardItemStyle2}>
                <img className={classes.iconStyle} src={rescueIcon}></img>

                <div>
                <TextField
                  multiline
                  fullWidth="true"
                  value={this.state.animal.shelter}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                </div>
              </GridItem>
            </GridItem>

          </GridContainer>


          <GridContainer style={{ marginLeft: "auto", marginRight: "auto" }}>

            <GridContainer xs={12} sm={12} md={5} lg={5} xl={5} style={customStyle.leftSectionStyle}>

            <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>

                <GridItem>
                  <img className={classes.iconStyle2} src={breedIcon}></img>
                </GridItem>

                <GridItem>
                  <TextField
                    label="Breed"
                    value={this.state.animal.breed}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle2} src={ageIcon}></img>
                </GridItem>

                <GridItem >
                  <TextField
                    label="Age"
                    value={this.state.animal.age}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle2} src={sizeIcon}></img>
                </GridItem>
                <GridItem >
                  <TextField
                    label="Size"
                    value={this.state.animal.size}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle2} src={coatLengthIcon}></img>
                </GridItem>

                <GridItem >
                  <TextField
                    label="Coat Length"
                    value={this.state.animal.coat_length}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle2} src={genderIcon}></img>
                </GridItem>
                <GridItem >
                  <TextField
                    label="Gender"
                    value={this.state.animal.is_male ? "Male" : "Female"}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle2} src={colorIcon}></img>
                </GridItem>
                <GridItem >
                  <TextField
                    label="Color"
                    value={this.state.animal.color}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle} src={vaccinationIcon}></img>
                </GridItem>
                <GridItem >
                  <TextField
                    label="Vaccination"
                    value={this.state.animal.is_vaccinated ? "Up-to-date on all shots" : "Requires shots"}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle2} src={neuterSpayedIcon}></img>
                </GridItem>
                <GridItem >
                  <TextField
                    label="Spayed / Neutered"
                    value={this.state.animal.is_neutered_spayed ? "Yes" : "No"}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={4} sm={4} md={4} lg={4} xl={4}></GridItem>
              <GridItem style={customStyle.leftRowStyle} xs={10} sm={10} md={8} lg={8} xl={8}>
                <GridItem>
                  <img className={classes.iconStyle2} src={houseTrainedIcon}></img>
                </GridItem>
                <GridItem >
                  <TextField
                    label="House-trained"
                    value={this.state.animal.is_house_trained ? "Yes" : "No"}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

            </GridContainer>

            <GridContainer xs={12} sm={12} md={7} lg={7} xl={7} style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "40px", borderLeft: "2px solid grey" }} >

              <GridItem style={customStyle.myStoryStyle} xs={10} sm={10} md={7} lg={7} xl={7}>
                <GridItem>
                  <img className={classes.iconStyle2} src={myStoryIcon}></img>
                </GridItem>

                <GridItem>
                  <TextField
                    multiline
                    label="My Story"
                    fullWidth="true"
                    value={this.state.animal.description}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={3} sm={3} md={3} lg={3} xl={3}></GridItem>


              <GridItem style={customStyle.myHealthStyle} xs={10} sm={10} md={7} lg={7} xl={7}>
                <GridItem>
                  <img className={classes.iconStyle2} src={myHealthIcon}></img>
                </GridItem>

                <GridItem>
                  <TextField
                    multiline
                    label="My Health"
                    fullWidth="true"
                    value={this.state.animal.health}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "bold",
                      }
                    }}
                    style={customStyle.storySectionStyle}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={3} sm={3} md={3} lg={3} xl={3}></GridItem>


              <GridItem style={customStyle.kidFreeStyle} xs={10} sm={10} md={7} lg={7} xl={7}>
                <GridItem>
                  <img className={classes.iconStyle2} src={ this.state.animal.is_good_with_kids ? noKidIcon : kidFriendlyIcon }></img>
                </GridItem>

                <GridItem>
                  <TextField
                    multiline
                    fullWidth="true"
                    value={this.state.animal.is_good_with_kids ? "I Am Good With Kids" : "I Need A Kid-Free Home"}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={3} sm={3} md={3} lg={3} xl={3}></GridItem>

              <GridItem style={customStyle.goodWithDogStyle} xs={10} sm={10} md={7} lg={7} xl={7}>
                <GridItem>
                  <img className={classes.iconStyle2} src={ this.state.animal_is_good_with_dogs ? noDogIcon : dogFriendlyIcon}></img>
                </GridItem>

                <GridItem>
                  <TextField
                    multiline
                    fullWidth="true"
                    value={this.state.animal.is_good_with_dogs ? "I Get Along With Dogs" : "I Do Not Get Along With Other Dogs"}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={3} sm={3} md={3} lg={3} xl={3}></GridItem>

              <GridItem style={customStyle.goodWithCatStyle} xs={10} sm={10} md={7} lg={7} xl={7}>
                <GridItem>
                  <img className={classes.iconStyle2} src={ this.state.is_good_with_cats ? noCatIcon : catFriendlyIcon }></img>
                </GridItem>

                <GridItem>
                  <TextField
                    multiline
                    fullWidth="true"
                    value={this.state.animal.is_good_with_cats ? "I Get Along With Cats" : "I Need a Cat-Free Home"}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        fontWeight: "bold",
                      }
                    }}
                  />
                </GridItem>
              </GridItem>

              <GridItem xs={3} sm={3} md={3} lg={3} xl={3}></GridItem>

              <GridItem xs={10} sm={10} md={10} lg={10} xl={10}></GridItem>


            </GridContainer>

          </GridContainer>


        </div>
      </div>
    );
  }
}

AnimalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mainPageStyle)(AnimalPage);