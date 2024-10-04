import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Events from '../screens/Events';
import Blogs from '../screens/Blogs';
import { Avatar, Image } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'accessibility';

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }else if(route.name === 'Events'){
              iconName = focused ? 'ribbon' : 'ribbon-outline';
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
          options={({ navigation }) => ({
            headerLeft : (props) => (
              <TouchableOpacity>
                <Avatar/>
              </TouchableOpacity>
            ),
            headerRight : (props) => (
              <TouchableOpacity
              style={{marginRight : 20}}
                {...props}
                onPress={() => {
                  // Navigate to the Add Blog screen
                  navigation.navigate('AddBlog');
                }}
              >
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerTitle:'Alumini-Econnect',
            headerTitleStyle : {
              fontWeight : 'bold',
              color : '#2d545e',
            },
            headerTitleAlign : 'center'
          })}
          
        />
        {/* <Tab.Screen 
          name="Home" 
          component={AddBlog} 
          options={{
            headerTitle: 'Alumini-Econnect', 
            headerTitleAlign: 'center',
            headerTitleStyle : {
              fontWeight : 'bold',
              color : '#2d545e'
            }
          }} 
        /> */}
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})