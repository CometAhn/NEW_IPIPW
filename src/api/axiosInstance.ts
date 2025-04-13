import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // 기본 API URL
//const navigate = useNavigate();

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키 기반 인증 활성화
  headers: {
    'Content-Type': 'application/json', // CORS 문제 해결
  },
});

// JWT 토큰 자동 추가 (필요한 요청에만 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('/api/items')) {
      //  `/api/items` 요청에는 Authorization 헤더 추가 안 함
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
