import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Container, Content, Button, Left, Right, Icon, Grid, Col, Toast, Card, Item, Thumbnail } from 'native-base';
import MapViewDirections from 'react-native-maps-directions';
import Icon_ from 'react-native-vector-icons/MaterialIcons';
import Navbar from './Navbar';
const domain = "http://desmediaapp.com/gatto/business";

import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0.2986;
const LONGITUDE = 31.7656;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyButvYGb9BBX-p5ONosOTgzf-r0gQdOfPM';

class Search extends Component {

  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      latitude: null,
      longitude: null,
      Latitude: null,
      Longitude: null,
      CategoryName: '',
      // Latitude: this.props.navigation.state.params.Latitude,
      // Longitude: this.props.navigation.state.params.Longitude,
      // CategoryName: this.props.navigation.state.params.CategoryName,
      coordinates: [
        {
          latitude: 0.2986,
          longitude: 31.7656,
        },
        {
          latitude: 0.31628,
          longitude: 32.58219, 
        },
      ],
    };

    this.mapView = null;
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          // currentLati: position.coords.latitude,
          // currentLong: position.coords.longitude
          coordinates: [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              latitude: parseFloat(this.props.navigation.state.params.Latitude),
              longitude: parseFloat(this.props.navigation.state.params.Longitude),
            },
          ]
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

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  setDistance = (distance,duration_in_traffic) => {
    this.setState({distance:parseFloat(distance),durationInTraffic:parseInt(duration_in_traffic)});
    //Alert.alert(this.state.distance+" "+durationInTraffic);
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
      <MapView
        initialRegion={{
          latitude:  LATITUDE,
          longitude:  LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={c => this.mapView = c}
        onPress={this.onMapPress}
      >
        {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        {(this.state.coordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
            waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              this.setState({distance:parseFloat(result.distance),durationInTraffic:parseInt(result.duration)})
              // console.log('Distance: ${result.distance}' + result.distance + ' km')
              // console.log('Duration: ${result.duration}' + result.duration + ' min.')
              
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
        <View style={styles.versionBox}>
           <Text style={styles.versionText}>Distance {this.state.distance+" km"}, Duration: {this.state.durationInTraffic+" min"}</Text>
         </View>
      </View>
    );
  }
}

export default Search;

const styles = StyleSheet.create({
  versionBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  versionText: {
    padding: 4,
    backgroundColor: '#FFF',
    color: '#000',
  },
  //   container: {
//     position: 'absolute',
//     top: Platform.OS === "ios" ? 30 : 10,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: Platform.OS === "ios" ? 70 : 10,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
});













