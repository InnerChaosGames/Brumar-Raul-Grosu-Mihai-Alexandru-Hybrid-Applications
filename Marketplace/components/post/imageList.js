import React from 'react';
import { Dimensions, SafeAreaView, FlatList, View, Image, StyleSheet } from 'react-native';

const Images = [
    {
      imageString: 'First Item'
    },
    {
      imageString: 'Second Item'
    },
    {
      imageString: 'Third Item'
    },
    {
        imageString: 'Third Item'
    },
    {
        imageString: 'Third Item'
    }
  ];

function Item ({ id, title, onSelect }) {
    return (

    <View style={ {flexDirection: 'row', justifyContent: 'flex-start'} }>
        <Image style = { styles.item } source={{uri: 'https://e-cdns-images.dzcdn.net/images/artist/524f377b4bc995b92a7d22c216492186/250x250-000000-80-0-0.jpg'}}></Image>
    </View>
    );
}

function ResultsList() {

    const onSelect = React.useCallback(
      id => {
          console.log(id);
      }
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={ true }
          data={Images}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              onSelect={onSelect}
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
      paddingBottom: 5
    },
    item: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        alignSelf: "stretch",
        resizeMode: 'stretch',
        borderWidth: 5,
        borderColor: '#81bef0'
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

export default ResultsList