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

// @material-ui/icons
import Today from "@material-ui/icons/Today";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import AvTimer from "@material-ui/icons/AvTimer";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
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
      animal_notes: []
    };
  }

  componentDidMount() {

    axios.
      get(`http://localhost:8000/api/animals/${this.props.match.params.id}`)
      // get(`https://staging1-pawsnfind.herokuapp.com/${this.props.match.params.id}`)
      .then(animal => {

        console.log('animal', animal.data)
        if (animal.data.shelter !== this.props.shelter) {
          this.props.history.push('/admin/dashboard')
        } else {
          this.setState({
            animal: animal.data,
            animal_meta: animal.data.meta,
            animal_notes: animal.data.notes,
            animal_followers: animal.data.followers
          })
          console.log(this.state.animal)
          console.log(this.state.animal_meta)
          // console.log(this.state.animal.notes[0].notes)
        }

      })
      .catch(error => {
        console.log(error)
      })



  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleTags = regularTags => {
    this.setState({ tags: regularTags });
  };


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
      animalButtonStyle:{
        display:'flex',
        justifyContent:'flex-end',
        paddingRight:'12%'
      },
      runningNoteButtonStyle:{
        display:'flex',
        justifyContent:'flex-end',
        // paddingRight:'12%'
      },
      imgTitle: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        opacity: 0.8,
        fontSize: "26px",
        fontWeight: "bold"
      },
      noteStyle: {
        // marginRight: "10%",
        color:"lightgray",
        display:'flex',
        flexWrap: 'wrap',
        // border: "1px solid lightgray",
        // justifyContent:'space-between',
      },
      typographyStyle:{
        marginRight: "7%",
      }

    }

    let gender = ''

    if (this.state.animal_meta.sex) {
      gender = 'male'
    }
    else if (!this.state.animal_meta.sex) {
      gender = 'female'
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
                      <img src={this.state.animal.img_url} alt={`${this.state.animal_meta.breed} for adoption`}
                        style={customStyle.imgStyle} />
                      <GridListTileBar style={customStyle.imgTitle}
                        title={this.state.animal.name}
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
                    <h1>{this.state.animal.name}</h1>
                    <legend>{this.state.animal_meta.description}</legend>

                    <Button variant="contained"
                      color="secondary" disabled
                      className={classes.button}
                      style={customStyle.buttonStyle}>
                      {this.state.animal.species}
                    </Button>

                    <Button variant="contained"
                      color="secondary" disabled
                      className={classes.button}
                      style={customStyle.buttonStyle}>
                      {this.state.animal.animal_status}
                    </Button>
                    <div style={customStyle.animalButtonStyle}>
                            <Button size="small" disabled className={classes.button}>
                              CANCEL
                            </Button>
                            <Button size="small" className={classes.button}>
                              SAVE
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

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Breed"
                        value={this.state.animal_meta.breed}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Age"
                        value={this.state.animal_meta.age}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Size"
                        value={this.state.animal_meta.size}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Color"
                        value={this.state.animal_meta.color}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Coat Length"
                        value={this.state.animal_meta.coat_length}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField style={customStyle.textFieldStyle}
                        id="standard-read-only-input"
                        label="Gender"
                        value={gender}
                        className={classes.textField}
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>

                <GridItem xs={12} sm={12} md={12} style={customStyle.gridStyle}>
                  <div style={customStyle.titleStyle}>
                    <legend>Health and Personality</legend>

                    <GridContainer style={customStyle.detailsContainerStyle}>
                      <GridItem xs={12} sm={12} md={10}>
                        <TextField style={customStyle.oneTextFieldStyle}
                          id="standard-read-only-input"
                          label="Health"
                          value={this.state.animal_meta.health}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField style={customStyle.textFieldStyle}
                          id="standard-read-only-input"
                          label="Vaccinated?"
                          value={this.state.animal_meta.is_vaccinated}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField style={customStyle.textFieldStyle}
                          id="standard-read-only-input"
                          label="House trained?"
                          value={this.state.animal_meta.is_house_trained}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField style={customStyle.textFieldStyle}
                          id="standard-read-only-input"
                          label="Good with Kids?"
                          value={this.state.animal_meta.is_good_with_kids}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField style={customStyle.textFieldStyle}
                          id="standard-read-only-input"
                          label="Good with Cats?"
                          value={this.state.animal_meta.is_good_with_cats}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />

                        <TextField style={customStyle.textFieldStyle}
                          id="standard-read-only-input"
                          label="Good with Dogs?"
                          value={this.state.animal_meta.is_good_with_dogs}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>


                    </GridContainer>
                  </div>

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
                subheader={<ListSubheader >History of {this.state.animal.name}</ListSubheader>}
                className={classes.root}
              >

                {this.state.animal_notes.map(note => {
                  return (
                    <ListItem button key={note.id}>
                      <ListItemText key={note.id} primary={note.notes}
                        secondary={
                          <React.Fragment>
                            <div style={customStyle.noteStyle}>
                            <Typography style={customStyle.typographyStyle}
                              component="span">
                              User:#{note.shelter_user_id}
                            </Typography>
                            {/* {moment(note.created_at).format("MMMM Do YYYY").toString()} */}
                            {moment(note.created_at).fromNow()}

                            </div>
                            <div style={customStyle.runningNoteButtonStyle}>
                            <Button size="small" disabled className={classes.button}>
                              DELETE
                            </Button>
                            <Button size="small" className={classes.button}>
                              EDIT
                            </Button>
                            </div>
                            
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
    shelter: state.shelterReducer.shelter
  }
}

export default connect(
  mapStateToProps,
  {}
)(withStyles(regularFormsStyle)(AnimalView))

//export default withStyles(extendedFormsStyle)(AnimalView);
