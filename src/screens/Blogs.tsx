import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useBlogService from '../services/blogsService'
import { Blog } from '../interfaces/blog';
import { BlogCard } from '../components/Card/BlogCard';
import Loading from './Loading';
import NoContent from './NoContent';
import { ApiResponse } from '../interfaces/response';
import { showSuccess } from '../utils/toast';

const Blogs = ({navigation} : any) => {
  const blogsService = useBlogService()
  const [blogs, setBlogs] = useState<Blog[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // IIFE to handle async inside useEffect
    (async () => {
      try {
        const data : ApiResponse<Blog[]> = await blogsService.getBlogs();
        var response = data.data;
        console.log("Blogs : ", response)
        setBlogs(response);
        setIsLoading(false)
        showSuccess(data.message)
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
  }else if(blogs == null || blogs.length == 0){
    return <NoContent/>
  }
  return (
    <ScrollView style={styles.container}>
      {/* <Text>Hello world</Text> */}
      {blogs != null && blogs.length > 0 && blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} navigation={navigation} />
      ))}
      
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