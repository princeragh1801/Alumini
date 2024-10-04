
import { useMemo } from "react";
import useAxios from "./axiosInstance";
import { AxiosInstance } from "axios";

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
}
const useBlogService = ()=>{
    const axiosInstance = useAxios();

  // useMemo to create the service instance only when axiosInstance changes
  const authService = useMemo(() => new BlogsService(axiosInstance), [axiosInstance]);

  return authService;
};
export default useBlogService;