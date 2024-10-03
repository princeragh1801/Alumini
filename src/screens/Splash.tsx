// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Splash = ({ navigation } : any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the main application screen after 3 seconds
      navigation.replace('Router'); // Replace 'Main' with your main screen name
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App!</Text>
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
