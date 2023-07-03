import axios from "axios";
import { baseUrl } from "../Constance/Constance";
const instance = axios.create({
  baseURL: baseUrl,
})

instance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("userToken"); // taking token from local storage

    if (token) { // checking if token is present or not
      
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;