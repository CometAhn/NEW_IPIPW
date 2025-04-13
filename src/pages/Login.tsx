import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

import { Container, Box, Button, Input, VStack, Heading, Card } from '@chakra-ui/react';

import { Field } from '../components/ui/field';
import { PasswordInput } from '../components/ui/password-input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState(false);
  const navigate = useNavigate();

  // 로그인 Mutation (비동기 요청)
  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: () => {
      console.log(`성공`);
      navigate('/dashboard'); // 로그인 성공 시 대시보드로 이동
    },
    onError: (e: any) => {
      setLoginErr(true);
    },
  });

  const loginHandle = (event: React.FormEvent<HTMLFormElement>) => {
    setLoginErr(false);
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    loginMutation.mutate(); // 로그인 요청 실행
  };

  const chgErrHandle = () => {
    setLoginErr(false);
  };

  return (
    <Container centerContent minH="100vh" flex="1" justifyContent="center" alignItems="center" scrollbar={'hidden'} colorPalette={'cyan'}>
      <Box>
        <VStack align="stretch" width="full">
          <Card.Root variant={'elevated'}>
            <form onSubmit={loginHandle}>
              <Card.Header>
                <Heading color={'cyan.solid'} textAlign="center">
                  Login
                </Heading>
              </Card.Header>
              <Card.Body>
                <Field invalid={loginErr} gap={0}>
                  <Input
                    id="email"
                    type="email"
                    className={loginErr ? 'input-shake' : ''}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      chgErrHandle();
                    }}
                    placeholder="e-mail"
                    size="lg"
                    onFocus={chgErrHandle}
                  />
                  <PasswordInput
                    id="pw"
                    className={loginErr ? 'input-shake' : ''}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      chgErrHandle();
                    }}
                    placeholder="Password"
                    size="lg"
                    onFocus={chgErrHandle}
                  />
                </Field>
              </Card.Body>

              <Card.Footer>
                <Button type="submit" colorPalette={'cyan'} size="lg" w="100%" loadingText="로그인 중...">
                  Login
                </Button>
              </Card.Footer>
            </form>
          </Card.Root>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
