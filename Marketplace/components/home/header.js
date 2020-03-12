import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons} from '@expo/vector-icons'

const Header = (props) => {
    return (
    <View style={ styles.main }>
        <TouchableOpacity onPress={() => props.navigation.navigate(props.screenToLoad, { receiveJWT: props.receiveJWT, JWT: props.JWT, logout: props.logout })}>
            <View style= { [styles.button, { height: 45, width: 80 }] }>
                <Text style={ styles.buttonText}>{ props.button1}</Text>
            </View>
        </TouchableOpacity>
        <Text style={styles.titleText}>{props.title}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('PostNewScreen')}>
            <View style= { [styles.button, { height: 45, width: 80 }] }>
                <Text style={ styles.buttonText}>{ props.button2}</Text>
            </View>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    main: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#81bef0',
        borderWidth: 2,
        borderBottomColor: '#035aa1',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
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
    titleText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: 'bold'
    }
})

export default Header