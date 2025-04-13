import { useEffect, useState } from 'react';
import { fetchSession, logout } from './auth';

const SessionManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsAuthenticated(false); // JWT가 없으면 로그인 필요 상태
        setLoading(false);
        return;
      }

      try {
        await fetchSession();
        setIsAuthenticated(true); // 세션이 유효하면 로그인 상태 유지
      } catch (error) {
        setIsAuthenticated(false); // 세션이 만료되면 로그아웃
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 1 * 60 * 1000); // 1분마다 세션 체크
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) logout();
  }, [isAuthenticated]);

  if (loading) return null; // 로딩 중에는 아무것도 렌더링하지 않음

  return null;
};

export default SessionManager;
