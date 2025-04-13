import axiosInstance from '../api/axiosInstance';

export interface Items {
  item_id: number;
  name: string;
  thumbnail_image: string;
  web_url: string;
  cur_price: number | null;
  max_price: number | null;
  min_price: number | null;
  service_type: number | null;
}

export interface ApiResponse {
  total_count: number;
  items: Items[];
}

export const fetchItems = async ({ pageParam = 1, category }: { pageParam: number; category: number }) => {
  const res = await axiosInstance.get<ApiResponse>('/api/items', {
    params: { page: pageParam, category },
  });

  return {
    items: res.data.items,
    nextPage: pageParam + 1,
    totalCount: res.data.total_count,
  };
};
