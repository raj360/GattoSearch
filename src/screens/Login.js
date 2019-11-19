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
  Text,
  H3,
} from "native-base";
import styles from "./styles";
import { ImageBackground, View, StatusBar, TouchableOpacity,Image } from "react-native";
// import LinearGradient from 'react-native-linear-gradient';

const launchscreenBg = require("../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../assets/logoforflash.png");

class Login extends Component {
  SampleFunction = () => {

    Alert.alert("Gradient Button Clicked :)");
  };
  render() {
    return (
        <Container style={styles.container}>
          <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
            <Header style={{ backgroundColor: 'transparent' }}>
              <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrow-back" style={{ color: '#FFFFFF' }} />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: '#FFFFFF' }}>Login</Title>
              </Body>
              <Right />
            </Header>

            <Content padder>
              <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                  <Image source={launchscreenLogo} style={styles.logo} />
                </View>


                <View style={{ marginTop: 30 }} />

                <View style={{ marginBottom: 35, width: '100%', flexDirection: 'row',justifyContent:'center' }}>
                  <Text style={{ fontSize: 20, color: '#FFFFFF',opacity:0.4 }}>Welcome to </Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}> GATTO SEARCH </Text>
                </View>
              </View>

              <View style={styles.form}>
                <Form style={{margin:20}}>
                  <Item rounded style={styles.item}>
                    <Icon active name='ios-mail' style={{ color: "#FFFFFF" }} />
                    <Input placeholder="Email" placeholderTextColor='#FFFFFF' style={styles.textarea}/>
                  </Item>

                  <Item rounded style={styles.item} >
                    <Icon active name='ios-lock' style={{ color: "#FFFFFF" }} />
                    <Input placeholder="password" style={styles.textarea} secureEntry={true} placeholderTextColor='#FFFFFF'/>
                  </Item>

                  <View style={{ marginTop: 8 }} />
                  <View style={{justifyContent:'flex-start'}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ForgotPassword')}
                    >
                      <Text style={{ color: '#EAEAEA', textAlign: 'right' }} >Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={{marginTop:10}} onPress={() => this.props.navigation.navigate('Home')}>
                    <Button full warning style={styles.button}>
                      <Text>Login</Text>
                    </Button>
                  </TouchableOpacity>
                  <View style={{ marginTop: 30 }} />
                  <View style ={styles.label}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                      <Text style={{color:'#FFFFFF',marginEnd:5,marginTop:40,  borderBottomWidth:2,
                        borderBottomColor:'#FFFFFF',}}>
                        Create New Account
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Form>
              </View>
            </Content>
          </ImageBackground>
        </Container>
    );
  }
}

export default Login;
