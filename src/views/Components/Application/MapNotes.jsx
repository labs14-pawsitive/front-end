import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from "components/CustomButtons/Button.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Container from '@material-ui/core/Container';
import CustomInput from "components/CustomInput/CustomInput.jsx";


import { makeStyles } from '@material-ui/styles';

function MapNotes(props) {

    const useStyles = makeStyles({
        noteBackground: {
            background: '#edeae8',
            borderBottom: '1px solid lightgrey',
        }
    })

    const classes = useStyles();

    const deleteNotes = e => {
        e.preventDefault();

        console.log(props.note)

        props.deleteNotes(props.note.id)
    }

    return (
        <Container className={classes.noteBackground} >
           <div style={{ paddingTop: 20 }}>
            <CustomInput
            formControlProps={{
                fullWidth: true
            }}
            inputProps={{
                type: "text",
                value: props.note.notes
            }}
            />
            </div>

            <GridContainer
                direction="row"
                justify="flex-end"
            >

                <GridItem xs={3} >
                    <Button
                        variant="contained"
                        color="transparent"
                        onClick={deleteNotes}>
                        Delete
              </Button>
                </GridItem>

                <GridItem>
                    <Button
                        variant="contained"
                        color="transparent"
                    >
                        Edit
                </Button>
                </GridItem>

            </GridContainer>
        </Container>
    )
}

export default withRouter(MapNotes);