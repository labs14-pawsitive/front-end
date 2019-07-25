import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import Container from '@material-ui/core/Container';
import FormLabel from "@material-ui/core/FormLabel";

import injectSheet from 'react-jss';

const styles = {

    noteBackground: {
        background: '#edeae8',
        borderBottom: '1px solid lightgrey',
    }
}

class MapNotes extends React.Component {
constructor(props) {
    super(props)
    this.state = {
        isEditSelected: false,
        value: this.props.note.notes
    }
}

    handleChanges = e => {
        this.setState({
            value: e.target.value
         })
    }

    deleteNotes = e => {
        e.preventDefault();

        this.deleteNotes(this.props.note.id)
    }

    updateNotes = e => {
        
        this.updateNotes(this.state.value, this.props.note.id)

        this.props.note.notes = this.state.value

        this.setState({ isEditSelected: !this.state.isEditSelected })
    }

    editSelected = () => {
        this.setState({ isEditSelected: !this.state.isEditSelected })
    }

    render() {

        console.log(this.props)

        return (
            <Container className={this.props.classes.noteBackground} >
               <div style={{ paddingTop: 20 }}>
                <CustomInput
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    type: "text",
                    value: this.state.isEditSelected ? this.state.value : this.props.note.notes ,
                    onChange: this.handleChanges
                }}
                />

               <FormLabel> <p> {this.props.application.name} . {moment(this.props.note.created_at).fromNow() } </p> </FormLabel>
                </div>
    
                <GridContainer
                    direction="row"
                    justify="flex-end"
                >
    
                    <GridItem xs={3} >
                        <Button
                            variant="contained"
                            color="transparent"
                            onClick={this.deleteNotes}
                        >
                             { this.state.isEditSelected? "Cancel" : "Delete" }
                        </Button>
                    </GridItem>
    
                    <GridItem>
                        <Button
                            variant="contained"
                            color="transparent"
                            className={ this.state.isEditSelected ? "saveButton" : "editButton" }
                            onClick={ this.state.isEditSelected ? this.updateNotes : this.editSelected }

                        >
                            { this.state.isEditSelected? "Save" : "Edit" }
                        </Button>
                    </GridItem>
    
                </GridContainer>
            </Container>
        )
    }
}

MapNotes.propTypes = {
    classes: PropTypes.object.isRequired
}

export default injectSheet(styles)(MapNotes)
