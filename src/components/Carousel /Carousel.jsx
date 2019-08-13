import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  componentDidMount() {
    return axios
      .get(`http://localhost:8000/api/pictures/animal/${this.props.animalId}`)
      .then(response => {
        console.log(response)
        const { img_url, img_id, animal_id } = response
        const images = img_url
        this.setState({ images: response.data }) 
      })
  }

  render() {
    const customStyles = {
      carousel: {
        width: "80%",
        margin: "30px"
      }
    }

    const { images } = this.state
    if (!images.length) return <div>Images are not fetched yet!</div>

    return (
      <GridContainer style={customStyles.carousel}>
        <GridItem xs={12} sm={12} md={6}>
          <Carousel autoPlay infiniteLoop>
            {
              Array.from(images).map(image => {
                return (
                  <img src={ image.img_url } />
                  )
              })
            }
         </Carousel>
        </GridItem>
      </GridContainer>
    )
  }
}

export default CustomCarousel


