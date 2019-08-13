import { title, whiteColor, blackColor } from "assets/jss/material-dashboard-pro-react.jsx";

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
    color: blackColor,
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


export default mainPageStyle;
