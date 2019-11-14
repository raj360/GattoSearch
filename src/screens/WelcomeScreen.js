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

class WelcomeScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Register User</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Form>
            <Item rounded>
              <Input placeholder="TextBox" />
            </Item>

          <Button full warning style={styles.mt15}>
            <Text>Turn On GPS</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default WelcomeScreen;
