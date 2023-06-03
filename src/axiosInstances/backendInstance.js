// Backend Sever for the E-Commerce Site
import axios from "axios";

const backendInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  timeout: 5000,
});

export default backendInstance;
