import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5005/clone-40318/us-central1/api", 
});
export {axiosInstance}