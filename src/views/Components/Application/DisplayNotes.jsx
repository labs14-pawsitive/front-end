import React from 'react';
import { connect } from 'react-redux';
import { addNotes, getNotes } from '../../../actions/applicationAction';

import MapNotes from './MapNotes';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

class DisplayNotes extends React.Component {
    state= {
        application_admin: [],
       
    };

handleChanges = e => {
    this.setState({ 
        inputField: e.target.value
    })
};

componentDidMount() {
    const shelterUserId = localStorage.getItem('shelter_user_id')
    this.props.getNotes(shelterUserId)
}

addNote = e => {
    const newNote = {
        note: this.state.inputField,
        shelter_user: localStorage.getItem('shelter_user')
    }

    this.props.addNotes(newNote);
    this.setState({ inputField: '' })
}

render() {
    return (
        <GridContainer>
        <Card>
            <CardBody>
                  <CustomInput
                    labelText="Add a note"
                    id="new_note"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      
                    }}
                  />

                    <Button>
                      Cancel
                    </Button>

                    <Button onClick={this.addNote}>
                      Submit
                    </Button>
              </CardBody>
              { /* Listed Notes Component here*/ }
                    <div>
                        {this.props.application_admin.notes && this.props.application_admin.notes.map(notes => (
                               <MapNotes
                               key={this.props.application.id} 
                               notes={notes}
                               />
                        ))}
                    </div>

            </Card>
        </GridContainer>
    )
}

};

const mapStateToProps = state => {
    return {
        application_admin: state.application_admin
    }
}

export default connect(
    mapStateToProps,
    { addNotes, getNotes }
)(DisplayNotes)