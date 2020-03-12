import React, { Component } from 'react';
import { useState } from 'react'
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import Header from '../components/home/header';
import Searchbar from '../components/home/searchbar';
import RadioForm from 'react-native-simple-radio-button';
import ResultsList from '../components/home/resultsList'
import * as SecureStore from 'expo-secure-store'

var radio_props = [
    {label: 'Category', value: 0 },
    {label: 'Location', value: 1 },
    {label: 'Date', value: 2 }
];

const secureStoreToken = 'loginJWT'

export default class HomeScreen extends Component
{
    constructor(props)
    {
      super(props);
      this.state = {
        radioButton: 0,
        items: [],
        activeJWT: null
      }
    }

    componentDidMount() {
      // Check for stored JWT when the application loads
      SecureStore.getItemAsync(secureStoreToken)
        .then(response => {
          console.log("SecureStore.getItemAsync success")        
          this.setState({ activeJWT: response })
        })
        .catch(error => {
          console.log("SecureStore.getItemAsync error")
          console.log(error);
        });
    }

    receiveJWTFromLogin = (responseJWT) => {
      // Deal with successful login by storing the token into secure store
      SecureStore.setItemAsync(secureStoreToken, responseJWT)
        .then(response => {
          console.log(response);
          this.setState({ activeJWT: responseJWT})
        })    
    }
  

    searchByCategory = (searchValue) =>
    {
      console.log('getting items by category');
      fetch('https://marketplaceapialexraul.azurewebsites.net/search/category/' + searchValue, {
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

    searchByLocation = (searchValue) =>
    {
      console.log('getting items by location');
      fetch('https://marketplaceapialexraul.azurewebsites.net/search/location/' + searchValue, {
        method: 'GET'
      })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log("Items by location GET successful")
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

    searchByDate = (searchValue) =>
    {
      console.log('getting items by date');
      fetch('https://marketplaceapialexraul.azurewebsites.net/search/date/' + searchValue, {
        method: 'GET'
      })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log("Items by date GET successful")
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

    searchLogic = (searchValue) =>
    {
      if (this.state.radioButton == 0)
        this.searchByCategory(searchValue);
      else if (this.state.radioButton == 1)
        this.searchByLocation(searchValue);
      else (this.state.radioButton == 2)
        this.searchByDate(searchValue);
    }

    headerLogic = () =>{
      if (this.state.activeJWT) {
        return (
          <Header 
              height={ 30 } 
              button1={'Profile'} 
              button2={'Post'} 
              title={'Marketplace'} 
              navigation={this.props.navigation}
              receiveJWT={this.receiveJWTFromLogin}
              screenToLoad={'ProfileScreen'}
              JWT={ this.state.activeJWT }>
            </Header>
        )
      } else {
        return (
          <Header 
              height={ 30 } 
              button1={'Login'} 
              button2={'Post'} 
              title={'Marketplace'} 
              navigation={this.props.navigation}
              receiveJWT={this.receiveJWTFromLogin}
              screenToLoad={'LoginScreen'}
              JWT={ this.state.activeJWT }>
            </Header>
        )
      }
      
    }

    render(){
      return (
        <View style={styles.container}>
          <StatusBar hidden={ true}></StatusBar>
          {this.headerLogic() }
          <Searchbar search= {this.searchLogic}></Searchbar>
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