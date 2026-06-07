import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, type UserCredentials } from '../api/auth';

import { AxiosError } from 'axios'; // AxiosError 타입을 가져옵니다

export const Signup = () => {
  // 1. UserCredentials 인터페이스를 사용하여 초기값 타입 지정
  const [formData, setFormData] = useState<UserCredentials>({ 
    username: '', 
    password: '' 
  });
  const navigate = useNavigate();

  // 2. 입력 핸들러에 ChangeEvent 타입 지정
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      await signup(formData);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate('/login');
    } catch (error) {
      // 3. 에러 객체를 AxiosError로 타입 단언(as)하여 처리
      const err = error as AxiosError;
      
      if (err.response && err.response.status === 400) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <input 
        name="username"
        placeholder="아이디" 
        onChange={handleChange} 
      />
      <input 
        name="password"
        type="password" 
        placeholder="비밀번호" 
        onChange={handleChange} 
      />
      <button onClick={handleSignup}>가입하기</button>
      <button onClick={() => navigate('/login')}>로그인하러 가기</button>
    </div>
  );
};