import React from 'react';
import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import BackHeader from '../components/backHeader'
import { Base64 } from 'js-base64'

var radio_props = [
    {label: 'Category', value: 0 },
    {label: 'Location', value: 1 },
    {label: 'Date', value: 2 }
];
  
function login(loginUsername, loginPassword)
{
    console.log('Loging in ' + loginUsername + ' with password: ' + loginPassword);
    fetch('https://marketplaceapialexraul.azurewebsites.net/auth/loginForJWT', {
      method: 'GET',
      headers: {
        "Authorization": "Basic " + Base64.encode(loginUsername + ":" + loginPassword)
      }
    })
    .then(response => {
      if (response.status != 200) {
        throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
      }
      return response.json();
    })
    .then(json => {
      console.log("Logged in user successfully!")
      console.log('Token: ' + json.token);

      // save token
    })
    .catch(error => {
        console.log("Error message:")
        console.log(error.message)
    });
}

const LoginScreen = (props) => {
    
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <BackHeader title= 'Login' navigation={props.navigation}></BackHeader>
            <View style={styles.pageStyle}>
              <Text style={{fontSize: 25}}> { "Username" }</Text>
              <TextInput style={styles.textInput} onChangeText={(value) => setUsername(value)}></TextInput>
            
              <Text style={[{fontSize: 25}, {paddingTop: 15}]}> { "Password" }</Text>
              <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={(value) => setPassword(value)}></TextInput>

              <TouchableOpacity style={{paddingTop: 30}} onPress={() => login(username, password)}>
                <View style= { [styles.loginButton, { height: 60, width: 200 }] }>
                  <Text style={ [styles.buttonText, {fontSize: 20}] }>{"Login"}</Text>
                </View>
              </TouchableOpacity>

              <Text style={ {fontSize: 15, paddingHorizontal: 30, paddingTop: 100} }>{"If you don't already have an account, register here."}</Text>
              <TouchableOpacity style={{paddingTop: 10}} onPress={() => props.navigation.navigate('RegisterScreen')}>
                <View style= { [styles.loginButton, { height: 40, width: 150 }] }>
                  <Text style={ [styles.buttonText, {fontSize: 15}] }>{"Register"}</Text>
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

export default LoginScreen