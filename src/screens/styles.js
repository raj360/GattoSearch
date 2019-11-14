const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
    container: {
      backgroundColor: "#FFAE02"
    },
    mt15:{
      borderRadius: 25,
      marginTop: 50,
      marginLeft: 5,
      marginRight: 5,
      backgroundColor:'orange'
    },
    imageContainer: {
      flex: 1,
      width: null,
      height: null
    },
    logoContainer: {
      // flex: 1,
      // marginTop: deviceHeight / 8,
      marginBottom: 70,
    },
    logo: {
      position: "absolute",
      left: Platform.OS === "android" ? 40 : 50,
      top: Platform.OS === "android" ? 35 : 60,
      width: 250,
      height: 90
    },
    text: {
      color: "#D8D8D8",
      bottom: 6,
      marginTop: 5,
      alignSelf: 'auto',
      fontFamily: 'Raleway-Medium',
    },
    LinearGradientStyle: {
      height: 40,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      marginBottom: 20
    },
    buttonText: {
     fontSize: 18,
     textAlign: 'center',
     margin: 7,
     alignSelf: 'auto',
     color : '#fff',
     fontFamily: 'Raleway-Medium',
     backgroundColor: 'transparent' 
   
   },
  };