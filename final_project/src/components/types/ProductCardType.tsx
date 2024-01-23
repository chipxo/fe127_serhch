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

type CategotyType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategotyType;
  images: string[];
};
