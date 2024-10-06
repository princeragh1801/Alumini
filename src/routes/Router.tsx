import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import ToastManager from 'toastify-react-native';
import { getToken } from '../utils/token';
import Loading from '../screens/Loading';
import useAuthService  from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { UserBasic } from '../interfaces/user';
import { ApiResponse } from '../interfaces/response';

const Router = () => {
  const authService = useAuthService();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const fetchCurrentUser = async() => {
      try {
        const data : ApiResponse<UserBasic> = await authService.getCurrentUser();
            if(data != null){
              const user = data.data;
              if(user != null){
                console.log("Current user : ", user);
                dispatch(setUser(user));
                setIsLoggedIn(true);
              }
            }
            console.log("router data : ", data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      fetchCurrentUser();
    },[])
    if(loading) {
      return <Loading/>
    }
  return <>
  <ToastManager/>
  {isLoggedIn ? <AppStack/> : <AuthStack/>}
  </>
}

export default Router

const styles = StyleSheet.create({})