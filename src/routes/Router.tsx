import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import ToastManager from 'toastify-react-native';
import { getToken } from '../utils/token';
import Loading from '../screens/Loading';
import useAuthService  from '../services/authService';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/tokenSlice';
import { setUser } from '../store/userSlice';
import { UserBasic } from '../interfaces/user';

const Router = () => {
  const authService = useAuthService();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(()=>{
      ;(async () => {
        try {
          var token = await getToken();
          console.log("Token : ", token);
          if(token != null && token != ""){
            setIsLoggedIn(true)
            // const data : UserBasic = await authService.getCurrentUser();
            dispatch(setToken(token));
            // dispatch(setUser(data));
            // console.log("User : ", data);
            // setIsLoggedIn(true);
            
          }
          setLoading(false)
        } catch (error) {
          console.error(error);
        }
      })();
    })
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