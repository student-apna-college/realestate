import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://realestate-zsnn.onrender.com',
  withCredentials: true,
});

export default axiosInstance;
