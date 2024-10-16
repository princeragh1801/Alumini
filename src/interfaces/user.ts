import { Role } from "./enums";

export interface UserDetails{
    id: string;
    name: string;
    gmail: string;
    password: string;
    secondaryMail: string | null;
    address: string | null;
    bio: string | null;
    contactNumber: string | null;
    isActive: boolean;
    collegeId: string;
    college: string;
    courseId: string;
    course: string;
    branchId: string;
    branch: string;
    countryId: string;
    country: string;
    stateId: string | null;
    state: string | null;
    cityId: string | null;
    city: string | null;
    profilePictureUrl: string;
    admissionYear: number;
    passoutYear: number;
  }
  
export interface UserBasic{
  id : string,
  name : string,
  role : Role,
  imageUrl : string,
  headLine : string,
}

export interface UserInfo {
  id: string;
  name: string;
  gmail: string;
  password: string;
  secondaryMail: string;
  address: string;
  bio: string;
  contactNumber: string;
  isActive: boolean;
  collegeId: string;
  college: string;
  courseId: string;
  course: string;
  branchId: string;
  branch: string;
  countryId: string;
  country: string;
  stateId: string;
  state: string;
  cityId: string;
  city: string;
  profilePictureUrl: string;
  admissionYear: number;
  passoutYear: number;
}