import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '../api/axiosInstance'; // axios 설정 파일
import { Box, Button, Card, Center, Container, Flex, Image, Skeleton, useBreakpointValue, Wrap } from '@chakra-ui/react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchItems, Items } from '../api/item';

export const skeleton = (
  <Card.Root maxW="sm" overflow="hidden" marginY={10} marginX={3}>
    <Skeleton h="sm" w="sm" variant="shine" />
    <Card.Body gap="2">
      <Card.Title>
        <Skeleton w={'70%'} variant="shine">
          null
        </Skeleton>
      </Card.Title>
      <Card.Description>
        <Skeleton w={'50%'} variant="shine">
          null
        </Skeleton>
      </Card.Description>
    </Card.Body>
    <Card.Footer gap="2">
      <Skeleton h="40px" w="120px" variant="shine" />
      <Skeleton h="40px" w="90px" variant="shine" />
    </Card.Footer>
  </Card.Root>
);

interface Item {
  item_id: number;
  name: string;
  thumbnail_image: string;
  web_url: string;
  cur_price: number | null;
  max_price: number | null;
  min_price: number | null;
  service_type: number | null;
}

interface ApiResponse {
  total_count: number;
  items: Item[];
}

const ItemList: React.FC = () => {
  const [category, setCategory] = useState<number | null>(null);

  // 데이터 불러오기
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery<{
    items: Items[];
    nextPage: number;
    totalCount: number;
  }>({
    queryKey: ['items', category],
    queryFn: ({ pageParam }) => fetchItems({ pageParam: pageParam as number, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItemCount = allPages.flatMap((page) => page.items).length;
      return loadedItemCount < lastPage.totalCount ? lastPage.nextPage : undefined;
    },
  });
  const targetRef = useRef<HTMLDivElement | null>(null);
  const items = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1, // 100% 보일 때 실행
      }
    );

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    setCategory(42);
  }, []);

  return (
    <Container>
      <Wrap display={'flex'} justify={'center'}>
        {items.map((item) => (
          <Card.Root key={`${item.item_id}`} maxW="sm" overflow="hidden" marginY={5} marginX={5}>
            <Image maxH="sm" maxW="sm" src={item.thumbnail_image} alt={item.name} fit={'contain'} />
            <Card.Body gap="2">
              <Card.Title>{`${item.name}(${item.item_id},${item.service_type})`}</Card.Title>
              <Card.Description>현재가 : {item.cur_price !== null ? `${item.cur_price} 원` : '정보 없음'}</Card.Description>
              {item.cur_price != item.min_price && item.cur_price != item.max_price ? (
                <>
                  <Card.Description>최저가 : {item.max_price !== null ? `${item.min_price} 원` : ''}</Card.Description>{' '}
                  <Card.Description>최고가 : {item.min_price !== null ? `${item.max_price} 원` : ''}</Card.Description>
                </>
              ) : (
                ''
              )}
            </Card.Body>
            <Card.Footer gap="2">
              <Button variant="solid" colorPalette={'orange'}>
                데일리샷 이동
              </Button>
              <Button variant="outline" colorPalette={'green'}>
                가격 차트
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
        <div ref={targetRef}></div>
        {isLoading || isFetchingNextPage ? (isBrowser ? [0, 1].map(() => skeleton) : skeleton) : null}
      </Wrap>
    </Container>
  );
};

export default ItemList;
