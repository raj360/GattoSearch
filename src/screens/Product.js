import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, StyleSheet, Alert, FlatList, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { View, Container, Content, Button, Left, Right, Icon, Grid, Col, Toast, Text as NBText, Card, Item, Thumbnail } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon_ from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import { API_KEY } from './utils/WeatherApiKey';
import getDirections from 'react-native-google-maps-directions';
import Navbar from './Navbar';
const domain = "http://desmediaapp.com/gatto/business";

import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { weatherConditions } from './utils/WeatherConditions';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      error: null,
      latitude: null,
      longitude: null,
      Latitude: this.props.navigation.state.params.Latitude,
      Longitude: this.props.navigation.state.params.Longitude,
      CategoryName: this.props.navigation.state.params.CategoryName,
      Latitude: '',
      Longitude: '',
      CategoryName: '',
      RelatedBusiness: [],
      Temperature: 0,
      WeatherCondition: null,
      IsLoading: true
    };
  }

  componentWillMount() {
    // get the product with id of this.props.product.id from your server
    this.setState({ product: _products });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLati: position.coords.latitude,
          currentLong: position.coords.longitude
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      error => {
        this.setState({
          error: 'Error Getting Weather Conditions'
        });
      }
    );
  }

  handleGetDirections(lat = this.props.navigation.state.params.Latitude, longi = this.props.navigation.state.params.Longitude) {

    this.setState({
      destLat: lat,
      destLong: longi
    });
    let finalLat = lat;
    let finalLong = longi;

    Alert.alert("Location", finalLat + " " + finalLong);

    const data = {
      source: {
        latitude: this.state.currentLati,
        longitude: this.state.currentLong
      },
      destination: {
        latitude: parseFloat(finalLat),
        longitude: parseFloat(finalLong)
      },
      params: [
        {
          key: "travelmode",
          value: "driving"
        },
        {
          key: "dir_action",
          value: "navigate"
        }
      ]
    }
    getDirections(data)
  }

  extractItemKey = (item) => `${item.id}`;
  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
        item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
    >
      <Card style={styles.card}>
        <View style={{ flexDirection: 'row', borderRadius: 10 }}>
          <View style={{ justifyContent: 'center', borderRadius: 10 }}>
            <Image source={{ uri: item.image_path_one }} style={{
              height: 70,
              alignSelf: 'stretch',
              width: 90,
              borderRadius: 10,
              padding: 3,
              margin: 3
            }} />
          </View>
          <View>
            <Text style={styles.name} numberOfLines={1}>{item.business_name}</Text>
            <Text style={styles.description} numberOfLines={1}>{"Located In " + item.village}</Text>
            <Text style={styles.post}>{item.district + " - " + item.country}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  //get the business details on select
  onSelectedItem = (business_id, business_name, description, category_id, business_phone, image_path_one, image_path_two, image_path_three, latitude, longitude, category_name, village, district, country) => {

    //fetch related businesses by category
    fetch(domain + '/read.php?category_name=' + category_name)
      .then((response) => response.json())
      .then((responseJson) => {

        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(json => {

            this.props.navigation.navigate('Product',
              {
                BusinessId: business_id,
                BusinessName: business_name,
                Description: description,
                CategoryID: category_id,
                Phone: business_phone,
                FeaturedImage: image_path_one,
                ImageTwo: image_path_two,
                ImageThree: image_path_three,
                Latitude: latitude,
                Longitude: longitude,
                CategoryName: category_name,
                Village: village,
                District: district,
                Country: country,
                RelatedBusiness: [...this.state.RelatedBusiness, ...responseJson],
                Temperature: json.main.temp,
                WeatherCondition: json.weather[0].main,
                IsLoading: false
              });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

    //get the business latitudes and longitude
    getDirections = () => {

      //fetch related businesses by category
      fetch(domain + '/read.php?category_name=' + this.props.navigation.state.params.CategoryName)
        .then((response) => response.json())
        .then((responseJson) => {
  
              this.props.navigation.navigate('Map',
                {
                  BusinessId: this.props.navigation.state.params.BusinessId,
                  BusinessName: this.props.navigation.state.params.BusinessName,
                  Latitude: this.props.navigation.state.params.Latitude,
                  Longitude: this.props.navigation.state.params.Longitude,
                  CategoryName: this.props.navigation.state.params.CategoryName,
                  Village: this.props.navigation.state.params.Village,
                  District: this.props.navigation.state.params.District,
                  RelatedBusiness: [...this.state.RelatedBusiness, ...responseJson],
                  IsLoading: false
                });
        })
        .catch((error) => {
          console.error(error);
        });
    }

  render() {
    const { isLoading } = this.state;
    var left = (
      <Left style={{ flex: 1 }}>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          transparent>
          <Icon name='ios-close' style={{ color: '#FFFFFF' }} />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button
          onPress={() => this.props.navigation.navigate('Search')}
          transparent>
          <Icon name='ios-search' style={{ color: '#FFFFFF' }} />
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('ResultList')}
          transparent>
          <Icon_ size={25} name="notifications-active" style={{ color: '#FFFFFF' }} />
        </Button>
      </Right>
    );
    return (
      <Container style={{ backgroundColor: '#EAEAEA' }}>
        <Navbar left={left} right={right}
          // title={this.props.product.title} 
          title={this.props.navigation.state.params.CategoryName.toUpperCase()}
          style={{ color: '#FFFFFF',fontFamily: 'Raleway-Bold', fontSize: 18 }}
        />
        <Content padder>
          <View style={styles.firstHalf}>
            <View style={styles.container}>

              <View style={styles.imgContainer}>
                <TouchableOpacity onPress={this._renderItem}>
                  <View style={{
                    overflow: "hidden",
                    borderRadius: 15,
                    opacity: 1.5
                  }}>
                    <Image source={{ uri: this.props.navigation.state.params.FeaturedImage }} style={{
                      height: '100%',
                      alignSelf: 'stretch'
                    }} resizeMode="cover" />
                  </View>
                </TouchableOpacity>
          {/* <View style={{
                overflow: "hidden",
                borderRadius: 15,
                opacity: 1.5
              }}>
          <Carousel
            data={this.state.product.images}
            renderItem={this._renderItem}
            ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            enableSnap={true}
          />
          <Pagination
            dotsLength={this.state.product.images.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: 0, marginTop: -15 }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          </View> */}
              </View>

              <View style={styles.gridView}>
                {/* <View style={{justifyContent:'center', alignItems: 'center', height: '100%', backgroundColor:'#EAEAEA' }}> */}
                <View style={{ flex: 1 }}>
                  <View style={styles.title}>
                    <Grid>
                      <Col>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Raleway-Bold', color: '#003087' }}>{this.props.navigation.state.params.BusinessName}</Text>
                      </Col>
                      <Col>
                        <View style={{ flexDirection: 'row', margin: 2, padding: 2 }}>
                          <Image
                            source={require('../../assets/icons8-location-100.png')}
                            style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                          <Text style={{ fontSize: 15, fontFamily: 'Raleway-Medium', color: "#95a5a6" }}>{this.props.navigation.state.params.Village + " " + this.props.navigation.state.params.District + " " + this.props.navigation.state.params.Country}</Text>
                        </View>
                      </Col>
                    </Grid>
                  </View>

                  <View style={styles.description}>
                    <NBText style={{ fontSize: 15, fontFamily: 'Raleway-Light', color: '#003087' }}>
                      {this.props.navigation.state.params.Description}
                    </NBText>
                  </View>

                  <View style={styles.imgWeather}>
                    {isLoading ? (
                      <ActivityIndicator size="large" color='#F0C10B' />
                    ) : (
                        <Weather
                          weather={this.props.navigation.state.params.WeatherCondition}
                          temperature={this.props.navigation.state.params.Temperature}
                        />
                      )}
                  </View>

                  <View style={styles.footer}>
                    <Grid style={{ height: '100%', alignSelf: 'stretch' }}>
                      <Col>
                        <Button block
                         onPress={this.getDirections
                         //.bind(this, 
                        //  item.business_id, 
                        //  item.business_name,
                        //  item.description, 
                        //  item.category_id, 
                        //  item.business_phone, 
                        //  item.image_path_one, 
                        //  item.image_path_two, 
                        //  item.image_path_three, 
                        //  item.latitude, 
                        //  item.longitude, 
                        //  item.category_name, 
                        //  item.village, item.
                        //  district, 
                        //  item.country)
                        }
                          // onPress={() => this.props.navigation.navigate('Map')}
                          style={{ backgroundColor: '#ffffff', borderRadius: 1, borderWidth: 0.5, borderColor: '#EAEAEA' }}>
                          <Text style={{ fontSize: 15, color: "#95a5a6", marginLeft: 3, fontFamily: 'Raleway-Medium' }}>Get Directions</Text>
                        </Button>
                      </Col>
                      <Col>
                        <Button block
                          // onPress={this.addToCart.bind(this)}
                          style={{ backgroundColor: '#ffffff', marginLeft: 3, borderRadius: 1, borderWidth: 0.5, borderColor: '#EAEAEA' }}
                        >
                          <Text onPress={() => Communications.phonecall('+256703888572', true)} style={{ fontSize: 15, color: "#95a5a6", marginLeft: 3, fontFamily: 'Raleway-Medium' }}>Claim Business</Text>
                        </Button>
                      </Col>
                      <Col>
                        <View>
                          <Button block
                            //onPress={() => Communications.phonecall('0753929089', true)}
                            style={{ backgroundColor: '#ffffff', marginLeft: 3, borderRadius: 1, borderWidth: 0.5, borderColor: '#EAEAEA' }}
                          >
                            <Text onPress={() => Communications.phonecall(this.props.navigation.state.params.Phone, true)} style={{ fontSize: 15, color: "#95a5a6", marginLeft: 3, fontFamily: 'Raleway-Medium' }}
                            >Call Now</Text>
                          </Button>
                        </View>
                      </Col>
                    </Grid>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.secondHalf}>
            <View><Text style={{ fontFamily: 'Raleway-Bold', color: '#003087', fontSize: 20, padding: 5, margin: 5 }}>Related</Text></View>
            <FlatList
              data={this.props.navigation.state.params.RelatedBusiness}
              renderItem={this.renderItem}
              keyExtractor={this.extractItemKey}
              style={styles.container_}
            />
          </View>

        </Content>
      </Container>
    );
  }

  search(array, object) {
    for (var i = 0; i < array.length; i++)
      if (JSON.stringify(array[i]) === JSON.stringify(object))
        return true;
    return false;
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={index}
      // onPress={() => this.openGallery(index)}
      >
        <Image
          source={{ uri: item }}
          style={{ width: Dimensions.get('window').width, height: 350 }}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
    );
  }
}

const _products = {
  images: [
    'https://res.cloudinary.com/lapisha-consulting/image/upload/v1565428490/jkastrenakes_161222_1339_A_0018__1_.0.0_vosqe6.jpg',
    'https://www.lapisha.com/rentalmartapi/img/artem-bel.png',
    'https://res.cloudinary.com/lapisha-consulting/image/upload/v1565429279/561854ec-01f9-49b0-945b-b44d59de065b_1.05b2a9f706f45625b8a95a05338d87ea_kvh8gi.jpg'
  ]
};

const Weather = ({ weather, temperature }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 2, marginLeft: 2 }}>
          <Iconn size={35} name={weatherConditions[weather].icon} color={'#fff'} style={{ marginLeft: 45 }} />
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 2, marginLeft: 2 }}>
          <Text style={styles._title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    justifyContent: 'center',
    // alignContent:'center',
    // alignItems:'center'
    // height:50,
    height: 432,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(149, 165, 166, 0.3)'
  },
  imgContainer: {
    flex: 50,
    margin: 2,
    padding: 2,
    // backgroundColor:'#EAEAEA'
    backgroundColor: 'transparent'
  },
  title: {
    flex: 20,
    margin: 2,
    padding: 2,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  // description: {
  //   flex: 25,
  //   margin: 2,
  //   padding: 2,
  //   justifyContent: 'center',
  //   backgroundColor: '#FFFFFF'
  // },
  imgWeather: {
    flex: 35,
    margin: 2,
    padding: 2,
    justifyContent: 'center',
    // backgroundColor: '#EEEEEE'
    backgroundColor: 'transparent'
  },
  footer: {
    flex: 20,
    margin: 2,
    padding: 2,
    justifyContent: 'center',
    // backgroundColor: '#EAEAEA'
    backgroundColor: 'transparent'
  },
  gridView: {
    flex: 50,
    margin: 5,
    padding: 5,
    backgroundColor: '#FFFFFF'
  },
  firstHalf: {
    flex: 70,
    // padding: 5,
    // margin: 5,
    justifyContent: 'center',
    // backgroundColor:'orange'
  },
  secondHalf: {
    flex: 30,
    // padding: 5,
    // margin: 5,
    justifyContent: 'center',
  },
  card: {
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'stretch'
  },
  post: {
    marginTop: 5,
    marginLeft: 10
  },
  container_: {
    backgroundColor: '#EEEEEE',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  description: {
    marginTop: 5,
    fontFamily: 'Raleway-Light',
    color: '#003087',
    marginLeft: 10
  },
  name: {
    fontFamily: 'Raleway-Bold',
    color: '#003087',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5
  },
  weatherContainer: {
    flex: 35,
    justifyContent: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    borderRadius: 10
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tempText: {
    fontSize: 29,
    color: '#fff',
    fontFamily: 'Raleway-Medium'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 15,
    marginBottom: 10
  },
  _title: {
    fontSize: 22,
    color: '#fff',
    justifyContent: 'center',
    fontFamily: 'Raleway-Medium'
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    justifyContent: 'center',
    fontFamily: 'Raleway-Light'
  }
});
