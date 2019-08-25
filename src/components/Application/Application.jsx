import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from "components/CustomButtons/Button.jsx";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from "components/Grid/GridContainer.jsx";
import SweetAlert from "react-bootstrap-sweetalert";

import GridItem from "components/Grid/GridItem.jsx";


import ApplicationWizard from "views/Application_Temp/Wizard.jsx";


const DialogTitle = withStyles(theme => ({
  root: {
    //borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
    zIndex: 10
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const {classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class Application extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: '600px',
    scroll: 'paper'
  };

  handleClickOpen = scroll => () => {
    this.setState({
      open: true, scroll
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const customStyle = {
        buttonStyle: {
          backgroundColor: "#A464A3",
          marginTop: "25px",
          marginRight: "15px",
          boxShadow: "5px 5px 0 #C9AAA9",
          fontSize: "1em",
          fontWeight: "700",
          "&:hover": {
            backgroundColor: "#A464A3"
          }
        }
      }

    return (
        <> 
 
            {/* <GridItem xs={10} sm={4}> */}
            <Button style={customStyle.buttonStyle} onClick={this.handleClickOpen('paper')}>
                ADOPT ME
            </Button>
            {/* </GridItem> */}
 
            {this.state.open === true ? 
                <GridContainer>
                    <GridItem xs={12} sm={11} md={10}>
                        <Dialog
                            fullWidth={this.state.fullWidth}
                            maxWidth={this.state.maxWidth}
                            scroll={this.state.scroll}
                            onClose={this.handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={this.state.open}
                            PaperProps={{
                            style: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            width:'100%',
                            overflowX:'hidden'
                            },
                        }}
                        >
                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}></DialogTitle>
                            <ApplicationWizard animalId={this.props.animalId} shelterId={this.props.shelterId}/>
                        </Dialog> 
                    </GridItem>
                </GridContainer>
            :
                null
             }     
        </>
    );
  }
}
 
export default Application;
 
