import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './Components/Routes/index';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

export default function App() {
  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainStackNavigator />
      </ApplicationProvider>
    </NavigationContainer>
  );
}
