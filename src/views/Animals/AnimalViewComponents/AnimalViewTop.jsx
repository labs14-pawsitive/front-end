import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ImageUpload from '../../../components/ImageUpload/ImageUpload'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from '@material-ui/core/Input';
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import GridContainer from "components/Grid/GridContainer.jsx";
import placeholderImage from 'assets/img/image_placeholder.jpg'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import { Grid } from '@material-ui/core';

class AnimalViewTop extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // placeholderImages: Array(6).fill("url(" + placeholderImage + ")"),
            updatedImages: [],
            animalPictures: [],
            deletePicture:[]
        }
    }

    componentDidMount = () => {
        this.setState({
            updatedImages:this.props.placeholderImages
        })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.updatedImages !== prevState.updatedImages ) {
    //       this.setState({
    //         updatedImages:this.state.updatedImages
    //       })
    
    //     }
    // }

    deletePicture = (event,imgID) => {

        event.preventDefault()

        // const updateAfterDelete = this.state.updatedImages.map(image => {
        //         if(image.img_id === imgID)
        //         {
        //             image = "empty"
        //         }
        // })

        // console.log('update after delete filter array ', updateAfterDelete)

        // this.setState({
        //     updatedImages:updateAfterDelete
        // })

        console.log('updated pics after deletion in the animal top component state',this.state.updatedImages.filter(image => image.img_id !== imgID))

        this.props.deletePictures(imgID,this.props.animal.id)
    }

    render() {
        // console.log('pictures urls ', this.props.animalPictures)
        // console.log('updatedImages urls ', this.state.updatedImages)

        console.log('placeholder images in animal top component ', this.props.placeholderImages)
        const { classes, fullScreen } = this.props;

        const customStyle = {
            imgCardStyle: {
                paddingTop: "2px",
                width: "210px",
                height: "200px"
            },
            imgTitle: {
                background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                opacity: 0.8,
                fontSize: "26px",
                fontWeight: "bold",


            },
            imageUpload: {
                position: "absolute"
            },
            titleStyle: {
                padding: "10% 0px 0px 0px"
            },
            form1ControlStyle: {
                width: "100%",
                marginRight: "1%",
            },
            gridItemStyle: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            dialogPaper: {
                minHeight: '80vh',
                maxHeight: '80vh',
            }

        }

        const imageStyle = {

            media: {
                height: "100%",
                width: "100%",
                background: "lightgray",
                borderRadius: "5px",
                overflow: "hidden",
                padding: 0,
                position: "absolute"

            },

            image: {
                padding: 0,
                margin: 0,
                top: 0,
                height: "100%",
                width: "100%",
                objectFit: "cover",
                overflow: "hidden",
                position: "relative",
                borderRadius: "5px"
            },

            text: {
                padding: 0,
                margin: 0,
                opacity: 0.9,
                height: "25px",
                width: "100%",
                background: "lightgray",
                objectFit: "cover",
                overflow: "hidden",
                position: "absolute"
            }
        }

        const imageModalStyle = {

            media: {
                height: "auto",
                width: "100%",
                background: "lightgray",
                borderRadius: "5px",
                overflow: "hidden",
                padding: 0,
                position: "absolute"

            },

            image: {
                padding: 0,
                margin: 0,
                top: 0,
                height: "100%",
                width: "100%",
                objectFit: "cover",
                overflow: "hidden",
                position: "relative",
                borderRadius: "5px"
            },

            text: {
                padding: 0,
                margin: 0,
                opacity: 0.9,
                height: "25px",
                width: "100%",
                background: "lightgray",
                objectFit: "cover",
                overflow: "hidden",
                position: "absolute"
            }
        }
        return (

            <GridItem xs={12} sm={12} md={12} style={customStyle.gridItemStyle}>
                <GridItem xs={12} sm={12} md={5}>
                    <GridList className={classes.gridList} >
                        <GridListTile key={this.props.animal.img_url} style={customStyle.imgCardStyle} >

                            <ImageUpload height="100%" width="100%"
                                defaultImage={this.props.animal.img_url}
                                borderRadius="5px" imageLimit={1}
                                customStyle={imageStyle}
                                editable={this.props.isEditing} callback={this.props.callback}
                                url={`${process.env.REACT_APP_BACKEND_URL}/api/pictures/animal/${this.props.paramsId}`} />


                            <GridListTileBar style={customStyle.imgTitle}
                                subtitle={<span>#{this.props.animal.id}</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                            />

                            {this.props.isEditing &&
                                <Dialog style={{
                                    overflowY: "hidden"
                                }}
                                    fullScreen={fullScreen}
                                    open={this.props.open}
                                    onClose={this.props.handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                >


                                    <DialogTitle id="alert-dialog-title" >{"Edit Pictures"}</DialogTitle>
                                    <GridContainer md={12}>
                                        {this.props.placeholderImages.map(eachImage => (
                                            <GridItem md={4}>
                                                <DialogContent style={{
                                                    height: "300px",
                                                    padding: 0,
                                                    position: "relative",
                                                    width: "169px",
                                                    margin: "0 9px 9px 9px"
                                                }}>

                                                    {eachImage !== 'empty' ? 
                                                    <div>
                                                    <ImageUpload height="100%" width="100%"
                                                        defaultImage={eachImage.img_url}
                                                        borderRadius="5px" imageLimit={1}
                                                        customStyle={imageModalStyle}
                                                        editable={this.props.isEditing} callback={this.props.callback}
                                                        url={`${process.env.REACT_APP_BACKEND_URL}/api/pictures`} />

                                                        <IconButton style={{float:"right"}} onClick={(event) => this.deletePicture(event,eachImage.img_id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        </div>
                                                :
                                                        <ImageUpload height="300px" width="169px"
                                                            borderRadius="5px" imageLimit={1}
                                                            // customStyle={imageModalStyle}
                                                            editable={this.props.isEditing} callback={this.props.callback}
                                                            url={`${process.env.REACT_APP_BACKEND_URL}/api/pictures`} />}

                                                </DialogContent>
                                            </GridItem>
                                        ))}

                                    </GridContainer>


                                    <Button onClick={this.handleClose} color="primary" autoFocus>
                                        Close
                                    </Button>

                                </Dialog>
                            }


                        </GridListTile>
                    </GridList>
                </GridItem>

                <GridItem xs={12} sm={12} md={7}>
                    <div style={customStyle.titleStyle}>
                        {this.props.isEditing ?
                            <form>
                                <TextField style={customStyle.form1ControlStyle}
                                    success={this.props.textState.nameState === "success"}
                                    error={this.props.textState.nameState === "error"}

                                    name="name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.props.animal.name}
                                    onChange={this.props.handleTextField}
                                    margin="normal"
                                />

                                <TextField style={customStyle.form1ControlStyle}
                                    success={this.props.textState.descriptionState === "success"}
                                    error={this.props.textState.descriptionState === "error"}

                                    name="description"
                                    label="Description"
                                    multiline
                                    className={classes.textField}
                                    value={this.props.animal_meta.description}
                                    onChange={this.props.handleMetaTextField}
                                    margin="normal"
                                />

                                <FormControl style={customStyle.form1ControlStyle} className={classes.formControl} >
                                    <InputLabel htmlFor="shelter_location_id">Location</InputLabel>
                                    <Select
                                        value={this.props.animal.nickname}
                                        name='shelter_location_id'
                                        onChange={this.props.handleAdoption}
                                        renderValue={value => `${value}`}
                                        input={<Input id='shelter_location_id' />}
                                    >

                                        {this.props.locations.map(status => {
                                            return (
                                                <MenuItem key={status.id} value={status.id}>
                                                    {status.nickname}, {status.street_address}, {status.city}, {status.state_id}- {status.zipcode}</MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>
                            </form> :
                            <div>
                                <h1>{this.props.animal.name}</h1>
                                <legend>{this.props.animal_meta.description}</legend>
                                <p>Located at : {this.props.animal.nickname}</p>
                            </div>
                        }

                    </div>

                </GridItem>
            </GridItem>
        )
    }
}

AnimalViewTop.propTypes = {
    classes: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        locations: state.animalReducer.dropdownAnimalOptions.locations,
        // animalPictures:state.animalReducer.animalPictures
    }
}

export default connect(
    mapStateToProps, null
)(withStyles(regularFormsStyle)(AnimalViewTop)) 