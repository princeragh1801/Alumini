import { Role } from "./enums";
import { UserBasic } from "./user";

export interface LoginForm{
    email : string,
    password : string,
    role : Role
}

export interface SignUpForm{
    name : string,
    gmail : string,
    otp : string,
    password : string,
    collegeId : string,
    courseId : string,
    branchId : string,
    admissionYear : number,
    passoutYear : number
}

export interface LoginResponse{
    token : string,
    user : UserBasic
}