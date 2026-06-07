import { useState } from 'react';
import { MainDashboard } from './components/MainDashboard';
import { AuthRouter } from './components/AuthRouter';

function App() {
  // 1. 상태 초기화 단계에서 바로 localStorage를 확인합니다.
  // 이렇게 하면 useEffect 없이도 처음부터 로그인 상태를 정확히 압니다.
  const [isLoggedIn] = useState<boolean>(!!localStorage.getItem("access_token"));

  return (
    <div>
      {isLoggedIn ? (
        <MainDashboard />
      ) : (
        <AuthRouter />
      )}
    </div>
  );
}

export default App;