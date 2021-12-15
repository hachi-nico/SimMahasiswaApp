import React from 'react';
import {View, Text, ViewBase} from 'react-native';
import {MainContainer} from '..';

export const Settings = () => {
  return (
    <MainContainer>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 40}}>Sim Mahasiswa</Text>
        <Text>Versi 1.0.0</Text>
      </View>
    </MainContainer>
  );
};
