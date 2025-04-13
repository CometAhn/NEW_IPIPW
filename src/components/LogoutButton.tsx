import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] }); // 세션 캐시 삭제
      navigate('/login'); // 로그인 페이지로 이동
    },
  });

  return (
    <Button variant={'outline'} colorPalette="red" onClick={() => logoutMutation.mutate()}>
      Logout
    </Button>
  );
};

export default LogoutButton;
