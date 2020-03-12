import React from 'react';
import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import BackHeader from '../components/backHeader'
import Toast from 'react-native-simple-toast'

var radio_props = [
    {label: 'Category', value: 0 },
    {label: 'Location', value: 1 },
    {label: 'Date', value: 2 }
];
  
function register(newUsername, newPassword, newEmail, navigation)
{
    console.log('registering ' + newUsername + ' with password: ' + newPassword + ' and email: ' + newEmail);
    fetch('https://marketplaceapialexraul.azurewebsites.net/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
        email: newEmail
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      if (response.status != 201) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      return response.json();
    })
    .then(json => {
      console.log("Created user successfully!")

      Toast.show('Created user successfully!')
      navigation.pop();
      
    })
    .catch(error => {
        console.log("Error message:")
        console.log(error.message)
    });
}

const RegisterScreen = (props) => {
    
  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputEmail, setInputEmail] = useState('')

    

    return (
        <View style={styles.container}>
            <BackHeader title= 'Register' navigation={props.navigation}></BackHeader>
            <View style={styles.pageStyle}>
              <Text style={{fontSize: 25}}> { "Username" }</Text>
              <TextInput style={styles.textInput} onChangeText={(value) => setInputUsername(value)}></TextInput>
            
              <Text style={[{fontSize: 25}, {paddingTop: 15}]}> { "Password" }</Text>
              <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={(value) => setInputPassword(value)}></TextInput>

              <Text style={[{fontSize: 25}, {paddingTop: 15}]}> { "Email" }</Text>
              <TextInput style={styles.textInput} onChangeText={(value) => setInputEmail(value)}></TextInput>

              <TouchableOpacity style={{paddingTop: 30}} onPress={() => register(inputUsername, inputPassword, inputEmail, props.navigation)}>
                <View style= { [styles.loginButton, { height: 60, width: 200 }] }>
                  <Text style={ [styles.buttonText, {fontSize: 20}] }>{"Register"}</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cfdbff',
      justifyContent: 'flex-start'
    },
    pageStyle: {
      height: Dimensions.get('window').height - 80,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 50,
      width: "80%",
      borderWidth: 1,
      borderRadius: 50,
      backgroundColor: "white",
      fontSize: 20,
      paddingHorizontal: 15
    },
    loginButton: {
      height: 40,
      width: "40%",
      borderRadius: 15,
      backgroundColor: "#2196f3",
      alignItems: 'center',
      justifyContent: 'center'
    }
});

export default RegisterScreen