import axios from "axios";

var token = "";
const instance = axios.create({
    baseURL: 'http://192.168.1.13:5155/api/',
    timeout : 30000,
    headers : {
      'Authorization' : `Bearere ${token}`
    }
  });

  // instance.interceptors()
export {instance}