import axiosInstance from './axiosInstance';

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/auth/login', { email, password });

  // 기존에 있던 refreshToken 삭제 코드 제거
  localStorage.removeItem('accessToken');
  const token = localStorage.getItem('accessToken');
  if (token) localStorage.removeItem('accessToken');

  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  }

  return response.data;
};

export const fetchSession = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('No access token');

  const response = await axiosInstance.get('/auth/session', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

// 카테고리 동기화 API 호출 함수
export const syncCategories = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get('/api/categories/sync');
    console.log('카테고리 동기화 성공:', response.data);
  } catch (error) {
    console.error('카테고리 동기화 실패:', error);
    throw error;
  }
};

// 필터 동기화 API 호출 함수
export const syncFilters = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get('/api/filters/sync');
    console.log('필터 동기화 성공:', response.data);
  } catch (error) {
    console.error('필터 동기화 실패:', error);
    throw error;
  }
};
