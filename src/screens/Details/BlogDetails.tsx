import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import useBlogService from '../../services/blogsService';
import RenderHTML from 'react-native-render-html';
import { formatTime } from '../../utils/timeFormat';
import { Blog } from '../../interfaces/blog';
import { Comment } from '../../interfaces/shared';
import { ApiResponse } from '../../interfaces/response';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/userSlice';
import { Role } from '../../interfaces/enums';

type BlogDetailsProps = {
  route: any;
};

const BlogDetails = ({ route }: BlogDetailsProps) => {
  const loginUser = useSelector(selectUser);
  const blogsService = useBlogService();
  const { blogId } = route.params;
  const [blogData, setBlogData] = useState<Blog>();
  const [loading, setLoading] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]); // assuming you will fetch comments from API

  const handleAddComment = async() => {
    try {
      if (newComment.trim()) {
        // Logic to post new comment goes here
        // Reset input field after adding a comment
        var response : ApiResponse<string> = await blogsService.addBlogComment(blogId, newComment);
        if(response.success){
          var cmntObj : Comment = {
            comment : newComment,
            commentId : response.data,
            user : loginUser,
          }
          setComments(prevCmnt => [...prevCmnt, cmntObj]);
          setNewComment('');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await blogsService.getBlogById(blogId);
        setBlogData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    })();

    (async () => {
      try {
        const data: ApiResponse<Comment[]> = await blogsService.getBlogComment(blogId);
        setComments(data.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
        {blogData.mediaUrls && blogData.mediaUrls.length > 0 && (
          <Image source={{ uri: blogData.mediaUrls[0] }} style={styles.image} />
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
        <Text style={styles.commentHeading} >Comments</Text>
        {/* Comments Section */}
        {commentsVisible && (
          <>
            {/* Comments List */}
            {comments.length > 0 ? (
              <FlatList
                data={comments}
                keyExtractor={(item) => item.commentId}
                renderItem={({ item }) => (
                  <View style={styles.commentItem}>
                    <View style={styles.commentUser}>
                      {item.user.imageUrl && (
                        <Image source={{ uri: item.user.imageUrl }} style={styles.commentAvatar} />
                      )}
                      <View style={styles.commentUserInfo}>
                        <Text style={styles.commentAuthor}>{item.user.name || 'Unknown User'}</Text>
                      </View>
                    </View>
                    <Text style={styles.commentText}>{item.comment}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noCommentsText}>No comments yet.</Text>
            )}
          </>
        )}
      </ScrollView>

      {/* Fixed Comment Input */}
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
        />
        <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
          <Text style={styles.addCommentButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentHeading : {
    marginVertical : 10,
    color : '#2d545e',
    fontWeight : 'bold',
    fontSize : 20,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
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
    marginRight : 10,
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
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    //borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  commentInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  addCommentButton: {
    backgroundColor: '#00796b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addCommentButtonText: {
    color: '#fff',
  },
  commentItem: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentUserInfo: {
    flexDirection: 'column',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 4,
  },
  noCommentsText: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#999',
  },
});

export { BlogDetails };
