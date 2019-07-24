import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from "components/CustomButtons/Button.jsx";

function MapNotes(props) {

    const deleteNotes = e => {
        e.preventDefault();

        props.deleteNotes(props.notes.id)
    }

    return (
        <div>
            <h2> {props.notes.notes} </h2>

            <Button onClick={deleteNotes} key={props.notes.id}> 
                Delete
            </Button>

            <Button> 
                Edit
            </Button>
        </div>
    )
}

export default withRouter(MapNotes);