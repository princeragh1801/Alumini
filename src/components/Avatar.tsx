import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'

type props = {
  avatarUrl : string
}
const Avatar = (avatarUrl:string) => {
  return (
    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
  )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
})