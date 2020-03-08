import React from 'react';
import { useState } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomeScreen from './Screens/HomeScreen'
 
 


export default function App() {
  return(
    <HomeScreen></HomeScreen>
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
