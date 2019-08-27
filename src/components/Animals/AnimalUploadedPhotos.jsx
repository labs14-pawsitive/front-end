import React from 'react';
import GridItem from "components/Grid/GridItem.jsx"
import GridContainer from "components/Grid/GridContainer.jsx";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class AnimalUploadedPhotos extends React.Component {
    constructor(props) {
        super(props);
    }
    deleteImage = id => {
        this.props.removeImage(id)
    }
    
    render() {
        const { images } = this.props;
        const imageItems = images.map((image, i) => {
            return (
            <GridItem key={i}>
                <div  
                    style={{ 
                        backgroundSize: "cover", 
                        backgroundPosition: "center center", 
                        height: "auto", 
                        width: "100%", 
                        display: "flex", 
                        justifyContent: "center"
                    }}>
                    <img style={{width: "150px", height: "150px", margin: "8px"}} src={image.image_url} />
                </div>
                
                <div>
                    <IconButton style={{top: "-170px", left: "120px",}} onClick={() => this.deleteImage(image.image_id) }>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </GridItem> 
            )
        })
        return (
            <GridContainer style={{display: "flex", justifyContent: "center", width: "100%", marginTop: "15px"}}>
                {imageItems}
            </GridContainer>
        )
    }
}
  
export default AnimalUploadedPhotos; 