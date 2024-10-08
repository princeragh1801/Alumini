
import { useMemo } from "react";
import useAxios from "./axiosInstance";
import axios, { AxiosInstance } from "axios";
import { BlogPost } from "../interfaces/blog";

class BlogsService{
    instance : AxiosInstance

    constructor(axiosInstance : AxiosInstance){
        this.instance = axiosInstance;
    }
    async getBlogs(){
        try {
            const {data} = await this.instance.get("Blog");
            console.log("Data : ",data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getBlogById(blogId : string){
        try {
            const {data} = await this.instance.get(`Blog/${blogId}`);
            console.log("Data : ",data);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    async addBlog(blog: BlogPost) {
        try {
            const formData = new FormData();
            
            // Add description
            formData.append('Description', blog.description);
    
            // Append tags as separate form fields
            blog.tags.forEach((tag, index) => {
                formData.append(`Tags`, tag); // Single field for each tag
            });
    
            // Append media files
            blog.MediaFiles.forEach((file, index) => {
                formData.append('MediaFiles', {
                    uri: file.uri,    // The URI from the selected image
                    type: file.type,  // File type like 'image/png'
                    name: file.name,  // Original file name, like 'toothbrush.png'
                });
            });
    
            // Make the request to the server
            const { data } = await this.instance.post('http://alumnieconnect.runasp.net/api/Blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Blog upload:', data);
            return data;
    
        } catch (error: any) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }
    
    

    async getBlogComment(blogId : string){
        try {
            const {data} = await this.instance.get(`BlogComment/${blogId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async addBlogComment(blogId : string, comment : string){
        try {
            var obj = {
                comment
            }
            
            console.log(obj);
            console.log("Blog id : ", blogId)
            console.log("Comment : ", comment);
            const {data} = await this.instance.post(`BlogComment/blogId/${blogId}`, obj);
            console.log("Comment response : ", data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteBlogComment(commentId : string){
        try {
            const {data} = await this.instance.delete(`BlogComment/${commentId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateBlogComment(commentId : string, comment : string){
        try {
            const {data} = await this.instance.put(`BlogComment/comment/${commentId}`, comment);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
const useBlogService = ()=>{
    const axiosInstance = useAxios();

  // useMemo to create the service instance only when axiosInstance changes
  const authService = useMemo(() => new BlogsService(axiosInstance), [axiosInstance]);

  return authService;
};
export default useBlogService;