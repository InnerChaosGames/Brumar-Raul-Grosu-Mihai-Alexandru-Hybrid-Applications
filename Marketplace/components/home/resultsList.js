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
    <View style={ {alignItems: 'center'} }>
        <Image style={{width: 200, height: 200}} source={{uri: 'https://e-cdns-images.dzcdn.net/images/artist/524f377b4bc995b92a7d22c216492186/250x250-000000-80-0-0.jpg'}}></Image>
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{title + "adasdasd"}</Text>
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
  description: {
      fontSize: 16
  }
});
