import React from 'react';
import { useState } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import PostScreen from './Screens/PostScreen'
import PostNewScreen from './Screens/PostNewScreen'
import ProfileScreen from './Screens/ProfileScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
 
const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer> 
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
          <Stack.Screen name="PostNewScreen" component={PostNewScreen} />
        </Stack.Navigator>
      </NavigationContainer>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCC',
    justifyContent: 'flex-start'
  },
  radioButton: {
    paddingTop: 10,
    justifyContent: 'space-evenly',
    paddingBottom: 10,
    backgroundColor: '#81bef0'
  }
});
