import React from 'react';
import {Button, Pressable, StyleSheet, View} from 'react-native';
import TopBar from './components/top-bar/top-bar';
import ListTodos from './components/list-todos/list-todos';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TopBar/>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
