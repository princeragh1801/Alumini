import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

const AddBlog = ({navigation} : any) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  const handleImagePick = async () => {
    try {
      console.log("Handle image pick");
      console.log("Process start : ");
      const resp = await launchImageLibrary(options);
      console.log("Res : ", resp);
      setSelectedImage(resp.assets[0].uri);
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Ionicons name='close' size={30} color={'#2d545e'} style={{margin:5}} />
        <TouchableOpacity style={{margin : 5, backgroundColor:'#2d545e'}}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View> */}
      <TextInput
        style={styles.textArea}
        placeholder="Write your blog here..."
        multiline
        numberOfLines={10}
        value={text}
        onChangeText={setText}
      />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleImagePick}>
          <Ionicons name='image' size={25} color={'#2d545e'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Ionicons name='image' size={25} color={'#2d545e'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBlog;

const styles = StyleSheet.create({
  headerContainer : {
    flex : 1,
    flexDirection : 'row',
  },
  btnContainer:{
    flex : 1,
    flexDirection:'row'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textArea: {
    flex: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  button1: {
    position : 'absolute',
    bottom: 20, // Adjust bottom spacing
    right: 20, // Adjust right spacing
    backgroundColor: '#ffff',
    elevation:2,
    padding: 15,
    borderRadius: 50, // Make it circular (optional)
  },
  button2 : {
    position : 'absolute',
    bottom: 20, // Adjust bottom spacing
    right: 100, // Adjust right spacing
    backgroundColor: '#ffff',
    elevation:2,
    padding: 15,
    borderRadius: 50, // Make it circular (optional)
  },
  button3 : {
    position : 'absolute',
    bottom: 20, // Adjust bottom spacing
    right: 200, // Adjust right spacing
    backgroundColor: '#2d545e',
    elevation:2,
    padding: 15,
    borderRadius: 12, // Make it circular (optional)
  },
  buttonText: {
    color: '#d27511',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize : 20,
    padding : 4
  },
});
