import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name='Login' component={Login}  options={{headerShown : false}} />
        <Stack.Screen name='SignUp' component={SignUp}  options={{headerShown : false}} />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})