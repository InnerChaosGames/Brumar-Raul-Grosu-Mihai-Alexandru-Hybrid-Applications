import React from 'react';
import { useState } from 'react'
import { Text, StyleSheet, ScrollView, StatusBar, Image, View, TextInput, TouchableHighlight } from 'react-native';
import ImageList from '../components/postedItem/imageList'
import ItemDetails from '../components/postedItem/itemDetails'
import BackHeader from '../components/backHeader';
import AddedImagesList from '../components/postNewItems/addedImagesList'
import Dropdown from 'react-native-modal-dropdown';


var data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
  
const PostNewScreen = (props) => {
    
    const [state, setState] = useState(0)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={ true}></StatusBar>
            <BackHeader height={ 30 } button1={'Login'} button2={'Post'} title={'Marketplace'} navigation={props.navigation}> </BackHeader>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 20}}> { "Add images:" } </Text>
                <AddedImagesList></AddedImagesList>
                <View style={{paddingTop: 10, paddingBottom: 5}}>
                    <Dropdown 
                        options={['option 1', 'option 2']}
                        textStyle={ styles.dropdownText}
                        defaultValue={ 'Choose Category'}
                        style= { styles.dropdownButtonStyle}
                        dropdownStyle = { [styles.dropdownStyle, { height: 'auto'}]}
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
                    <Dropdown 
                        options={['Shipping', 'Pickup']}
                        textStyle={ styles.dropdownText}
                        defaultValue={ 'Delivery Type'}
                        style= { styles.dropdownButtonStyle}
                        dropdownStyle = { styles.dropdownStyle}
                        dropdownTextStyle = {{ fontSize: 20}}
                        dropdownTextHighlightStyle={{ color: 'green'}}>
                    </Dropdown>
                </View>
                <TouchableHighlight 
                    style={{paddingTop: 10}}
                    onPress={() => console.log('post button pressed')}>
                    <View style= { [styles.button, { height: 45}] }>
                        <Text style={ styles.buttonText}>{ 'Create Posting' }</Text>
                    </View>
                </TouchableHighlight>
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
    }
})

export default PostNewScreen