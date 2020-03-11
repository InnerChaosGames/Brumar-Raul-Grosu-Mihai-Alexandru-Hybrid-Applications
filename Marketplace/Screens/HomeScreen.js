import React, { Component } from 'react';
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



export default class HomeScreen extends Component
{
    constructor(props)
    {
      super(props);
      this.state = {
        radioButton: 0,
        items: []
      }
    }

    searchByCategory = () =>
    {
      console.log('getting items by category');
      fetch('https://marketplaceapialexraul.azurewebsites.net/search/category/' + 'furniture', {
        method: 'GET'
      })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log("Items by category GET successful")
        console.log("Received following JSON");
        
        this.setState({items: json}, function() {
          console.log(this.state.items);
        });
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
    }

    render(){
      return (
        <View style={styles.container}>
          <StatusBar hidden={ true}></StatusBar>
          <Header height={ 30 } button1={'Login'} button2={'Post'} title={'Marketplace'} navigation={this.props.navigation}></Header>
          <Searchbar search= {this.searchByCategory}></Searchbar>
          <RadioForm
            style= { styles.radioButton }
            radio_props= { radio_props }
            initial={ 0 }
            buttonColor={ '#035aa1'}
            selectedButtonColor= { '#035aa1'}
            animation={ false }
            formHorizontal={ true }
            onPress= { (value) => {this.setState({radioButton: value})}}>
          </RadioForm>
          <ResultsList navigation={this.props.navigation} receivedData={this.state.items}></ResultsList>
          
        </View>
      );
    }
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