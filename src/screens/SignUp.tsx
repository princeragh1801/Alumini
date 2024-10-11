import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SignUpForm} from '../interfaces/auth';
import InputText from '../components/Input/InputText';
import {IdAndName} from '../interfaces/shared';
import PrimaryButton from '../components/Button/PrimaryButton';
import SecondaryButton from '../components/Button/SecondaryButton';
import useAuthService from '../services/authService';
import {ApiResponse} from '../interfaces/response';
import {showError, showSuccess} from '../utils/toast';
import {storeToken} from '../utils/token';
import {useDispatch} from 'react-redux';
import {setToken} from '../store/tokenSlice';
import {Picker} from '@react-native-picker/picker';
import { Course } from '../interfaces/college';

const SignUp: React.FC = ({navigation}: any) => {
  const authService = useAuthService();
  const dispatch = useDispatch();
  // ref for input
  const emailRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const addmissionYearRef = useRef<TextInput>(null);
  const passoutYearRef = useRef<TextInput>(null);
  const otpRef = useRef<TextInput>(null);

  // form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpForm>();

  // states
  const [courses, setCourses] = useState<Course[]>([]);
  const [branches, setBranches] = useState<IdAndName[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [buttonText, setButtonText] = useState('Send OTP');
  const [collegeId, setCollegeId] = useState('');
  const [course, setCourse] = useState<Course>();
  const [otp, setOtp] = useState('');
  const onSubmit = async (data: SignUpForm) => {
    try {
      if (buttonText === 'Send OTP') {
        const response = await sendOtp(data);
        if (response) {
          setButtonText('Verify OTP');
        }
      } else if (buttonText === 'Verify OTP') {
        const response = await verifyOtp(data);
        if (response) {
          setButtonText('Register');
        }
      } else {
        await submitForm(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendOtp = async (data: SignUpForm) => {
    try {
      const domain = '@' + data.gmail.split('@')[1];
      const collegeDomain = encodeURIComponent(domain);

      const collegeIdResponse: ApiResponse<IdAndName> =
        await authService.getCollegeId(collegeDomain);
      if (collegeIdResponse.data == null) {
        showError('Please enter valid email id associated with college');
        return false;
      }
      setCollegeId(collegeIdResponse.data.id);
      const response = await authService.sendOTP(data.gmail, data.name);
      showSuccess('OTP sent');
      setOtpSent(true);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async (data: SignUpForm) => {
    try {
      const response: ApiResponse<boolean> = await authService.verifyOTP(
        data.gmail,
        data.otp,
      );
      if (!response.data) {
        showError('Please enter a valid otp');
        return false;
      }
      showSuccess('OTP Verified');
      setOtpVerified(true);
      await fetchCourse();
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCourse = async () => {
    try {
      console.log("College Id : ", collegeId)
      const response: ApiResponse<Course[]> =
        await authService.getCollegeCourse(collegeId);
        console.log("Response : ", response);
      if (response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranch = async (courseId: string) => {
    try {
      const response: ApiResponse<IdAndName[]> =
        await authService.getCollegeBranchUnderCourse(courseId);
      if (response.data) {
        setBranches(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitForm = async (data: SignUpForm) => {
    try {
      data.collegeId = collegeId;
      data.courseId = course?.courseId??'';
      //data.courseId = courseId;
      console.log("Data : ", data);
      const response = await authService.registerUser(data);
      console.log("Response : ", response);
      if (response) {
        await storeToken(response);
        dispatch(setToken(response));
        showSuccess('Registration successful');
        navigation.navigate('Home');
      } else {
        // TODO :: UPDATE THIS
        showError('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register As Student</Text>
      {!otpVerified && (
        <InputText
          ref={nameRef}
          control={control}
          name="name"
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be atleast of 2 characters',
            },
          }}
          errorMessage={errors.name?.message}
        />
      )}

      {!otpVerified && (
        <InputText
          ref={emailRef}
          control={control}
          name="gmail"
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email is not valid',
            },
          }}
          errorMessage={errors.gmail?.message}
        />
      )}

      {otpSent && !otpVerified && (
        <InputText
          ref={otpRef}
          control={control}
          name="otp"
          placeholder="OTP"
          keyboardType="numeric"
          rules={{
            required: 'OTP is required',
            validate: {
              isSixDigits: (value: string) =>
                /^\d{6}$/.test(value) || 'OTP must be a 6-digit number',
            },
          }}
          errorMessage={errors.password?.message}
        />
      )}

      {otpVerified && (
        <View style={styles.controllerContainer}>
          <Controller
            control={control}
            name="courseId"
            render={({field: {onChange, value}}) => (
              <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  const selectedCourse = courses.find(course => course.id === itemValue);
                  setCourse(selectedCourse)
                  onChange({
                    courseId: itemValue,      // The selected branch ID
                    course: selectedCourse    // The entire branch object
                  });
                  fetchBranch(selectedCourse?.id??"")
                }}>
                <Picker.Item
                  key={`Select your Course`}
                  label={`Select your Course`}
                  value={'0'}
                />
                {courses.map(option => (
                  <Picker.Item
                    key={option.id}
                    label={option.name}
                    value={option.id}
                  />
                ))}
              </Picker>
            )}
          />
          {errors.courseId && (
            <Text style={styles.error}>{errors.courseId?.message}</Text>
          )}
        </View>
      )}
      {otpVerified && (
        <View style={styles.controllerContainer}>
          <Controller
            control={control}
            name="branchId"
            render={({field: {onChange, value}}) => (
              <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={(onChange)}>
                <Picker.Item
                  key={`Select your Branch`}
                  label={`Select your Branch`}
                  value={'0'}
                />
                {branches.map(option => (
                  <Picker.Item
                    key={option.id}
                    label={option.name}
                    value={option.id}
                  />
                ))}
              </Picker>
            )}
          />
          {errors.branchId && (
            <Text style={styles.error}>{errors.branchId?.message}</Text>
          )}
        </View>
      )}
      {otpVerified && (
        <InputText
          ref={addmissionYearRef}
          control={control}
          name="admissionYear"
          placeholder="Admission Year"
          keyboardType="numeric"
          rules={{
            required: 'Admission Year is required',
            validate: {
              isFourDigits: (value: string) =>
                /^\d{4}$/.test(value) ||
                'Admission Year must be a 4-digit number',
            },
          }}
          errorMessage={errors.admissionYear?.message}
        />
      )}
      {otpVerified && (
        <InputText
          ref={passoutYearRef}
          control={control}
          name="passoutYear"
          keyboardType="number-pad"
          placeholder="Passout Year"
          rules={{
            required: 'Passout Year is required',
            validate: {
              isFourDigits: (value: string) =>
                /^\d{4}$/.test(value) ||
                'Passout Year must be a 4-digit number',
            },
          }}
          errorMessage={errors.passoutYear?.message}
        />
      )}
      {otpVerified && (
        <InputText
          ref={passwordRef}
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          }}
          errorMessage={errors.password?.message}
        />
      )}
      <PrimaryButton name={buttonText} onPress={handleSubmit(onSubmit)} />
      <Text style={styles.orText}>OR</Text>
      <SecondaryButton
        name="Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controllerContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    height: 50,
  },
  primaryBtn: {
    backgroundColor: '#d27511', // Change this to your desired color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: '#2d545e', // Change this to your desired color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  orText: {
    marginHorizontal: 'auto',
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#2d545e',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default SignUp;
