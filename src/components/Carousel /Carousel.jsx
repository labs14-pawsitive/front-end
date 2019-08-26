import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import './carousel.css';

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
      imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      },
      image: {
        flexShrink: 0,
        minWidth: "100%",
        minHeight: "100%",
        objectFit: "cover",
        height: "375px"
      }
    }

    const { images } = this.state
    if (!images.length) return <div>Images are not fetched yet!</div>
    return (
        <div style={{paddingLeft: "45px"}}  class="carousel-container">
          <Carousel autoPlay infiniteLoop>
            {
              Array.from(images).map(image => {
                return (
                  <div style={customStyles.imageContainer}>
                    <img style={customStyles.image} src={ image.img_url } />
                  </div>
                  )
              })
            }
         </Carousel>
        </div>
    )
  }
}

export default CustomCarousel