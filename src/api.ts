import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default Api; // 이 부분이 반드시 있어야 합니다!