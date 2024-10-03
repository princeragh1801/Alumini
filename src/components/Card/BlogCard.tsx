import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { formatTime } from '../../utils/timeFormat';
import { Icon } from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { blogsService } from '../../services/blogsService';


type Props = {
  id: string;
  description: string;
  imageUrl: string;
  createdByName: string;
  userProfilePictureUrl: string;
  userProfileHeadLine: string;
  navigation: any; // Add navigation here
  createdOn : string
};

const BlogCard = ({
  id,
  description,
  imageUrl,
  createdByName,
  userProfilePictureUrl,
  userProfileHeadLine,
  createdOn,
  navigation,
}: Props) => {
  return (
    // <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { blogId: id })}>
    <TouchableOpacity>
      <View style={styles.card}>
        {/* Display user avatar and name */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: userProfilePictureUrl }} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{createdByName}</Text>
            <Text style={styles.headline} numberOfLines={1}>{userProfileHeadLine}</Text>
            <Text style={styles.headline}>{formatTime(createdOn)}</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={18} color="black" />
        </View>

        {/* Display the blog image */}
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}

        {/* Display the blog description */}
        <RenderHTML contentWidth={300} source={{ html: description }} />

        {/* Display the blog ID */}
        <Text style={styles.title}>New Blog with id: {id}</Text>
        <View style={styles.interactSection}>
          <View>
          <Icon
            name='like'
            type='evilicon'
            color='#2d545e'
          />
            <Text style={{marginHorizontal:10, fontWeight: 'bold'}} >Like</Text>
          </View>
            <View>
            <Icon
              name='comment'
              type='evilicon'
              color='#2d545e'
            />
            <Text style={{marginHorizontal:10, fontWeight : 'bold'}}>Comment</Text>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    //borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    //elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    overflow: 'hidden', // Ensures content doesn't overflow the card
  },
  profileContainer: {
    flex : 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap', // Prevents overflow
  },
  nameContainer : {
    flex : 1,
    flexDirection : 'column'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10, // Space between avatar and text
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1, // Prevents text overflow by shrinking
  },
  headline: {
    fontSize: 14,
    color: '#555',
    flexShrink: 1, // Prevents overflow of headline
    marginTop: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  interactSection:{
    flex : 1,
    flexDirection : 'row'
  }
});


export { BlogCard };
