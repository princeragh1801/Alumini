import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { LoginForm, LoginResponse } from '../interfaces/auth'
import { Role } from '../interfaces/enums';
import InputText from '../components/Input/InputText';
import EnumInput from '../components/Input/EnumInput';
import PrimaryButton from '../components/Button/PrimaryButton';
import SecondaryButton from '../components/Button/SecondaryButton';
import useAuthService from '../services/authService';
import { useDispatch } from 'react-redux';
import { storeToken } from '../utils/token';
import { setToken } from '../store/tokenSlice';
import { ApiResponse } from '../interfaces/response';
import { setUser } from '../store/userSlice';

const Login : React.FC = ({navigation} : any) => {
  const dispatch = useDispatch();
  const authService = useAuthService();
  // refs
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
      role: Role.Student,
    },
  });

  const onSubmit = async(data: LoginForm) => {
    try {
      console.log("Data : ", data)
      const response : ApiResponse<LoginResponse> = await authService.loginUser(data);
      console.log("Response : ", response);
      if(response != null){
        await storeToken(response.data.token);
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        navigation.navigate('Root', {
          screen : 'Home'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login As Student</Text>

      <InputText
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
      />

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
      {/* <View>
        <Text style={{marginBottom:5}}>Select Your Role</Text>
        <EnumInput
          control={control}
          name="role"
          errorMessage={errors.role?.message}
          rules={{
            required : 'Role is required'
          }}
        />
      </View> */}
      <PrimaryButton name='Login' onPress={handleSubmit(onSubmit)} />
        <Text style={styles.orText} >OR</Text>
      <SecondaryButton name='Create Account' onPress={()=> navigation.navigate('SignUp')}/>
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

export default Login;