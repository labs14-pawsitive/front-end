import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from "react-redux";

import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import mapNotesStyle from "assets/jss/material-dashboard-pro-react/views/mapNotesStyle";

import withStyles from "@material-ui/core/styles/withStyles";
import Container from '@material-ui/core/Container';
import FormLabel from "@material-ui/core/FormLabel";
import Input from '@material-ui/core/Input';

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

    clearField = e => {
        this.setState({ inputField: '' })
    }

    cancelClick = e => {
        e.preventDefault();

        this.setState({ isEditSelected: false, value: this.props.note.notes });


    }

    deleteNotes = e => {
        e.preventDefault();

        this.props.deleteNotes(this.props.note.id)
    }

    updateNotes = e => {
        
        this.props.updateNotes(this.state.value, this.props.note.id)

        this.props.note.notes = this.state.value

        this.setState({ isEditSelected: !this.state.isEditSelected })
    }

    editSelected = () => {
        this.setState({ isEditSelected: !this.state.isEditSelected })
    }

    render() {

        const { classes } = this.props;

        const customStyle = {
                noteBackground: {
                    background: '#edeae8',
                    borderBottom: '1px solid lightgrey',
                },
                adjustFont: {
                    fontSize: "20px",
                  }
        
        }

        return (
            <Container className={classes.noteBackground} >
               <div style={{ paddingTop: 20 }}>
                <Input
                className={classes.adjustFont}
                disableUnderline="true"
                fullWidth="true"
                inputProps={{
                    type: "text",
                    value: this.state.isEditSelected ? this.state.value : this.props.note.notes ,
                    onChange: this.handleChanges
                }}
                />

               <FormLabel> <p> {this.props.application.name} . { moment(this.props.note.created_at).format("MMMM Do YYYY").toString() } </p> </FormLabel>
                </div>
    
                <GridContainer
                    direction="row"
                    justify="flex-end"
                >
    
                    <GridItem xs={3} >
                        <Button
                            
                            color="transparent"
                            className={ classes.deleteButtonStyle }
                            onClick={ this.state.isEditSelected ? this.cancelClick : this.deleteNotes }
                        >
                             { this.state.isEditSelected? "Cancel" : "Delete" }
                        </Button>
                    </GridItem>
    
                    <GridItem>
                        <Button
                            
                            color="transparent"
                            className={ classes.editButtonStyle }
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
    classes: PropTypes.object
}

export default withStyles(mapNotesStyle)(MapNotes);
