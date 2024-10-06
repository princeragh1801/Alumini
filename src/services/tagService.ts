import { AxiosInstance } from "axios";
import useAxios from "./axiosInstance";
import { useMemo } from "react";

class TagService{
    instance : AxiosInstance

    constructor(axiosInstance:AxiosInstance){
        this.instance = axiosInstance;
    }

    async getTags(){
        try {
            const {data} = await this.instance.get('Tag/GetAllTags');
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async addTag(tag : string){
        try {
            const {data} = await this.instance.post('Tag', tag)
        } catch (error) {
            console.error(error);
        }
    }
}

const useTagService = ()=>{
    const axiosInstance = useAxios();

  // useMemo to create the service instance only when axiosInstance changes
  const tagService = useMemo(() => new TagService(axiosInstance), [axiosInstance]);

  return tagService;
};
export default useTagService;