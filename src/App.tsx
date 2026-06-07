// src/App.tsx
import { useState, useRef, useEffect } from "react";
import { AuthForm } from "./components/AuthForm";

function App() {
  // 로그인 상태 및 채팅방 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");

  const ws = useRef<WebSocket | null>(null);

  // 웹소켓 연결 및 입장 로직
  const joinRoom = () => {
    if (!roomId.trim()) {
      alert("방 이름을 입력해주세요!");
      return;
    }

    const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const wsProtocol = backendUrl.startsWith("https") ? "wss://" : "ws://";
    const wsHost = backendUrl.replace(/^https?:\/\//, "");

    ws.current = new WebSocket(`${wsProtocol}${wsHost}/ws/${roomId}`);

    ws.current.onopen = () => {
      // 닉네임은 로그인 시 가져온 정보를 사용하거나 입력받도록 처리
      ws.current?.send(`${nickname || "익명"}||ENTER`);
      setIsJoined(true);
    };

    ws.current.onmessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onclose = () => console.log("웹소켓 연결 종료");
  };

  // 메시지 전송 로직
  const sendMessage = () => {
    if (!inputText.trim() || !ws.current) return;
    ws.current.send(`${nickname || "익명"}||${inputText}`);
    setInputText("");
  };

  // 컴포넌트 언마운트 시 소켓 정리
  useEffect(() => {
    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {!isLoggedIn ? (
        // 1. 로그인 단계
        // <AuthForm onAuthSuccess={() => setIsLoggedIn(true)} />
        <AuthForm onAuthSuccess={(name) => {
          setNickname(name); // 로그인 성공 시 받아온 닉네임을 저장!
          setIsLoggedIn(true);
        }} />
      ) : !isJoined ? (
        // 2. 채팅방 대기 단계
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2>채팅방 입장</h2>
          <input
            placeholder="방 이름"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button onClick={joinRoom} style={{ padding: "8px 15px" }}>입장하기</button>
        </div>
      ) : (
        // 3. 채팅 진행 단계
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2>방 이름: {roomId}</h2>
          <ul style={{ listStyle: "none", padding: "0", maxHeight: "300px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>{msg}</li>
            ))}
          </ul>
          <div style={{ display: "flex" }}>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && sendMessage()}
              style={{ flexGrow: 1, padding: "8px" }}
            />
            <button onClick={sendMessage}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;