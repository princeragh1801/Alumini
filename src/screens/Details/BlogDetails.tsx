import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import useBlogService from '../../services/blogsService';
import RenderHTML from 'react-native-render-html';
import { formatTime } from '../../utils/timeFormat';
import { Blog } from '../../interfaces/blog';

type BlogDetailsProps = {
  route : any
};

const BlogDetails = ({ route }: BlogDetailsProps) => {

  const blogsService = useBlogService();
  const { blogId } = route.params;
  const [blogData, setBlogData] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        console.log("Date : ", Date());
        const data:Blog = await blogsService.getBlogById(blogId);
        setBlogData(data);
        console.log("Blog details : ", data);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    })();
    
  }, [blogId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!blogData) {
    return (
      <View style={styles.container}>
        <Text>Failed to load blog details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* User Profile Information */}
        {blogData.user.imageUrl && <Image source={{ uri: blogData.user.imageUrl }} style={styles.avatar} />}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{blogData.user.name || 'Unknown User'}</Text>
          <Text style={styles.headline}>{blogData.user.headLine || 'No Headline'}</Text>
          <Text style={styles.createdOn}>{formatTime(blogData.createdOn)}</Text>
        </View>
      </View>

      {/* Blog Image */}
      {blogData.imageUrls && blogData.imageUrls.length > 0 && (
        <Image source={{ uri: blogData.imageUrls[0] }} style={styles.image} />
      )}

      {/* Blog Description */}
      <View style={styles.descriptionContainer}>
        <RenderHTML contentWidth={300} source={{ html: blogData.description }} />
      </View>

      {/* Tags */}
      {blogData.tags && blogData.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <FlatList
            data={blogData.tags}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.tagItem}>
                <Text style={styles.tagText}>#{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headline: {
    fontSize: 14,
    color: '#666',
  },
  createdOn: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  tagsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  tagItem: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#00796b',
  },
});

export { BlogDetails };
