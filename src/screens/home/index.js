import React, { Component } from 'react';
import {
    Platform,
    Image,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Alert,
    FlatList,
    ActivityIndicator,
    BackHandler,
    DeviceEventEmitter
} from 'react-native';
import {
    Icon, Text as NBText, Fab, IconNB
} from "native-base";

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { FlatGrid } from 'react-native-super-grid';
import Icon_ from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import styles from "../home/styles";
import { API_KEY } from '../utils/WeatherApiKey';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
const domain = "http://desmediaapp.com/gatto/business";

const _DATA = [
    {
        id: 1,
        title: 'Trending',
    },
    {
        id: 2,
        title: 'Weekly',
    },
    {
        id: 3,
        title: 'Monthly',
    },
];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPosition: 'unknown',
            active: false,
            isLoading: true,
            weekly_items: [],
            monthly_items: [],
            trending_items: [],
            isActionButtonVisible: true,
            _listViewOffset: 0,
            RelatedBusiness: [],
            Temperature: 0,
            WeatherCondition: null,
            IsLoading: true
        };
    }

    componentDidMount() {
        if(Platform.OS === "android"){
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<font color='#000000', fontFamily: 'Raleway-Bolb', borderRadius: 10,>Allow GattoSearch Use Location?</font>",
                ok: "YES",
                cancel: "NO",
                style: { 
                    borderRadius: 10,
                    backgroundColor: '#F0C10B',
                    
                    positiveButtonTextColor: '#ffffff',
                    positiveButtonBackgroundColor: '#5fba7d',
                    
                    negativeButtonTextColor: '#ffffff',
                    negativeButtonBackgroundColor: '#ba5f5f'
                }
            }).then(function(success) {
                console.log(success);
            }).catch((error) => {
                console.log(error.message);
            });
            DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
                console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
            });
           
        }
    }
    componentWillUnmount() {
        if(Platform.OS === "android"){
        // used only when "providerListener" is enabled
        LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
        }
    } 

    componentWillMount() {
        fetch(domain + '/read.php?catId=trending')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ trending_items: [...this.state.trending_items, ...responseJson], isLoading: false });
            })
            .catch((error) => {
                console.error(error);
            });

        fetch(domain + '/read.php?catId=weekly')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ weekly_items: [...this.state.weekly_items, ...responseJson], isLoading: false });
            })
            .catch((error) => {
                console.error(error);
            });

        fetch(domain + '/read.php?catId=monthly')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ monthly_items: [...this.state.monthly_items, ...responseJson], isLoading: false });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    //selecting categories
    saloonSelected = () => {
        this.props.navigation.navigate('Saloon');
    }
    shoppingSelected = () => {
        this.props.navigation.navigate('Shopping');
    }
    barSelected = () => {
        this.props.navigation.navigate('Bar');
    }
    restaurantSelected = () => {
        this.props.navigation.navigate('Restaurant');
    }
    carWashSelected = () => {
        this.props.navigation.navigate('CarWash');
    }
    hospitalSelected = () => {
        this.props.navigation.navigate('Hospital');
    }
    shippingSelected = () => {
        this.props.navigation.navigate('Shipping');
    }
    moreSelected = () => {
        this.props.navigation.navigate('Home');
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
    render() {
        const { onScroll = () => {
            // Alert.alert('On Scroll In action');
            return (
                <View style={{ width: 100, height: 100 }}>
                    <Fab
                        active={this.state.active}
                        direction="left"
                        containerStyle={{ backgroundColor: '#000000' }}
                        style={{ backgroundColor: "#5067FF" }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}
                    >
                        <IconNB name="md-share" />
                    </Fab>
                </View>
            );
        } } = this.props;
        //return/display products/services in a list view
        return (
            <FlatList
                data={_DATA}
                keyExtractor={this.extractItemKey}
                renderItem={({ item, index }) => {
                    if (index == 0) {
                        if (this.state.isLoading) {
                            return (<ActivityIndicator size="large" color='#F0C10B' />);
                        } else {
                            return (
                                <View style={styles.row}>
                                    <Text style={styles.rowText}>
                                        {item.title}
                                    </Text>
                                    {this.renderTrendingItems()}
                                </View>
                            );
                        }
                    } else {
                        if (index == 1) {
                            if (this.state.isLoading) {
                                return (<ActivityIndicator size="large" color='#F0C10B' />);
                            } else {
                                return (
                                    <View style={styles.row}>
                                        <Text style={styles.rowText}>
                                            {item.title}
                                        </Text>
                                        {this.renderWeeklyItems()}
                                    </View>
                                );
                            }
                        } else {

                            if (index == 2) {
                                if (this.state.isLoading) {
                                    return (<ActivityIndicator size="large" color='#F0C10B' />);
                                } else {
                                    return (
                                        <View style={styles.row}>
                                            <Text style={styles.rowText}>
                                                {item.title}
                                            </Text>
                                            {this.renderMonthlyItems()}
                                        </View>
                                    );
                                }
                            } else {

                            }

                        }

                    }
                }
                }

                // function for on scroll up and down begins here
                renderScrollComponent={props => (
                    <ParallaxScrollView
                        onScroll={onScroll}
                        headerBackgroundColor="#333"
                        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                        backgroundSpeed={10}

                        renderBackground={() => (
                            <View key="background">
                                <Image
                                    source={{
                                        uri: 'https://www.lapisha.com/rentalmartapi/img/slider-03.png',
                                        width: window.width,
                                        height: PARALLAX_HEADER_HEIGHT
                                    }} />
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                    width: window.width,
                                    backgroundColor: 'rgba(0,0,0,.4)',
                                    height: PARALLAX_HEADER_HEIGHT
                                }} />
                            </View>
                        )}

                        // render gatto logo on scroll up
                        renderForeground={() => (
                            <View key="parallax-header" style={styles.parallaxHeader}>

                                <View style={styles.fixedSectionMenu}>
                                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                        <View><Icon active name="menu" style={{ color: 'white' }} /></View>
                                    </TouchableOpacity>
                                </View>
                                {/* Gatto flash image */}
                                <Image style={styles.avatar} source={{
                                    uri: 'https://www.lapisha.com/rentalmartapi/img/logoflash-2.png',
                                    width: AVATAR_SIZE_WIDTH,
                                    height: AVATAR_SIZE_HEIGHT
                                }} />

                                {/* gatto_navigation menu begins here */}
                                <View style={styles.navigMenu}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: 90, height: 90, marginTop: -45 }}>
                                        <Fab
                                            active={this.state.active}
                                            // direction="left"
                                            containerStyle={{ backgroundColor: 'transparent' }}
                                            style={{ backgroundColor: "#F0C10B" }}
                                            // position="bottomRight"
                                            // onPress={() => this.comingSoon()}
                                            onPress={() => this.props.navigation.navigate('Search')}
                                        >
                                            <IconNB name="md-search" onPress={() => this.props.navigation.navigate('Search')} />
                                        </Fab>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginRight: 5, marginTop: -18, marginLeft: 5, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.saloonSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/icons8-barber-scissors.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>Saloon</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.shoppingSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/icons8-buying-100.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>Shopping</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.barSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/icons8-bar.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>Bar</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.restaurantSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/icons8-waiter.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>Restaurant</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 15, marginRight: 5, marginLeft: 5, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.carWashSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/icons8-carpool-100.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>Car wash</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.hospitalSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/hospital.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>Hospital</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.shippingSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/icons8-shipped-100.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>Shipping</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.moreSelected()}>
                                            <View style={styles.menuItem}>
                                                <View>
                                                    <Image
                                                        source={require('../../../assets/more.png')}
                                                        style={{ width: 50, height: 50, borderColor: 'transparent' }} />
                                                </View>
                                                <Text numberOfLines={1} style={styles.iconText}>More</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* gatto_navigation menu ends here */}
                            </View>
                        )}

                        // gatto floating header
                        renderStickyHeader={() => (
                            <View key="sticky-header" style={styles.stickySection}>
                                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                                            <View><Icon active name="menu" onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white', margin: 10 }} /></View>
                                        </TouchableOpacity>
                                        <View><Text style={styles.stickySectionText}>GATTO</Text></View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}><View><Icon active name="search" style={{ color: 'white', margin: Platform.OS === "ios" ? 5 : -3, padding: 5 }} /></View></TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}

                        // rendering gatto search notification and search links
                        renderFixedHeader={() => (
                            <View key="fixed-header" style={styles.fixedSection}>
                                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}><View><Icon active name="search" style={{ color: 'white', margin: 5, padding: 5 }} /></View></TouchableOpacity> */}
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ResultList')}><View><Icon_ size={25} name="notifications-active" style={{ color: 'white', margin: Platform.OS === "ios" ? 5 : -3, padding: 5, justifyContent: 'center' }} /></View></TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            // function for on scroll up and down ends here
            />
        );
    }

    // function to display trending businesses
    renderTrendingItems = () => {
        let trending_items = [];
        let stateItems = this.state.trending_items
        return (
            <FlatGrid
                items={stateItems}
                style={styles.gridView}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <View style={[styles.itemContainer, { backgroundColor: '#FFFFFF', marginBottom: 10 }]}>
                        <View style={styles.imgSection}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity
                                    onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                        item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                >
                                    <ImageBackground source={{ uri: item.image_path_one }} style={styles.image} resizeMode="cover">
                                        <View style={{
                                            backgroundColor: 'transparent',
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            flexDirection: 'row'
                                        }}>
                                            <TouchableOpacity
                                                onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                                    item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                            // onPress={() => this.setState({ visibleModal: 'itemOptions' })}
                                            >
                                                <View><Icon_ name='more-vert' size={25} style={{ color: '#FFFFFF', alignSelf: 'flex-end' }} /></View>
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.sectionDetails}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.itemTitle}><Text
                                    onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                        item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                    style={styles.itemName}>{item.business_name}</Text></View>
                                <View style={styles.itemDesc}><Text style={styles.itemDescription}>{item.description}</Text></View>

                                <View style={styles.itemRatingIcons}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                    </View>

                                </View>
                                <View style={styles.itemReviewsRatings}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View><Text style={styles.ratReviewText}>Rating: 5</Text></View>
                                        <View><Text style={styles.ratReviewText}>Reviews: 0</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />);
    }


    // function to display trending businesses
    renderWeeklyItems = () => {
        let weekly_items = [];
        let stateItems = this.state.weekly_items
        return (
            <FlatGrid
                items={stateItems}
                style={styles.gridView}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <View style={[styles.itemContainer, { backgroundColor: '#FFFFFF', marginBottom: 10 }]}>
                        <View style={styles.imgSection}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity
                                    onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                        item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                >
                                    <ImageBackground source={{ uri: item.image_path_one }} style={styles.image} resizeMode="cover">
                                        <View style={{
                                            backgroundColor: 'transparent',
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            flexDirection: 'row'
                                        }}>
                                            <TouchableOpacity
                                                onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                                    item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                            // onPress={() => this.setState({ visibleModal: 'itemOptions' })}
                                            >
                                                <View><Icon_ name='more-vert' size={25} style={{ color: '#FFFFFF', alignSelf: 'flex-end' }} /></View>
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.sectionDetails}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.itemTitle}><Text
                                    onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                        item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                    style={styles.itemName}>{item.business_name}</Text></View>
                                <View style={styles.itemDesc}><Text style={styles.itemDescription}>{item.description}</Text></View>

                                <View style={styles.itemRatingIcons}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                    </View>

                                </View>
                                <View style={styles.itemReviewsRatings}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View><Text style={styles.ratReviewText}>Rating: 5</Text></View>
                                        <View><Text style={styles.ratReviewText}>Reviews: 0</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />);
    }

    // function to display trending businesses
    renderMonthlyItems = () => {
        let monthly_items = [];
        let stateItems = this.state.monthly_items
        return (
            <FlatGrid
                items={stateItems}
                style={styles.gridView}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <View style={[styles.itemContainer, { backgroundColor: '#FFFFFF', marginBottom: 10 }]}>
                        <View style={styles.imgSection}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity
                                    onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                        item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                >
                                    <ImageBackground source={{ uri: item.image_path_one }} style={styles.image} resizeMode="cover">
                                        <View style={{
                                            backgroundColor: 'transparent',
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            flexDirection: 'row'
                                        }}>
                                            <TouchableOpacity
                                                onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                                    item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                            // onPress={() => this.setState({ visibleModal: 'itemOptions' })}
                                            >
                                                <View><Icon_ name='more-vert' size={25} style={{ color: '#FFFFFF', alignSelf: 'flex-end' }} /></View>
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.sectionDetails}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.itemTitle}><Text
                                    onPress={this.onSelectedItem.bind(this, item.business_id, item.business_name,
                                        item.description, item.category_id, item.business_phone, item.image_path_one, item.image_path_two, item.image_path_three, item.latitude, item.longitude, item.category_name, item.village, item.district, item.country)}
                                    style={styles.itemName}>{item.business_name}</Text></View>
                                <View style={styles.itemDesc}><Text style={styles.itemDescription}>{item.description}</Text></View>

                                <View style={styles.itemRatingIcons}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/heart_rates-235.png')}
                                                style={{ width: 20, height: 20, borderColor: 'transparent' }} />
                                        </View>
                                    </View>

                                </View>
                                <View style={styles.itemReviewsRatings}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View><Text style={styles.ratReviewText}>Rating: 5</Text></View>
                                        <View><Text style={styles.ratReviewText}>Reviews: 0</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />);
    }
}

// logo and background image constants used
const AVATAR_SIZE_HEIGHT = 120;
const AVATAR_SIZE_WIDTH = 190;
const PARALLAX_HEADER_HEIGHT = 430;
const STICKY_HEADER_HEIGHT = Platform.OS === "ios" ? 80 : 60;
export default Home;