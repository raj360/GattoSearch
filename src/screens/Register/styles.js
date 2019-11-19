const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

export default {
  formContainer:{
    flex: 1,
    backgroundColor:'transparent'
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode:'contain'
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
  textarea: {
    width: Platform.OS === "android" ?  320: 345,
    textAlignVertical: 'top',  // hack android
    height: Platform.OS === "android" ? 50 :60 ,
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    fontWeight: '300'
  },
  logoContainer:{
    flexDirection:'row',
    width: 250,
    height: 90,
    top: Platform.OS === "android" ? -20 : -40,
    marginBottom: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  logo: {
    position: "absolute",
    top: Platform.OS === "android" ? 35 : 60,
    width: 100,
    height: 100,
    borderRadius:600,
    resizeMode:'cover',
    padding:20
  },
  form:{
    flex:3,
  },
  item:{
    margin:5,
    width:'100%'
  },
  button:{
    borderRadius:200,
    backgroundColor:'#FDCE00',
    width: '100%',
    height: Platform.OS === "android" ? 50 :60 ,
    margin:5
  },
  label:{flexDirection:'row',
    marginTop:40,
    justifyContent:'center',

  }
};
