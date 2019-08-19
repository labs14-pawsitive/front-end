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
    shelter: {},
  }
}

async componentDidMount() {

    await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/animals/${this.props.match.params.id}`)
    .then( result => {
      console.log(result)
      this.setState({ 
        animal: result.data
      })
      axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/shelters/${this.state.animal.shelter_location_id}`) // ${this.state.animal.shelter_location_id}
            .then( result => {
              console.log(result)
              this.setState({
                shelter: result.data
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

    console.log(this.state)

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

                  <GridContainer style={{ marginTop: "1200px" }}>
                      <GridItem style={{ justify: "center", marginTop: "200px" }}>
                          {/* <CustomCarousel /> */}
                          <h1>LEFT SIDE: CAROUSEL</h1>
                      </GridItem>

                      <GridItem>

                          <GridItem style={{ marginTop: "120px" }}>
                              <GridItem style={{ justify: "center", width: "400px" }} >
                                    <Typography
                                    style={customStyle.adoptionStatusStyle}
                                    >
                                        AVAILABLE FOR ADOPTION
                                    </Typography>
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
                                  value="BOO"
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
                                      value="I'm an adult boy who is on the large side.  I am a mixed breed dog who has short hair.  
                                      I am neutered, up to date with all the shots.  I am house trained and good with other dogs."
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
                        <GridItem style={{ marginLeft: "40px" }}>
                            <GridItem style={customStyle.regularItemStyle}>
                                        <GridItem style={{ marginTop: "5px" }}>
                                          ICON HERE
                                        </GridItem>

                                        <GridItem>
                                        <TextField
                                                multiline
                                                fullWidth="true"
                                                value="321 Main Street,"
                                                InputProps={{
                                                  disableUnderline: true,
                                                }}
                                        />
                                        <TextField
                                                multiline
                                                fullWidth="true"
                                                value="Central Town, NJ 20120"
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
                                                value="(321) 123-4567"
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
                                                    value="saramarescue@gmail.com"
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
                                                    value="Sarama Animal Rescue"
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
                                      value="Mixed Breed Dog"
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
                                      value="Adult"
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
                                      value="Large"
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
                                    value="Medium"
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
                                      value="Male"
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
                                          value="Golden"
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
                                      value="Up-to-date on all shots"
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
                                      value="Yes"
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
                                      value="Yes"
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
                                            value="Boo is an energetic big boy with the heart of gold.  
                                                  He is a hugger who loves nothing but snuggle with you on the couch watching TV."
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
                                            value="Boo just went to the vet and got a clean bill of health!  Super fit and super healthy!"
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
                                            value="I Need A Kid-Free Home"
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
                                            value="I Am Good With Dogs"
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
                                            value="I Need a Cat-Free Home"
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