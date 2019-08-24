import { title, whiteColor, blackColor } from "assets/jss/material-dashboard-pro-react.jsx";
import  buttonStyle  from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";
const shelterPageStyle = () => ({
wrapper: {
    height: "auto",
    minHeight: "100vh",
    margin: "0 auto",
    position: "relative",
    top: "0",
        },

shelterCard: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-50px",
    left: "0",
    right: "0",
    top: "60%",
    borderRadius: "4px",
    boxShadow: "0 0px 5px rgba(0,0,0,0.19)",
    zIndex: "5",
    textAlign: "left",
    alignItems: "center",
    backgroundColor: "white",
    },

cardType: {
        fontSize: "0.9rem",
        marginTop: "20px",
        marginBottom: "10px",
        fontFamily: "'Lato', sans-serif",
        textTransform: "none",
        display: "inline-block",
        color: "#959595",
      },

imageIcon: {
        display: "inline-block",
        width: "30px",
        height: "auto",
        marginTop: "10px",
        marginBottom: "20px",
        marginRight: "30px",
        marginLeft: "50px",
    },

header: {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    minHeight: "65vh",
    zIndex: "10",
   },

topButtons: {
      
       backgroundColor: "#A464A3",
       marginTop: "25px",
      //  marginRight: "15px",
       boxShadow: "5px 5px 0 #C9AAA9",
       fontSize: "1em",
       fontWeight: "700",
       "&:hover": {
        backgroundColor: "#A464A3",

    },
      "&:active": {
        backgroundColor: "green",
      }
   },

contentHeader: {
    position: "relative",
    zIndex: "10",
    textAlign: "left",
    color: whiteColor,
    width: "100%",
    paddingTop: "10%",
    paddingLeft: "12.5%",
    fontFamily: "Roboto, sans-serif",
  },

  title: {
    ...title,
    fontSize: "3.5em",
    color: "#383636",
    letterSpacing: "14px",
    fontWeight: "800",
    textTransform: "uppercase",
    textShadow: "8px 8px 0px #BCB3A0"
  },

  picturesStyle: {
    width: "100%",
    margin: "0 auto",
    zIndex: "3",
  },

  petpicStyle: {
    width: "250px",
    height: "250px",
    border: "2px solid white",
    borderRadius: "4px",
    boxShadow: "0 0px 10px rgba(0,0,0,0.19)",
    overflow: "hidden",
    display: "block",
    marginRight: "10px",
    marginTop: "10px",
  },

  ...buttonStyle,

});


export default shelterPageStyle;