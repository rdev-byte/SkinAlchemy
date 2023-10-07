import React, { useEffect } from 'react';
import { View, Platform, Alert, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { fetchServices } from './path/to/servicesSlice'; // Update with your actual path
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ServicesScreen from './screens/ServicesScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import NetInfo from '@react-native-community/netinfo';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  headerTintColor: '#fff',
  headerStyle: { backgroundColor: '#5637DD' },
};

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name='Home'
      component={HomeScreen}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => (
          <Icon
            name='home'
            type='font-awesome'
            iconStyle={{ marginLeft: 10, color: '#fff', fontSize: 24 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const LoginNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name='Login'
      component={LoginScreen}
      options={({ navigation, route }) => ({
        headerTitle: getFocusedRouteNameFromRoute(route),
        headerLeft: () => (
          <Icon
            name={
              getFocusedRouteNameFromRoute(route) === 'Register'
                ? 'user-plus'
                : 'sign-in'
            }
            type='font-awesome'
            iconStyle={{ marginLeft: 10, color: '#fff', fontSize: 24 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const ServicesNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen
      name='Services'
      component={ServicesScreen}
      options={({ navigation }) => ({
        title: 'Services',
        headerLeft: () => (
          <Icon
            name='briefcase'
            type='font-awesome'
            iconStyle={{ marginLeft: 10, color: '#fff', fontSize: 24 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image source={logo} style={styles.drawerImage} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>SpaAlchemy</Text>
      </View>
    </View>
    <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
  </DrawerContentScrollView>
);

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const checkInitialConnection = async () => {
      try {
        const connectionInfo = await NetInfo.fetch();
        let connectionMsg = 'You are now connected to an active network.';
        switch (connectionInfo.type) {
          case 'none':
            connectionMsg = 'No network connection is active.';
            break;
          case 'unknown':
            connectionMsg = 'The network connection state is now unknown.';
            break;
          case 'cellular':
            connectionMsg = 'You are now connected to a cellular network.';
            break;
          case 'wifi':
            connectionMsg = 'You are now connected to a WiFi network.';
            break;
        }
        Platform.OS === 'ios'
          ? Alert.alert(
              'Initial Network Connectivity Type:',
              connectionInfo.type
            )
          : ToastAndroid.show(
              'Initial Network Connectivity Type: ' + connectionInfo.type,
              ToastAndroid.LONG
            );
      } catch (error) {
        console.log('Error fetching initial net info:', error);
      }
    };

    checkInitialConnection();

    const unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      handleConnectivityChange(connectionInfo);
    });

    return unsubscribeNetInfo;
  }, []);

  const handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = 'You are now connected to an active network.';
    switch (connectionInfo.type) {
      case 'none':
        connectionMsg = 'No network connection is active.';
        break;
      case 'unknown':
        connectionMsg = 'The network connection state is now unknown.';
        break;
      case 'cellular':
        connectionMsg = 'You are now connected to a cellular network.';
        break;
      case 'wifi':
        connectionMsg = 'You are now connected to a WiFi network.';
        break;
    }
    Platform.OS === 'ios'
      ? Alert.alert('Connection change:', connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName='Home'
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundColor: '#CEC8FF' }}
      >
        <Drawer.Screen
          name='Login'
          component={LoginNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='Home'
          component={HomeNavigator}
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => (
              <Icon
                name='home'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name='Services'
          component={ServicesNavigator}
          options={{
            title: 'Services',
            drawerIcon: ({ color }) => (
              <Icon
                name='briefcase'
                type='font-awesome'
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;
