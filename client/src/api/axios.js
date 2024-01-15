import axios from "axios";

axios.defaults.baseURL = "http://localhost:3100/";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    const adminToken=localStorage.getItem('adminToken')

    if (token) {
      config.headers.userAuthorization = token;
    }
    if(adminToken){
      config.headers.adminAuthorization=adminToken
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
