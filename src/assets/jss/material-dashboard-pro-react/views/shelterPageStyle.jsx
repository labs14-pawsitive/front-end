import { title, whiteColor, blackColor } from "assets/jss/material-dashboard-pro-react.jsx";

const shelterPageStyle = () => ({
    header: {
    backgroundSize: "100vw 100vh",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    minHeight: "70vh",
   },

   topButtons: {
       backgroundColor: "#A464A3",
       marginRight: "15px",
       boxShadow: "5px 5px 0 #C9AAA9",
       fontSize: "1rem",
       fontWeight: "700"
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
    maxWidth: "880px"
  },
  title: {
    ...title,
    fontSize: "3.4rem",
    color: "#383636",
    letterSpacing: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    textShadow: "8px 12px 0px #BCB3A0"
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