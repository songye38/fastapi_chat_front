import { useState } from 'react';
import { login } from '../api/auth';

export const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    try {
      const response = await login(formData);
      // 토큰 저장 (구조: {access_token, user_id, username})
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      
      window.location.reload(); // 새로고침하여 상태 변경
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <input onChange={(e) => setFormData({...formData, username: e.target.value})} />
      <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};