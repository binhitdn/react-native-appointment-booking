import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HandBookScreen from './Screen/HandBookScreen';
import HomeScreen from './Screen/HomeScreen';
import ProfileScreen from './Screen/ProfileScreen';
import ScheduleScreen from './Screen/ScheduleScreen';
import SpecialtiesScreen from './Screen/SpecialtiesScreen';
import SvgUri, { Circle } from 'react-native-svg';
import { Image } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';


const Tab = createMaterialBottomTabNavigator();

function MyTabs(

) {







  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="green"
      inactiveColor="#493f8"

      barStyle={{
        backgroundColor: '#fff',
        margin: 0,
        borderRadius: 0,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',

      }}
      tabBarLabelStyle={{
        fontFamily: 'OpenSans-Bold',
        fontSize: 10,
      }}

      tabBarOptions={{ tabBarLabelStyle: { fontSize: 12, fontFamily: 'OpenSans-Bold' } }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (

            <Image source={require('../assets/BottomBar/home.png')} style={{ width: 30, height: 30 }} />
          ),
          tabBarLabel: 'Trang chủ',
          unmountOnBlur: true,
        }}

        key="Home"
      />
      <Tab.Screen
        name="Specialties"
        component={SpecialtiesScreen}
        options={{
          tabBarIcon: ({ color }) => (

            <Image source={require('../assets/BottomBar/hospital.png')} style={{ width: 30, height: 30 }} />
          ),
          tabBarLabel: 'Chuyên khoa',
        }}
        key="Specialties"
      />
      <Tab.Screen
        name="HandBook"
        component={HandBookScreen}
        options={{
          tabBarIcon: ({ color }) => (

            <Image source={require('../assets/BottomBar/book.png')} style={{ width: 30, height: 30 }} />
          ),
          tabBarLabel: 'Cẩm nang',
        }}
        key="HandBook"
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}

        options={{
          tabBarIcon: ({ color }) => (
            // <MaterialCommunityIcons name="calendar" color={color} size={30} />
            <Image source={require('../assets/BottomBar/clipboard.png')} style={{ width: 30, height: 30 }} />
          ),
          tabBarLabel: 'Lịch khám',

        }}

      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            // <MaterialCommunityIcons name="account" color={color} size={30} />
            <Image source={require('../assets/BottomBar/profile.png')} style={{ width: 30, height: 30 }} />
          ),
          tabBarLabel: 'Tài khoản',
        }}
        key="Profile"
      />
    </Tab.Navigator>
  );

}


export default MyTabs;
