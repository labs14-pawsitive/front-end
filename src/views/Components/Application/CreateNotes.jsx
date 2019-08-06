import React from 'react';
import { connect } from 'react-redux';
import MapNotes from './MapNotes';
import { addNotes, getNotes, updateNotes, deleteNotes } from '../../../actions/applicationAction';

// import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

//material UI core
import Input from '@material-ui/core/Input';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import displayNotesStyle from "assets/jss/material-dashboard-pro-react/views/displayNotesStyle";


class CreateNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            inputField: '',
            inputFieldState: '',
        };
    };

    handleChanges = e => {
        this.setState({
            inputField: e.target.value
        });
    };

    clearField = event => {
        event.preventDefault();

        this.setState({ inputField: '' });
    };

    // verifies if string has given length or not
    verifyLength(value, len) {
        if (value.length >= len) {

           return true;
        }
        return false;
    };

    isValidated() {
        if (
            this.state.inputFieldState === "success"
        ) {
            return true;
        } else {
            if (this.state.inputFieldState !== "success") {
                this.setState({ inputFieldState: "error" })
            }
        }
        return false;
    };

    handleInputField = (len) => event => {
        let stateName = `${event.target.name} State`

        if (event.target.value.length >= len) {
            this.setState({
                inputFieldState: {
                    ...this.state.inputFieldState,
                    [stateName]: "success"
                }

            })
        }
        else {
            this.setState({
                inputFieldState: {
                    ...this.state.inputFieldState,
                    [stateName]: "error"
                }
            })
        };

        this.setState({
            inputField: event.target.value
        });

    };

    componentDidMount() {
        const applicationId = this.props.application_id

        this.props.getNotes(applicationId)
    };

    addNotes = e => {

        if (this.state.inputField.length === 0)
            return;
        
        const newNote = {
            notes: this.state.inputField,
            shelter_user_id: this.props.shelterUserId,
            application_id: this.props.application_id,
        };

        const id = this.props.application_id;

        this.props.addNotes(newNote, id);

        this.setState({ inputField: '' });
    };

    deleteNotes = id => {

        this.props.deleteNotes(id)
    };

    updateNotes = (notes, id) => {

        const updatedNote = {
            notes: notes,

        }
        this.props.updateNotes(updatedNote, id);
    };

    render() {

        console.log('PROPS APPLICATION', this.props.application)
        console.log('SHELTER USER ID', this.props.application.shelter_user_id)

        const { classes } = this.props;

        const customStyle = {

            headerStyle: {
                fontStyle: "Sans-serif",
                fontSize: "30px",
                paddingTop: "10px",
            },
            submitButtonStyle: {
                marginLeft: "5px",
            },
            addSectionStyle: {
                borderBottom: "1px solid lightgrey",
            },
            notesMarginStyle: {
                marginTop: "7%",
                paddingLeft: "4%",
                paddingRight: "4%",
            },

        };

        return (
            <>
       
                <Typography style={customStyle.headerStyle} >
                    <p> Notes </p>
                </Typography>
                <Card>

                    <CardBody>
                        <div style={customStyle.addSectionStyle}>
                            <Input
                                success={this.state.inputFieldState === "success"}
                                error={this.state.inputFieldState === "error"}
                                placeholder="Add a note"
                                id="notes"
                                fullWidth="true"
                                disableUnderline="true"
                                inputProps={{
                                    type: "text",
                                    onChange: this.handleInputField(1),
                                    value: this.state.inputField,
                                }}
                            />

                            <GridContainer
                                direction="row"
                                justify="flex-end"
                                className="addNoteStyle"
                            >
                                <GridItem xs={3} sm={3} md={3}>
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
                                        style={customStyle.submitButtonStyle}
                                        onClick={this.addNotes}
                                    >
                                        Submit
                                </Button>
                                </GridItem>
                            </GridContainer>
                        </div>

                        <GridContainer style={customStyle.notesMarginStyle}>
                            {this.props.notes && this.props.notes.map(note => (
                                <MapNotes
                                    note={note}
                                    email={this.props.userEmail}
                                    application={this.props.application}
                                    deleteNotes={this.deleteNotes}
                                    updateNotes={this.updateNotes}
                                />
                            ))}
                        </GridContainer>
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
};

export default connect(mapStateToProps, { addNotes, getNotes, updateNotes, deleteNotes })(withStyles(displayNotesStyle)(CreateNotes));
