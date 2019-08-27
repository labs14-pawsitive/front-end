import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NotesComponent from './NotesComponent.jsx'

import { addNotes } from '../../../actions/animalAction.js'
 
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";



class AnimalNotes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // note: this.props.animalNotes,
            note: '',
            addNoteState: "",
            urlClicked : false,
            animal_id: this.props.animal.id,
            username: ""
        }

        this.maxLength = 3;
    }

    // componentDidMount(){
    //     this.props.getUser(this.props.animal.shelter_id)
    //     .then(res => {
    //         console.log('animal notes component ', res)
    //         this.setState({
    //             username:this.props.userInfo.username
    //         })
    //     })
    //     .catch(error =>{
    //         console.log('animal notes error', error)
    //     })
    // }

    handleUrlClick = e => {
        this.setState({
            urlClicked : true
        })
    }

    cancelNote = (event) => {
        event.preventDefault()
        this.setState({
            note: ''
        })
    }

    handleAddNoteChange =  async (event) => {

        await this.setState({
            note: event.target.value,
        })
        
        if (this.state.note.length >= this.maxLength) {
            this.setState({
                addNoteState: "success"
            })
        }
        else {
            this.setState({
                addNoteState: "error"
            })
        }


    }

    isValidated() {

        if (this.state.addNoteState === "success") {
            console.log("isValidated fn : is true")
            return true;
        }
        else {
            if (this.state.addNoteState !== "success") {
                this.setState({
                    addNoteState: "error"
                });
            }
            console.log("isValidated is false")
            return false;
        }
    }

    submitNote = (event) => {
        event.preventDefault()
        console.log(this.state.note)

        if (this.state.note.length === 0)
            return;
        let notes = {}

        notes = {
            notes: this.state.note,
            animal_id: this.props.animal.id,
            shelter_user_id: this.props.userInfo.id
        }

        console.log('post notes info: ', notes)

        if (this.isValidated()) {
            this.props.addNotes(notes.animal_id, notes)
                .then((res) => {
                        this.setState({
                            note: ''
                        });
                    })
                .catch(error => {
                    console.log('animal view component : add : error ', error)
                })
        }
        else {
            console.log('please enter the required length')
        }
    }



    render() {

        const { classes } = this.props;


        const customStyle = {
            textFieldNote: {
                padding: "0px 3%"
            },
            detailsContainerStyle: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            noteButtonStyle: {
                margin: "0px 10px 10px 15px",
                width: "40%"
            },
            urlButton : {
                padding: "10px" ,
                textAlign: "center",
                fontWeight:"700",
                cursor: "pointer"
            },
            urlClicked: {
                padding:"10px",
                border: "3px dashed rgba(0, 0, 0, 0.42)",
                textAlign: "center",
                fontWeight:"700"
            }
        }
        return (
            <GridItem xs={12} sm={12} md={4} lg={4}>
                {/* <Card style={this.state.urlClicked? customStyle.urlClicked : customStyle.urlButton}>
                    <div onClick={this.handleUrlClick} >
                        {this.state.urlClicked ? `http${window.location.hostname.indexOf(".com") !== -1 ? "s" : ""}://${window.location.host}/application/${this.props.shelter_id}/${this.props.animal_id}`: "Generate Application Link"}  
                    </div>
                </Card> */}
                <Card style={customStyle.textFieldNote}>

                    <CardHeader>
                        <legend>Animal Notes</legend>
                    </CardHeader>

                    <TextField
                        success={this.state.note.length === 0 || this.state.addNoteState === "success" }
                        error={this.state.addNoteState === "error" && this.state.note.length > 0}
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
                            variant="contained" className={classes.button} onClick={this.submitNote}>
                            SUBMIT
                    </Button>
                    
                        {this.state.note.length > 0 &&
                            <Button style={customStyle.noteButtonStyle}
                                variant="contained" color="secondary"
                                className={classes.button} onClick={this.cancelNote}>
                                CANCEL
                            </Button>
                        }

              
                    </div>

                    <List
                        subheader={<ListSubheader >Notes of {this.props.animal.name}</ListSubheader>}
                        className={classes.root}
                    >

                        {this.props.animalNotes.map(note => {
                            console.log('note info ', note)
                            return < NotesComponent key={note.id} note={note} />
                        })}
                    </List>
                </Card>
            </GridItem>
        )
    }

}




AnimalNotes.propTypes = {
    classes: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        animal: state.animalReducer.animalInfo.animal,
        animalNotes: state.animalReducer.animalInfo.animalNotes,
        userInfo: state.userReducer.userInfo,
    }
}

export default connect(
    mapStateToProps,
    {
        addNotes,
 
    }
)(withStyles(regularFormsStyle)(AnimalNotes)) 
