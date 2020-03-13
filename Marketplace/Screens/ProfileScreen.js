import React, { Component } from 'react';
import { useState } from 'react'
import { StyleSheet, View, StatusBar, Image, Text } from 'react-native';
import Header from '../components/profile/header';
import Searchbar from '../components/home/searchbar';
import RadioForm from 'react-native-simple-radio-button';
import ResultsList from '../components/home/resultsList'
import ProfileResultsList from '../components/profile/profileResultsList'
import * as SecureStore from 'expo-secure-store'
import base64 from 'react-native-base64'

const secureStoreToken = 'loginJWT'


export default class ProfileScreen extends Component
{
    constructor(props)
    {
      super(props);
      this.state = {
        items: [],
        loading: true,
        activeJWT: null,
        username: '',
        id: ''
      }
    }

    componentDidMount() {
        // Check for stored JWT when the application loads
        SecureStore.getItemAsync(secureStoreToken)
        .then(response => {
          console.log("SecureStore.getItemAsync success")        
          this.setState({ activeJWT: response })
          this.searchByUserId();
        })
        .catch(error => {
          console.log("SecureStore.getItemAsync error")
          console.log(error);
        });
    }

    searchByUserId = (searchValue) =>
    {
      var mySubString = this.state.activeJWT.split('.')[1];
      
      console.log(mySubString);
      var decodedValue = base64.decode(mySubString);
      decodedValue = decodedValue.replace(/\n/g, "\n")
               .replace(/\'/g, "\'")
               .replace(/\"/g, '\"')
               .replace(/\&/g, "\&")
               .replace(/\r/g, "\r")
               .replace(/\t/g, "\t")
               .replace(/\b/g, "\b")
               .replace(/\f/g, "\f");
      // remove non-printable and other non-valid JSON chars
      decodedValue = decodedValue.replace(/[\u0000-\u0019]+/g,"");
      
      console.log(decodedValue)

      var item = JSON.parse(decodedValue)

      console.log(item.user.id);
      this.setState({id: item.user.id});
      this.setState({username: item.user.username});

      console.log('getting items by userId');
      fetch('https://marketplaceapialexraul.azurewebsites.net/search/user/' + item.user.id, {
        method: 'GET'
      })
      .then(response => {
        if (response.ok == false) {
          throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(json => {
        console.log("Items by userId GET successful")
        console.log("Received following JSON");
        
        this.setState({items: json, loading: false}, function() {
          //console.log(this.state.items);
        });
      })
      .catch(error => {
        console.log("Error message:")
        console.log(error.message)
      });
    }

    render(){
        if (this.state.loading)
        return  (
            <View style={styles.container}>
                <Text>{"Loading"}</Text>
            </View>
        )

        return (
            <View style={styles.container}>
                <StatusBar hidden={ true}></StatusBar>
                <Header 
                  height={ 30 }
                  button1={'Login'} 
                  button2={'Post'} 
                  title={'My Profile'}  
                  navigation={this.props.navigation}></Header>
                <View style={{padding: 5, paddingTop: 10}}>
                    <View style={ styles.basicInfoContainer}>
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}> {'Name: ' + this.state.username} </Text>
                    </View>
                </View>
                <View style={{paddingTop: 10, paddingBottom: 10}}>
                    <Text style={ styles.category }> { 'My postings: '}</Text>
                </View>
                <ProfileResultsList navigation={this.props.navigation} receivedData={this.state.items}></ProfileResultsList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    category: {
        fontSize: 22,
        paddingBottom: 5,
        borderWidth: 2,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: '#035aa1',
        borderTopColor: '#035aa1',
        fontWeight: 'bold',
        paddingTop: 5
    },
    container: {
      flex: 1,
      backgroundColor: '#cfdbff',
      justifyContent: 'flex-start'
    },
    basicInfoContainer: {
        backgroundColor: '#96bbff',
        borderRadius: 10,
        padding: 5
    }
});