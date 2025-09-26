import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/clone-61fed/us-central1/api", 
});

export {axiosInstance}