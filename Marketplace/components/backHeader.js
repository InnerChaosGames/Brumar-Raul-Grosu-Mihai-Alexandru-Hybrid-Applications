import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const BackHeader = (props) => {
    return (
    <View style={ styles.main }>
        <TouchableHighlight style={{paddingTop: 10, paddingBottom: 10}} onPress={() => console.log('Back button pressed')}>
            <View style= { [styles.button, { height: 45, width: 60 }, {alignItems: 'center'}] }>
                <Ionicons name='ios-arrow-back' color='black' size={30}></Ionicons>
            </View>
        </TouchableHighlight>
        <Text style={styles.titleText}>{props.title}</Text>
    </View>

    )
}

const styles = StyleSheet.create({
    main: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        flex: 1,
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
        flex: 5,
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default BackHeader