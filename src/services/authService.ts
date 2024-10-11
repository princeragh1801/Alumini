import { AxiosInstance } from "axios";
import { LoginForm, SignUpForm } from "../interfaces/auth";
import useAxios from "./axiosInstance";
import { useEffect, useMemo } from "react";


class AuthService{
    instance : AxiosInstance
    constructor(axiosInstance : AxiosInstance){
        this.instance = axiosInstance;
    }
    async addImage(file : any){
        try {
            console.log("File : ", file)
            const {data} = await this.instance.post('Image', file, {headers : {"Content-Type" : "multipart/form-data", 'accept' : 'text/plain'}})
            console.log("Image upload response : ", data);
            return data;
        } catch (error) {
            console.error(error)
        }
    }
    async getCurrentUser(){
        try {
            const {data} = await this.instance.get(`User/GetLoginUserInfo`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getUserById(id : string){
        try {
            const {data} = await this.instance.get(`User/GetStudentDetails/${id}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }


    async loginUser(formData : LoginForm){
        try {
            const {data} = await this.instance.post("Authorization", formData);
            console.log("Token : ", data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async registerUser(formData : SignUpForm){
        try {
            const {data} = await this.instance.post("User/AddStudent", formData);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async sendOTP(gmail : string, name : string){
        try {
            const {data} = await this.instance.post(`User/SendOtp/${gmail}/${name}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async verifyOTP(gmail : string, otp : string){
        try {
            const {data} = await this.instance.post(`User/Verify/${gmail}/${otp}`);
            return data;
        } catch (error) {
            console.error(error);
        }
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
            const {data} = await this.instance.get(`College/GetCollegeCourse/${collegeId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeBranchUnderCourse(courseId : string){
        try {
            console.log("Course Id : ", courseId);
            const {data} = await this.instance.get(`College/GetBranchesUnderCollegeCourse/${courseId}`);
            console.log("Branches ", data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    
 
}

const useAuthService = ()=>{
    const axiosInstance = useAxios();
  // useMemo to create the service instance only when axiosInstance changes
  const authService = useMemo(() => new AuthService(axiosInstance), [axiosInstance]);
  return authService;
};
export default useAuthService;