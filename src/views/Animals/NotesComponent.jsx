import React from 'react'
import { connect } from "react-redux";
import moment from 'moment'
import PropTypes from "prop-types";
import { updateNotes, deleteNotes }
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
            editNoteInfo: this.props.note
        }
    }



    submitNoteUpdate = (event, updatedNote) => {
        event.preventDefault()
        if (this.state.isNoteEditing) {

            this.props.updateNotes(this.props.animalID, this.state.editNoteInfo.id, this.state.editNoteInfo)
                .then(
                    (res) => {
                        window.location.reload()
                        this.setState({
                            editNoteInfo: {

                            }
                        });
                    }
                )
                .catch(error => {
                    console.log('update notes component: error ', error)
                })

            console.log('is updated')
        }
        else {
            this.setState({
                editedNote: this.props.note.notes
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

    handleUpdateNoteChange = (event) => {
        this.setState({
            editNoteInfo: {
                ...this.state.editNoteInfo,
                [event.target.name]: event.target.value
            }
        })
    }

    submitDelete = (event, noteID) => {
        event.preventDefault()
        this.setState({
            isNoteEditing: !this.state.isNoteEditing,
        })
        this.props.deleteNotes(this.props.animalID, noteID)
            .then((res) => window.location.reload())
            .catch(error => {
                console.log('delete: notes component: error ', error)
            }
            )}

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
                            name="notes"
                            multiline
                            className={classes.textField}
                            value={this.state.editNoteInfo.notes}
                            onChange={this.handleUpdateNoteChange}
                            margin="normal"

                        /> :
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {this.state.editNoteInfo.notes}
                        </Typography>
                    }

                    <span style={customStyle.noteStyle}>
                        <Typography style={customStyle.typographyStyle}
                            component="span">
                            User:#{this.state.editNoteInfo.shelter_user_id}
                        </Typography>
                        {/* {moment(note.created_at).format("MMMM Do YYYY").toString()} */}
                        {moment(this.state.editNoteInfo.created_at).fromNow()}
                    </span>

                </CardContent>
                <CardActions>
                    <span style={customStyle.runningNoteButtonStyle}>
                        <Button size="small" className={classes.button} onClick={(event) => this.submitDelete(event, this.state.editNoteInfo.id)}
                            style={{ display: this.state.isNoteEditing ? "block" : "none" }}>
                            DELETE
                            </Button>
                        <Button size="small" className={classes.button}
                            onClick={(event) => this.submitNoteUpdate(event, this.props.note)}>
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