import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Container, Flex, Input } from '@chakra-ui/react';
import { InputGroup } from './ui/input-group';

const Navbar = ({ setNavbarHeight }: { setNavbarHeight: (height: number) => void }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navbarRef = useRef<HTMLElement | null>(null);

  const searchHandle = (e) => {
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지
    console.log(e);
  };

  return (
    <Container colorPalette={'cyan'} bgColor={'cyan.muted'} minH={'50px'} height={'50px'}>
      {/* 좌측: 검색 아이콘 및 입력창 */}
      <Flex justifyContent={'space-between'} align={'center'} minH={'100%'} gap={5}>
        <GiHamburgerMenu size={24} />
        <form onSubmit={searchHandle}>
          <InputGroup width={'100%'} flex="1" endElement={<FaSearch type="submit" onClick={searchHandle} size={16} />}>
            <Input placeholder="검색..." />
          </InputGroup>
        </form>
        {/* 우측: 필터 & 메뉴 아이콘 */}
        <Flex minH={'100%'} align={'center'} gapX={5}>
          <FaFilter size={24} />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
