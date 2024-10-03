import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type props = {
    name : string,
    onPress : () => {}
};

const PrimaryButton = ({name, onPress} : props) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.primaryBtn}>
        <Text style={styles.buttonText}>{name}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    primaryBtn: {
        backgroundColor: '#d27511', // Change this to your desired color
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 16,
        fontWeight: 'bold',
      },
})