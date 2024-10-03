import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{flex : 1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator/>
        <Text>Loading...</Text>
      </View>
  )
}

export default Loading

const styles = StyleSheet.create({})