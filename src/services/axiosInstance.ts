import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/tokenSlice';

const useAxios = () => {
  const instanceRef = useRef(axios.create({
    baseURL: 'http://alumnieconnect.runasp.net/api/',
    timeout: 30000,
  }));
  const token = useSelector(selectToken);

  useEffect(() => {
    const requestInterceptor = instanceRef.current.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
        } else {
          delete config.headers['Authorization']; // Remove it if there's no token
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = instanceRef.current.interceptors.response.use(
      (response) => response, // Simply return the response
      (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      instanceRef.current.interceptors.request.eject(requestInterceptor);
      instanceRef.current.interceptors.response.eject(responseInterceptor);
    };
  }, [token]); // Dependency on token

  return instanceRef.current; // Return the Axios instance
};

export default useAxios;
