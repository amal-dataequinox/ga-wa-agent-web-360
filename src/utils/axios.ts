import axios from 'axios';

const axiosInstance = axios.create();
console.log(axiosInstance);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
console.log("interceptor");

export default axiosInstance;
