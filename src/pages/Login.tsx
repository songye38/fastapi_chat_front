import { useState } from 'react';
import { login } from '../api/auth';

export const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    //   const handleLogin = async () => {
    //     try {
    //       const response = await login(formData);
    //       // 토큰 저장 (구조: {access_token, user_id, username})
    //       localStorage.setItem("access_token", response.data.access_token);
    //       localStorage.setItem("username", response.data.username);

    //       window.location.reload(); // 새로고침하여 상태 변경
    //     } catch (error) {
    //       alert(error);
    //     }
    //   };
    const handleLogin = async () => {
        console.log("로그인 버튼 클릭됨!"); // 이게 찍히는지 확인
        try {
            const response = await login(formData);
            console.log("응답 확인:", response);
        } catch (error) {
            console.error("에러 발생:", error);
            // 여기서 에러 객체를 찍어보면 어느 URL로 요청이 갔는지 나옵니다.
            // console.log((error as any).config.url); 
        }
    };

    return (
        <div>
            <input onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
};