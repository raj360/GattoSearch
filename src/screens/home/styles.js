const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;

const window = Dimensions.get('window');

const AVATAR_SIZE_HEIGHT = 120;
const ROW_HEIGHT = 280;
const PARALLAX_HEADER_HEIGHT = 430;
const STICKY_HEADER_HEIGHT = Platform.OS === "ios" ? 80 : 60;
const IMAGE_HEIGHT = '100%';
const CONTAINER_WIDTH = 180;

export default {
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    // width: 300,
    alignSelf:'stretch',
    justifyContent: 'flex-end',
    backgroundColor:'#FFAE02'
  },
  stickySectionText: {
    fontFamily: 'Raleway-Bold',
    color: 'white',
    fontSize: 18,
    margin: 20,
    fontWeight: '700'
  },
  fixedSection: {
    position: 'absolute',
    // top: 20,
    top: Platform.OS === "ios" ? 20 : 15,
    // bottom: 10,
    right: 10,
    flexDirection: 'row',
    // backgroundColor:'#FFAE02'
    backgroundColor:'transparent'
  },
  fixedSectionMenu: {
    position: 'absolute',
    // top: 30,
    top: Platform.OS === "ios" ? 30 : 20,
    left: 20
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 18
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    marginTop: 0,
    borderRadius: AVATAR_SIZE_HEIGHT / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 22,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 17,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: '#EAEAEA',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
    // marginBottom:10,
    // marginTop:5
  },
  rowText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 17,
    marginTop: 8,
    color: '#003087'
  },
  navigMenu: {
    backgroundColor: '#EAEAEA',
    borderRadius: 25,
    height: 225,
    // color:'#CB8736',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    // flex:180
    //width:300
  },
  gridView: {
    // marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 15,
    padding: 10,
    height: 232,
    width: 200
    // marginBottom:25
  },
  imgSection: {
    flex: 50,
    alignSelf: 'center',
    borderRadius: 15,
    width: CONTAINER_WIDTH,
    backgroundColor: '#EAEAEA'
  },
  sectionDetails: {
    flex: 55,
    alignSelf: 'center',
    width: CONTAINER_WIDTH,
    // backgroundColor: '#EAEAEA'
  },
  itemTitle: {
    flex: 20,
    padding: 2,
    margin: 2,
    alignSelf: 'auto',
    justifyContent: 'center',
    // backgroundColor:'#BABABA'
  },
  itemDesc: {
    flex: 45,
    padding: 2,
    margin: 2,
    alignSelf: 'auto',
    justifyContent: 'center',
    // backgroundColor:'orange'
  },
  itemRatingIcons: {
    flex: 15,
    padding: 2,
    margin: 2,
    justifyContent: 'center',
    // backgroundColor:'green'
  },
  itemReviewsRatings: {
    flex: 20,
    padding: 2,
    margin: 2,
    justifyContent: 'center',
    // backgroundColor:'blue'
  },
  itemName: {
    fontFamily: 'Raleway-Bold',
    // fontSize: 20,
    alignSelf: 'auto',
    fontSize: Platform.OS === "ios" ? 14 : 16,
    color: '#003087',
    fontWeight: '600',
  },
  ratReviewText: {
    fontFamily: 'Raleway-Medium',
    color: "#5F5F5F",
    alignSelf: 'auto',
    // fontSize:18,
    fontSize: Platform.OS === "ios" ? 12 : 14,
  },
  itemDescription: {
    fontFamily: 'Raleway-Medium',
    // fontWeight: '600',
    // fontSize: 15,
    alignSelf: 'auto',
    fontSize: Platform.OS === "ios" ? 10 : 13,
    color: "#5F5F5F",
    // marginTop: 2
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    borderRadius: 15,
    // marginTop: 5,
    alignSelf: 'auto',
    opacity: 1.5
  },
  textContainer: {
    padding: 2,
    width: CONTAINER_WIDTH
  },
  image: {
    height: IMAGE_HEIGHT,
    width: CONTAINER_WIDTH
  },
  menuItem: {
    // width: 75,
    width: Platform.OS === "ios" ? 80 : 70,
    height: 80,
    backgroundColor: '#FFFFFF',
    // backgroundColor: '#EAEAEA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // padding:5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10
  },
  iconText: {
    fontFamily: 'Raleway-Medium',
    color: '#003087',
    // fontSize: 12
  }
};
