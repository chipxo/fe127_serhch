export type StoreCardProps = {
  category: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  title: string;
  onClick?: () => void;
};

export type Products = {
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  title: string;
  brand?: string;
};

export type Product = {
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  title: string;
  brand?: string;
};
