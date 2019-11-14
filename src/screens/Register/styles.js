const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  // container: {
  //   // backgroundColor: "#FFF"
  //   backgroundColor: "#FFAE02"
  // },
  // mb15: {
  //   marginBottom: 20
  // },
  // mt15: {
  //   marginTop: 15
  // },
  // formContainer:{
  //   // flex: 1,
  //   backgroundColor:'#FFAE02'
  // },
  // // logoContainer:{
  // //   flex: 20,
  // //   backgroundColor:'#FFFFFF',
  // //   padding: 5,
  // //   margin: 5,
  // // },
  // form:{
  //   flex: 40,
  //   backgroundColor:'#FFFFFF',
  //   padding: 5,
  //   margin: 5,
  // },
  // textContainer:{
  //   flex: 20,
  //   backgroundColor:'#FFFFFF',
  //   padding: 5,
  //   margin: 5,
  // },
  // logoContainer: {
  //   flex: 20,
  //   marginTop: deviceHeight / 8,
  //   // marginBottom: 70,
  //   padding: 5,
  //   margin: 5,
  //   backgroundColor:'#FFFFFF',
  // },
  // logo: {
  //   position: "absolute",
  //   left: Platform.OS === "android" ? 40 : 50,
  //   top: Platform.OS === "android" ? 35 : 60,
  //   width: 250,
  //   height: 90
  // },
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
    borderColor: '#CB8736',
    borderRadius: 5
  },
  // logoContainer: {
  //   flex: 1,
  //   marginTop: deviceHeight / 8,
  //   marginBottom: 30
  // },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
    // width: 290,
    // height: 80
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  container: {
    backgroundColor: "#FFF"
  },
  mb15: {
    marginBottom: 20,
    backgroundColor: "#8B1E1B",
    width: 80,
    height: 15,
  },
  text_: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingLeft: 15
  },
  iconText: {
    fontSize: 12
  },
  icon: {
    width: 45,
    height: 45,
    justifyContent: "center"
  },
  col: {
    alignItems: "center",
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    borderRadius: 15
  },
  row: {
    marginTop: 5,
    //paddingBottom: 5,
    height: 100,
    justifyContent: 'space-around'
  },
  card: {
    //marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  input: {
    width: Platform.OS === "android" ?  310 : 355,
    // alignSelf: Platform.OS === null ?  300 : "stretch",
    height: 50,
    // backgroundColor: '#CB8736',
    backgroundColor: '#FFFFFF',
    margin: 8,
    padding: 8,
    // color: '#CB8736',
    borderRadius: 5,
    borderColor: '#CB8736',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    fontWeight: '300'
  },
  input1: {
    width: Platform.OS === "android" ? 150 : 175 ,
    height: 50,
    backgroundColor: '#FFFFFF',
    marginLeft: Platform.OS === "android" ? 5 : 1,
    margin: Platform.OS === "android" ? 5 : 5,
    justifyContent:'center',
    padding: Platform.OS === "android" ? 5 : 5,
    // color: '#CB8736',
    borderRadius: 5,
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    fontWeight: '300'
  },
  // logoContainer: {
  //   // flex: 1,
  //   marginTop: deviceHeight / 38,
  //   marginBottom: 5
  // },
  MainContainer: {
    flex: 1,
    // backgroundColor: '#EAEAEE',
    // backgroundColor: "#FFAE02"
    backgroundColor: "transparent"
  },
  backgroundImage: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'stretch',
    width: null,
    // backgroundColor: "#FFAE02"
  },
  content: {
    alignItems: 'center',
  },
  TextComponentStyle11: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
  },
  TextInputStyleClass: {
    padding: 5,
    marginBottom: 5,
    height: 40,
    textAlign: 'center',
    borderRadius: 5,
    // fontSize: 16,
    borderWidth: 0.2,
    borderColor: '#FF1E26',
    backgroundColor: 'rgba(255,255,255,1)'

  },
  TextComponentStyle1: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15,
    color: '#000000',
    // fontStyle: 'italic',
    // fontWeight: 'bold',
    // textShadowColor: '#252525',
    // textShadowOffset:{width:2,height:2},
    // textShadowRadius:15
  },
  TextComponentStyle: {
    fontSize: 20,
    textAlign: 'center',
    // color: '#FF1E26',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15
  },
  TextInputStyleClassText: {
    padding: 5,
    marginBottom: 0,
    height: 25,
    width: 139,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 13,
    color: '#0677BD',
    backgroundColor: '#EEEEEE'
  },
  TextInputStyleClassPicker_: {
    padding: 5,
    marginBottom: 5,
    height: 30,
    width: 128,
    // backgroundColor:'#0677BD',
    // alignItems:'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0677BD',
    borderWidth: 0.2
  },
  ImageContainer_: {
    borderRadius: 5,
    width: 300,
    height: 120,
    margin: 5,
    padding: 5,
    borderColor: '#CB8736',
    // borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
  },
  inputErr:{
    color:'red'
  },
  textareaContainer: {
   height: 130,
   padding: 5,
   backgroundColor: '#F5FCFF',
 },
 textarea: {
   width: Platform.OS === "android" ?  320: 345,
  //  alignSelf: 'stretch',
   textAlignVertical: 'top',  // hack android
   height: Platform.OS === "android" ? 95 : 110,
   fontSize: 14,
   color: '#333',
 },
 logoContainer:{
   flexDirection:'row',
  width: 250,
   height: 90, 
   top: Platform.OS === "android" ? -20 : -40, 
   marginRight: 70,
   marginBottom: 25,
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center'
 },
 logo: {
  position: "absolute",
  left: Platform.OS === "android" ? 40 : 50,
  top: Platform.OS === "android" ? 35 : 60,
  width: 250,
  height: 90,
  alignSelf: 'stretch'
},
imageContainer: {
  flex: 1,
  width: null,
  height: null
},
};
