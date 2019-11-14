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
import { ImageBackground, View, StatusBar, TouchableOpacity } from "react-native";
// import LinearGradient from 'react-native-linear-gradient';

const launchscreenBg = require("../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../assets/logoforflash.png");

class Login extends Component {
  SampleFunction = () => {

    Alert.alert("Gradient Button Clicked :)");
  }
  render() {
    return (
      <Container style={styles.container}>
        {/* <ImageBackground source={launchscreenBg} style={styles.imageContainer}> */}
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
          <View
            style={{
              // alignItems: "center",
              justifyContent: 'center',
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <View style={styles.logoContainer}>
              <ImageBackground source={launchscreenLogo} style={styles.logo} />
            </View>
            <View style={{ marginTop: 105 }} />

            <View style={{ marginBottom: 35, width: '100%', flexDirection: 'row', textItems: 'center' }}>
              <Text style={{ fontSize: 17, color: '#687373' }}>Welcome to, </Text>
              <Text style={{ fontSize: 21, fontWeight: 'bold', color: '#FFFFFF' }}> GATTO SEARCH </Text>
            </View>
          </View>
          <Form>
            <Item rounded style={{ padding: 5, margin: 5 }}>
              <Icon active name='ios-mail' style={{ color: "#687373" }} />
              <Input placeholder="Email" />
            </Item>
            <Item rounded style={{ padding: 5, margin: 5 }}>
              <Icon active name='ios-lock' style={{ color: "#687373" }} />
              <Input placeholder="Password" secureEntry={true} />
            </Item>
            <View style={{ marginTop: 8 }} />
            <Right>
              <View><Text style={{ color: '#EAEAEA', textAlign: 'right' }} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text></View>
            </Right>
            <Button full style={styles.mt15}>
              <Text>Login</Text>
            </Button>

            <View style={{ marginTop: 40 }} />
            <View style={{ alignItems: 'flex-end', alignItems: 'baseline' }}>
              <Text style={{ color: 'white', textAlign: 'center' }}
                onPress={() => this.props.navigation.navigate('SignUp')}>Create New Account</Text></View>
          </Form>
        </Content>
        {/* </ImageBackground> */}
      </Container>
    );
  }
}

export default Login;
