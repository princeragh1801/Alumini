import { AxiosInstance } from "axios";
import useAxios from "./axiosInstance";
import { useEffect, useMemo } from "react";


class CollegeService{
    instance : AxiosInstance
    constructor(axiosInstance : AxiosInstance){
        this.instance = axiosInstance;
    }
    

    async getCollegeId(domain : string){
        try {
            const {data} = await this.instance.get(`College/GetCollegeByDomain/${domain}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeCourse(collegeId : string){
        try {
            const {data} = await this.instance.get(`College/GetCourse/${collegeId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeBranchUnderCourse(courseId : string){
        try {
            const {data} = await this.instance.get(`College/GetBranchesUnderCollegeCourse/${courseId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    
 
}

const useCollegeService = ()=>{
    const axiosInstance = useAxios();
  // useMemo to create the service instance only when axiosInstance changes
  const collegeService = useMemo(() => new CollegeService(axiosInstance), [axiosInstance]);
  return collegeService;
};
export default useCollegeService;