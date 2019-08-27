import { title, whiteColor } from "assets/jss/material-dashboard-pro-react.jsx";
import buttonStyle from "assets/jss/material-dashboard-pro-react/components/buttonStyle.jsx";

const animalPageStyle = () => ({
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
    paddingTop: "150px",
    backgroundColor: "#349FAD",
  },
  header: {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    background: "linear-gradient(to bottom, #349FAD 0%, #349FAD 33%, #000000 33%, lightgrey 33%, lightgrey 50%)",
    minHeight: "65vh",
    zIndex: "3",
   },
   buttonstyle: {
    display: "flex", 
    justify: "center", 
    alignItems: "center",
   },
   shelterCard: {
    width: "85%",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    left: "0",
    right: "0",
    top: "60%",
    borderRadius: "4px",
    boxShadow: "0 0px 5px rgba(0,0,0,0.19)",
    zIndex: "5",
    textAlign: "left",
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  shelterCardGrid: {
    margin: "0 auto",
    // maxWidth: "1400px",
    width: "100%",
  },
  iconStyle: {
    width: "40px",
    height: "auto",
    marginRight: "30px",
  },
  iconStyle2: {
    width: "40px",
    height: "40px",
    marginRight: "20px",
    marginBottom: "7.5px",
  },
  animalNameStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: "100px",
  },
  hungButtonStyle: {
    backgroundColor: "#A464A3",
    marginTop: "25px",
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
addressStyle: {
    minWidth: "140px",
    marginBottom: "-10px",
},
...buttonStyle,
  

});

export default animalPageStyle;