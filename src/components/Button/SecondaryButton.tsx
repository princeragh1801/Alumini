import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type props = {
    name : string,
    onPress : () => {}
};

const SecondaryButton = ({name, onPress} : props) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.secondaryBtn}>
        <Text style={styles.buttonText}>{name}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default SecondaryButton

const styles = StyleSheet.create({
    buttonText: {
        color: '#FFFFFF', // Text color
        fontSize: 16,
        fontWeight: 'bold',
      },
      secondaryBtn : {
        backgroundColor: '#2d545e', // Change this to your desired color
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
})