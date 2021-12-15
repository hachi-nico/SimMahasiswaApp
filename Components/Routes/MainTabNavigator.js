import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, Settings} from '../Screens/index';
import Icon from 'react-native-ionicons';
import {Color} from '../../Config/GlobalVar';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: Color.pensBlue, paddingBottom: 2},
        tabBarInactiveTintColor: Color.pensYellow,
        tabBarActiveTintColor: Color.pensYellow,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Beranda',
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="home" color={color} size={focused ? size : 15} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="person" color={color} size={focused ? size : 15} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
