import React from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import ImageList from '../components/postedItem/imageList'
import ItemDetails from '../components/postedItem/itemDetails'

const PostScreen = ({route, navigation}) => {
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={ true}></StatusBar>
            <ImageList images={ route.params.data.images}></ImageList>
            <ItemDetails 
                title= { route.params.data.title }
                category= { route.params.data.category }
                price= { route.params.data.askingPrice }
                date= { route.params.data.dateOfPosting }
                deliveryType= { route.params.data.deliveryType }
                description= { route.params.data.description }
                sellerInfo= { route.params.data.sellerInfo }
                location= { route.params.data.location }>
            </ItemDetails>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cfdbff'
    }
})

export default PostScreen