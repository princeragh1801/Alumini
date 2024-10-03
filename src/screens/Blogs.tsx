import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { blogsService } from '../services/blogsService'
import { Blog } from '../interfaces/blog';
import { BlogCard } from '../components/Card/BlogCard';
import Loading from './Loading';
import NoContent from './NoContent';

const Blogs = ({navigation} : any) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // IIFE to handle async inside useEffect
    (async () => {
      try {
        console.log("Date : ", Date());
        const data: Blog[] = await blogsService.getBlogs();
        setBlogs(data);
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    })(); // Immediately Invoked Function Expression (IIFE)
  }, []); // Empty dependency array to run effect only once
  // if(blogs.length === 0){
  //   return <Button title='Get Blogs' onPress={getBlogs} />
  // }
  if(isLoading){
    return (
      <Loading/>
    )
  }
  return (

    <ScrollView style={styles.container}>
      {/* <Text>Hello world</Text> */}
      {blogs != null && blogs.length > 0 && blogs.map((blog) => (
        <BlogCard key={blog.id} id={blog.id} description={blog.description} imageUrl={blog.imageUrls[0]} userProfilePictureUrl={blog.userProfilePictureUrl} createdByName={blog.createdByName} userProfileHeadLine={blog.userProfileHeadLine} createdOn={blog.createdOn} navigation={navigation} />
      ))}
      {blogs == null && <NoContent/>}
    </ScrollView>
  )
}

export default Blogs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
  },
    txt : {
        fontWeight:'bold',
        color : '#d27511',
        fontSize:20
    }
})