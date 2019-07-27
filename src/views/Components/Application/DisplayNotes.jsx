import React from 'react';
import { connect } from 'react-redux';
import { addNotes, getNotes, updateNotes, deleteNotes } from '../../../actions/applicationAction';
import MapNotes from './MapNotes';

// import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

//material UI core
import Input from '@material-ui/core/Input';
import Typography from "@material-ui/core/Typography";

// import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import displayNotesStyle from "assets/jss/material-dashboard-pro-react/views/displayNotesStyle";

import withStyles from "@material-ui/core/styles/withStyles";

class DisplayNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            inputField: ''
        };
    }

    // state = {
    //     notes: [],
    //     inputField: ''
    // }

    handleChanges = e => {
        this.setState({
            inputField: e.target.value
        })
    };

    clearField = e => {
        this.setState({ inputField: '' })
    }

    componentDidMount() {
        const applicationId = this.props.application_id

        this.props.getNotes(applicationId)
    }

    addNotes = e => {

        const newNote = {
            notes: this.state.inputField,
            shelter_user_id: 3,
            application_id: 3
        }

        this.props.addNotes(newNote, 3);
        this.setState({ inputField: '' });
    }

 

    deleteNotes = id => {

        this.props.deleteNotes(id)
    }

    updateNotes = (notes, id) => {

        const updatedNote = {
            notes: notes,

        }

        this.props.updateNotes(updatedNote, id )

    }

    render() {

        const { classes } = this.props;

        const customStyle = {

            headerStyle: {
              fontStyle: "Sans-serif",
              fontSize: "30px",
              paddingTop: "10px",
            },
      
          }

        return (
            <>
                <Typography style={ customStyle.headerStyle } >
                    <p> Notes </p>
                </Typography>
                <Card>

                    <CardBody>
                        <Input
                            placeholder="Add a note"
                            id="notes"
                            fullWidth="true"
                            disableUnderline="true"
                            inputProps={{
                                type: "text",
                                onChange: this.handleChanges,
                                value: this.state.inputField,
                            }}
                        />

                        <GridContainer
                            direction="row"
                            justify="flex-end"
                            className="addNoteStyle"
                        >
                            <GridItem xs={3}>
                                <Button
                                    variant="contained"
                                    color="transparent"
                                    className={classes.buttonStyle}
                                    onClick={this.clearField}
                                >
                                    Cancel
                                </Button>
                            </GridItem>

                            <GridItem>
                                <Button
                                    variant="contained"
                                    color="transparent"
                                    className={classes.buttonStyle}
                                    onClick={this.addNotes}
                                >
                                    Submit
                                </Button>
                            </GridItem>
                        </GridContainer>

                        <div>
                            {this.props.notes && this.props.notes.map(note => (
                                <MapNotes
                                    note={note}
                                    application={this.props.application}
                                    deleteNotes={this.deleteNotes}
                                    updateNotes={this.updateNotes}
                                />
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </>
        )
    }

};

const mapStateToProps = state => {

    console.log(state)
    return {
        notes: state.applicationReducer.notes
    };
}

export default connect( mapStateToProps, {addNotes, getNotes, updateNotes, deleteNotes})(withStyles(displayNotesStyle)(DisplayNotes))