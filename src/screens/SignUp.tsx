import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpForm } from '../interfaces/auth'
import InputText from '../components/Input/InputText';
import { IdAndName } from '../interfaces/shared';
import DropDownInput from '../components/Input/DropDownInput';
import PrimaryButton from '../components/Button/PrimaryButton';
import SecondaryButton from '../components/Button/SecondaryButton';

const SignUp : React.FC = ({navigation} : any) => {

  // ref for input
  const emailRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const addmissionYearRef = useRef<TextInput>(null);
  const passoutYearRef = useRef<TextInput>(null);
  const otpRef = useRef<TextInput>(null );

  // form
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>();

  // states
  const [courses, setCourses] = useState<IdAndName[]>([]);
  const [branches, setBranches] = useState<IdAndName[]>([]);
  const [otpSent, setOtpSent] = useState(true)
  const [otpVerified, setOtpVerified] = useState(true);
  const [buttonText, setButtonText] = useState('Send OTP')


  const onSubmit = (data: SignUpForm) => {
    console.log("Data : ", data)
    Alert.alert('Login Attempt', `Email: ${data.email}, Password: ${data.password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      { !otpVerified && <InputText
      ref={nameRef}
        control={control}
        name="name"
        placeholder="Name"
        rules={{
          required: 'Name is required',
          minLength : {
            value : 2,
            message : "Name must be atleast of 2 characters"
          }
        }}
        errorMessage={errors.name?.message}
      />}

      {!otpVerified && <InputText
      ref={emailRef}
        control={control}
        name="email"
        placeholder="Email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Email is not valid',
          },
        }}
        errorMessage={errors.email?.message}
      />}

      { otpSent && !otpVerified && <InputText
        ref={otpRef}
        control={control}
        name="otp"
        placeholder="OTP"
        keyboardType='numeric'
        secureTextEntry
        rules={{
          required: 'OTP is required',
          validate: {
            isSixDigits: (value:string) => /^\d{6}$/.test(value) || 'OTP must be a 6-digit number',
          },
        }}
        errorMessage={errors.password?.message}
      />}

      {otpVerified && <DropDownInput
        control={control}
        name="courseId"
        errorMessage={errors.courseId?.message}
        options={courses}
        labelName='course'
        rules={{
          required : 'Course is requird'
        }}
      />}
      {otpVerified && <DropDownInput
        control={control}
        name="branchId"
        errorMessage={errors.branchId?.message}
        options={branches}
        labelName='branch'
        rules={{
          required : 'Branch is requird'
        }}
      />}
      { otpVerified && <InputText
      ref={addmissionYearRef}
        control={control}
        name="admissionYear"
        placeholder="Admission Year"
        keyboardType='numeric'
        rules={{
          required: 'Admission Year is required',
          validate: {
            isFourDigits: (value:string) => /^\d{4}$/.test(value) || 'Admission Year must be a 4-digit number',
          },
        }}
        errorMessage={errors.admissionYear?.message}
      />}
      { otpVerified && <InputText
      ref={passoutYearRef}
        control={control}
        name="passoutYear"
        keyboardType='number-pad'
        placeholder="Passout Year"
        rules={{
          required: 'Passout Year is required',
          validate: {
            isFourDigits: (value:string) => /^\d{4}$/.test(value) || 'Passout Year must be a 4-digit number',
          },
        }}
        errorMessage={errors.passoutYear?.message}
        
      />}
      { otpVerified && <InputText
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
      />}
      <PrimaryButton name={buttonText} onPress={handleSubmit(onSubmit)} />
        <Text style={styles.orText} >OR</Text>
      <SecondaryButton name='Login' onPress={()=> navigation.navigate('Login')}/>
    </View>
  );
};

const styles = StyleSheet.create({
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
  secondaryBtn : {
    backgroundColor: '#2d545e', // Change this to your desired color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  orText : {
    marginHorizontal : 'auto', 
    marginVertical : 5, 
    fontWeight : 'bold',
    color : '#2d545e'
  }
});

export default SignUp;