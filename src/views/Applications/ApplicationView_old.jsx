/*!
=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';

// // react component plugin for creating a beautiful datetime dropdown picker
// import Datetime from "react-datetime";
// // react component plugin for creating beatiful tags on an input
// import TagsInput from "react-tagsinput";
// // plugin that creates slider
// import nouislider from "nouislider";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// import Today from "@material-ui/icons/Today";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import AvTimer from "@material-ui/icons/AvTimer";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
// import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
// import ImageUpload from "components/CustomUpload/ImageUpload.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
// import CardBody from "components/Card/CardBody.jsx";


import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class AppliationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    
    application: {}
  };
  }
  

  componentDidMount() {

    axios
    // get(`https://staging1-pawsnfind.herokuapp.com/api/applications/${this.props.match.params.id}`)
    .get(`https://staging1-pawsnfind.herokuapp.com/api/applications/${this.props.match.params.id}`)
    .then( application => {
     
      console.log('application', application.data)
      if(application.data.shelter !== this.props.shelter)  {
        this.props.history.push('/admin/dashboard')
      } else {
        this.setState({
                application: application.data,
              })
              console.log(this.state.application)
      }
      
    })
    .catch( error => {
      console.log(error)
    })


  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleMultiple = event => {
    this.setState({ multipleSelect: event.target.value });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleTags = regularTags => {
    this.setState({ tags: regularTags });
  };


  render() {
    const { classes } = this.props;
    

    const customStyle = {
      titleStyle: {
        padding: "0px 15px"
      },
      imgCardStyle:{
        padding: "0px 15px"
      },
      imgStyle: {
        borderRadius: "4px"
      }
    }

    
    return (
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={8}>   
         <Card> 
          <GridContainer>
           <GridItem xs={12} sm={12} md={12}>
             <div style={customStyle.titleStyle}>
               <h1>Application for {this.state.application.animal_name}</h1>             
                   <legend>test</legend>
             </div>
                   

          </GridItem>
          
          </GridContainer>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader>
            <legend>Application Notes</legend>
            </CardHeader>
          </Card>
        </GridItem>
        
      
        </GridContainer>
        
      </div>
    );
  }
}

AppliationView.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userID : state.userReducer.userID,
    shelterID : state.shelterReducer.shelterID,
    shelterWorkerID : state.userReducer.shelterWorkerID,
    roleID : state.userReducer.roleID,
    shelter : state.shelterReducer.shelter
  }
}

export default connect(
  mapStateToProps,
  {}
)(withStyles(regularFormsStyle)(AppliationView))
