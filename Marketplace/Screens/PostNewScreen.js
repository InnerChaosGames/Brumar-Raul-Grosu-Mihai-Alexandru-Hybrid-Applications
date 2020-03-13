import React from 'react';
import { useState } from 'react'
import { Text, StyleSheet, ScrollView, StatusBar, Image, View, TextInput, TouchableOpacity } from 'react-native';
import ImageList from '../components/postedItem/imageList'
import ItemDetails from '../components/postedItem/itemDetails'
import BackHeader from '../components/backHeader';
import AddedImagesList from '../components/postNewItems/addedImagesList'
import Dropdown from 'react-native-modal-dropdown';
import RadioForm from 'react-native-simple-radio-button';
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-simple-toast'
import * as Permissions from 'expo-permissions'

const categories= ['Vehicles', 'Real Estate', 'Jobs', 'Electonics & Appliances', 'Furniture', 'Mobiles', 'Pets', 'Books', 'Fashion', 'Services', 'Sports & Hobbies'];
  
var radio_props = [
    {label: 'Shipping', value: 0 },
    {label: 'Pickup', value: 1 },
];

const PostNewScreen = (props) => {
    
    const [radioButton, setRadioButton] = useState(0);

    const [pickedImages, setPickedImages] = useState([]);

    openImagePickerAsync = async () => {
        if (pickedImages.length >= 4)
        {
            Toast.show("You can only upload up to 4 images!");
            return;
        }

        let permissionGranted = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        //let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionGranted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});
    
        if(pickerResult.cancelled == true)
        {
          alert('Image picker cancelled or failed');
          return;
        }
    
        setPickedImages(['data:image/png;base64,' + pickerResult.base64, ...pickedImages]);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={ true}></StatusBar>
            <BackHeader height={ 30 } button1={'Login'} button2={'Post'} title={'Marketplace'} navigation={props.navigation}> </BackHeader>
            <View style={{padding: 5}}>
                <TouchableOpacity style={{paddingTop: 10, borderBottomWidth: 1}} onPress={() => openImagePickerAsync()}> 
                    <Text style={{fontSize: 20}}> { "Add images" } </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop: 10, borderBottomWidth: 1}} onPress={() => setPickedImages([])}> 
                    <Text style={{fontSize: 20}}> { "Empty images" } </Text>
                </TouchableOpacity>
                <AddedImagesList images={pickedImages}></AddedImagesList>
                <View style={{paddingTop: 20, paddingBottom: 5}}>
                    <Dropdown 
                        options={ categories }
                        textStyle={ styles.dropdownText}
                        defaultValue={ 'Choose Category'}
                        style= { styles.dropdownButtonStyle}
                        dropdownStyle = { [styles.dropdownStyle, { height: '40%'}]}
                        dropdownTextStyle = {{ fontSize: 20}}
                        dropdownTextHighlightStyle={{ color: 'green'}}>
                    </Dropdown>
                </View>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Title" }
                    placeholderTextColor= { 'gray'}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Description" }
                    placeholderTextColor= { 'gray'}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Price" }
                    placeholderTextColor= { 'gray'}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Location" }
                    placeholderTextColor= { 'gray'}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Contact info" }
                    placeholderTextColor= { 'gray'}>
                </TextInput>
                <View style={{paddingTop: 30, paddingBottom: 5}}>
                    <Text style= {{ fontSize: 20, paddingBottom: 5 ,borderBottomWidth: 1}}> { 'Delivery type:' }</Text>
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
                </View>
                <TouchableOpacity 
                    style={{paddingTop: 10}}
                    onPress={() => console.log('post button pressed')}>
                    <View style= { [styles.button, { height: 45}] }>
                        <Text style={ styles.buttonText}>{ 'Create Posting' }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
  );
};
    
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cfdbff'
    },
    inputStyle: {
        fontSize: 20,
        padding: 5,
        borderBottomWidth: 1
    },
    dropdownText: {
        fontSize: 20,
        backgroundColor: '#cfdbff'
    },
    dropdownButtonStyle: {
        borderBottomWidth: 1
    },
    dropdownStyle: {
        fontSize: 20
    },
    button: {
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: '#2196f3',
        borderWidth: 2,
        borderColor: '#035aa1'
    },
    buttonText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: '700'
    },
    radioButton: {
        paddingTop: 10,
        justifyContent: 'space-around',
        paddingBottom: 10,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#035aa1',
        borderWidth: 2
      }
})

export default PostNewScreen