import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoContent = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight : 'bold', color : '#2d545e', fontSize:20}}>NoContent</Text>
    </View>
  )
}

export default NoContent

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})