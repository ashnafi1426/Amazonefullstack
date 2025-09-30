import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6002/clone-61fed/us-central1/api", 
});

export {axiosInstance}