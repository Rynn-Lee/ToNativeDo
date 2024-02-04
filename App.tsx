import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages';
import Card from './pages/card';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}/>
        <Stack.Screen
          name="Card"
          component={Card}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
