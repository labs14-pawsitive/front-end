import { title, whiteColor, blackColor } from "assets/jss/material-dashboard-pro-react.jsx";

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
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    top: "60%",
    borderRadius: "4px",
    boxShadow: "0 0px 5px rgba(0,0,0,0.19)",
    zIndex: "3",
    textAlign: "left",
    alignItems: "center",
    backgroundColor: "white",
    },

cardType: {
        fontSize: "0.9rem",
        marginTop: "10px",
        marginBottom: "10px",
        fontFamily: "'Lato', sans-serif",
        textTransform: "none",
      },

header: {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    minHeight: "65vh",
   },

topButtons: {
       backgroundColor: "#A464A3",
       marginRight: "15px",
       boxShadow: "5px 5px 0 #C9AAA9",
       fontSize: "1em",
       fontWeight: "700"
   },

contentHeader: {
    position: "relative",
    zIndex: "1",
    textAlign: "left",
    color: whiteColor,
    width: "100%",
    padding: "10% 12.5%",
    fontFamily: "Roboto, sans-serif",
  },


  contentCenter: {
    position: "absolute",
    top: "20%",
    left: "10%",
    zIndex: "3",
    textAlign: "left",
    color: whiteColor,
    padding: "0 15px",
    width: "100%",
    maxWidth: "880px",
    fontFamily: "Roboto, sans-serif",
  },
  title: {
    ...title,
    fontSize: "3.4em",
    color: "#383636",
    letterSpacing: "14px",
    fontWeight: "800",
    textTransform: "uppercase",
    textShadow: "8px 8px 0px #BCB3A0"
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
    justifyContent: "center",
    width:"100%",
    color: blackColor

  },
  picturesStyle: {
    margin: "auto",
    display : "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "space-around",
  },

  petpicStyle: {
    maxWidth: "300px",
    maxHeight: "300px",
    overflow: "hidden",
    display: "block",
    margin: "auto",
    marginTop: "10px",
  }
});


export default shelterPageStyle;