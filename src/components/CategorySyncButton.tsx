import React, { useState } from 'react';
import { syncCategories } from '../api/auth';
import { Button } from '@chakra-ui/react';
import { isAdmin } from '../utils/auth';

const CategorySyncButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSync = async () => {
    setLoading(true);
    try {
      await syncCategories();
      alert('카테고리 동기화 완료!');
    } catch (error) {
      alert('동기화 실패. 콘솔 로그를 확인하세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button hidden={!isAdmin()} onClick={handleSync} variant={'solid'} colorPalette={'cyan'} disabled={loading}>
      {loading ? '동기화 중...' : '카테고리 동기화'}
    </Button>
  );
};

export default CategorySyncButton;
