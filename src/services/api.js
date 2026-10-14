
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');

if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
//Whenever your frontend makes an API request, the interceptor automatically adds:
//Authorization: Bearer YOUR_JWT_TOKEN
return config;
});

export default api;
