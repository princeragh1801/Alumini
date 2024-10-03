// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Router from './src/routes/Router';
import AddBlog from './src/screens/AddBlog';
import BlogDetails from './src/screens/Details/BlogDetails';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Splash from './src/screens/Splash';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown : false}} />
        <Stack.Screen name='Router' component={Router} options={{headerShown : false}} />
        
        <Stack.Screen
        name="AddBlog"
        component={AddBlog}
        options={{headerShown : false}}
      />
        <Stack.Screen name='BlogDetails' component={BlogDetails} options={{headerShown : false}} />
        
        

      </Stack.Navigator>
      
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;