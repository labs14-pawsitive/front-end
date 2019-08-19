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
import CardBody from "components/Card/CardBody.jsx";
import MainNavBar from "components/Navbars/MainNavBar.jsx";
import Footer from "components/Footer/Footer.jsx";

// custom styles
import mainPageStyle from "assets/jss/material-dashboard-pro-react/views/mainPageStyle.jsx";

// photo carousel
import CustomCarousel from "../../components/Carousel/Carousel";

class AnimalPage extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    animal: {},
    animal_meta: {},
    shelter: {},
    location: {},
  }
}

async componentDidMount() {

    await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/animals/${this.props.match.params.id}`)
    .then( async result => {
      console.log(result)
      this.setState({ 
        animal: result.data,
        animal_meta: result.data.meta
      })
      await axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${this.state.animal.shelter_location_id}`) // ${this.state.animal.shelter_location_id}
            .then( async result => {
              console.log(result)
              this.setState({
                shelter: result.data,
                location: result.data.location[0]
              })
            })
            .catch( error => {
              console.log(error)
            })
    })
    .catch( error => {
      console.log(error)
    })

}

  wrapper = React.createRef();

  render() {

    console.log( this.state.animal_meta )

    const { classes, ...rest } = this.props;

    const customStyle = {
      cardFormatStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
      },
      leftSectionStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
      },
      leftRowStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "30px",
        marginBottom: "30px",
        marginLeft: "40px",
      },
      firstRowStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "40px",
        marginBottom: "40px",
      },
      myHealthStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "60px",
      },
      storySectionStyle: {
        minWidth: "300px",
        marginTop: "0px",
      },
      kidFreeStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginBottom: "40px",
      },
      withDogStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "40px",
        marginBottom: "40px",
      },
      catFreeStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "40px",
      },
      caredForByStyle: {
        justify: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "40px",
      },
      adoptionStatusStyle: {
        fontWeight: "bold",
        fontSize: "20px",
        color: "black",
        backgroundColor: "#b5c7b6",
        borderRadius: "3px",
        padding: "12px 30px",
        textAlign: "center",
      },
      buttonStyle: {
        backgroundColor: "#A364A5",
        width: "180px",
        fontWeight: "bold",
        fontSize: "20px",
      },
      animalSummaryStyle: {
        width: "340px",
      },
      shelterInfoCard: {
        display: "flex",
        flexDirection: "row",
        padding: "30px",
      },
      regularItemStyle: {
        display: "flex",
        flexDirection: "row",
        padding: "10px",
      },
      regularItemStyle2: {
        display: "flex",
        flexDirection: "row",
        marginTop: "30px",
      },
      regularItemStyle3: {
        display: "flex",
        flexDirection: "row",
        marginTop: "60px",
      },
      textFieldStyle: {
        minWidth: "300px",
      },
    }
    
    return (
      <div>

                  <GridContainer style={{ marginTop: "1200px" }} xs={12} sm={12} md={12} lg={12} xl={12}>
                      <GridItem style={{ justify: "center", marginTop: "200px" }} xs={6} sm={6} md={6} lg={6} xl={6}>
                          {/* <CustomCarousel /> */}
                          <h1>LEFT SIDE: CAROUSEL</h1>
                      </GridItem>

                      <GridItem xs={6} sm={6} md={6} lg={6} xl={6}>

                          <GridItem style={{ marginTop: "120px" }}>
                              <GridItem style={{ justify: "center", width: "400px" }} >
                                    <Button
                                    style={customStyle.adoptionStatusStyle}
                                    >
                                        {this.state.animal.animal_status}
                                    </Button>
                               </GridItem>
                          </GridItem>

                          <GridItem style={{ marginTop: "40px" }} >
                              <GridItem>
                                  <TextField 
                                    fullWidth="true"
                                    value="Hello, my name is"
                                    InputProps={{
                                      disableUnderline: true,
                                      style: {
                                        color: "white",
                                        fontSize: "20px",
                                      },
                                    }}
                                  />
                              </GridItem>

                              <GridItem>
                                  <TextField 
                                  fullWidth="true"
                                  value={this.state.animal.name}
                                  InputProps={{
                                    disableUnderline: true,
                                    style: {
                                      color: "white",
                                      fontSize: "40px",
                                      fontWeight: "bold",
                                    },
                                  }}
                                  />
                              </GridItem>
                          </GridItem>

                          <GridItem style={{ marginTop: "40px" }} >
                                <GridItem>
                                      <TextField
                                          multiline
                                          fullWidth="true"
                                          value= { `I'm an ${this.state.animal_meta.age} ${this.state.animal_meta.is_male ? "boy" : "girl" } who is on the ${this.state.animal_meta.size} side. I am a ${this.state.animal_meta.breed} who has ${this.state.animal_meta.coat_length} length hair.  I am ${this.state.animal_meta.is_neutered_spayed ? "neutered" : "not neutered" }, ${this.state.animal_meta.is_vaccinated ? "up to date on all shots" : "and in need of shots from the vet"}.  I am ${this.state.animal_meta.is_house_trained ? "house trained" : "in need of training"} and ${this.state.animal_meta.is_good_with_dogs ? "good with other dogs" : "not friendly with other dogs"}.` }
                                          InputProps={{
                                            disableUnderline: true,
                                            style: {
                                              color: "white",
                                              fontSize: "20px",
                                              lineHeight: "30px",
                                            },
                                      }}
                                      style={customStyle.animalSummaryStyle}
                                      />
                                </GridItem>
                          </GridItem>

                          <GridItem style={{ display: "flex", flexDirection: "row", marginTop: "80px" }} >
                              <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                  <Button style={customStyle.buttonStyle}>
                                      Follow Me
                                  </Button>
                              </GridItem>

                              <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                  <Button style={customStyle.buttonStyle}>
                                      Adopt Me
                                  </Button>
                              </GridItem>

                              <GridItem xs={4} sm={4} md={4} lg={4} xl={4} >
                                  <Button style={customStyle.buttonStyle}>
                                      Donate
                                  </Button>
                              </GridItem>
                          </GridItem>

                      </GridItem>
                  </GridContainer>


                  <GridContainer style={{ marginTop: "40px" }}>
                  <Card style={customStyle.shelterInfoCard}>
                        <GridItem style={{ marginLeft: "100px" }}>
                            <GridItem style={customStyle.regularItemStyle}>
                                        <GridItem style={{ marginTop: "5px" }}>
                                          ICON HERE
                                        </GridItem>

                                        <GridItem>
                                            <TextField
                                                    multiline
                                                    fullWidth="true"
                                                    value={ `${this.state.location.street_address},` }
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                            />
                                            <TextField
                                                    multiline
                                                    fullWidth="true"
                                                    value={ `${this.state.location.city}, ` + `${this.state.location.state}, ` + `${this.state.location.zipcode}`}
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                            />
                                        </GridItem>
                            </GridItem>

                            <GridItem style={customStyle.regularItemStyle2}>
                                        <GridItem style={{ marginTop: "5px" }}>
                                          ICON HERE
                                        </GridItem>

                                        <GridItem>
                                            <TextField
                                                    multiline
                                                    fullWidth="true"
                                                    value={this.state.shelter.phone}
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                            />
                                        </GridItem>
                            </GridItem>
                        </GridItem>


                        <GridItem>
                             <GridItem style={customStyle.regularItemStyle}>
                                            <GridItem style={{ marginTop: "5px" }}>
                                              ICON HERE
                                            </GridItem>

                                            <GridItem>
                                            <TextField
                                                    multiline
                                                    fullWidth="true"
                                                    value={this.state.shelter.email}
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                                    style={customStyle.textFieldStyle}
                                            />
                                            </GridItem>
                                </GridItem>

                                <GridItem style={customStyle.regularItemStyle3}>
                                            <GridItem style={{ marginTop: "5px" }}>
                                              ICON HERE
                                            </GridItem>

                                            <GridItem>
                                            <TextField
                                                    multiline
                                                    fullWidth="true"
                                                    value={this.state.shelter.shelter}
                                                    InputProps={{
                                                      disableUnderline: true,
                                                    }}
                                            />
                                            </GridItem>
                                </GridItem>
                        </GridItem>
                  </Card>
                  </GridContainer>



                  <GridContainer style={{ width: "1000px", height: "1000px", marginLeft: "100px" }}>
                
                      <GridContainer xs={5} sm={5} md={5} lg={5} xl={5} style={customStyle.leftSectionStyle} >
                              <GridItem style={customStyle.leftRowStyle}>
                                    <GridItem>
                                      <Typography style={{ color: "grey" }}>
                                        ICON HERE   
                                      </Typography>
                                    </GridItem>

                                   <GridItem>
                                      <TextField
                                        label="Breed"
                                        value={this.state.animal_meta.breed}
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

                              <GridItem style={customStyle.leftRowStyle}>
                                  <GridItem>
                                  <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                  </GridItem>

                                  <GridItem >
                                    <TextField
                                      label="Age"
                                      value={this.state.animal_meta.age}
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

                              <GridItem style={customStyle.leftRowStyle}>
                                  <GridItem>
                                  <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                      </GridItem>
                                  <GridItem >
                                    <TextField
                                      label="Size"
                                      value={this.state.animal_meta.size}
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


                              <GridItem style={customStyle.leftRowStyle}>
                                  <GridItem>
                                  <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                  </GridItem>
                                
                                  <GridItem >
                                  <TextField
                                    label="Coat Length"
                                    value={this.state.animal_meta.coat_length}
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

                              <GridItem style={customStyle.leftRowStyle}>
                                  <GridItem>
                                  <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                  </GridItem>
                                  <GridItem >
                                    <TextField
                                      label="Gender"
                                      value={ this.state.animal.is_male ? "Male" : "Female" }
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

                              <GridItem style={customStyle.leftRowStyle}>
                                      <GridItem>
                                      <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                      </GridItem>
                                      <GridItem >
                                        <TextField
                                          label="Color"
                                          value={this.state.animal_meta.color}
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

                              <GridItem style={customStyle.leftRowStyle}>
                                  <GridItem>
                                  <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                  </GridItem>
                                  <GridItem > 
                                    <TextField
                                      label="Vaccination"
                                      value={ this.state.animal.is_vaccinated ? "Up-to-date on all shots" : "Requires shots" }
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

                              <GridItem style={customStyle.leftRowStyle}>
                                  <GridItem>
                                  <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                  </GridItem>
                                  <GridItem > 
                                    <TextField
                                      label="Spayed / Neutered"
                                      value={ this.state.animal.is_neutered_spayed ? "Yes" : "No" }
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

                              <GridItem style={customStyle.leftRowStyle}>
                                  <GridItem>
                                  <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                  </GridItem>
                                  <GridItem > 
                                    <TextField
                                      label="House-trained"
                                      value={ this.state.animal.is_house_trained ? "Yes" : "No" }
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

                          <GridContainer xs={7} sm={7} md={7} lg={7} xl={7} style={{ marginTop: "15px", marginBottom: "40px", borderLeft: "1px solid lightgrey" }} >

                              <GridItem style={{ marginLeft: "80px", borderBottom: "1px solid lightgrey" }}>
                                  <GridItem style={customStyle.firstRowStyle} >
                                      <GridItem>
                                      <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                      </GridItem>

                                      <GridItem>
                                        <TextField
                                            multiline
                                            label="My Story"
                                            fullWidth="true"
                                            value={this.state.animal_meta.description}
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

                                <GridItem style={customStyle.myHealthStyle} >
                                      <GridItem>
                                      <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                      </GridItem>

                                      <GridItem>
                                        <TextField
                                            multiline
                                            label="My Health"
                                            fullWidth="true"
                                            value={this.state.animal_meta.health}
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
                            </GridItem>

                            <GridItem style={{ marginLeft: "80px", marginTop: "40px", marginBottom: "200px" }}>

                                <GridItem style={customStyle.kidFreeStyle} >
                                      <GridItem style={{ marginTop: "5px" }} >
                                      <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                      </GridItem>

                                      <GridItem>
                                        <TextField
                                            multiline
                                            fullWidth="true"
                                            value={ this.state.animal_meta.is_good_with_kids ? "I Am Good With Kids" : "I Need A Kid-Free Home" } 
                                            InputProps={{
                                              disableUnderline: true,
                                              style: {
                                                fontWeight: "bold",
                                              }
                                            }} 
                                            style={customStyle.storySectionStyle} 
                                        />
                                    </GridItem>
                                </GridItem>

                                <GridItem style={customStyle.withDogStyle} >
                                      <GridItem style={{ marginTop: "5px" }} >
                                      <Typography style={{ color: "grey" }}>
                                        ICON HERE
                                      </Typography>
                                      </GridItem>

                                      <GridItem>
                                        <TextField
                                            multiline
                                            fullWidth="true"
                                            value={ this.state.animal_meta.is_good_with_dogs? "I Get Along With Dogs" : "I Do Not Get Along With Other Dogs" }
                                            InputProps={{
                                              disableUnderline: true,
                                              style: {
                                                fontWeight: "bold",
                                              }
                                            }}
                                            style={customStyle.storySectionStyle} 
                                        />
                                    </GridItem>
                                </GridItem>

                                <GridItem style={customStyle.catFreeStyle} >
                                      <GridItem style={{ marginTop: "5px" }} >
                                      <Typography style={{ color: "grey" }}>
                                        ICON
                                        HERE
                                      </Typography>
                                      </GridItem>

                                      <GridItem>
                                        <TextField
                                            multiline
                                            fullWidth="true"
                                            value={ this.state.animal_meta.is_good_with_cats ? "I Get Along With Cats" : "I Need a Cat-Free Home" }
                                            InputProps={{
                                              disableUnderline: true,
                                              style: {
                                                fontWeight: "bold",
                                              }
                                            }}
                                            style={customStyle.storySectionStyle} 
                                        />
                                    </GridItem>
                                </GridItem>
                            </GridItem>

                            <GridItem style={{ marginLeft: "80px", marginTop: "40px" }}>


                              
                          </GridItem>

                          </GridContainer>
            
                  </GridContainer>

             

 </div>
  );
  }
}

AnimalPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(mainPageStyle)(AnimalPage);

                              {/* <GridItem style={customStyle.caredForByStyle} >
                                    <GridItem>
                                      ICON HERE
                                    </GridItem>

                                    <GridItem>
                                    <TextField
                                            multiline
                                            label="I Am Cared For By"
                                            fullWidth="true"
                                            value="Sarama Animal Rescue"
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

                                        <TextField 
                                          fullWidth="true"
                                          value="321 Main Street, Central Town, NJ, 12345"
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

                                        <TextField 
                                          fullWidth="true"
                                          value="917-123-4567"
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

                                        <TextField 
                                          fullWidth="true"
                                          value="saramarescue@gmail.org"
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
                                </GridItem> */}