import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from "components/CustomButtons/Button.jsx";

function MapNotes(props) {

    return (
        <div>
            <h2> {props.application_admin.notes} </h2>

            <Button> 
                Delete
            </Button>

            <Button> 
                Edit
            </Button>
        </div>
    )
}

export default withRouter(MapNotes);