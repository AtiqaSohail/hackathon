//src/axios.js
import axios from "axios";

const token = localStorage.getItem("token");

export const baseURL = "http://192.168.50.164:3000";  // exchange with

const axiosInstance = axios.create({
  baseURL: "http://192.168.50.164:3000",  // exchange with your ip
  //run backend 
  withCredentials: true,

});

const interseptor = () => {
  axios.defaults.baseURL = baseURL
}

export { interseptor }

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
  