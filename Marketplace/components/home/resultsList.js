import React from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const categories= ['Vehicles', 'Real Estate', 'Jobs', 'Electonics & Appliances', 'Furniture', 'Mobiles', 'Pets', 'Books', 'Fashion', 'Services', 'Sports & Hobbies'];

var DATA = [];

function Item({ id, title, price, location, date, image, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={ styles.item }
    >
    <View style={ {flexDirection: 'row', justifyContent: 'flex-start'} }>
        <Image style={{width: 110, height: 110}} source={{uri: image}}></Image>
        <View style={{ padding: 5, width: 215}}>
            <Text numberOfLines={1} style={styles.title}>{price}</Text>
            <Text numberOfLines={1} style={styles.description}>{title}</Text>
            <View style={{ flexDirection: 'row', width: 170}}>
              <MaterialIcons name='location-on' color='black' size={20}></MaterialIcons>
              <Text numberOfLines={1}> { location}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: 170}}>
              <MaterialCommunityIcons name='clock-outline' color='black' size={20}></MaterialCommunityIcons>
              <Text numberOfLines={1}> { date}</Text>
            </View>
        </View>
    </View>
    </TouchableOpacity>
  );
}

const ResultsList = (props) => {

  const onSelect = React.useCallback(
    id => {
      props.navigation.navigate('PostScreen', { data: DATA.find(d => d.id == id) });
    }
  );

  DATA=props.receivedData;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            price={item.askingPrice}
            location={item.location}
            date={item.dateOfPosting}
            image={item.images[0]}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#96bbff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1
  },
  description: {
      fontSize: 20,
      flex: 1
  }
});

export default ResultsList;