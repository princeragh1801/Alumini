import { instance } from "./axiosInstance";

class AuthService{
    async loginUser(formData){
        try {
            const {data} = await instance.post("Authorization", formData);
            console.log("Token : ", data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async registerUser(formData){
        try {
            const {data} = await instance.post("User/AddStudent", formData);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async sendOTP(gmail, name){
        try {
            const {data} = await instance.post(`User/SendOtp/${gmail}/${name}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async verifyOTP(gmail, otp){
        try {
            const {data} = await instance.post(`User/Verify/${gmail}/${otp}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeId(domain){
        try {
            const {data} = await instance.get(`College/GetCollegeByDomain/${domain}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeCourse(collegeId){
        try {
            const {data} = await instance.get(`College/GetCourse${collegeId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getCollegeBranchUnderCourse(courseId){
        try {
            const {data} = await instance.get(`College/GetBranchesUnderCollegeCourse/${courseId}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

 
}

const authService = new AuthService();
export {authService}