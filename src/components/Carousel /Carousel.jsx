import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  componentDidMount() {
    return axios
    
    
    .get('https://staging1-pawsnfind.herokuapp.com/api/pictures/animal/2')
      .then(response => {
        console.log(response)
        // handle no response
        // const { img_urls, img_id, animal_id } = response
        // const images = img_urls
        // const images = [
        //   "https://images.pexels.com/photos/1345191/pexels-photo-1345191.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        //   "https://images.pexels.com/photos/1345191/pexels-photo-1345191.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        //   "https://images.pexels.com/photos/1345191/pexels-photo-1345191.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        // ]

        this.setState({ images: response.data })

      // .then(images => this.setState({ images })) 
      })
  }

  render() {
    const { images } = this.state
    if (!images.length) return <div>Images are not fetched yet!</div>

    return (
      <Carousel autoPlay infiniteLoop>
        {
          Array.from(images).map( image => {
            return <div>
             <img src={ image.img_url } />
            </div>
          })
        }
      </Carousel>
    )
  }
}

export default CustomCarousel


