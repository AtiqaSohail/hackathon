//src/axios.js
import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
 
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // ya jis jagah store kiya ho
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
export default axiosInstance;
