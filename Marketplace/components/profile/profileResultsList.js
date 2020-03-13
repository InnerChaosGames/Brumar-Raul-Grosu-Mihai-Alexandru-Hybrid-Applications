import React from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import Toast from 'react-native-simple-toast'

const categories= ['Vehicles', 'Real Estate', 'Jobs', 'Electonics & Appliances', 'Furniture', 'Mobiles', 'Pets', 'Books', 'Fashion', 'Services', 'Sports & Hobbies'];

var DATA = [{
  askingPrice: "25EUR",
  category: "furniture",
  dateOfPosting: "20-02-2020",
  deliveryType: "Pickup",
  description: "nice and confortable chair",
  id: "1cd67a99-e7a0-4de0-8442-72d16d6aa853",
  images: [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=",
  ],
  location: "London",
  sellerInfo: "Jaakko Penttinen, jaakko.penttinen@gmail.com, +35889898989",
  title: "Old Chair 25",
  userId: "dc7015c4-1523-41fe-b322-0eacaeec9b80 "
}];

function Item({ id, title, price, location, date, image, onSelect, JWT, refreshCallback }) {

  function deleteItem()
  {
    fetch('https://marketplaceapialexraul.azurewebsites.net' + '/items', {
      method: 'DELETE',
      body: JSON.stringify({
          id: id
        }),
      headers: {
          "Authorization": "Bearer " + JWT,
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
      console.log("Successfully Deleted ")
      Toast.show('Successfully deleted item');
      refreshCallback();
    })
    .catch(error => {
      console.log("Error message:")
      console.log(error.message)
    });
  }

  return (
    <TouchableOpacity onPress={() => onSelect(id)} style={ styles.item }>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15}}>
              <TouchableOpacity onPress={() => console.log("Modify button")} style={ [styles.extraButtons, {backgroundColor: '#7aa5f5'}] }>
                <Text style={{fontSize: 20}}>{"Modify"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteItem()} style={ [styles.extraButtons, {backgroundColor: '#cc2323'}] }>
                <Text style={{fontSize: 20}}>{"Delete"}</Text>
              </TouchableOpacity>
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
            JWT={props.JWT}
            refreshCallback= {props.refreshCallback}
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
    marginHorizontal: 16
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1
  },
  description: {
      fontSize: 20,
      flex: 1
  },
  extraButtons: {
    height: 50,
    width: 140,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ResultsList;