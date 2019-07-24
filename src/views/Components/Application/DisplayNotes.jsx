import React from 'react';
import { connect } from 'react-redux';
import { addNotes, getNotes } from '../../../actions/applicationAction';

import axios from 'axios';

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
        inputField: ''
    };

handleChanges = e => {
    this.setState({ 
        inputField: e.target.value
    })
};

// componentDidMount() {
//     const shelterUserId = localStorage.getItem('shelter_user_id')
//     this.props.getNotes(shelterUserId)
// }

addNotes = e => {
    const newNote = {
        notes: 'test',
        shelter_user_id: 3,
        application_id: 3 
    }

    this.props.addNotes(newNote, 3 );
    // axios.post(`https://staging1-pawsnfind.herokuapp.com/api/applications/3/note`, newNote )
    // .then(res => {
    //     console.log(res);
    // })
    // .catch(err => {
    //     console.log(err)
    // })
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

                    <Button onClick={this.addNotes}>
                      Submit
                    </Button>
              </CardBody>

              { /* Map Out Notes Component here*/ }
                    <div>
                        {this.state.application_admin.notes && this.state.application_admin.notes.map(notes => (
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
        application_admin: state.applicationReducer.application_admin
    }
}

export default connect(
    mapStateToProps,
    { addNotes, getNotes }
)(DisplayNotes)