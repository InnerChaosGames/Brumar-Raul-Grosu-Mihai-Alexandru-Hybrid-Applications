import React from 'react';
import { useState } from 'react'
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import Header from '../components/home/header';
import Searchbar from '../components/home/searchbar';
import RadioForm from 'react-native-simple-radio-button';
import ResultsList from '../components/home/resultsList'

var radio_props = [
    {label: 'Category', value: 0 },
    {label: 'Location', value: 1 },
    {label: 'Date', value: 2 }
];
  

const HomeScreen = (props) => {
    
    const [radioButton, setRadioButton] = useState(0)

    return (
        <View style={styles.container}>
            <StatusBar hidden={ true}></StatusBar>
            <Header height={ 30 } button1={'Login'} button2={'Post'} title={'Marketplace'}></Header>
            <Searchbar></Searchbar>
            <RadioForm
                style= { styles.radioButton }
                radio_props= { radio_props }
                initial={ 0 }
                buttonColor={ '#035aa1'}
                selectedButtonColor= { '#035aa1'}
                animation={ false }
                formHorizontal={ true }
                onPress= { (value) => {setRadioButton(value)}}>
            </RadioForm>
            <ResultsList>

            </ResultsList>
            
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

export default HomeScreen