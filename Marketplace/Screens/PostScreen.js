import React from 'react';
import { StyleSheet, ScrollView, StatusBar, Image } from 'react-native';
import ImageList from '../components/post/imageList'
import ItemDetails from '../components/post/itemDetails'

const PostScreen = (props) => {
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageList></ImageList>
            <ItemDetails></ItemDetails>
        </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cfdbff'
    }
})

export default PostScreen