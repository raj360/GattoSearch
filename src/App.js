import React from "react";
import { Root } from "native-base";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import Home from "./screens/home/";
import SignUp from "./screens/Register/SignUp";
import AddBusiness from "./screens/Register/AddBusiness";
import ForgotPassword from "./screens/Register/ForgotPassword";
import Login from "./screens/Login";
import ResultList from "./screens/results/list-avatar";
import SideBar from "./screens/sidebar";
import WelcomeScreen from "./screens/WelcomeScreen";
import Navbar from "./screens/Navbar";
import Search from "./screens/Search";
import Map from "./screens/Map";
import Product from "./screens/Product";
import Bar from "./screens/categories/bar";
import Saloon from "./screens/categories/saloon";
import Shipping from "./screens/categories/shipping";
import Shopping from "./screens/categories/shopping";
import Restaurant from "./screens/categories/restaurant";
import Hospital from "./screens/categories/hospital";
import CarWash from "./screens/categories/carwash";

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    SignUp: { screen: SignUp },
    Login: { screen: Login },
    ResultList: { screen: ResultList },
    AddBusiness: { screen: AddBusiness },
    ForgotPassword: { screen: ForgotPassword },
    WelcomeScreen: { screen: WelcomeScreen },
    Navbar: { screen: Navbar },
    Search: { screen: Search },
    Product: { screen: Product },
    Bar: { screen: Bar },
    CarWash: { screen: CarWash },
    Hospital: { screen: Hospital },
    Restaurant: { screen: Restaurant },
    Saloon: { screen: Saloon },
    Shipping: { screen: Shipping },
    Shopping: { screen: Shopping }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    SignUp: { screen: SignUp },
    Login: { screen: Login },
    ResultList: { screen: ResultList },
    AddBusiness: { screen: AddBusiness },
    ForgotPassword: { screen: ForgotPassword },
    WelcomeScreen: { screen: WelcomeScreen },
    Navbar: { screen: Navbar },
    Search: { screen: Search },
    Product: { screen: Product },
    Map: { screen: Map },
    Bar: { screen: Bar },
    CarWash: { screen: CarWash },
    Hospital: { screen: Hospital },
    Restaurant: { screen: Restaurant },
    Saloon: { screen: Saloon },
    Shipping: { screen: Shipping },
    Shopping: { screen: Shopping }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
