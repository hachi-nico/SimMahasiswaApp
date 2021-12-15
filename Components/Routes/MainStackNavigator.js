import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailMahasiswa, TambahMahasiswa} from '../Screens/index';
import {MainTabNavigator} from './index';
import {Color} from '../../Config/GlobalVar';

const Stack = createNativeStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabNavigator"
      screenOptions={{
        title: 'Sim Mahasiswa',
        headerStyle: {
          backgroundColor: Color.pensBlue,
        },
        headerTintColor: Color.pensYellow,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      <Stack.Screen
        name="DetailMahasiswa"
        component={DetailMahasiswa}
        options={{
          title: 'Detail Mahasiswa',
        }}
      />
      <Stack.Screen
        name="TambahMahasiswa"
        component={TambahMahasiswa}
        options={{
          title: 'Tambah Mahasiswa',
        }}
      />
    </Stack.Navigator>
  );
};
