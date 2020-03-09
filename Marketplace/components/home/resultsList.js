import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  }
];

function Item({ id, title, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={ styles.item }
    >
    <View style={ {flexDirection: 'row', justifyContent: 'flex-start'} }>
        <Image style={{width: 110, height: 110}} source={{uri: 'https://e-cdns-images.dzcdn.net/images/artist/524f377b4bc995b92a7d22c216492186/250x250-000000-80-0-0.jpg'}}></Image>
        <View style={{ padding: 5, width: 215}}>
            <Text numberOfLines={1} style={styles.title}>{"100 EUR"}</Text>
            <Text numberOfLines={1} style={styles.description}>{title}</Text>
            <View style={{ flexDirection: 'row', width: 170}}>
              <MaterialIcons name='location-on' color='black' size={20}></MaterialIcons>
              <Text numberOfLines={1}> { "Location"}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: 170}}>
              <MaterialCommunityIcons name='clock-outline' color='black' size={20}></MaterialCommunityIcons>
              <Text numberOfLines={1}> { "Date"}</Text>
            </View>
        </View>
    </View>
    </TouchableOpacity>
  );
}

export default function ResultsList() {

  const onSelect = React.useCallback(
    id => {
        console.log(id);
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
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
