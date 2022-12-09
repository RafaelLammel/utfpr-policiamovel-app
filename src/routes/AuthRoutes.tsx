import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../pages/Login';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
