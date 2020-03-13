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
import base64 from 'react-native-base64'

const categories= ['vehicles', 'real_estate', 'jobs', 'electonics_&_appliances', 'furniture', 'mobiles', 'pets', 'books', 'fashion', 'services', 'sports_&_hobbies'];
  
var radio_props = [
    {label: 'Shipping', value: 0 },
    {label: 'Pickup', value: 1 },
];

const PostNewScreen = ({route, navigation}) => {
    const [pickedImages, setPickedImages] = useState([]);

    const [category, setCategory] = useState('');

    const [title, setTitle] = useState('');

    const [description, setDescription] = useState('');
    
    const [price, setPrice] = useState('');
    
    const [location, setLocation] = useState('');
    
    const [contactInfo, setContactInfo] = useState('');

    const [deliveryType, setDeliveryType] = useState('Shipping');

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
    
        setPickedImages([...pickedImages, 'data:image/png;base64,' + pickerResult.base64]);
    }

    function createPost()
    {
        var mySubString = route.params.JWT.split('.')[1];
      
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

        if (title == '')
        {
            Toast.show("You must include a title");
            return;
        }
        if (description == '')
        {
            Toast.show("You must include a description");
            return;
        }
        if (category == '')
        {
            Toast.show("You must select a category");
            return;
        }
        if (location == '')
        {
            Toast.show("You must include a location");
            return;
        }
        if (pickedImages.length == 0)
        {
            Toast.show("You must include at least one image");
            return;
        }
        if (price == '')
        {
            Toast.show("You must include a price");
            return;
        }
        if (contactInfo == '')
        {
            Toast.show("You must include contact info");
            return;
        }

        fetch('https://marketplaceapialexraul.azurewebsites.net' + '/items', {
            method: 'POST',
            body: JSON.stringify({
                userId: item.user.id,
                title: title,
                description: description,
                category: category,
                location: location,
                images: pickedImages,
                askingPrice: price,
                dateOfPosting: "10-03-2020",
                deliveryType: deliveryType,
                sellerInfo: contactInfo
              }),
            headers: {
                "Authorization": "Bearer " + route.params.JWT,
                "Content-Type": "application/json"
            },
          })
          .then(response => {
            if (response.status != 201) {
              throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
            }
            // return response.json();
          })
          .then(json => {
            console.log("Successfully Created with response " + json)
            Toast.show('Successfully created item');
            navigation.pop();
          })
          .catch(error => {
            console.log("Error message:")
            console.log(error.message)
          });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={ true}></StatusBar>
            <BackHeader height={ 30 } button1={'Login'} button2={'Post'} title={'Marketplace'} navigation={navigation}> </BackHeader>
            <View style={{padding: 5}}>
                <View style={{paddingTop: 20, paddingBottom: 5}}>
                    <Dropdown 
                        options={ categories }
                        textStyle={ styles.dropdownText}
                        defaultValue={ 'Choose Category'}
                        style= { styles.dropdownButtonStyle}
                        dropdownStyle = { [styles.dropdownStyle, { height: '40%'}]}
                        dropdownTextStyle = {{ fontSize: 20}}
                        dropdownTextHighlightStyle={{ color: 'green'}}
                        onSelect={ (index, value) => {setCategory(value), console.log(value)}}>
                    </Dropdown>
                </View>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Title" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setTitle(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Description" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setDescription(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Price" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setPrice(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Location" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setLocation(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    placeholder= { "Contact info" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setContactInfo(value)}}>
                </TextInput>
                <TouchableOpacity style={{paddingTop: 10, borderBottomWidth: 1}} onPress={() => openImagePickerAsync()}> 
                    <Text style={{fontSize: 20}}> { "Add images" } </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingTop: 10, borderBottomWidth: 1}} onPress={() => setPickedImages([])}> 
                    <Text style={{fontSize: 20}}> { "Empty images" } </Text>
                </TouchableOpacity>
                <AddedImagesList images={pickedImages}></AddedImagesList>
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
                    onPress= { (value) => {setDeliveryType(radio_props[value].label)}}>
                    </RadioForm>
                </View>
                <TouchableOpacity 
                    style={{paddingTop: 10}}
                    onPress={() => createPost()}>
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