export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stockAvailable: number;
  isFavorite: boolean;
  quantity?: number;
};
export type Category = {
  category: string;
  search: string;
};
export type Pagination = {
  page: number;
  total: number;
  size: number;
};
