import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BlogDetails = ({route} : any) => {
    const {blogId} = route.params;
  return (
    <View style={styles.container}>
      <Text>BlogDetails</Text>
    </View>
  )
}

export default BlogDetails

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        //alignItems : 'center',
        alignContent : 'center'
    }
})