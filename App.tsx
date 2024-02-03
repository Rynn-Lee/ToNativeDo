import React from 'react';
import TopBar from './components/top-bar/top-bar';
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
