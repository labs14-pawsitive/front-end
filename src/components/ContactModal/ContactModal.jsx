import React from 'react';
import axios from 'axios';
//import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ListItem from "@material-ui/core/ListItem";
import cx from "classnames";
import Button from "components/CustomButtons/Button.jsx";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ContactModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        email: "",
        name: "",
        message: ""
    };
  }
  
  handleChange = event => {
      this.setState({
          [event.target.id] : event.target.value
      })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    handleSubmit = () => {
        const message = {name: this.state.name, email: this.state.email, message: this.state.message}
        
        axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/sendgrid/`, message)
        .then( result => {
            console.log(result)
            this.handleClose();
        })
        .catch( error => {
            console.log(error)
        })
    };

  render() {
      const {classes, black , white } = this.props;
      var block = cx({
        [classes.block]: true,
        [classes.whiteColor]: white,
        [classes.blackColor]:black
        });
      
    return (
      <>
         <ListItem className={classes.inlineBlock} onClick={this.handleClickOpen}>
              <a className={block} style={{cursor:"pointer"}}>
                Contact Us
              </a>
         </ListItem>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
              style: {
                  overflow: "visible"
              }
          }}
        >
            <GridContainer>          
                <GridItem xs={12} >
                <Card style={{boxShadow: "none", marginTop:"-50px", padding: "0 30px"}}>
                    <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <MailOutline />
                    </CardIcon>
                    </CardHeader>
                    <h4 className={classes.cardIconTitle} style={{color: "#020207", marginTop: "20px", padding: "0 20px"}}>We would love to hear from you!</h4>
                    <CardBody>
                    <form>
                        <CustomInput
                        labelText="Name"
                        id="name"
                        name="name"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text",
                            value: this.state.name,
                            onChange: this.handleChange
                        }}
                        />
                        <CustomInput
                        labelText="Email adress"
                        id="email"
                        name="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "email",
                            value: this.state.email,
                            onChange: this.handleChange
                        }}
                        />
                        <CustomInput
                        labelText="Message"
                        id="message"
                        name="message"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            type: "text",
                            value: this.state.message,
                            onChange: this.handleChange,
                            multiline: true,
                            rows:"4"
                        }}
                        />
                       
                        <Button color="rose" onClick={this.handleSubmit} style={{marginTop: "30px"}}>Submit</Button>
                    </form>
                    </CardBody>
                </Card>
            </GridItem>
            </GridContainer>     
        </Dialog>
      </>
    );
  }
}

export default withStyles(modalStyle)(ContactModal);


