import React from 'react';
import { useState } from 'react'
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import Header from '../components/home/header';
import Searchbar from '../components/home/searchbar';
import RadioForm from 'react-native-simple-radio-button';
import ResultsList from '../components/home/resultsList'
import BackHeader from '../components/backHeader'

var radio_props = [
    {label: 'Category', value: 0 },
    {label: 'Location', value: 1 },
    {label: 'Date', value: 2 }
];
  

const LoginScreen = (props) => {
    
    const [radioButton, setRadioButton] = useState(0)

    return (
        <View style={styles.container}>
            <BackHeader title= 'Login'></BackHeader>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cfdbff',
      justifyContent: 'flex-start'
    },
    radioButton: {
      paddingTop: 10,
      justifyContent: 'space-evenly',
      paddingBottom: 10,
      backgroundColor: '#96bbff',
      borderTopColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: '#035aa1',
      borderWidth: 2
    }
});

export default LoginScreen