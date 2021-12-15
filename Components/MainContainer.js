import React from 'react';
import {View} from 'react-native';

export const MainContainer = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d1d5db',
      }}>
      {children}
    </View>
  );
};
