import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

type props = {
  id: string,
  description: string,
  imageUrl: string,
  navigation: any, // Add navigation here
}

const BlogCard = ({ id, description, imageUrl, navigation }: props) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { blogId: id })}>
      <View style={styles.card}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        {/* <RenderHTML 
        contentWidth={300} // Adjust based on your layout
        source={{ html: description }} 
        
      /> */}
        <Text style={styles.title}>New Blog with id: {id}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export { BlogCard };
