import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/tokenSlice';
import { useEffect, useState } from 'react';
import { getToken } from '../utils/token';

const useAxios = () => {
  const [token, setToken] = useState("")

  const instance = axios.create({
    baseURL: 'http://alumnieconnect.runasp.net/api/',
    timeout: 30000,
  });

  // Interceptor to add the token to headers
  useEffect(() => {
    ;(async()=> {
      try {
        const response = await getToken();
        if(response != null && response != undefined) setToken(response);
      } catch (error) {
        console.error();
      }
    })();
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptor when the component unmounts
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  return instance;
};

export default useAxios;
