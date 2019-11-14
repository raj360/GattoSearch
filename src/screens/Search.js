// React native and others libraries imports
import React, { Component } from 'react';
import { Container, Content, View, Header, Icon, Item, Input, Button, Grid, Col, Text, Card, Text as NBText } from 'native-base';
import { Alert, Platform, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import MapView from 'react-native-maps';
import Colors from './Colors';
import { API_KEY } from './utils/WeatherApiKey';
const domain = "http://desmediaapp.com/gatto/business";

export default class Search extends Component {
  constructor(props) {
    map = null;
    super(props);
    this.state = {
      searchText: '',
      items: [],
      error: null,
      latitude: null,
      longitude: null,
      region: {
        latitude: 48.85837009999999,
        longitude: 2.2944813000000295,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      marker: {
        title: 'STORE PARIS',
        address: '21 bis rue de la trippe, paris',
        coord: {
          latitude: 48.85837009999999,
          longitude: 2.2944813000000295
        }
      },
      AllBusinesses: [],
      isLoading: true,
      RelatedBusiness: [],
      Temperature: 0,
      WeatherCondition: null,
      IsLoading: true,
      arrayHolder: []
    };
  }

  componentDidMount() {
    fetch(domain + '/read.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ AllBusinesses: [...this.state.AllBusinesses, ...responseJson], isLoading: false }); 
        this.arrayHolder = this.state.AllBusinesses; 
      })
      .catch((error) => {
        console.error(error);
      });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("okay");
        console.log(position);
        this.setState({
          currentLati: position.coords.latitude,
          currentLong: position.coords.longitude,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
          marker: {
            title: 'GATTO KAMPALA',
            address: 'Gatto search, Kampala',
            coord: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            }
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  componentWillMount() {
    if (this.props.searchText) {
      this.setState({ searchText: this.props.AllBusinesses });
      this.search(this.props.searchText);
    }
  }


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


 searchFilterFunction = text => {    
    const newData = this.arrayHolder.filter(item => {      
      const itemData = `${item.business_name.toUpperCase()}   
      ${item.category_name.toUpperCase()} ${item.village.toUpperCase()}`;
       const textData = text.toUpperCase();
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ AllBusinesses: newData });  
  };


//   <SearchBar        
//   placeholder="Type Here..."        
//   lightTheme        
//   round        
//   onChangeText={text => this.searchFilterFunction(text)}
//   autoCorrect={false}             
// />


  render() {
    return (
      <Container style={{ backgroundColor: '#fdfdfd' }}>
        <MapView
          ref={map => { this.map = map }}
          region={this.state.region}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <MapView.Marker
            title={this.state.marker.title}
            description={this.state.marker.address}
            coordinate={this.state.marker.coord}
          />

          {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
            coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
            title={"Your Location"}
          />}
        </MapView>
        <Header
          searchBar
          rounded
          style={{ backgroundColor: Colors.navbarBackgroundColor }}
          backgroundColor={Colors.navbarBackgroundColor}
          androidStatusBarColor={Colors.statusBarColor}
          noShadow={true}
        >
          <Item>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-close" style={{ justifyContent: 'center', marginTop: Platform.OS === "android" ? -1 : -15, color: '#' }} />
            </Button>
            <Input
              placeholder="Search..."
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              style={{ marginTop: 5, borderRadius: 15 }}
            />
            <Icon name="ios-search" onPress={() => this.search(this.state.searchText)} />
          </Item>
        </Header>
          <Content padder>
            {this.renderResult()}
          </Content>
      </Container>
    );
  }
  renderResult = () => {
    return (
      <View style={styles.secondHalf}>
        <View><Text style={{ fontFamily: 'Raleway-Bold', color: '#003087', fontSize: 20, padding: 5, margin: 5 }}>All Businesses</Text></View>
        <FlatList
          data={this.state.AllBusinesses}
          renderItem={this.renderItem}
          keyExtractor={this.extractItemKey}
          style={styles.container_}
        />
      </View>
    );
  }

  search(text) {
    let AllBusinesses = [];
    let searchResult = this.state.AllBusinesses
    this.setState({ items: searchResult });
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === "ios" ? 30 : 10,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: Platform.OS === "ios" ? 70 : 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
  secondHalf: {
    flex: 30,
    justifyContent: 'center',
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
});