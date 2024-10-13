import React, {useEffect, useRef, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {selectUser} from '../store/userSlice';
import useEventService from '../services/eventService';
import { EventAdd } from '../interfaces/event';
import InputText from '../components/Input/InputText';
import PrimaryButton from '../components/Button/PrimaryButton';
import SecondaryButton from '../components/Button/SecondaryButton';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;

const AddEvent = ({navigation}: any) => {
    const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [openDeadlineDate, setOpenDeadlineDate] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [deadlineDate, setDeadlineDate] = useState<Date>();
  
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
  const [openDeadlineTime, setOpenDeadlineTime] = useState(false);

  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [deadlineTime, setDeadlineTime] = useState<Date>();

    // refs
    const titleRef = useRef<TextInput>(null);
    const locationRef = useRef<TextInput>(null);
    const startDateRef = useRef<TextInput>(null);
    const endDateRef = useRef<TextInput>(null);
    const startTimeRef = useRef<TextInput>(null);
    const endTimeRef = useRef<TextInput>(null);
    const registrationDeadlineRef = useRef<TextInput>(null);
    const { control, handleSubmit, watch, formState: { errors } } = useForm<EventAdd>();

  const user = useSelector(selectUser);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [img, setImg] = useState<any>();

  const validateDateTime = () => {
    if(startDate && endDate){
        if(startDate > endDate){
            return false;
        }if(startTime && endTime){
            const startDateTime = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
                startTime.getHours(),
                startTime.getMinutes()
              );
          
              const endDateTime = new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate(),
                endTime.getHours(),
                endTime.getMinutes()
              );
              if (startDateTime >= endDateTime) {
                Alert.alert("Validation Error", "Start Date-Time must be earlier than End Date-Time.");
                return false;
              }
        }
        return true;
    }
    return false;

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
        setImg(file); // Set the image field in the form
      }
    } catch (error) {
      console.error(error);
    }
  };

  const eventService = useEventService();
    const onSubmit = async(data : EventAdd) => {
        try {
            if(!validateDateTime()){
                return;
            }
            data.mediaFiles = selectedImage != null ? [selectedImage] : [];
            const response = await eventService.addEvent(data);
            console.log("Response : ", response);
        } catch (error) {
            console.error(error);
        }
    }
    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);
  const handlePreview = () => {
    setPreviewVisible(true); // Open the modal for preview
  };
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
            <Image source={{uri: user?.imageUrl}} style={styles.avatar} />
            <Text style={styles.nameText}>{user?.name}</Text>
          </View>
          <TouchableOpacity style={styles.postButton} onPress={handlePreview}>
            <Text style={styles.postButtonText}>Preview</Text>
          </TouchableOpacity>
        </View>
        <InputText
        ref={titleRef}
        control={control}
        name="name"
        placeholder="Name"
        rules={{
          required: 'Name is required',
          minLength : 2
        }}
        errorMessage={errors.name?.message}
      />
        {/* Blog Text Area */}
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.textArea}
              placeholder="Write your event description here..."
              multiline
              numberOfLines={10}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <InputText
        ref={locationRef}
        control={control}
        name="location"
        placeholder="Location"
        rules={{
          required: 'Location is required',
          minLength : 2
        }}
        errorMessage={errors.location?.message}
      />

    {/* Row 1: Start Date and Start Time */}
    <View style={styles.row}>
        {/* Start Date Picker */}
        <Controller
          control={control}
          name="startDate"
          defaultValue={startDate}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setOpenStartDate(true)}
              >
                <MaterialIcons name="calendar-today" size={24} color="#2d545e" />
                <Text style={styles.dateText}>
                  {value ? value.toLocaleDateString() : 'Start Date'}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="date"
                open={openStartDate}
                date={value || new Date()}
                onConfirm={(selectedDate) => {
                  setOpenStartDate(false);
                  setStartDate(selectedDate);
                  onChange(selectedDate);
                }}
                onCancel={() => setOpenStartDate(false)}
              />
            </>
          )}
        />

        {/* Start Time Picker */}
        <Controller
          control={control}
          name="startTime"
          defaultValue={startTime}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setOpenStartTime(true)}
              >
                <MaterialIcons name="access-time" size={24} color="#2d545e" />
                <Text style={styles.dateText}>
                  {value
                    ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : 'Start Time'}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="time"
                open={openStartTime}
                date={value || new Date()}
                onConfirm={(selectedTime) => {
                  setOpenStartTime(false);
                  setStartTime(selectedTime);
                  onChange(selectedTime);
                }}
                onCancel={() => setOpenStartTime(false)}
              />
            </>
          )}
        />
      </View>

      {/* Row 2: End Date and End Time */}
      <View style={styles.row}>
        {/* End Date Picker */}
        <Controller
          control={control}
          name="endDate"
          defaultValue={endDate}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setOpenEndDate(true)}
              >
                <MaterialIcons name="calendar-today" size={24} color="#2d545e" />
                <Text style={styles.dateText}>
                  {value ? value.toLocaleDateString() : 'End Date'}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="date"
                open={openEndDate}
                date={value || new Date()}
                onConfirm={(selectedDate) => {
                  setOpenEndDate(false);
                  setEndDate(selectedDate);
                  onChange(selectedDate);
                }}
                onCancel={() => setOpenEndDate(false)}
              />
            </>
          )}
        />

        {/* End Time Picker */}
        <Controller
          control={control}
          name="endTime"
          defaultValue={endTime}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setOpenEndTime(true)}
              >
                <MaterialIcons name="access-time" size={24} color="#2d545e" />
                <Text style={styles.dateText}>
                  {value
                    ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : 'End Time'}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="time"
                open={openEndTime}
                date={value || new Date()}
                onConfirm={(selectedTime) => {
                  setOpenEndTime(false);
                  setEndTime(selectedTime);
                  onChange(selectedTime);
                }}
                onCancel={() => setOpenEndTime(false)}
              />
            </>
          )}
        />
      </View>
      


      {/* Row 3: Deadline Date and Deadline Time */}
      <View style={styles.row}>
        {/* End Date Picker */}
        <Controller
          control={control}
          name="registration_Deadline"
          defaultValue={deadlineDate}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setOpenDeadlineDate(true)}
              >
                <MaterialIcons name="calendar-today" size={24} color="#2d545e" />
                <Text style={styles.dateText}>
                  {value ? value.toLocaleDateString() : 'Deadline Date'}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="date"
                open={openDeadlineDate}
                date={value || new Date()}
                onConfirm={(selectedDate) => {
                  setOpenDeadlineDate(false);
                  setDeadlineDate(selectedDate);
                  onChange(selectedDate);
                }}
                onCancel={() => setOpenDeadlineDate(false)}
              />
            </>
          )}
        />

        {/* End Time Picker */}
        <Controller
          control={control}
          name="registration_Deadline_Time"
          defaultValue={deadlineTime}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.datePickerContainer}
                onPress={() => setOpenDeadlineTime(true)}
              >
                <MaterialIcons name="access-time" size={24} color="#2d545e" />
                <Text style={styles.dateText}>
                  {value
                    ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : 'Deadline Time'}
                </Text>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="time"
                open={openDeadlineTime}
                date={value || new Date()}
                onConfirm={(selectedTime) => {
                  setOpenDeadlineTime(false);
                  setDeadlineTime(selectedTime);
                  onChange(selectedTime);
                }}
                onCancel={() => setOpenDeadlineTime(false)}
              />
            </>
          )}
        />
      </View>
     <SecondaryButton name='Add Image' key={"Add Image"} onPress={handleImagePick}/>
        {/* Selected Image */}
        {selectedImage && (
          <Image source={{uri: selectedImage.uri}} style={styles.image} />
        )}


        {/* Modal for Blog Preview */}
        <Modal
          visible={previewVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setPreviewVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.previewTitle}>Event Preview</Text>
                {selectedImage && (
                  <Image
                    source={{uri: selectedImage.uri}}
                    style={styles.imagePreview}
                  />
                )}

                {/* Close and Post Buttons */}
                <TouchableOpacity
                  style={styles.closePreviewButton}
                  onPress={() => setPreviewVisible(false)}>
                  <Text style={styles.closePreviewButtonText}>
                    Close Preview
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closePreviewButton}
                  onPress={handleSubmit(onSubmit)}
                  >
                  <Text style={styles.closePreviewButtonText}>Post Event</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    datePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
      },
      dateText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#555',
      },
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
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom : 20,
  },
  avatarContainer: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 40, height: 40, borderRadius: 20, marginRight: 10},
  nameText: {fontSize: 16, fontWeight: 'bold'},
  postButton: {padding: 10, backgroundColor: '#2d545e', borderRadius: 10},
  postButtonText: {color: '#fff', fontWeight: 'bold'},
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    textAlignVertical: 'top',
    marginBottom : 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button1: {padding: 10, backgroundColor: '#f1f1f1', borderRadius: 10},
  tagInputContainer: {marginTop: 10},
  tagInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  tagsContainer: {marginVertical: 10},
  tagsLabel: {fontWeight: 'bold'},
  tagItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginRight: 5,
  },
  tagText: {fontSize: 14},
  suggestionList: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  previewTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  previewContent: {fontSize: 16},
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  closePreviewButton: {
    padding: 10,
    backgroundColor: '#2d545e',
    borderRadius: 10,
    marginTop: 10,
  },
  closePreviewButtonText: {color: '#fff', textAlign: 'center'},
  icon: {
    marginLeft: 5,
  },
});

export default AddEvent;
