import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import ToastManager from 'toastify-react-native';

const Router = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <>
  <ToastManager/>
  {isLoggedIn ? <AppStack/> : <AuthStack/>}
  </>
}

export default Router

const styles = StyleSheet.create({})