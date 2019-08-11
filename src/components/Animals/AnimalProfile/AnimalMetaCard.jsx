import React from 'react';
import axios from 'axios';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

// custom classes
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import Axios from 'axios';

class AnimalMetaCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            animal: {},
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <>
                <GridContainer>

                    <GridContainer xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card>

                            <GridItem>
                                <Typography>
                                    <h1>Details</h1>
                                </Typography>
                            </GridItem>

                            <CardBody>
                                <TextField
                                    label="Age"
                                    id="age"
                                    fullWidth="true"
                                />

                                <TextField
                                    label="Gender"
                                    id="gender"
                                    fullWidth="true"
                                />

                                <TextField
                                    label="Color"
                                    id="color"
                                    fullWidth="true"
                                />

                                <TextField
                                    label="Breed"
                                    id="breed"
                                    fullWidth="true"
                                />

                                <TextField
                                    label="Size"
                                    id="size"
                                    fullWidth="true"
                                />

                                <TextField
                                    label="Coat Length"
                                    id="coat_length"
                                    fullWidth="true"
                                />

                            </CardBody>
                        </Card>
                    </GridContainer>

                    <GridContainer>
                        <Card>


                            <Typography>
                                <h1> Description </h1>
                            </Typography>


                            <CardBody>
                                <TextField
                                    label="The Story"
                                />

                            </CardBody>
                        </Card>
                    </GridContainer>

                    <GridContainer>
                        <Card>

                            <Typography>
                                <h1> Contact </h1>
                            </Typography>

                            <CardBody>

                                <TextField
                                    label="Email"
                                />

                                <TextField
                                    label="Phone Number"
                                />

                                <TextField
                                    label="Location"
                                />

                                <TextField
                                    label="Current Residence"
                                />


                            </CardBody>
                        </Card>
                    </GridContainer>

                    <GridContainer>
                        <Card>

                            <Typography>
                                <h1> Health & Personality </h1>
                            </Typography>

                        </Card>
                    </GridContainer>


                </GridContainer>
            </>
        )
    }
}

export default withStyles(regularFormsStyle)(AnimalMetaCard);