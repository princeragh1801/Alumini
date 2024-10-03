import { Blog } from "../interfaces/blog";
import { instance } from "./axiosInstance";

class BlogsService{
    async getBlogs(){
        try {
            const {data} = await instance.get("Blog");
            console.log("Data : ",data);
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }
}
const blogsService = new BlogsService();
export {blogsService}