import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = (token : string) => {
  try {
    AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error("Error storing the token", error);
  }
};

const getToken = () => {
    try {
        var token = AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error("Error while extracting token", error);
    }
}

export {
    storeToken,
    getToken
}