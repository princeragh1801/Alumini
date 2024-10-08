import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useForm, Controller} from 'react-hook-form';
import {ApiResponse} from '../interfaces/response';
import {IdAndName} from '../interfaces/shared';
import useTagService from '../services/tagService';
import useBlogService from '../services/blogsService';
import {BlogPost} from '../interfaces/blog';

const screenHeight = Dimensions.get('window').height;

const AddBlogTest = ({navigation}: any) => {
  const tagService = useTagService();
  const blogsService = useBlogService();
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [showTagInputModal, setShowTagInputModal] = useState(false);
  const [tagText, setTagText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<IdAndName[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<IdAndName[]>(
    [],
  );
  const [inputPosition, setInputPosition] = useState({y: 0, height: 0});
  const {control, handleSubmit, setValue, watch} = useForm();
  const [img, setImg] = useState<any>();

  const handleAddTag = () => {
    if (tagText.trim() && !tags.includes(tagText)) {
      setTags(prevTags => [...prevTags, tagText.trim()]);
      setTagText('');
      setFilteredSuggestions([]);
    }
  };

  const handleTagInput = (text: string) => {
    setTagText(text);
    const filtered = suggestions.filter(tag =>
      tag.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionPress = (tag: IdAndName) => {
    if (!tags.includes(tag.name)) {
      setTagIds(prevTags => [...prevTags, tag.id]);
      setTags(prevTags => [...prevTags, tag.name]);
    }
    setTagText('');
    setFilteredSuggestions([]);
  };

  const handleImagePick = async () => {
    try {
      const resp = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      });
      if (resp.assets && resp.assets.length > 0) {
        const imageUri = resp.assets[0].uri;
        var file = resp.assets[0];
        var obj = {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
        };
        setSelectedImage(obj);
        setImg(file);
        setValue('image', imageUri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: any) => {
    const payload: BlogPost = {
      description: data.blogContent,
      tags: tagIds,
      MediaFiles: selectedImage != null ? [selectedImage] : [],
    };
    try {
      console.log('Payload : ', payload);
      const response = await blogsService.addBlog(payload);
      console.log('Response : ', response);
    } catch (error) {
      console.error(error);
    }
  };

  const blogContent = watch('blogContent', '');

  useEffect(() => {
    (async () => {
      try {
        const data: ApiResponse<IdAndName[]> = await tagService.getTags();
        setSuggestions(data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
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
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
              }}
              style={styles.avatar}
            />
            <Text style={styles.nameText}>Prince Raghuwnashi</Text>
          </View>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => setShowTagInputModal(true)}>
            <Text style={styles.postButtonText}>Add Tags</Text>
          </TouchableOpacity>
        </View>

        {/* Blog Text Area */}
        <Controller
          control={control}
          name="blogContent"
          defaultValue=""
          render={({field: {onChange, value}}) => (
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
        {selectedImage && (
          <Image source={{uri: selectedImage.uri}} style={styles.image} />
        )}

        {/* Button Container */}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button1} onPress={handleImagePick}>
            <Ionicons name="image" size={25} color="#2d545e" />
          </TouchableOpacity>
        </View>

        {/* Tags Display */}
        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <Text style={styles.tagsLabel}>Tags:</Text>
            <FlatList
              data={tags}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.tagItem}>
                  <Text style={styles.tagText}>{item}</Text>
                </View>
              )}
            />
          </View>
        )}

        {/* Modal for Tag Input */}
        <Modal
          visible={showTagInputModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTagInputModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Tag Input Field */}
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.tagInputModal}
                  placeholder="Enter tag..."
                  value={tagText}
                  onChangeText={handleTagInput} // Update tag text and show suggestions
                />
                <TouchableOpacity
                  style={styles.addTagButton}
                  onPress={handleAddTag}>
                  <Text style={styles.addTagText}>Add</Text>
                </TouchableOpacity>
              </View>

              {/* Suggestions Dropdown */}
              {filteredSuggestions.length > 0 && (
                <FlatList
                  data={filteredSuggestions}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleSuggestionPress(item)}
                      style={styles.suggestionItem}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  style={styles.suggestionListModal}
                />
              )}

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setShowTagInputModal(false)}>
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagInputModal: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addTagButton: {
    backgroundColor: '#2d545e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addTagText: {
    color: 'white',
  },
  suggestionListModal: {
    maxHeight: 150, // Limit height for suggestions
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeModalButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  closeModalButtonText: {
    color: '#2d545e',
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    paddingRight: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  postButton: {
    backgroundColor: '#2d545e',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  postButtonText: {
    color: 'white',
  },
  textArea: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button1: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  tagsContainer: {
    marginTop: 10,
  },
  tagsLabel: {
    fontWeight: 'bold',
  },
  tagItem: {
    backgroundColor: '#ddd',
    borderRadius: 15,
    padding: 8,
    marginHorizontal: 5,
  },
  tagText: {
    fontSize: 14,
  },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // modalContent: {
  //   width: '80%',
  //   backgroundColor: 'white',
  //   padding: 20,
  //   borderRadius: 10,
  // },
  // inputRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // tagInputModal: {
  //   flex: 1,
  //   borderColor: '#ddd',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   padding: 10,
  // },
  // addTagButton: {
  //   marginLeft: 10,
  //   backgroundColor: '#2d545e',
  //   paddingHorizontal: 12,
  //   paddingVertical: 8,
  //   borderRadius: 5,
  // },
  // addTagText: {
  //   color: 'white',
  // },
  // suggestionListModal: {
  //   marginTop: 10,
  //   maxHeight: 150,
  // },
  // suggestionItem: {
  //   padding: 10,
  //   backgroundColor: '#f5f5f5',
  //   marginBottom: 5,
  //   borderRadius: 5,
  // },
  // closeModalButton: {
  //   marginTop: 10,
  //   alignSelf: 'center',
  // },
  // closeModalButtonText: {
  //   color: '#2d545e',
  //   fontWeight: 'bold',
  // },
});

export default AddBlogTest;




















