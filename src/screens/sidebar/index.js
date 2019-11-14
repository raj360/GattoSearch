import React, { Component } from "react";
import { Image, Platform } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logoforflash.png");
const datas = [
  {
    name: "My Profile",
    route: "SignUp",
    icon: "person"
  },
  {
    name: "Events",
    route: "ResultList",
    icon: "arrow-up"
  },
  {
    name: "Add Business",
    route: "AddBusiness",
    icon: "phone-portrait",
    bg: "#C5F442"
  },
  {
    name: "Rate Us",
    route: "ResultList",
    icon: "star-half"
  },
  {
    name: "Share",
    route: "ResultList",
    icon: "share"
  },
  {
    name: "LogOut",
    route: "Login",
    icon: "arrow-up"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container style={{ backgroundColor:'orange' }}>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "orange", top: Platform.OS === "ios" ? -50 : -1, borderRadius:15}}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#FFFFFF", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
