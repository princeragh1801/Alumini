import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, FlatList, Modal, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { ApiResponse } from '../interfaces/response';
import { IdAndName } from '../interfaces/shared';
import useTagService from '../services/tagService';
import useBlogService from '../services/blogsService';
import { BlogForm } from '../interfaces/blog';
import useAuthService from '../services/authService';

const AddBlog = ({ navigation }: any) => {
  const tagService = useTagService();
  const blogsService = useBlogService();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagText, setTagText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const { control, handleSubmit, setValue, watch } = useForm();
  const [suggestions, setSuggestions] = useState<IdAndName[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<IdAndName[]>([]);

  const handleAddTag = () => {
    if (tagText.trim() && !tags.includes(tagText)) {
      setTags((prevTags) => [...prevTags, tagText.trim()]); // Add the new tag
      setTagText(''); // Clear the input field
      setFilteredSuggestions([]); // Clear suggestions
    }
  };

  const handleTagInput = (text: string) => {
    setTagText(text);
    const filtered = suggestions.filter((tag) => tag.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionPress = (tag: IdAndName) => {
    if (!tags.includes(tag.name)) {
      console.log("Id : ", tag.id, " Name : ", tag.name);
      setTagIds((prevTags) => [...prevTags, tag.id]);
      setTags((prevTags) => [...prevTags, tag.name]);
    }
    setTagText(''); // Clear input field
    setFilteredSuggestions([]); // Clear suggestions
  };
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };
  const authService = useAuthService();
  const handleImagePick = async () => {
    try {
      const resp = await launchImageLibrary(options);
      if (resp.assets && resp.assets.length > 0) {
        console.log("Image : ", resp);
        const imageUri = resp.assets[0].uri;
        const formData = new FormData();
        var file = resp.assets[0];
        // Append the file to the FormData object
        formData.append('formFile', {
            uri: file.uri,          // The file's URI
            type: file.type,        // The file's MIME type (e.g., 'image/jpeg')
            name: file.fileName,        // The file's name
        });
        const response = await authService.addImage(formData);
        setSelectedImage(response.data);
        setValue('image', imageUri); // Set the image field in the form
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async(data: any) => {
    const payload : BlogForm = {
      description: data.blogContent, // Map to description
      tags: tagIds, // Tags array
      imageUrls: selectedImage != null ? [selectedImage] : [] // Array of image URLs
    };
    try {
      console.log('Payload:', payload);
      const response = await blogsService.addBlog(data);
      console.log("Response : ", response);
      // API call to submit the payload
      Alert.alert('Blog post submitted!');
      setPreviewVisible(false); // Close the modal after submission
      setTags([]);
      setTagIds([]);
      
    } catch (error) {
      console.error(error)
    }
    
  };

  const handlePreview = () => {
    setPreviewVisible(true); // Open the modal for preview
  };

  // Get current blog content
  const blogContent = watch('blogContent', '');
  useEffect(()=>{
    ;(async()=>{
      try {
        const data : ApiResponse<IdAndName[]> = await tagService.getTags();
        console.log("Tags : ", data);
        setSuggestions(data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  },[navigation])
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="close"
          size={30}
          color="#2d545e"
          onPress={() => navigation.goBack()}
          style={styles.icon}
        />
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png' }}
            style={styles.avatar}
          />
          <Text style={styles.nameText} >Prince Raghuwnashi</Text>
        </View>
        <TouchableOpacity style={styles.postButton} onPress={handlePreview}>
          <Text style={styles.postButtonText}>Preview</Text>
        </TouchableOpacity>
      </View>

      {/* Blog Text Area */}
      <Controller
        control={control}
        name="blogContent"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.textArea}
            placeholder="Write your blog here..."
            multiline
            numberOfLines={10}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Selected Image */}
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

      {/* Button Container */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.postButton} onPress={() => setShowTagInput(!showTagInput)}>
          <Text style={styles.postButtonText}>{showTagInput ? "Close" : "Add Tags"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={handleImagePick}>
          <Ionicons name="image" size={25} color="#2d545e" />
        </TouchableOpacity>
      </View>

      {/* Tag Input Field */}
      {showTagInput && (
        <View>
          <View style={styles.tagInputContainer}>
            <TextInput
              style={styles.tagInput}
              placeholder="Enter tag..."
              value={tagText}
              onChangeText={handleTagInput}
            />
              {/* <TouchableOpacity style={styles.addTagButton} onPress={handleAddTag}>
                <Text style={styles.addTagText}>Add Tag</Text>
              </TouchableOpacity> */}
            
              {/* Dropdown for filtered suggestions */}
              {filteredSuggestions.length > 0 && (
                <FlatList
                  data={filteredSuggestions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  style={styles.suggestionList}
                />
              )}
            </View>
          <TouchableOpacity style={styles.addTagButton} onPress={handleAddTag}>
            <Text style={styles.addTagText}>Add Tag</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Display Added Tags */}
      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsLabel}>Tags:</Text>
          <FlatList
            data={tags}
            horizontal
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tagItem}>
                <Text style={styles.tagText}>{item}</Text>
              </View>
            )}
          />
        </View>
      )}

      {/* Modal for Blog Preview */}
      <Modal
        visible={previewVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.previewTitle}>Blog Preview</Text>

              {/* Blog Content */}
              <Text style={styles.previewContent}>{blogContent}</Text>

              {/* Selected Image */}
              {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              )}

              {/* Display Tags */}
              {tags.length > 0 && (
                <View style={styles.previewTagsContainer}>
                  <Text style={styles.tagsLabel}>Tags:</Text>
                  <FlatList
                    data={tags}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.tagItem}>
                        <Text style={styles.tagText}>{item}</Text>
                      </View>
                    )}
                  />
                </View>
              )}
            </ScrollView>

            {/* Post Button in Preview */}
            <TouchableOpacity style={styles.confirmPostButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.confirmPostButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddBlog;

const styles = StyleSheet.create({
  
  tagInputContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  tagInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addTagButton: {
    backgroundColor: '#2d545e',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addTagText: {
    color: '#fff',
  },
  suggestionList: {
    maxHeight: 100, // Limit height for suggestions
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tagsContainer: {
    marginTop: 20,
  },
  tagsLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tagItem: {
    backgroundColor: '#2d545e',
    padding: 8,
    borderRadius: 20,
    marginRight: 5,
  },
  tagText: {
    color: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    marginLeft: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameText: {
    fontSize: 16,
    color: '#2d545e',
  },
  postButton: {
    backgroundColor: '#2d545e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 18,
    marginBottom: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button1: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  previewContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  previewTagsContainer: {
    marginTop: 10,
  },
  confirmPostButton: {
    backgroundColor: '#2d545e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmPostButtonText: {
    color: '#fff',
    fontSize: 18,
  },

});
