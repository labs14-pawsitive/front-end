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
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import Hidden from '@material-ui/core/Hidden';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

// custom styles
import animalPageStyle from "assets/jss/material-dashboard-pro-react/views/animalPageStyle.jsx";

// photo carousel
import CustomCarousel from "../../components/Carousel/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// icon images
import addressIcon from "assets/img/address.png"
import phoneIcon from "assets/img/phone.png"
import rescueIcon from "assets/img/rescue.png"
import emailIcon from "assets/img/email.png"
import breedIcon from "assets/img/breed.png"
import ageIcon from "assets/img/age.png"
import sizeIcon from "assets/img/size.png"
import coatLengthIcon from "assets/img/coat_length.png"
import genderIcon from "assets/img/gender.png"
import colorIcon from "assets/img/color.png"
import vaccinationIcon from "assets/img/vaccination.png"
import neuterSpayedIcon from "assets/img/neuterSpayed.png"
import houseTrainedIcon from "assets/img/houseTrained.png"
import myStoryIcon from "assets/img/my_story.png"
import myHealthIcon from "assets/img/my_health.png"
import noCatIcon from "assets/img/no_cat-grey.png"
import noDogIcon from "assets/img/no_dog-grey.png"
import noKidIcon from 'assets/img/no_kid-grey.png'
import catFriendlyIcon from "assets/img/cat_friendly-grey.png"
import dogFriendlyIcon from "assets/img/dog_friendly-grey.png"
import kidFriendlyIcon from "assets/img/kid_friendly-grey.png"

// modals
import Auth from "components/Auth/Auth.js"
import SweetAlert from "react-bootstrap-sweetalert";
import Application from "components/Application/Application.jsx"

// stripe donation
import StripeDonation from "components/Stripe/StripeDonationAnimalPage.jsx";

const auth = new Auth()

class AnimalPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animal: {},
      shelter: {},
      alert: null,
      isAdult: '',
      animalFollow: false,
      hasStripe: false,
    }
  };

  async componentDidMount() {

    window.scrollTo(0, 0);
    localStorage.removeItem("animalId");


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
          animal: result.data,
          animalFollow: result.data.animalFollow,
          hasStripe: result.data.hasStripe
        })
      })
      .catch(error => {
        console.log(error)
      })

      this.isAdult();
  };

  isAdult = () => {

    if ( this.state.animal.age === `Adult` ) {
      this.setState({
        isAdult: true,
      })
    } 
    else {
      this.setState({
        isAdult: false,
      })
    }

  };

  setAlert = (str) => {
    if (!localStorage.getItem('token') && !localStorage.getItem('user_id')) {
      this.warningAlert(str);
    } else {
      this.hideAlert();
    }
  };

  warningAlert = (str) => {
    this.setState({
      alert: (
        <SweetAlert
          warning
          showCancel
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          style={{ display: "block", marginTop: "-100px", color: "#777", fontFamily: "Roboto", padding: "50px", lineHeight: "1.2" }}
          title=""
          onConfirm={() => this.routeToAuth()}
          onCancel={this.hideAlert}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          confirmBtnText="Signup / Login"
        >
          <h2 style={{ fontWeight: '500' }}>OOH MY PAWS</h2>
          <h4 style={{ color: "#333333" }}>{`You need to login/sign up in order to ${str}`}</h4>
        </SweetAlert>
      )
    });
  }

  setAlertFollows = (str) => {
    if (!localStorage.getItem('token') && !localStorage.getItem('user_id')) {
      this.warningAlertFollows(str);
    } else {
      this.hideAlert();
    }
  };

  warningAlertFollows = (str) => {
    this.setState({
      alert: (
        <SweetAlert
            warning
            showCancel
            cancelBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            style={{ display: "block", marginTop: "-100px", color: "#777", fontFamily: "Roboto", padding: "50px", lineHeight: "1.2" }}
            title=""
            onConfirm={() => this.routeToAuth()}
            onCancel={this.hideAlert}
            confirmBtnCssClass={
              this.props.classes.button + " " + this.props.classes.success
            }
            confirmBtnText="Signup / Login"
            >
              <h2 style={{ fontWeight: "500" }}> OOH MY PAWS </h2>
              <h4 style={{ color: "#333333" }}> {`You need to login/sign up in order to ${str}`} </h4>
        </SweetAlert>
      )
    })
  }

  routeToAuth = () => {
    localStorage.setItem("animalId", this.state.animal.id)
    auth.login();
  };

  hideAlert = () => {
    this.setState({
      alert: null
    })
  };

  addNewFollow = async e => {
      e.preventDefault();

      await axios
      .post(` ${process.env.REACT_APP_BACKEND_URL}/api/users/${localStorage.getItem('user_id')}/follows/animal/${this.props.match.params.id}`)
      .then(result => {
        console.log(result)
        this.setState({
            animalFollow: true,
        })
        console.log(this.state.animal.animalFollow)
      })
      .catch(result => {
        console.log(result)
      })

  };

  unfollowAnimal = async e => {

    await axios
      .delete(` ${process.env.REACT_APP_BACKEND_URL}/api/users/${localStorage.getItem('user_id')}/follows/animal/${this.props.match.params.id}`)
      .then( result => {
        console.log(result)
        this.setState({
            animalFollow: false,
        })
        console.log(this.state.animal.animalFollow)
      })
      .catch( result => {
        console.log(result)
      })
  };

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
        marginBottom: "30px",
      },
      leftRowStyle: {
        marginTop: "30px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      leftRowStyle2: {
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      },
      myStoryStyle: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        marginBottom: "50px",
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
        marginTop: "30px",
        marginBottom: "30px",
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
        backgroundColor: "#ADBCA5",
        borderRadius: "3px",
        padding: "12px 30px",
        fontWeight: "bold",
        fontSize: "20px",
        fontStretch: "extra-expanded",
        //color: "black",
        color: "#666666",
        textAlign: "center",
        position: "relative",
        //maxWidth: "340px",
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
        },
      },
      addressItemStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        minWidth: "140px",
        margin: "10px 0",

      },
      emailItemStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        minWidth: "140px",
        margin: "10px 0",

      },
      phoneItemStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        margin: "10px 0",
        minWidth: "140px",
      },
      rescueItemStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        margin: "10px 0",
        minWidth: "140px",
      },

    };

    return (
      <div className={classes.wrapper} ref={this.wrapper}>
        <div className={classes.header} style={{background:'none', display: "flex", flexDirection: "column", alignItems: "center"}}>

          <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} style={{ maxWidth: "1200px",display: "flex", justifyContent: "center", alignItems: "center", margin: "0px"}}>
            <GridContainer xs={11} style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "0px"}}>
              <GridItem xs={12} sm={12} md={5} lg={5} xl={5} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
                <CustomCarousel animalId={this.props.match.params.id} />
              </GridItem>

            <GridItem xs={12} sm={12} md={7} lg={7} xl={7} style={{ marginBottom: "70px", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection: "column" }}>
                <GridItem xs={10} style={{width:"100%"}}>
          
                        <InputLabel
                          style={customStyle.adoptionStatusStyle}
                        >
                          {this.state.animal.animal_status}
                        </InputLabel>
                  
                </GridItem>

                <GridItem style={{ marginTop: "40px", width:"100%" }} xs={10}>
                  
                        <div>
                            <p style={{ lineHeight: "1", color: "white", fontSize: "30px", fontWeight: "400", letterSpacing: "6px", paddingBottom: "20px", }} >
                                Hello, my name is
                            </p>

                            <p className={classes.animalNameStyle} >
    
                              {this.state.animal.name}
                           </p>
                        </div>
                    
                </GridItem>

                <GridItem style={{ marginTop: "40px", width:"100%" }} xs={10}>        
                        
                          <div style={{ color: "white", fontSize: "24px", fontWeight: "400", letterSpacing: "6px", lineHeight: "30px" }} >
                          I'm { this.state.isAdult ? "an" : "a" } <span style={{ textTransform: "lowercase" }}>{this.state.animal.age}</span> {this.state.animal.is_male ? "boy" : "girl"} who is on the <span style={{ textTransform: "lowercase" }}> {this.state.animal.size} </span> side. I am a {this.state.animal.breed} who has <span style={{ textTransform: "lowercase" }}>{this.state.animal.coat_length}</span> length hair.  I am {this.state.animal.is_neutered_spayed ? "neutered" : "not neutered"}, {this.state.animal.is_neutered_spayed ? "" : "but"} {this.state.animal.is_vaccinated ? "up to date on all shots" : "and in need of shots from the vet"}.  I am {this.state.animal.is_house_trained ? "house trained" : "in need of training"} and {this.state.animal.is_good_with_dogs ? "good with other dogs" : "not friendly with other dogs"}.
                          </div>       
                                    
               </GridItem>

              


                
              <GridItem style={{ display: "flex", justifyContent: "center", alignItems: "center", width:"100%", marginTop: "30px"}} xs={10} sm={10} md={10} lg={10}>
                    <GridContainer style={{ display: "flex", justifyContent:"flex-left", alignItems: "center" }}>
                          {this.state.alert}

                          {/* FOLLOW ME BUTTON */}
                          <GridItem xs={12} sm={4} md={4} style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                             {/* *<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width:"100%" }}>*/}
                                { localStorage.getItem("user_id") && localStorage.getItem('token') 
                                ?
                                <Button
                                  className={classes.hungButtonStyle}
                                  onClick={ this.state.animalFollow ? this.unfollowAnimal : this.addNewFollow }
                                >
                                  {this.state.animalFollow ? "Unfollow" : "Follow Me"}
                                </Button>
                                :
                                <div style={{ display: "flex !important", justifyContent: "center !important" , minWidth:"100%", width:"100%"}}>
                                <Button className={classes.hungButtonStyle} onClick={() => this.setAlert("follow this animal")}>
                                  {"Follow Me"}
                                </Button>
                                </div>
                                }
                             {/* </div>*/}
                          </GridItem>

                          {/* ADOPT ME BUTTON */}
                          {/* <GridItem xs={12} sm={3} md={3} style={{ margin: "0px 40px" }}> */}
                          <GridItem xs={12} sm={4} md={4}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                              {localStorage.getItem("user_id") && localStorage.getItem('token') ?

                                <Application animalId={this.state.animal.id} shelterId={this.state.animal.shelter_id} />
                                :
                                <div style={{ display: "flex !important", justifyContent: "center !important", alignItems: "center !important" , width:"100%"}}>
                                  <Button className={classes.hungButtonStyle} onClick={() => this.setAlert("continue with application process")}>Adopt Me</Button>
                                </div>
                              }
                            </div>
                          </GridItem>

                          {/* DONATE BUTTON */}

                          {this.state.hasStripe === true ? 
                            <GridItem xs={12} sm={4} md={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" , width:"100%"}}>
                              <StripeDonation id={this.state.animal.shelter_id}/>
                            </GridItem>
                            :
                            null
                          }
                         


                    </GridContainer>
              </GridItem>
            </GridItem>
          </GridContainer>
          </GridContainer>

{/*
          <Hidden smDown>
            <GridItem md={12} lg={12} xl={12} style={{ marginBottom: "0px" }}></GridItem>
          </Hidden>
 */}

          {/* SHELTER INFO CARD */}
                    <Link to={`/shelter/${this.state.animal.shelter_id}`} style={{zIndex:"5"}}>

          {/* <div className={classes.shelterCard}> */}
              <GridContainer className={classes.shelterCard} style={{maxWidth: "1200px", justifyContent: "space-around"}}>
                
                <GridItem xs={11} sm={8} md={5} lg={5} xl={5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <GridItem xs={12}  style={customStyle.addressItemStyle} >
                    <div style={{width:"40px", height:"40px", marginRight:"20px", backgroundImage:"url(" + addressIcon + ")", backgroundSize:"100% auto", backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" , width:"100%"}}>
                      <TextField
                        multiline
                        fullWidth="true"
                        className={classes.addressStyle}
                        value={`${this.state.animal.street_address}, ` + `${this.state.animal.city}, ` + `${this.state.animal.state}, ` + `${this.state.animal.zipcode}`}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                     
                    </div>
                  </GridItem>
                </GridItem>

                <GridItem xs={11} sm={8} md={5} lg={5} xl={5} style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <GridItem xs={12} style={customStyle.emailItemStyle}>
                   <div style={{width:"40px", height:"40px", marginRight:"20px", backgroundImage:"url(" + emailIcon + ")", backgroundSize:"100% auto", backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}>
                    </div>

                    <div style={{ fontSize: "16px", minWidth: "140px" , width: "100%"}}>

                      <TextField
                        multiline
                        fullWidth="true"
                        style={{ minWidth: "140px" }}
                        value={this.state.animal.email}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </div>

                  </GridItem>
                </GridItem>

                {/* <Hidden smDown>
                <GridItem sm={1} md={1} lg={1} xl={1}></GridItem>
                </Hidden> */}

                <GridItem xs={11} sm={8} md={5} lg={5} xl={5} style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <GridItem xs={12} style={customStyle.phoneItemStyle}>
                     <div style={{width:"40px", height:"40px", marginRight:"20px", backgroundImage:"url(" + phoneIcon + ")", backgroundSize:"100% auto", backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}>
                    </div>

                    <div style={{ fontSize: "16px", minWidth: "140px" , width: "100%"}}>
                      <TextField
                        multiline
                        fullWidth="true"
                        style={{ minWidth: "140px" }}
                        value={this.state.animal.phone}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </div>
                  </GridItem>
                </GridItem>

                <GridItem xs={11} sm={8} md={5} lg={5} xl={5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <GridItem xs={12} style={customStyle.rescueItemStyle}>
                  <div style={{width:"40px", height:"40px", marginRight:"20px", backgroundImage:"url(" + rescueIcon + ")", backgroundSize:"100% auto", backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}>
                    </div>

                    <div style={{ fontSize: "16px", minWidth: "140px" , width: "100%"}}>
                      {/* {this.state.animal.shelter} */}

                      <TextField
                        multiline
                        fullWidth="true"
                        style={{ minWidth: "140px" }}
                        value={this.state.animal.shelter}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                    </div>
                  </GridItem>
                </GridItem>
          </GridContainer>                
          </Link>

          {/* </div> */}
        

        <GridContainer style={{width: "100%", backgroundColor:"lightgrey", paddingTop:"100px", marginTop:"-100px"}}>
          <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} style={{ display:"flex", justifyContent:"center", marginRight: "auto", marginLeft: "auto", maxWidth:"1200px"}}>

            {/* LEFT SECTION OF ICON/INFO DISPLAY */}
            <GridContainer xs={12} sm={12} md={5} lg={5} xl={5} style={customStyle.leftSectionStyle}>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8} >

                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={breedIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Breed"
                        value={this.state.animal.breed}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={ageIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Age"
                        value={this.state.animal.age}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={sizeIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Size"
                        value={this.state.animal.size}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={coatLengthIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Coat Length"
                        value={this.state.animal.coat_length}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={genderIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Gender"
                        value={this.state.animal.is_male ? "Male" : "Female"}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={colorIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Color"
                        value={this.state.animal.color}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle} src={vaccinationIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Vaccination"
                        multiline
                        value={this.state.animal.is_vaccinated ? "Up-to-date on all shots" : "Requires shots"}
                        InputProps={{
                          disableUnderline: true,
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={neuterSpayedIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="Spayed / Neutered"
                        value={this.state.animal.is_neutered_spayed ? "Yes" : "No"}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                            minWidth: "200px",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.leftRowStyle2} xs={9} sm={7} md={8} lg={8} xl={8}>
                    <GridItem xs={2} sm={2} md={2} style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={houseTrainedIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        label="House-trained"
                        value={this.state.animal.is_house_trained ? "Yes" : "No"}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

            </GridContainer>

             {/* RIGHT SECTION OF ICON/INFO DISPLAY */}
            <GridContainer xs={12} sm={12} md={7} lg={7} xl={7} style={{ display: "flex", justifyContent: "center", marginTop: "40px", marginBottom: "40px", borderLeft: "2px solid grey" }} >

              <GridItem style={customStyle.myStoryStyle}  xs={9} sm={7} md={9} lg={9} xl={9}>
                    <GridItem xs={2} sm={2} md={2}  style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={myStoryIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        multiline
                        label="My Story"
                        fullWidth="true"
                        value={this.state.animal.description}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              <GridItem style={customStyle.myHealthStyle}  xs={9} sm={7} md={9} lg={9} xl={9}>
                    <GridItem xs={2} sm={2} md={2}  style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={myHealthIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10} style={{ marginBottom: "20px" }}>
                      <TextField
                        multiline
                        label="My Health"
                        fullWidth="true"                 
                        value={this.state.animal.health}
                        style={{ marginBottom: "30px" }}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: "18px",
                          }
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: "24px",
                            fontWeight: "bold",
                          }
                        }}
                        
                      />
                    </GridItem>
              </GridItem>


              <GridItem style={customStyle.kidFreeStyle}  xs={9} sm={7} md={9} lg={9} xl={9}>
                    <GridItem xs={2} sm={2} md={2}  style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={this.state.animal.is_good_with_kids ? kidFriendlyIcon : noKidIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        multiline
                        fullWidth="true"          
                        value={this.state.animal.is_good_with_kids ? "I Am Good With Kids" : "I Need A Kid-Free Home"}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontWeight: "bold",
                            fontSize: "20px",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>


              <GridItem style={customStyle.goodWithDogStyle}  xs={9} sm={7} md={9} lg={9} xl={9}>
                    <GridItem xs={2} sm={2} md={2}  style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={this.state.animal.is_good_with_dogs ? dogFriendlyIcon : noDogIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        multiline
                        fullWidth="true"            
                        value={this.state.animal.is_good_with_dogs ? "I Am Good With Dogs" : "I Need A Dog-Free Home"}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontWeight: "bold",
                            fontSize: "20px",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>


              <GridItem style={customStyle.goodWithCatStyle}  xs={9} sm={7} md={9} lg={9} xl={9}>
                    <GridItem xs={2} sm={2} md={2}  style={{marginRight:"20px"}}>
                      <img className={classes.iconStyle2} src={this.state.animal.is_good_with_cats ? catFriendlyIcon : noCatIcon}></img>
                    </GridItem>

                    <GridItem xs={10} sm={10} md={10}>
                      <TextField
                        multiline
                        fullWidth="true"        
                        value={this.state.animal.is_good_with_cats ? "I Am Good With Cats" : "I Need a Cat-Free Home"}
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontWeight: "bold",
                            fontSize: "20px",
                          }
                        }}
                      />
                    </GridItem>
              </GridItem>

              
              <Hidden smDown>
              <GridItem md={10} lg={10} xl={10} style={{ marginTop: "360px" }}></GridItem>
              </Hidden>

            </GridContainer>

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

export default withStyles(animalPageStyle)(AnimalPage);
