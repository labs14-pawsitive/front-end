import { title, whiteColor } from "assets/jss/material-dashboard-pro-react.jsx";

const mainPageStyle = () => ({
  contentCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: "3",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    color: whiteColor,
    padding: "0 15px",
    width: "100%",
    maxWidth: "880px"
  },
  title: {
    ...title,
    fontSize: "13.7em",
    color: whiteColor,
    letterSpacing: "14px",
    fontWeight: "700"
  },
  subTitle: {
    fontSize: "2.25rem",
    marginTop: "0",
    marginBottom: "8px"
  },
  description: {
    fontSize: "1.125rem",
    marginTop: "0",
    marginBottom: "8px"
  },
  bodyStyle: {
    zIndex: 3,
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    width:"100%"
  },
  wrapper: {
    justifyContent: "center",
    height: "auto",
    minHeight: "100vh",
    margin: "0 auto",
    position: "relative",
    top: "0",
  },
  header: {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    background: "linear-gradient(to bottom, #349FAD 0%, #349FAD 45%, #000000 45%, lightgrey 45%, lightgrey 50%)",
    minHeight: "65vh",
    zIndex: "3",
   },
   buttonstyle: {
    display: "flex", 
    justify: "center", 
    alignItems: "center",
   },
   floatRightStyle: {
    float: "right", 
    position: "relative",
   },
   floatLeftStyle: {
    float: "left", 
    position: "relative",
    marginTop: "100px",
   },
   shelterCard: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    left: "0",
    right: "0",
    top: "60%",
    borderRadius: "4px",
    boxShadow: "0 0px 5px rgba(0,0,0,0.19)",
    zIndex: "5",
    textAlign: "left",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    padding: "30px",
  },
  iconStyle: {
    width: "50px",
    height: "auto",
    marginRight: "30px",
  },
  iconStyle2: {
    width: "50px",
    height: "auto",
    marginRight: "20px",
  },
  animalNameStyle: {
        color: "white",
        fontWeight: "bold",
        fontSize: "100px",
        textShadow: "5px 5px #2b2b2b51"
  }
  

});

export default mainPageStyle;
