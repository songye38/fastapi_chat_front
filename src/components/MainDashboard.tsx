// src/components/MainDashboard.tsx
import { useNavigate } from 'react-router-dom';

export const MainDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  console.log(navigate)

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(); // 상태 초기화 후 새로고침
  };

  return (
    <div>
      <h1>환영합니다, {username}님!</h1>
      <button onClick={handleLogout}>로그아웃</button>
      <div className="chat-list">
        {/* 여기에 나중에 채팅방 목록 컴포넌트를 넣으세요 */}
        <p>나의 채팅 목록이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};