import { jwtDecode } from 'jwt-decode';

// JWT 토큰 구조 인터페이스 정의
interface JwtPayload {
  sub: string; // 사용자 ID (필요한 경우)
  exp: number; // 만료 시간
  isAdmin?: boolean; // 관리자 여부
}

// JWT 토큰에서 is_Admin 값 확인하는 함수
export const isAdmin = (): boolean => {
  const token = localStorage.getItem('accessToken');

  if (!token) return false; // 토큰이 없으면 관리자 아님

  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    return decoded.isAdmin === true; // is_Admin이 true이면 관리자
  } catch (error) {
    console.error('JWT 디코딩 오류:', error);
    return false;
  }
};
