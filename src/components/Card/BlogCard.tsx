import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { formatTime } from '../../utils/timeFormat';
import { Icon } from '@rneui/base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Blog } from '../../interfaces/blog';

// Utility function to strip HTML tags (if needed)
const stripHtml = (html: string) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // This will remove any HTML tags
};

type props = {
  blog : Blog,
  navigation : any
}
const BlogCard = ({blog, navigation } : props) => {
  // Stripping the description of any HTML tags for plain text display
  const plainDescription = stripHtml(blog.description);

  return (
      <View style={styles.card}>
        {/* Display user avatar and name */}
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileContainer} onPress={()=> navigation.navigate('Profile')}>
          <Image source={{ uri:  blog.user.imageUrl}} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{blog.user.name}</Text>
            {blog.user.headLine != null &&<Text style={styles.headline} numberOfLines={1}>{blog.user.headLine}</Text>}
            <Text style={styles.createdOn}>{formatTime(blog.createdOn)}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight : 10}}>
          <Ionicons name="ellipsis-vertical" size={18} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('BlogDetails', { blogId: blog.id })}>
          {/* Display the blog description limited to 2 lines */}
          <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
            {plainDescription}
          </Text>

        {/* Display the blog image */}
        {blog.imageUrls != null && blog.imageUrls.length > 0 && <Image source={{ uri: blog.imageUrls[0] }} style={styles.image} />}
        </TouchableOpacity>


        {/* Display tags */}
        {blog.tags != null && blog.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <FlatList
              data={blog.tags}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.tagItem} key={item.id}>
                  <Text style={styles.tagText}>#{item.name}</Text>
                </View>
              )}
            />
          </View>
        )}

        {/* Interaction section */}
        <View style={styles.interactSection}>
          <View style={styles.iconButton}>
            <Icon name="like" type="evilicon" color="#2d545e" />
            <Text style={styles.iconText}>Like</Text>
          </View>
          <View style={styles.iconButton}>
            <Icon name="comment" type="evilicon" color="#2d545e" />
            <Text style={styles.iconText}>Comment</Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    overflow: 'hidden',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginRight:15
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  createdOn: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    lineHeight: 20,
  },
  tagsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  tagItem: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#00796b',
  },
  interactSection: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  iconText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export { BlogCard };
