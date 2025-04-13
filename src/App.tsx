import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RedirectRoute from './components/RedirectRoute';
import SessionManager from './api/SessionManager';
import { Provider } from './components/ui/provider';
import { ToasterProvider, useToaster } from './components/toaster';
import { Toaster, toaster } from './components/ui/toaster';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token); // JWT가 있으면 로그인 상태로 설정
  }, []);

  return (
    <Provider>
      <ToasterProvider>
        <Router>
          <SessionManager /> {/* 전역에서 세션 관리 */}
          <Routes>
            {/* 루트("/") 또는 존재하지 않는 경로에 접근하면 RedirectRoute가 실행됨 */}
            <Route path="*" element={<RedirectRoute />} />
            <Route path="/" element={<RedirectRoute />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
        <ToastHandler />
      </ToasterProvider>
    </Provider>
  );
}

const ToastHandler = () => {
  const { toastInfo, setToastInfo } = useToaster();

  useEffect(() => {
    if (toastInfo) {
      toaster.create({
        title: toastInfo.title,
        description: toastInfo.description,
        type: toastInfo.type,
        action: {
          label: toastInfo.action.label,
          onClick: toastInfo.action.onClick,
        },
      });

      setToastInfo(null);
    }
  }, [toastInfo, setToastInfo]);

  return (
    <>
      <Toaster />
    </>
  );
};

export default App;
