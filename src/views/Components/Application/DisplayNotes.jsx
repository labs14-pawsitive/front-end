import React from 'react';
import { connect } from 'react-redux';
import { addNotes, getNotes, deleteNotes } from '../../../actions/applicationAction';

import MapNotes from './MapNotes';

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";


class DisplayNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            notes: [],
            inputField: ''
        };
    }
    
handleChanges = e => {
    console.log('handleChanges')
    this.setState({ 
        inputField: e.target.value
    })
};

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

    this.props.addNotes( newNote, 3 );
    this.setState({ inputField: '' });
}

deleteNotes = id => {

    this.props.deleteNotes(id)
}

render() {

    console.log(this.state.notes)
    console.log(this.props.application)
    

    return (
        <>
        <Card>
            <CardBody>
                  <CustomInput
                    labelText="Add a note"
                    id="notes"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      onChange: this.handleChanges,
                      value: this.state.inputField,
                    }}
                  />

                    <Button>
                      Cancel
                    </Button>

                    <Button onClick={this.addNotes}>
                      Submit
                    </Button>
        

              { /* Map Out Notes Component here*/ }
                    <div>
                        {this.props.application.notes && this.props.application.notes.map(notes => (
                               <MapNotes
                               key={this.props.application.id} 
                               notes={notes}
                               application={this.props.application}
                               deleteNotes={this.deleteNotes}
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
    return {
        notes: state.applicationReducer.notes
    }
}

export default connect(
    mapStateToProps,
    { addNotes, getNotes, deleteNotes }
)(DisplayNotes)