import React from 'react'
import { connect } from "react-redux";
import moment from 'moment'
import PropTypes from "prop-types";
import {updateNotes, deleteNotes } 
from '../../actions/animalAction.js'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

class NotesComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isNoteEditing: false,
            clickedNoteID: -1,
            editedNote:''
        }
    }



    handleNoteUpdate = (event, updatedNote) => {
        event.preventDefault()
        if (this.state.isNoteEditing) {

            let updatedNotes= {}

            updatedNotes = {
                notes:this.state.editedNote,
                animal_id:this.props.animalID,
                shelter_user_id:updatedNote.shelter_user_id
              }
          
              console.log('updated notes info: ', updatedNotes)
          
              this.props.updateNotes(this.props.animalID,updatedNote.id,updatedNotes)
          
              this.setState({
                editedNote:''
              })
            //   this.handleNoteToggle(event)
            console.log('is updated')
        }
        else {
            this.setState({
                editedNote:this.props.note.notes
            })
            this.handleNoteToggle(event)
        }
    }

    handleNoteToggle = (event) => {
        event.preventDefault()
        this.setState({
            isNoteEditing: !this.state.isNoteEditing,
        })
    }

    handleUpdateNote = (event) => {
        this.setState({
            editedNote:event.target.value
        })
    }

    handleDelete = (event,noteID) => {
        event.preventDefault()
        // this.props.note.notes= ''
        // this.props.note.shelter_user_id=''
        // this.props.note.created_at=''
        // this.window.location.reload()
        this.setState({
            isNoteEditing: !this.state.isNoteEditing,
            // editedNote:''
        })
        this.props.deleteNotes(this.props.animalID,noteID)
    }

    render() {

        const { classes } = this.props;

        const customStyle = {
            noteStyle: {
                color: "lightgray",
                display: 'flex',
                flexWrap: 'wrap',
            },
            typographyStyle: {
                marginRight: "7%",
            },
            runningNoteButtonStyle: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        }

        return (
            <Card className={classes.card}>
                <CardContent>
                    {this.state.isNoteEditing ?
                        <TextField
                            multiline
                            className={classes.textField}
                            value={this.state.editedNote}
                            onChange={this.handleUpdateNote}
                            margin="normal"

                        /> :
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {this.props.note.notes}
                        </Typography>
                    }

                    <span style={customStyle.noteStyle}>
                        <Typography style={customStyle.typographyStyle}
                            component="span">
                            User:#{this.props.note.shelter_user_id}
                        </Typography>
                        {/* {moment(note.created_at).format("MMMM Do YYYY").toString()} */}
                        {moment(this.props.note.created_at).fromNow()}
                    </span>

                </CardContent>
                <CardActions>
                    <span style={customStyle.runningNoteButtonStyle}>
                        <Button size="small" className={classes.button} onClick={(event) => this.handleDelete(event,this.props.note.id)}
                            style={{ display: this.state.isNoteEditing ? "block" : "none" }}>
                            DELETE
                            </Button>
                        <Button size="small" className={classes.button}
                            onClick={(event) => this.handleNoteUpdate(event, this.props.note)}>
                            {this.state.isNoteEditing ? "SAVE" : "EDIT"}
                        </Button>
                    </span>
                </CardActions>
            </Card>

        )
    }
}

NotesComponent.propTypes = {
    classes: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
     
      shelterWorkerID: state.userReducer.shelterWorkerID,
    }
}

export default connect(
    mapStateToProps, 
    { 
      updateNotes,
      deleteNotes 
    }
  )(withStyles(regularFormsStyle)(NotesComponent)) 