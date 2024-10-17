import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  // Thêm các cấu hình khác nếu cần
});

export default axiosInstance;