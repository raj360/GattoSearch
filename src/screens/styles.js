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
        width: '100%',
        height: '100%',
        resizeMode:'contain'
    },
    logoContainer: {
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
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
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
    formContainer:{
        flex: 1,
        backgroundColor:'transparent'
    },
    form:{
        flex:3
    },
    item:{
        margin:5,
        width:'100%'
    },
    textarea:{
        width: Platform.OS === "android" ?  320: 345,
        textAlignVertical: 'top',  // hack android
        height: Platform.OS === "android" ? 50 :60 ,
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Raleway-Medium',
        fontWeight: '300'
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