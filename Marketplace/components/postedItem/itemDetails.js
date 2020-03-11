import React from 'react';
import { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'


const ItemDetails = (props) => {

    return (
        <View > 
            <Text style={ styles.category }> { props.category}</Text>
            <View style={{paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 5}}>
                <View style = { styles.basicInfoContainer }>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}> { props.price } </Text> 
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingBottom: 5}}>
                        <Text style={{fontSize: 20, width: '75%'}}> {' Title'} </Text>
                        <Text style={{width: '25%'}}> { props.date } </Text>
                    </View>
                    <Text style= {{fontSize: 20, borderWidth: 2, borderRadius: 10, alignSelf: 'flex-start'}}> { "Delivery Type:" + props.deliveryType}</Text>
                </View>
                <View style= {{ paddingTop: 5}}>
                    <View style= { styles.basicInfoContainer}>
                        <Text> { props.description } </Text>
                    </View>
                </View>
                <View style= {{ paddingTop: 5}}>
                    <View style= { styles.basicInfoContainer}>
                        <Text style={{ fontSize: 20}}> { props.contactInfo } </Text>
                        <View style={{ flexDirection: 'row', width: '80%'}}>
                            <MaterialIcons name='location-on' color='black' size={25}></MaterialIcons>
                            <Text style={{ fontSize: 20}}> { props.location } </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
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
    text: {
        fontSize: 20,
        color: 'white'
    },
    inputContainer: {
        borderRadius: 20,
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#035aa1',
        backgroundColor: 'white'
    },
    basicInfoContainer: {
        backgroundColor: '#96bbff',
        borderRadius: 10,
        padding: 5
    }
})

export default ItemDetails