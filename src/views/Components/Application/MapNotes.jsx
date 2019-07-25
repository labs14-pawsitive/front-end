import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from "components/CustomButtons/Button.jsx";

function MapNotes(props) {

    const deleteNotes = e => {
        e.preventDefault();

        console.log(props.note)

        // NEED TO PASS IN THE NOTE ID

        // GRAB FROM WHERE???

        props.deleteNotes(props.note.id)
    }

    return (
        <div>
            <h2> {props.note.notes} </h2>

            <Button onClick={deleteNotes}> 
                Delete
            </Button>

            <Button> 
                Edit
            </Button>
        </div>
    )
}

export default withRouter(MapNotes);