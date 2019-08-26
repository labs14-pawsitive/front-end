const animalCardStyle = () => ({
    maincard: {
      width:"100%",
      height: "200px",
      position: "relative",
      background: "white",
      boxShadow: "0 0 5px #00000050",
      borderRadius: "5px",
      margin:"20px 0"
    },
    cardOverlay: {
      width:"100%",
      position: "absolute",
      overflow: "hidden",
      padding:  "20px 0 26px",
      color:"white",
      height:"55px", 
      bottom: "0",
      zIndex:"5",
      borderRadius: "5px",
      transition: "0.3s",
      //"&:hover": {
      //    height:"95px"
      //}
    },
    cardOverlayHover: {
      width:"100%",
      position: "absolute",
      overflow: "hidden",
      padding:  "20px 0 26px",
      color:"white",
      height:"95px", 
      bottom: "0",
      zIndex:"5",
      borderRadius: "5px",
      transition: "0.3s",
    },
    cardInner: {
      position: "relative",
      background: "#FCFCFC",
      height: "120px",
      color:"white",
      display: "flex",
      alignContent: "center",
      flexDirection: "column",
      "&::after": {
          boxShadow: "0 0 0 50px #FCFCFC",
          borderRadius: "100%",
          position: "absolute",
          height: "40px",  
          content: `''`,
          right: '-10%',
          left: "-10%",
          bottom: '100%',
          zIndex:'-1'
      }
    },
    animalName: {
      color: "#A364A5",
      fontWeight: "700",
      textShadow: "2px 1px #00000030",
      textTransform: "uppercase",
      display: "block",
      width: "100%",
      textAlign:"center",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      fontSize:"0.9rem",
      padding: "8px 10px 5px"
    },
    animalDesc: {
      color:"#53616F",
      fontWeight: "700",
      display: "block",
      width: "100%",
      textAlign: "center",
      fontSize: "0.8rem",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      padding: "0 10px",
      lineHeight:"1.2",
  
    }
  });
  
  export default animalCardStyle;