// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Router from './src/routes/Router';
import AddBlog from './src/screens/AddBlog';
import {BlogDetails} from './src/screens/Details/BlogDetails';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from './src/screens/Splash';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AuthStack from './src/routes/AuthStack';
import Profile from './src/screens/Profile';
import AddEvent from './src/screens/AddEvent';

const Stack = createNativeStackNavigator();

function App({navigation} : any) {
  

  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown : false}} />
        <Stack.Screen name='Router' component={Router} options={{headerShown : false}} />
        <Stack.Screen name='Auth' component={AuthStack} options={{headerShown : false}}/>                   
        <Stack.Screen name="Profile" component={Profile} options={{ 
            headerTitleStyle : {
              fontWeight : 'bold',
              color : '#2d545e',
            },
            headerTitleAlign : 'center'}} />                   
        <Stack.Screen
        name="AddBlog"
        component={AddBlog}
        options={{headerShown : false}}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEvent}
        options={{headerShown : false}}
      />
        <Stack.Screen name='BlogDetails' component={BlogDetails} options={{headerBackButtonMenuEnabled:true}} />
      </Stack.Navigator>
      
    </NavigationContainer>
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;