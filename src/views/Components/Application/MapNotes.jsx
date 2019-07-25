import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from "components/CustomButtons/Button.jsx";

function MapNotes(props) {

    const deleteNotes = e => {
        e.preventDefault();

        console.log(props)
        console.log(props.notes)

        // NEED TO PASS IN THE NOTE ID

        // GRAB FROM PARAMS?

        props.deleteNotes(props.notes)
    }

    return (
        <div>
            <h2> {props.notes.notes} </h2>

            <Button onClick={deleteNotes} key={props.application.id}> 
                Delete
            </Button>

            <Button> 
                Edit
            </Button>
        </div>
    )
}

export default withRouter(MapNotes);