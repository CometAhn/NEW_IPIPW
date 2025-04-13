import React, { useState } from 'react';
import { syncFilters } from '../api/auth';
import { Button } from '@chakra-ui/react';

import { isAdmin } from '../utils/auth';

const FilterSyncButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSync = async () => {
    setLoading(true);
    try {
      await syncFilters();
      alert('필터 동기화 완료!');
    } catch (error) {
      alert('동기화 실패. 콘솔 로그를 확인하세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button hidden={!isAdmin()} variant={'solid'} colorPalette={'green'} onClick={handleSync} disabled={loading}>
      {loading ? '동기화 중...' : '필터 동기화'}
    </Button>
  );
};

export default FilterSyncButton;
