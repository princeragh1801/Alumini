// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux';
import { getToken } from '../utils/token';
import { setToken } from '../store/tokenSlice';

const Splash = ({ navigation } : any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    ;(async()=>{
      try {
        const token = await getToken();
        if(token){
          console.log("Token dispatching : ", token)
          dispatch(setToken(token));
        }
      } catch (error) {
        console.error(error);
      }
    })();
    const timer = setTimeout(() => {
      // Navigate to the main application screen after 3 seconds
      navigation.replace('Router'); // Replace 'Main' with your main screen name
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Ionicons name='logo-buffer' color='#2d545e' size={50}/>
      <Text style={{fontWeight : 'bold',
              color : '#2d545e'}}>Alumini-Econnect</Text>
      {/* You can add your logo or any other elements here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // You can change the background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Splash;
