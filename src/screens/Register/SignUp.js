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
import styles from "./styles";
import { ImageBackground, View, StatusBar } from "react-native";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logoforflash.png");

class SignUp extends Component {
  render() {
    return (
      <Container style={styles.container}>
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
              <ImageBackground source={launchscreenLogo} style={styles.logo} />
            </View>

            <View>
            </View>

            <View style={styles.form}>
            <Form>
            <Item rounded>
              <Input placeholder="Name" />
            </Item>
            <Item rounded>
              <Input placeholder="Phone Number" />
            </Item>

          <Button full warning style={styles.mt15}>
            <Text>Register</Text>
          </Button>
          </Form>
            </View>

            <View>
            </View>

            <View style={styles.textContainer}>
            </View>

          </View>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
