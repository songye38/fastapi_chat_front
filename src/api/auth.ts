import axios from 'axios';

// const API_URL = "https://sockettest.up.railway.app";

// 1. 유저 데이터 타입을 정의합니다.
export interface UserCredentials {
  username: string;
  password: string;
}

// 2. 로그인 응답 타입을 정의합니다 (토큰과 유저 정보 포함).
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  username: string;
}

// 3. 타입을 적용합니다.
export const signup = async (userData: UserCredentials) => {
const fullUrl = "https://sockettest.up.railway.app/auth/signup";
return await axios.post(fullUrl, userData);
};

export const login = async (userData: UserCredentials) => {
  // 응답 데이터에 타입을 명시하면, 호출부에서 자동완성 기능을 쓸 수 있습니다.
  const fullUrl = "https://sockettest.up.railway.app/auth/login";
  return await axios.post<AuthResponse>(fullUrl, userData);
};