import React, { Component } from "react";
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
  Text
} from "native-base";
import ImagePicker from 'react-native-image-picker';
import PhoneNumberPicker from 'react-native-country-code-telephone-input'
import Textarea from 'react-native-textarea';
import styles from "./styles";
import {ImageBackground, View, StatusBar, Image, TouchableOpacity, TextInput, PanResponder} from "react-native";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logoforflash.png");
const userpng = require('../../../assets/ic_person_outline.png');
const addImage = require('../../../assets/ic_add_photo.png');
const personImage = require('../../../assets/ic_person.png');
var sourceAsString = null;
class SignUp extends Component {
  constructor(){
    super();
    this.state = {
      ImageSource:null
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
  render() {
    return (
        <Container style={styles.container}>
          <ImageBackground style={styles.imageContainer} source = {launchscreenBg}>
            <Header style={{ backgroundColor: 'transparent'}}>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" style={{ color: '#FFFFFF' }}/>
                </Button>
              </Left>
              <Body>
                <Title style={{ color: '#FFFFFF' }}>Register User</Title>
              </Body>
              <Right />
            </Header>

            <Content padder>
              <View style={styles.formContainer}>

                <View style={styles.logoContainer}>
                  {this.state.ImageSource === null ?
                      <Image source={personImage} style={styles.logo}/>
                      :
                      <Image style={styles.logo} source={this.state.ImageSource} />
                  }
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <Image source={addImage} style={{width:40,
                      height:30,
                      resizeMode:'contain',
                      marginEnd:90,
                      marginTop:150
                    }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.form}>
                  <Form style={{margin:20}}>

                    <Item rounded style={styles.item} >
                      <Icon active name='ios-person' style={{ color: "#FFFFFF" }} />
                      <Input placeholder="Name" style={styles.textarea} placeholderTextColor='#FFFFFF'/>
                    </Item>

                    <Item rounded style={styles.item}>
                      <Icon active name='ios-mail' style={{ color: "#FFFFFF" }} />
                      <Input placeholder="Email" style={styles.textarea} placeholderTextColor='#FFFFFF'/>
                    </Item>

                    <Item rounded style={styles.item} >
                      <Icon active name='ios-lock' style={{ color: "#FFFFFF" }} />
                      <Input placeholder="password" style={styles.textarea} secureEntry={true} placeholderTextColor='#FFFFFF'/>
                    </Item>


                    <PhoneNumberPicker
                        countryHint={{ name: 'Uganda', cca2: 'UG', callingCode: "256" }}
                        onChange={this.PrimaryPhoneNumberPickerChanged.bind(this)}
                    />

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                      <Button full warning style={styles.button}>
                        <Text>Register</Text>
                      </Button>

                    </TouchableOpacity>
                    <View style ={styles.label}>
                      <Text style={{color:'#FFFFFF',marginEnd:5,}}>
                        Already having an account
                      </Text>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{color:'#FDCE00',fontWeight:'600'}}>
                          Sign In
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Form>
                </View>

                <View>
                </View>
                <View style={styles.textContainer}>
                </View>
              </View>
            </Content>
          </ImageBackground>
        </Container>
    );
  }
}

export default SignUp;
