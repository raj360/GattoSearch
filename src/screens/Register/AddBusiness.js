import React, { Component } from "react";
import {
  View,
  TextInput,
  Dimensions,
  Alert,
  Platform,
  ScrollView,
  PanResponder,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Body,
  Left,
  Right,
  Item,
  Input,
  Form,
  Picker,
  Text
} from "native-base";
import styles from "./styles";
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker';
import { Dialog, ProgressDialog, ConfirmDialog } from "react-native-simple-dialogs";
import PhoneNumberPicker from 'react-native-country-code-telephone-input'
import Textarea from 'react-native-textarea';

const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../assets/logoforflash.png");
const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const deviceHeight = Dimensions.get("window").height;

var sourceAsString = null;
var source = null;
var fileName = null;

var sourceAsString_1 = null;
var source_1 = null;
var fileName_1 = null;

var sourceAsString_2 = null;
var source_2 = null;
var fileName_2 = null;

const domain = "http://desmediaapp.com/gatto/business";


class AddBusiness extends Component {
  constructor() {
    // StatusBarIOS.setHidden(true)
    super();
    this.state = {
      ImageSource: null,
      ImageSourceOne: null,
      ImageSourceTwo: null,
      data: null,
      BusinessName: '',
      Description: '',
      latitude: null,
      longitude: null,
      coordinatesErr: '',
      mobileNumber: "",
      primaryCallingCode: "",
      callingCode: "",
      countryName: "",
      village: "",
      district: "",
      UserId: 2,
      BusinessCategory: '',
      ErrMsg: '',
      businessCategories: []
    }
  }

  // ---Image upload---
  // Options passed to ImagePicker.showImagePicker
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker invoked, picking an image
    ImagePicker.showImagePicker(options, (response) => {
      // Logging various errors/ cancels for the ImagePicker
      console.log('ImagePicker response: ', response);
      if (response.didCancel) {
        console.log('User cancelled ImagePicker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Saving the URI from response as a variable and a state (state is used in render)
        source = { uri: response.uri };
        this.setState({
          ImageSource: source,
        });
        // fetch needs the source as a string, but "source" is an object
        sourceAsString = source.uri.toString();
        console.log('sourceAsString = ', sourceAsString);
      }
    });
  }

  selectPhotoTapped_2() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker invoked, picking an image
    ImagePicker.showImagePicker(options, (response) => {
      // Logging various errors/ cancels for the ImagePicker
      console.log('ImagePicker response: ', response);
      if (response.didCancel) {
        console.log('User cancelled ImagePicker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Saving the URI from response as a variable and a state (state is used in render)
        source_1 = { uri: response.uri };
        this.setState({
          ImageSourceOne: source_1,
        });
        // fetch needs the source as a string, but "source" is an object
        sourceAsString_1 = source_1.uri.toString();
        console.log('sourceAsString_1 = ', sourceAsString_1);
      }
    });
  }

  selectPhotoTapped_3() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker invoked, picking an image
    ImagePicker.showImagePicker(options, (response) => {
      // Logging various errors/ cancels for the ImagePicker
      console.log('ImagePicker response: ', response);
      if (response.didCancel) {
        console.log('User cancelled ImagePicker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Saving the URI from response as a variable and a state (state is used in render)
        source_2 = { uri: response.uri };
        this.setState({
          ImageSourceTwo: source_2,
        });
        // fetch needs the source as a string, but "source" is an object
        sourceAsString_2 = source_2.uri.toString();
        console.log('sourceAsString_2 = ', sourceAsString_2);
      }
    });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e) => { console.log('onStartShouldSetPanResponder'); return true; },
      onMoveShouldSetPanResponder: (e) => { console.log('onMoveShouldSetPanResponder'); return true; },
      onPanResponderGrant: (e) => console.log('onPanResponderGrant'),
      onPanResponderMove: (e) => console.log('onPanResponderMove'),
      onPanResponderRelease: (e) => console.log('onPanResponderRelease'),
      onPanResponderTerminate: (e) => console.log('onPanResponderTerminate')
    });
  }

  PrimaryPhoneNumberPickerChanged(country, callingCode, phoneNumber) {
    this.setState({ countryName: country.name, callingCode: callingCode, mobileNumber: parseInt(phoneNumber) });
  }

  componentDidMount() {
    fetch(domain + '/read.php?bCategory=categories')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ businessCategories: [...this.state.businessCategories, ...responseJson]});
    })
    .catch((error) => {
      console.error(error);
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("okay");
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  addBusiness = () => {
    // this.setState({ showProgress: true });
    // setTimeout(
    //   () => {
    //     this.setState({ showProgress: false });
    //   },
    //   3000,
    // );

    // form validation
    if (
      this.state.ImageSource === null ||
      this.state.BusinessName === '' ||
      this.state.BusinessCategory === '' ||
      this.state.Description === '' ||
      this.state.ImageSourceTwo === null ||
      this.state.village === '' ||
      this.state.district === '' ||
      this.state.ImageSourceOne === null ||
      this.state.mobileNumber === '' ||
      this.state.BusinessCategory === '' ||
      this.state.latitude === '' ||
      this.state.longitude === ''
    ) {
      //this.setState({ ErrMsg: 'Please all fields are required'});
      Alert.alert("Sorry!", "Please all fields are required");
    } else {
      // Alert.alert(
      //   "Results",
      //   this.state.BusinessName +
      //   this.state.latitude +
      //   this.state.longitude +
      //   this.state.BusinessCategory +
      //   this.state.Description +
      //   this.state.village +
      //   this.state.district +
      //   "+" + this.state.callingCode + parseInt(this.state.mobileNumber) +
      //   this.state.BusinessCategory +
      //   this.state.countryName +
      //   this.state.UserId +
      //   this.state.ImageSource +
      //   this.state.ImageSourceTwo +
      //   this.state.ImageSourceOne
      // );

      fileName = sourceAsString.split('/').pop();
      console.log('filename = ', fileName);

      fileName_1 = sourceAsString_1.split('/').pop();
      console.log('filename_1 = ', fileName_1);

      fileName_2 = sourceAsString_2.split('/').pop();
      console.log('filename_2 = ', fileName_2);

      // Create a DB entry for the image
      const dbData = new FormData();
      //Add your input data
      dbData.append('business_name', this.state.BusinessName);
      dbData.append('description', this.state.Description);
      dbData.append('longitude', this.state.longitude);
      dbData.append('latitude', this.state.latitude);
      dbData.append('business_phone', "+" + this.state.callingCode + parseInt(this.state.mobileNumber));
      dbData.append('village', this.state.village);
      dbData.append('district', this.state.district);
      dbData.append('country', this.state.countryName);
      dbData.append('category_id', this.state.BusinessCategory);
      dbData.append('user_id', this.state.UserId);


      dbData.append('featured_photo', {
        uri: sourceAsString,
        type: 'image/jpeg',
        name: fileName,
      });
      dbData.append('image_two', {
        uri: sourceAsString_1,
        type: 'image/jpeg',
        name: fileName_1
      });
      dbData.append('image_three', {
        uri: sourceAsString_2,
        type: 'image/jpeg',
        name: fileName_2
      });

     this.setState({ showProgress: true });
      setTimeout(
        () => {
          this.setState({ showProgress: false });
        },
        3000,
      );

      //fetch 'POST', send image DB data
      fetch(domain + '/create.php', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: dbData,
      }).then(res => res.json())
        .then((responseJson) => {
          if (responseJson.message === "Business added successfully") {
            Alert.alert(responseJson.message);
          } else {
            Alert.alert(responseJson.message);
          }
        })
        .catch((error) => {
          console.log('DB error: ', error);
        });
    }
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <Header style={{ backgroundColor: 'transparent' }}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: '#FFFFFF' }} />
              </Button>
            </Left>
            <Body>
              <Title style={{ color: '#FFFFFF', fontFamily: 'Raleway-Bold', fontSize: 17 }}>BUSINESS REGISTRATION</Title>
            </Body>
            <Right />
          </Header>

          <ScrollView>
            <View style={styles.backgroundImage}>
              <View style={styles.content}>
          <ProgressDialog
            title="Registration processing"
            activityIndicatorColor="#CB8736"
            activityIndicatorSize="large"
            animationType="slide"
            message="Please, wait..."
            visible={this.state.showProgress}
          />
                <View style={styles.logoContainer}>
                  <ImageBackground source={logo} style={styles.logo} />
                </View>
                {/* <View>
                <Text style={styles.TextComponentStyle11}>Please Register Here</Text>
              </View> */}
                <View style={{
                  flex: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                  width: Platform.OS === "android" ? 345 : null,
                  borderRadius: 15,
                  borderWidth: 5,
                  borderColor: '#EAEAEA',
                  padding: 10,
                  marginTop: 15,
                  backgroundColor: '#EAEAEE'
                }}>
                  <View>
                    <TextInput
                      placeholder="Business Name"
                      onChangeText={BusinessName => this.setState({ BusinessName })}
                      // underlineColorAndroid='transparent'
                      underlineColorAndroid='#CB8736'
                      style={styles.input}
                      autoCapitalize="none"
                      // autoFocus={true}
                    // placeholderTextColor='white'
                    />
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: Platform.OS === "android" ? 5 : 5 }}>

                    <TextInput
                      placeholder="Village/Town"
                      onChangeText={village => this.setState({ village })}
                      // underlineColorAndroid='transparent'
                      underlineColorAndroid='#CB8736'
                      style={styles.input1}
                      autoCapitalize="none"
                    // placeholderTextColor='white'
                    />

                    <TextInput
                      placeholder="District Name"
                      onChangeText={district => this.setState({ district })}
                      // underlineColorAndroid='transparent'
                      underlineColorAndroid='#CB8736'
                      style={styles.input1}
                      autoCapitalize="none"
                    // placeholderTextColor='white'
                    />

                  </View>
                  {Platform.OS === "android" ?
                  <View style={{
                          width: Platform.OS === "android" ?  310 : 355,
                          height: 50,
                          backgroundColor: '#FFFFFF',
                          margin: 8,
                          padding: 8,
                          borderRadius: 5,
                          borderColor: '#CB8736',
                          fontSize: 18,
                          fontFamily: 'Raleway-Medium',
                          fontWeight: '300'
                  }}>
                  <Picker
                        selectedValue={this.state.BusinessCategory}
                        onValueChange={BusinessCategory => this.setState({ BusinessCategory })}
                      >
                        <Picker.Item label="Select Category Below" value="" />
                        {this.renderCategories()}
                  </Picker>
                  </View>
                  : 
                  <View style={{marginBottom:5}}>
                  <Picker
                        selectedValue={this.state.BusinessCategory}
                        style={{
                          width: Platform.OS === "android" ?  310 : 355,
                          height: 50,
                          backgroundColor: '#FFFFFF',
                          margin: 8,
                          padding: 8,
                          borderRadius: 5,
                          borderColor: '#CB8736',
                          fontSize: 18,
                          fontFamily: 'Raleway-Medium',
                          fontWeight: '300'
                        }}
                        onValueChange={BusinessCategory => this.setState({ BusinessCategory })}
                      >
                        <Picker.Item label="Select Category Below" value="" />
                        {this.renderCategories()}
                  </Picker>
                  </View> 
                  }

                  <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={Description => this.setState({ Description: Description })}
                    defaultValue={this.state.Description}
                    maxLength={100}
                    placeholder={'Please enter description of your business'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                  />

                  <PhoneNumberPicker
                    countryHint={{ name: 'Uganda', cca2: 'UG', callingCode: "256" }}
                    onChange={this.PrimaryPhoneNumberPickerChanged.bind(this)}
                  />
                  {/* {this.state.mobileNumber === ''?<Text style={styles.inputErr}>{this.state.mobileNumberErr}</Text>:null} */}

                  <ScrollView horizontal={true}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={{
                          borderRadius: 5,
                          width: 155,
                          height: 120,
                          margin: 5,
                          padding: 16,
                          borderColor: '#CB8736',
                          // borderWidth: 1 / PixelRatio.get(),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#F5FCFF',
                        }}>
                          {this.state.ImageSource === null ? <Text style={{ color: '#000000', }}>Featured Photo</Text> :
                            <Image style={{
                              borderRadius: 5,
                              width: 155,
                              height: 120,
                              margin: 5,
                              padding: 16,
                              borderColor: '#CB8736',
                              // borderWidth: 1 / PixelRatio.get(),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#F5FCFF',
                            }} source={this.state.ImageSource} />
                          }
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={this.selectPhotoTapped_3.bind(this)}>
                        <View style={{
                          borderRadius: 5,
                          width: 155,
                          height: 120,
                          margin: 5,
                          padding: 16,
                          borderColor: '#CB8736',
                          // borderWidth: 1 / PixelRatio.get(),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#F5FCFF',
                        }}>
                          {this.state.ImageSourceTwo === null ? <Text style={{ color: '#000000', }}>Photo of you on Site</Text> :
                            <Image style={{
                              borderRadius: 5,
                              width: 155,
                              height: 120,
                              margin: 5,
                              padding: 16,
                              borderColor: '#CB8736',
                              // borderWidth: 1 / PixelRatio.get(),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#F5FCFF',
                            }} source={this.state.ImageSourceTwo} />
                          }
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={this.selectPhotoTapped_2.bind(this)}>
                        <View style={{
                          borderRadius: 5,
                          width: 155,
                          height: 120,
                          margin: 5,
                          padding: 16,
                          borderColor: '#CB8736',
                          // borderWidth: 1 / PixelRatio.get(),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#F5FCFF',
                        }}>
                          {this.state.ImageSourceOne === null ? <Text style={{ color: '#000000', }}>Other Photo</Text> :
                            <Image style={{
                              borderRadius: 5,
                              width: 155,
                              height: 120,
                              margin: 5,
                              padding: 16,
                              borderColor: '#CB8736',
                              // borderWidth: 1 / PixelRatio.get(),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#F5FCFF',
                            }} source={this.state.ImageSourceOne} />
                          }
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>

                  <TouchableOpacity
                    onPress={this.addBusiness}
                  >
                    <View style={{
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#F0C10B',
                      margin: 5,
                      borderRadius: 15,
                      borderWidth: 0.5,
                      borderColor: '#BABABA',
                      padding: 5,
                    }}
                    >
                      <Text
                        style={{ color: '#FFFFFF', fontFamily: 'Raleway-Bold' }}
                      >CLICK TO REGISTER</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

  renderCategories() {
    const { businessCategories } = this.state;
    let categories =[];
    for (var i = 0; i < businessCategories.length; i++) {
      categories.push(
         <Picker.Item label={businessCategories[i].category_name} value={businessCategories[i].category_id} />
        );
    }
    return categories;
  }
}

export default AddBusiness;
