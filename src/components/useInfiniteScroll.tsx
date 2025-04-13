import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PAGE_SIZE = 50;

interface Item {
  item_id: number;
  name: string;
  thumbnail_image: string;
  web_url: string;
  min_price?: number;
  max_price?: number;
}

export const useInfiniteScroll = (category: string, filters: string) => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      if (loading || (totalCount > 0 && items.length >= totalCount)) return;

      setLoading(true);
      try {
        const response = await axios.get('/api/items', {
          params: { category, page, filters },
        });

        setTotalCount(response.data.total_count);
        setItems((prevItems) => [...prevItems, ...response.data.items]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error('❌ 데이터 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page, category, filters]);

  // ✅ 스크롤 감지 (Intersection Observer 사용)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { items, loading, observerRef };
};
