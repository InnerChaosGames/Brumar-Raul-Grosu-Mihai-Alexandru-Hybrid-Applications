import React from 'react';
import { Dimensions, SafeAreaView, FlatList, View, Image, StyleSheet } from 'react-native';

var Images = [];

function Item ({ image }) {
  
  return (
    <View style={ {flexDirection: 'row', justifyContent: 'flex-start'} }>
        <Image style = { styles.item } source={{uri: image}}></Image>
    </View>
    );
}

function AddedImagesList(props) {

    Images = props.images;

    /*
    const onSelect = React.useCallback(
      id => {
          console.log(id);
      }
    );*/
  
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={ true }
          data={Images}
          renderItem={({ item }) => (
            <Item
              image={item}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      padding: 5,
      paddingBottom: 5
    },
    item: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 4,
        alignSelf: "stretch",
        resizeMode: 'stretch',
        borderWidth: 5,
        borderColor: '#035aa1'
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

export default AddedImagesList
