import React from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import ImageList from '../components/postedItem/imageList'
import ItemDetails from '../components/postedItem/itemDetails'

const PostScreen = (props) => {
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={ true}></StatusBar>
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