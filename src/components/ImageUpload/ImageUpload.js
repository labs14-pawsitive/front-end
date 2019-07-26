import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import axios from "axios";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      defaultImage: null
    };


    const width = this.props.width ? this.props.width : "200px";
    const height = this.props.height ? this.props.height : "200px";
    const borderRadius = this.props.borderRadius ? this.props.borderRadius : "5px";

    this.styles = {
      media: {
        height: height,
        width: width,
        background: "lightgray",
        borderRadius: "5px",
        overflow: "hidden",
        padding: 0
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
        borderRadius: borderRadius
      },
    
      text: {
        padding: 0,
        margin: 0,
        top: 0,
        height: height,
        width: width,
        objectFit: "cover",
        overflow: "hidden",
        position: "absolute",
        borderRadius: borderRadius
      }
    };
  }

  componentDidMount(){

    if (this.props.defaultImage)
      this.setState({defaultImage: this.props.defaultImage});
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  async handleSave(files) {
 
    await this.setState({
      files: files,
      open: false
    });
    const imageInfo = [];

    await this.state.files.forEach(async (image, index, array) => {
      const formData = new FormData();
      formData.append("image", image);
      await axios
        .post(this.props.url, formData, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          if (!res) {
            if (this.props.callback) {
              this.props.callback({ error: "upload error" });
              return;
            }
          } else {
            let response = {
              image: {
                image_url: res.data.url,
                image_id: res.data.image_id
              }
            };
            imageInfo.push(response);
          }
        });
        if (image === array[array.length - 1]) {
          let response = imageInfo;
    
          if (this.props.callback) {
            if (imageInfo.length === 0)
              this.props.callback({ error: "Nothing uploaded" });
            else {
              this.setState({defaultImage: response[0].image.image_url});
              this.props.callback(response);
            }
          }
        }
    });
  }

  handleOpen = () => {
    if (!this.props.editable)
    return;
    this.setState({
      open: true
    });
  };

  render() {
    let imageLimit = 20;
    if (this.props.imageLimit) imageLimit = this.props.imageLimit;

    const image = this.state.files ? this.state.files[0] : null;

    return (
      <div>
        <Button onClick={this.handleOpen} style={this.styles.media}>
          {this.state.defaultImage && !this.props.editable ? (
            <img src={this.state.defaultImage} alt="" style={this.styles.image} />
          ) : this.props.editable && (
            <div className="click-text"> Click to add image </div>
          )}
        </Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={["image/jpeg", "image/png"]}
          showPreviews={true}
          maxFileSize={5000000}
          filesLimit={imageLimit}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}
export default ImageUpload;
