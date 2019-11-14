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

class ForgotPassword extends Component {
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
            <Title style={{ color: '#FFFFFF' }}>Forgot Password</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Form>
            <Item rounded>
              <Input placeholder="Rounded Textbox" />
            </Item>

          <Button full warning style={styles.mt15}>
            <Text>Submit</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default ForgotPassword;
