import Navbar from '../components/Navbar';
import LogoutButton from '../components/LogoutButton';
import { Container, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import CategorySyncButton from '../components/CategorySyncButton';
import FilterSyncButton from '../components/FilterSyncButton';
import ItemList from '../components/ItemList';

const Dashboard = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <>
      <Navbar setNavbarHeight={setNavbarHeight} />
      <Container scrollbar={'hidden'} colorPalette={'cyan'}>
        <ItemList />
        <Flex gap={3} justify={'space-between'} align={'center'}>
          <LogoutButton />
          <CategorySyncButton />
          <FilterSyncButton />
        </Flex>
      </Container>
    </>
  );
};

export default Dashboard;
