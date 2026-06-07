// src/components/AuthForm.tsx
import { useState } from "react";
import Api from '../api';

export const AuthForm = ({ onAuthSuccess }: { onAuthSuccess: (username: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/login" : "/signup";
      await Api.post(endpoint, { username, password });
      alert(isLogin ? "로그인 성공!" : "회원가입 성공!");
      onAuthSuccess(username); // 로그인 성공 시 username을 부모에게 전달
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>{isLogin ? "로그인" : "회원가입"}</h2>
      <input type="text" placeholder="아이디" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">{isLogin ? "로그인" : "회원가입"}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "회원가입으로 전환" : "로그인으로 전환"}
      </button>
    </form>
  );
};