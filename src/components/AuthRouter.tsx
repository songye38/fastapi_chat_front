// src/components/AuthRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};