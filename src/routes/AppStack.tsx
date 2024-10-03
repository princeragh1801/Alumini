import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Events from '../screens/Events';
import Blogs from '../screens/Blogs';

const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'accessibility';

            if (route.name === 'Home') {
              iconName = focused
                ? 'albums'
                : 'albums-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'baseball' : 'baseball-outline';
            }else if(route.name === 'Events'){
              iconName = focused ? 'beer' : 'beer-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={Blogs} 
          options={{
            headerTitle: 'Alumini-Econnect', 
            headerTitleAlign: 'center',
            headerTitleStyle : {
              fontWeight : 'bold',
              color : '#2d545e'
            }
          }} 
        />
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})