import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name='Login' component={Login}  options={{headerShown : false}} />
        <Stack.Screen name='SignUp' component={SignUp}  options={{headerShown : false}} />
        <Stack.Screen name='Root' component={AppStack} options={{headerShown : false}} />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})