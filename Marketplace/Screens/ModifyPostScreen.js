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

const ModifyPostScreen = ({route, navigation}) => {
    const [pickedImages, setPickedImages] = useState(route.params.item.images);

    const [category, setCategory] = useState(route.params.item.category);

    const [title, setTitle] = useState(route.params.item.title);

    const [description, setDescription] = useState(route.params.item.description);
    
    const [price, setPrice] = useState(route.params.item.askingPrice);
    
    const [location, setLocation] = useState(route.params.item.location);
    
    const [contactInfo, setContactInfo] = useState(route.params.item.sellerInfo);

    const [deliveryType, setDeliveryType] = useState(route.params.item.deliveryType);

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

    function updatePost()
    {
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

        var date = new Date();
        date = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
        fetch('https://marketplaceapialexraul.azurewebsites.net' + '/items', {
            method: 'PUT',
            body: JSON.stringify({
                id: route.params.item.id,
                title: title,
                description: description,
                category: category,
                location: location,
                images: pickedImages,
                askingPrice: price,
                dateOfPosting: date,
                deliveryType: deliveryType,
                sellerInfo: contactInfo
              }),
            headers: {
                "Authorization": "Bearer " + route.params.JWT,
                "Content-Type": "application/json"
            },
          })
          .then(response => {
            if (response.status != 200) {
              throw new Error("HTTP Code " + response.status + " - " + JSON.stringify(response.json()));
            }
            // return response.json();
          })
          .then(json => {
            console.log("Successfully updated with response " + json)
            Toast.show('Successfully updated item');
            route.params.refreshCallback();
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
            <BackHeader height={ 30 } button1={'Login'} button2={'Post'} title={'Modify item'} navigation={navigation}> </BackHeader>
            <View style={{padding: 5}}>
                <View style={{paddingTop: 20, paddingBottom: 5}}>
                    <Dropdown 
                        options={ categories }
                        textStyle={ styles.dropdownText}
                        defaultValue={category}
                        style= { styles.dropdownButtonStyle}
                        dropdownStyle = { [styles.dropdownStyle, { height: '40%'}]}
                        dropdownTextStyle = {{ fontSize: 20}}
                        dropdownTextHighlightStyle={{ color: 'green'}}
                        onSelect={ (index, value) => {setCategory(value), console.log(value)}}>
                    </Dropdown>
                </View>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    defaultValue={title}
                    placeholder= { "Title" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setTitle(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    defaultValue={description}
                    placeholder= { "Description" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setDescription(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    defaultValue={price}
                    placeholder= { "Price" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setPrice(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    defaultValue={location}
                    placeholder= { "Location" }
                    placeholderTextColor= { 'gray'}
                    onChangeText={value => {setLocation(value)}}>
                </TextInput>
                <TextInput 
                    style={ [styles.inputStyle, {paddingTop: 30}] } 
                    defaultValue={contactInfo}
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
                    initial={ deliveryType == "Shipping" ? 0 : 1}
                    buttonColor={ '#035aa1'}
                    selectedButtonColor= { '#035aa1'}
                    animation={ false }
                    formHorizontal={ true }
                    onPress= { (value) => {setDeliveryType(radio_props[value].label)}}>
                    </RadioForm>
                </View>
                <TouchableOpacity 
                    style={{paddingTop: 10}}
                    onPress={() => updatePost()}>
                    <View style= { [styles.button, { height: 45}] }>
                        <Text style={ styles.buttonText}>{ 'Update Posting' }</Text>
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

export default ModifyPostScreen