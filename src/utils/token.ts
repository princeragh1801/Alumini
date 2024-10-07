import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async(token : string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error("Error storing the token", error);
  }
};

const getToken = async() => {
    try {
        var token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error("Error while extracting token", error);
    }
}
const removeToken = async() => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
}
export {
    storeToken,
    getToken,
    removeToken
}